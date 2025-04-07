import { FC, useEffect, useRef, useState } from "react";
import { IonContent, useIonToast } from "@ionic/react";
import { useParams } from "react-router";
import { useUser } from "../../../context/UserContext";
import { useLessonTabbarLayout } from "../../../hooks/useTabbarLayout";
import { ExamDataType, useCourses } from "../../../context/CoursesContext";
import { instance } from "../../../http/instance";
import { serverName } from "../../../http/server";
import { downloadFile } from "../../../utils/downloadFile";
import { minutesToSeconds } from "../../../utils/formatTime";
import Header from "../../../components/Header/Header";
import ExamLanding, { ExamLandingBtn } from "./ExamLanding";
import PrimaryScrollConteinerLayout from "../../../components/PrimaryScrollConteinerLayout/PrimaryScrollConteinerLayout";
import TestContent from "../../../components/Test/TestContent";
import styles from "./CourseExamPage.module.scss";
import useStorage from "../../../hooks/useStorage";
import Spinner from "../../../components/Spinner/Spinner";

export type ExamResult = "acceptable" | "absolute" | "failed" | "no_result";

type Attempt = {
  id: number;
  spent_minutes: null | number;
  student_id: number;
  attempt_number: number;
  attempt_score: number;
  exam_id: number;
};

type CurrentAttempt = {
  studentAnswers: any[];
  timer: number;
  lessonId: number;
  studentId: number;
};

type SubmitExamData = {
  attempt_id: number;
  student_id: number;
  lesson_id: number;
};

export type LandingBtnCallbacks = {
  startAttempt: () => Promise<void>;
  completeCourse: () => Promise<void>;
  downloadCertificate: () => Promise<void>;
};

const CourseExamPage: FC = () => {
  useLessonTabbarLayout();

  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [examResult, setExamResult] = useState<ExamResult | null>(null);
  const [studentAnswers, setStudentAnswers] = useState<any[]>([]);
  const { courseId } = useParams<{ courseId: string }>();
  const [currentAttempt, setCurrentAttempt] = useStorage<CurrentAttempt | null>(
    `exam-attempts-course-id-${courseId}`,
    null
  );
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [present] = useIonToast();

  const coursesInterface = useCourses();
  const userInterface = useUser();

  const course = coursesInterface?.courses.find(
    (course) => course.id === +courseId
  );

  const exam = course?.lessons.find((lesson) => lesson.type === "exam");
  const user = userInterface?.user;
  const studentId = user?.studentId;

  const examLessonData = exam?.lessonData as ExamDataType;

  const examId = examLessonData?.exam_id;

  const certificate = user?.certificates
    .find(
      (categoryCertificateData) =>
        categoryCertificateData.category_id === course?.category_id
    )
    ?.course_certificate_data.find(
      (courseCertificate) => courseCertificate.course_id === +courseId
    );

  useEffect(() => {
    if (exam?.id && !exam.lessonData) {
      coursesInterface?.getLessonById(exam.id, courseId);
    }
  }, [exam]);

  useEffect(() => {
    const getExamData = async () => {
      const { data: attempts } = await instance.get(
        `student-exam/attempts?exam_id=${examId}`
      );
      if (attempts) {
        attempts && setAttempts(attempts);
      }
    };

    if (examId && !attempts.length) {
      getExamData();
    }
  }, [examId]);

  useEffect(() => {
    const getExamResult = (attempts: Attempt[]): ExamResult => {
      if (!attempts.length) return "no_result";

      const bestAttempt = attempts.sort(
        (a, b) => b.attempt_score - a.attempt_score
      )[0];

      if (bestAttempt.attempt_score === examLessonData.score) {
        return "absolute";
      } else if (bestAttempt.attempt_score > examLessonData?.min_score) {
        return "acceptable";
      } else return "failed";
    };
    setExamResult(getExamResult(attempts));
  }, [attempts]);

  if (!exam || !studentId) {
    return null;
  }

  const getBestAttempt = () =>
    attempts.sort((a, b) => b.attempt_score - a.attempt_score)[0];

  const startAttempt = async () => {
    const timer = minutesToSeconds(examLessonData.timer);
    const lessonId = exam.id;

    setCurrentAttempt({
      studentAnswers: [],
      timer,
      lessonId,
      studentId,
    } as CurrentAttempt);

    intervalRef.current = setInterval(() => {
      console.log("qeqe");

      if (currentAttempt) {
        setCurrentAttempt((prev) => ({
          ...prev!,
          timer: prev!.timer - 1,
        }));
        console.log(currentAttempt);
      }
    }, 1000);
  };

  const completeCourse = async () => {
    if (attempts.length) {
      const bestAttempt = getBestAttempt();

      const submitExamData: SubmitExamData = {
        attempt_id: bestAttempt.id,
        student_id: bestAttempt.student_id,
        lesson_id: exam.id,
      };

      try {
        await instance.post("/student-exam/submit", submitExamData);

        // positive scenario
        await coursesInterface?.getAllCourses();
        await coursesInterface?.getCourseDetailById(courseId);

        present({
          message: `Congratulation! Course ${course?.title} was completed!`,
          duration: 3000,
        });
      } catch (error) {
        // negative scenario
        present({
          message: "Something went wrong!",
          duration: 2000,
        });
      }
    }
  };

  const downloadCertificate = async () => {
    const certificateLink = certificate?.course_certificate_link;

    if (!certificateLink) {
      present({
        message:
          "Your cartificate is not yet ready. We are currently generating it. Try again later.",
        duration: 3000,
      });
      await userInterface?.getUser();
      return;
    }

    const certificateName = `Certificate of ${certificate.course_name} course`;
    const certificateUrl = `${serverName}/${certificateLink}`;

    await downloadFile(certificateUrl, certificateName);
  };

  const landingStatus = exam?.status === "completed" ? "completed" : examResult;
  const landingBtnCallbacks: LandingBtnCallbacks = {
    startAttempt,
    completeCourse,
    downloadCertificate,
  };
  const userHasAttempt =
    !!examLessonData?.attempts && examLessonData.attempts < attempts.length;

  console.log(currentAttempt);

  const headerProps = {
    title: exam?.title || "Exam",
    left: [{ name: "back", defaultHref: `/courses/course/${courseId}/tasks` }],
    mode: currentAttempt ? "absolute" : undefined,
  };

  const stopAttempt = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      setCurrentAttempt(null);
    }
  };

  const sendAttempt = async () => {
    console.log(currentAttempt);
  };

  return (
    <>
      <Header {...headerProps} />
      <IonContent className={styles.content}>
        {currentAttempt ? (
          <>
            <PrimaryScrollConteinerLayout
              posterSrc={`${serverName}/${exam.image_path}`}
              endPosition={132}
            >
              {examLessonData && (
                <TestContent
                  test={exam}
                  studentAnswers={studentAnswers}
                  setStudentAnswers={setStudentAnswers}
                />
              )}
              <div className={styles.btnsWrapper}>
                {examLessonData ? (
                  <ExamLandingBtn
                    label="Complete"
                    variant="primary"
                    onClick={sendAttempt}
                  />
                ) : (
                  <Spinner />
                )}
              </div>
            </PrimaryScrollConteinerLayout>
          </>
        ) : (
          <ExamLanding
            status={landingStatus}
            callbacks={landingBtnCallbacks}
            hasAttempt={userHasAttempt}
          />
        )}
      </IonContent>
    </>
  );
};

export default CourseExamPage;
