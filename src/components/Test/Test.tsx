import React from "react";
import TestContent from "./TestContent";
import styles from "./Test.module.scss";
import { LessonType, useCourses } from "../../context/CoursesContext";
import DoubleScrollLayout from "../DoubleScrollLayout/DoubleScrollLayout";
import { serverName } from "../../http/server";

const Test: React.FC<{ taskData: LessonType }> = ({ taskData }) => {
  const coursesInterface = useCourses();
  const course = coursesInterface?.courses.find(
    (course) => course.id === taskData.course_id
  );
  // const lessonData: TestDataType = taskData?.lessonData;

  const lectureNumber =
    course?.lessons &&
    course?.lessons
      .filter((lesson) => lesson.type === "lecture")
      .sort((a, b) => a.number - b.number)
      .findIndex((lesson) => lesson.id === taskData.id) + 1;

  return (
    <DoubleScrollLayout
      posterSrc={`${serverName}/${taskData.image_path}`}
      topLabel="Test"
      isBackgroundBlured={false}
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
            <TestContent test={taskData} />
          )}
      </div>
    </DoubleScrollLayout>
  );
};

export default Test;
