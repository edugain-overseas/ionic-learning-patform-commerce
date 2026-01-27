import { FC, useEffect, useRef, useState } from "react";
import { IonContent } from "@ionic/react";
import { useParams } from "react-router";
import { useUser } from "../../../context/UserContext";
import { useLessonTabbarLayout } from "../../../hooks/useTabbarLayout";
import { ExamDataType, useCourses } from "../../../context/CoursesContext";
import { instance } from "../../../http/instance";
import { serverName } from "../../../http/server";
import { downloadFile } from "../../../utils/downloadFile";
import { minutesToSeconds, secondsToMinutes } from "../../../utils/formatTime";
import { useToast } from "../../../hooks/useToast";
import useStorage from "../../../hooks/useStorage";
import Header from "../../../components/Header/Header";
import ExamLanding, { ExamLandingBtn } from "./ExamLanding";
import TestContent from "../../../components/Test/TestContent";
import Spinner from "../../../components/Spinner/Spinner";
import TestTimer from "../../../components/TestTimer/TestTimer";
import styles from "./CourseExamPage.module.scss";
import StickyScrollLayout from "../../../components/StickyScrollLayout/StickyScrollLayout";

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

  const [isLoading, setIsLoading] = useState(true);
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [examResult, setExamResult] = useState<ExamResult | null>(null);
  const [studentAnswers, setStudentAnswers] = useState<any[]>([]);
  const { courseId } = useParams<{ courseId: string }>();
  const [currentAttempt, setCurrentAttempt] = useStorage<CurrentAttempt | null>(
    `exam-attempts-course-id-${courseId}`,
    null
  );
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timerRef = useRef<number>(0);
  const [present] = useToast();

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

  const getExamAttempts = async () => {
    setIsLoading(true);
    try {
      const { data: attempts } = await instance.get(
        `student-exam/attempts?exam_id=${examId}`
      );
      if (attempts) {
        attempts && setAttempts(attempts);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (exam?.id && !exam.lessonData) {
      try {
        coursesInterface?.getLessonById(exam.id, courseId);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }
  }, [exam]);

  useEffect(() => {
    if (examId && !attempts.length) {
      getExamAttempts();
    }
  }, [examId]);

  useEffect(() => {
    const getExamResult = (attempts: Attempt[]): ExamResult => {
      if (!attempts.length) return "no_result";

      const bestAttempt = attempts.sort(
        (a, b) => b.attempt_score - a.attempt_score
      )[0];

      if (bestAttempt.attempt_score === examLessonData?.score) {
        return "absolute";
      } else if (bestAttempt.attempt_score > examLessonData?.min_score) {
        return "acceptable";
      } else return "failed";
    };
    setExamResult(getExamResult(attempts));
  }, [attempts]);

  useEffect(() => {
    setCurrentAttempt((prev) =>
      prev ? { ...prev, studentAnswers: studentAnswers } : null
    );
  }, [studentAnswers]);

  const getBestAttempt = () =>
    attempts.sort((a, b) => b.attempt_score - a.attempt_score)[0];

  const stopAttempt = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      timerRef.current = 0;
    }
    setStudentAnswers([]);
    setCurrentAttempt(null);
  };

  const sendAttempt = async () => {
    if (!currentAttempt) return;

    const minutesSpent =
      examLessonData.timer - secondsToMinutes(currentAttempt.timer);

    const attemptDataTosSend = {
      lesson_id: currentAttempt.lessonId,
      spent_minutes: minutesSpent,
      student_answers: currentAttempt.studentAnswers,
    };

    try {
      const response = await instance.post(
        `/student-exam/send`,
        attemptDataTosSend
      );
      const { message, ...rest } = response.data;

      present({
        type: "info",
        message: message,
        duration: 5000,
      });

      setAttempts((prev) => [...prev, rest]);
      stopAttempt();
    } catch (error) {
      console.log(error);
    }
  };

  const setUpTimer = (timer: number, callback: () => void) => {
    timerRef.current = timer;

    intervalRef.current = setInterval(() => {
      console.log("tik tok");

      if (timerRef.current <= 0) {
        present({
          type: "info",
          message: "Time is out. Your attept was sended!",
          duration: 5000,
        });
        return;
      }

      timerRef.current -= 1;

      callback?.();
    }, 1000);
  };

  const startAttempt = async () => {
    const timer = minutesToSeconds(examLessonData.timer);
    const lessonId = exam?.id;

    setCurrentAttempt({
      studentAnswers: [],
      timer,
      lessonId,
      studentId,
    } as CurrentAttempt);

    const callback = () =>
      setCurrentAttempt((prev) =>
        prev ? { ...prev, timer: timerRef.current } : null
      );

    setUpTimer(timer, callback);
  };

  useEffect(() => {
    const resumeAttempt = () => {
      if (!currentAttempt) return;

      const timer = currentAttempt.timer;

      const callback = () =>
        setCurrentAttempt((prev) =>
          prev ? { ...prev, timer: timerRef.current } : null
        );

      setStudentAnswers([...currentAttempt.studentAnswers]);

      setUpTimer(timer, callback);
    };

    const timeIsOutHandler = async () => {
      setIsLoading(true);
      try {
        await sendAttempt();
        stopAttempt();
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (currentAttempt?.timer && !timerRef.current) {
      resumeAttempt();
    }

    if (currentAttempt?.timer !== undefined && currentAttempt.timer <= 0) {
      timeIsOutHandler();
    }
  }, [currentAttempt]);

  const completeCourse = async () => {
    if (attempts.length) {
      const bestAttempt = getBestAttempt();

      const submitExamData: SubmitExamData = {
        attempt_id: bestAttempt.id,
        student_id: bestAttempt.student_id,
        lesson_id: exam!.id,
      };

      try {
        await instance.post("/student-exam/submit", submitExamData);

        // positive scenario
        await coursesInterface?.getAllCourses();
        await coursesInterface?.getCourseDetailById(courseId);

        present({
          type: "success",
          message: `Congratulation! Course ${course?.title} was completed!`,
        });
      } catch (error) {
        // negative scenario
        present({
          type: "error",
          message: "Something went wrong!",
        });
      }
    }
  };

  const downloadCertificate = async () => {
    const certificateLink = certificate?.course_certificate_link;

    if (!certificateLink) {
      await userInterface?.getUser();

      present({
        type: "warning",
        message:
          "Your cartificate is not yet ready. We are currently generating it. Try again later.",
      });
      return;
    }

    const certificateName = `Certificate of ${certificate.course_name} course.pdf`;
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
    !!examLessonData?.attempts && examLessonData.attempts > attempts.length;

  const headerProps = {
    title: exam?.title || "Exam",
    left: [
      currentAttempt
        ? {
            name: "custom-back",
            defaultHref: `/courses/course/${courseId}/tasks`,
            header: "Do you want to leave your attempt?",
            message: "If you leave, your current attempt will be closed.",
          }
        : { name: "back", defaultHref: `/courses/course/${courseId}/tasks` },
    ],
    mode: currentAttempt ? "absolute" : undefined,
  };

  if (!exam || !studentId) {
    return (
      <>
        <Header {...headerProps} />
        <IonContent className={styles.content}></IonContent>
      </>
    );
  }

  if (isLoading) {
    return (
      <>
        <Header {...headerProps} />
        <IonContent className={styles.content}>
          <div className={styles.btnsWrapper}>
            <Spinner />
          </div>
        </IonContent>
      </>
    );
  }

  return (
    <>
      <Header {...headerProps} />
      <IonContent className={styles.content}>
        {currentAttempt ? (
          <>
            <div className={styles.timerWrapper}>
              <TestTimer time={currentAttempt.timer} />
            </div>
            <StickyScrollLayout
              posterSrc={`${serverName}/${exam.image_path}`}
              topScrollEndPosition={190}
              topLabel="Exam"
            >
              <div className={styles.contentInnerWrapper}>
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
              </div>
            </StickyScrollLayout>
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
