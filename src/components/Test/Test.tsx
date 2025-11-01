import React, { useEffect, useRef, useState } from "react";
import {
  LessonType,
  TestDataType,
  useCourses,
} from "../../context/CoursesContext";
import { serverName } from "../../http/server";
import { instance } from "../../http/instance";
import { minutesToSeconds } from "../../utils/formatTime";
import { useToast } from "../../hooks/useToast";
import { TestAttemptType } from "../../types/user";
import useStorage from "../../hooks/useStorage";
import TestContent from "./TestContent";
import ProgressBar from "../ProgressBar/ProgressBar";
import LessonToolsPanel from "../LessonToolsPanel/LessonToolsPanel";
import TestTools from "../LessonToolsPanel/TestTools";
import EqualSpaceContainer from "../EqualSpaceContainer/EqualSpaceContainer";
import TaskFooterNavBtn from "../TaskFooterNavBtn/TaskFooterNavBtn";
import TestLanding from "./TestLanding";
import CommonButton from "../CommonButton/CommonButton";
import StickyScrollLayout from "../StickyScrollLayout/StickyScrollLayout";
import Spinner from "../Spinner/Spinner";
import TestTimer from "../TestTimer/TestTimer";
import AttemptsModal from "./AttemptsModal";
import styles from "./Test.module.scss";

type CurrentAttempt = {
  studentAnswers: any[];
  timer: number;
  lessonId: number;
};

const Test: React.FC<{ taskData: LessonType }> = ({ taskData }) => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timerRef = useRef<number>(0);
  const [isTestOpen, setIsTestOpen] = useState(false);
  const [testAttempts, setTestAttempts] = useState<TestAttemptType[]>([]);
  const [studentAnswers, setStudentAnswers] = useState<any[]>([]);
  const [isOpenAttemptsModal, setIsOpenAttemptsModal] = useState(false);
  const [currentAttempt, setCurrentAttempt, isStoreInit] =
    useStorage<CurrentAttempt | null>(`test-${taskData.id}-attempt`, null);
  const [present] = useToast();
  const coursesInterface = useCourses();

  const course = coursesInterface?.courses.find(
    (course) => course.id === taskData.course_id
  );

  const answersProgressValue = Math.round(
    (studentAnswers.filter((ans) => {
      if (
        ans.q_type === "test" ||
        ans.q_type === "boolean" ||
        ans.q_type === "answer_with_photo" ||
        ans.q_type === "question_with_photo"
      )
        return ans.a_id !== 0;
      if (ans.q_type === "multiple_choice") return ans.a_ids.length !== 0;
      if (ans.q_type === "matching") return ans.matching?.length !== 0;
      return false;
    }).length /
      (taskData.lessonData as TestDataType)?.questions.length) *
      100
  );

  const testStatus = taskData.status;

  const testData = taskData.lessonData as TestDataType;

  const number =
    course?.lessons &&
    course?.lessons
      .filter((lesson) => lesson.type === "test")
      .sort((a, b) => a.number - b.number)
      .findIndex((lesson) => lesson.id === taskData.id) + 1;

  useEffect(() => {
    const getSubmitedAttempt = async () => {
      try {
        const response = await instance.get(
          `/student-test/attempt/${testData.my_attempt_id}`
        );
        setStudentAnswers(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (testStatus === "completed" && testData?.my_attempt_id) {
      getSubmitedAttempt();
    }
  }, [testStatus, testData?.my_attempt_id]);

  const closeAttempt = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setCurrentAttempt(null);
    setIsTestOpen(false);
    setStudentAnswers([]);
    intervalRef.current = null;
    timerRef.current = 0;
  };

  const timerCallback = () =>
    setCurrentAttempt((prev) =>
      prev ? { ...prev, timer: timerRef.current } : null
    );

  const setUpTimer = (timer: number, callback: () => void) => {
    timerRef.current = timer;

    intervalRef.current = setInterval(async () => {
      if (timerRef.current <= 0) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }

        present({
          type: "info",
          message: "Time is out. Your attempt was sent!",
          duration: 5000,
        });

        await handleSubmitCurrentAttempt();
        return;
      }

      timerRef.current -= 1;
      callback?.();
    }, 1000);
  };

  const startAttempt = async () => {
    const timer = minutesToSeconds(taskData.scheduled_time);
    const lessonId = taskData.id;

    setCurrentAttempt({
      studentAnswers: [],
      timer,
      lessonId,
    } as CurrentAttempt);

    setUpTimer(timer, timerCallback);
  };

  const handleSubmitCurrentAttempt = async () => {
    try {
      const response = await instance.post("student-test/send", {
        lesson_id: taskData.id,
        student_answers: currentAttempt?.studentAnswers,
      });
      if (response.data) {
        present({
          type: "info",
          message: response.data.message,
        });
        await fetchAttempts();
      }
    } catch (error: any) {
      console.log(error);
      if (error.response.status === 409) {
        present({
          type: "error",
          message: `${error.response.data.detail}!`,
          duration: 5000,
        });
      }
    } finally {
      closeAttempt();
    }
  };

  const fetchAttempts = async () => {
    try {
      const response = await instance.get(
        `/student-test/attempts?test_id=${testData.test_id}`
      );
      if (response.data !== null) {
        setTestAttempts(response.data);
      } else {
        setTestAttempts([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (currentAttempt && currentAttempt.timer !== 0 && !isTestOpen) {
      setUpTimer(currentAttempt.timer, timerCallback);
      setIsTestOpen(true);
    }
    if (currentAttempt && currentAttempt.studentAnswers && !isTestOpen) {
      setStudentAnswers(currentAttempt.studentAnswers);
    }
  }, [currentAttempt]);

  useEffect(() => {
    setCurrentAttempt((prev) => {
      if (!prev) {
        return prev;
      }
      return { ...prev, studentAnswers: studentAnswers };
    });
  }, [studentAnswers]);

  useEffect(() => {
    if (testData?.test_id) {
      fetchAttempts();
    }
  }, [testData?.test_id]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  if (testStatus === undefined || isStoreInit === false) {
    return (
      <div className={styles.loaderWrapper}>
        <Spinner />
      </div>
    );
  }

  if (currentAttempt && currentAttempt.timer !== 0 && !isTestOpen) {
    return (
      <div className={styles.loaderWrapper}>
        <Spinner />
      </div>
    );
  }

  const closeAttemptsModal = () => setIsOpenAttemptsModal(false);
  const openAttemptsModal = () => setIsOpenAttemptsModal(true);

  return (
    <>
      {isTestOpen || testStatus === "completed" ? (
        <>
          {currentAttempt?.timer && (
            <div className={styles.timerWrapper}>
              <TestTimer time={currentAttempt.timer} />
            </div>
          )}
          {!Number.isNaN(answersProgressValue) && (
            <div className={styles.answersProgress}>
              <span
                className={styles.answersProgressValue}
              >{`Progress: ${answersProgressValue} / 100%`}</span>
              <ProgressBar
                value={answersProgressValue}
                width={230}
                height={10}
                showValue={false}
              />
            </div>
          )}
          <LessonToolsPanel inset="calc(116rem + var(--ion-safe-area-top)) auto auto calc(100% - 50rem)">
            <TestTools
              test={taskData}
              handleSubmitCurrentAttempt={handleSubmitCurrentAttempt}
              handleOpenAttemptsModal={openAttemptsModal}
            />
          </LessonToolsPanel>
          <StickyScrollLayout
            posterSrc={`${serverName}/${taskData.image_path}`}
            topLabel="Test"
            topScrollEndPosition={190}
          >
            <div className={styles.contentInnerWrapper}>
              <div>
                <div className={styles.testHeader}>
                  <div className={styles.title}>
                    {`${course?.title}: `}
                    <span className={styles.titleValue}>{taskData.title}</span>
                  </div>
                  <div className={styles.title}>
                    {"Test №: "}
                    <span className={styles.titleValue}>{number}</span>
                  </div>
                </div>
                {taskData?.lessonData && "test_id" in taskData.lessonData && (
                  <TestContent
                    test={taskData}
                    studentAnswers={studentAnswers}
                    setStudentAnswers={
                      testStatus !== "completed" ? setStudentAnswers : undefined
                    }
                  />
                )}
              </div>
              <div className={styles.testFooter}>
                <EqualSpaceContainer
                  containerClassname={styles.btnContainer}
                  leftItem={<TaskFooterNavBtn direction="return" />}
                  rightItem={<TaskFooterNavBtn direction="next" />}
                />
              </div>
            </div>
          </StickyScrollLayout>
        </>
      ) : (
        <>
          <TestLanding
            timer={taskData.scheduled_time}
            minScore={testData?.score}
          />
          {testAttempts.length !== 0 ? (
            <EqualSpaceContainer
              containerClassname={styles.landingBtns}
              leftItem={
                <CommonButton
                  label="Start"
                  block={true}
                  width={200}
                  height={32}
                  backgroundColor="var(--ion-color-dark)"
                  color="var(--ion-color-primary-contrast)"
                  borderRadius={5}
                  className={styles.landingBtn}
                  onClick={() => {
                    startAttempt();
                    setIsTestOpen(true);
                  }}
                />
              }
              rightItem={
                <CommonButton
                  label="Show attempts"
                  block={true}
                  width={200}
                  height={32}
                  backgroundColor="var(--ion-color-light)"
                  color="var(--ion-color-primary-contrast)"
                  borderRadius={5}
                  className={styles.landingBtn}
                  onClick={openAttemptsModal}
                />
              }
            />
          ) : (
            <CommonButton
              label="Start"
              block={true}
              width={200}
              height={32}
              backgroundColor="var(--ion-color-dark)"
              color="var(--ion-color-primary-contrast)"
              borderRadius={5}
              className={`${styles.landingBtn} ${styles.blockBtn}`}
              onClick={() => {
                startAttempt();
                setIsTestOpen(true);
              }}
            />
          )}
        </>
      )}
      <AttemptsModal
        test={taskData}
        testAttempts={testAttempts}
        isOpen={isOpenAttemptsModal}
        handleClose={closeAttemptsModal}
      />
    </>
  );
};

export default Test;
