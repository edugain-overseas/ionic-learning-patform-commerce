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
import styles from "./Test.module.scss";


type CurrentAttempt = {
  studentAnswers: any[];
  timer: number;
  lessonId: number;
};

const Test: React.FC<{ taskData: LessonType }> = ({ taskData }) => {
  const coursesInterface = useCourses();
  const [isTestOpen, setIsTestOpen] = useState(false);
  const [studentAnswers, setStudentAnswers] = useState<any[]>([]);
  const [currentAttempt, setCurrentAttempt, isStoreInit] =
    useStorage<CurrentAttempt | null>(`test-${taskData.id}-attempt`, null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timerRef = useRef<number>(0);
  const [present] = useToast();

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

  const timerCallback = () =>
    setCurrentAttempt((prev) =>
      prev ? { ...prev, timer: timerRef.current } : null
    );

  const setUpTimer = (timer: number, callback: () => void) => {
    timerRef.current = timer;

    intervalRef.current = setInterval(() => {
      if (timerRef.current <= 0) {
        present({
          type: 'info',
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
    const timer = minutesToSeconds(taskData.scheduled_time);
    const lessonId = taskData.id;

    setCurrentAttempt({
      studentAnswers: [],
      timer,
      lessonId,
    } as CurrentAttempt);

    setUpTimer(timer, timerCallback);
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

  if (testStatus === undefined && isStoreInit === false) {
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

  return isTestOpen || testStatus === "completed" ? (
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
        <TestTools test={taskData} currentAttempt={studentAnswers} />
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
      <TestLanding timer={taskData.scheduled_time} minScore={testData?.score} />
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
    </>
  );
};

export default Test;
