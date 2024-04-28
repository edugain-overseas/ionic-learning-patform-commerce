import React, { useState } from "react";
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

const Test: React.FC<{ taskData: LessonType }> = ({ taskData }) => {
  const coursesInterface = useCourses();
  const [answersProgress, setAnswersProgress] = useState<number>(0);
  const course = coursesInterface?.courses.find(
    (course) => course.id === taskData.course_id
  );
  const answersProgressValue = Math.round(
    (answersProgress /
      (taskData.lessonData as TestDataType)?.questions.length) *
      100
  );
  console.log(answersProgressValue);

  const lectureNumber =
    course?.lessons &&
    course?.lessons
      .filter((lesson) => lesson.type === "lecture")
      .sort((a, b) => a.number - b.number)
      .findIndex((lesson) => lesson.id === taskData.id) + 1;

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
      <DoubleScrollLayout
        posterSrc={`${serverName}/${taskData.image_path}`}
        topLabel="Test"
        isBackgroundBlured={false}
        scrollTriggerValue={98}
      >
        <div>
          <div className={styles.testHeader}>
            <div className={styles.title}>
              {`${course?.title}: `}
              <span className={styles.titleValue}>{taskData.title}</span>
            </div>
            <div className={styles.title}>
              {"Lecture №: "}
              <span className={styles.titleValue}>{lectureNumber}</span>
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
