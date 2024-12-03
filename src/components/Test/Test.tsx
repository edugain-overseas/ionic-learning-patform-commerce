import React, { useEffect, useState } from "react";
import {
  LessonType,
  TestDataType,
  useCourses,
} from "../../context/CoursesContext";
import { serverName } from "../../http/server";
import TestContent from "./TestContent";
import DoubleScrollLayout from "../DoubleScrollLayout/DoubleScrollLayout";
import ProgressBar from "../ProgressBar/ProgressBar";
import styles from "./Test.module.scss";
import { useUser } from "../../context/UserContext";
import LessonToolsPanel from "../LessonToolsPanel/LessonToolsPanel";
import TestTools from "../LessonToolsPanel/TestTools";

const Test: React.FC<{ taskData: LessonType }> = ({ taskData }) => {
  const coursesInterface = useCourses();
  const userInterface = useUser();
  const [answersProgress, setAnswersProgress] = useState<number>(0);
  const course = coursesInterface?.courses.find(
    (course) => course.id === taskData.course_id
  );
  const answersProgressValue = Math.round(
    (answersProgress /
      (taskData.lessonData as TestDataType)?.questions.length) *
      100
  );
  const testAttempts = userInterface?.user.courses.find(
    (course) => course.course_id === taskData.course_id
  )?.testAttempts;

  console.log("test data: ", taskData.lessonData);
  console.log("test attempts: ", testAttempts);

  const number =
    course?.lessons &&
    course?.lessons
      .filter((lesson) => lesson.type === "test")
      .sort((a, b) => a.number - b.number)
      .findIndex((lesson) => lesson.id === taskData.id) + 1;

  useEffect(() => {
    const testId = (taskData.lessonData as TestDataType)?.test_id;
    const courseId = taskData.course_id;
    if (testId && courseId) {
      userInterface?.getStudentTestData(testId, courseId);
    }
  }, [taskData]);

  return (
    <>
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
      <LessonToolsPanel>
        <TestTools />
      </LessonToolsPanel>
      <DoubleScrollLayout
        posterSrc={`${serverName}/${taskData.image_path}`}
        topLabel="Test"
        isBackgroundBlured={false}
        scrollTriggerValue={84}
      >
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
              setAnswersProgress={setAnswersProgress}
            />
          )}
        </div>
      </DoubleScrollLayout>
    </>
  );
};

export default Test;
