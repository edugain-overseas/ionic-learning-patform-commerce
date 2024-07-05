import React from "react";
import { LessonType, useCourses } from "../../context/CoursesContext";
import DoubleScrollLayout from "../DoubleScrollLayout/DoubleScrollLayout";
import { serverName } from "../../http/server";
import styles from "./Lecture.module.scss";
import LectureContent from "./LectureContent";

const Lecture: React.FC<{ taskData: LessonType }> = ({ taskData }) => {
  const coursesInterface = useCourses();

  const course = coursesInterface?.courses.find(
    (course) => course.id === taskData.course_id
  );

  const lectureNumber =
    course?.lessons &&
    course?.lessons
      .filter((lesson) => lesson.type === "lecture")
      .sort((a, b) => a.number - b.number)
      .findIndex((lesson) => lesson.id === taskData.id) + 1;

  return (
    <DoubleScrollLayout
      posterSrc={`${serverName}/${taskData.image_path}`}
      topLabel="Lecture"
    >
      <div>
        <div className={styles.lectureHeader}>
          <div className={styles.title}>
            {`${course?.title}: `}
            <span className={styles.titleValue}>{taskData.title}</span>
          </div>
          <div className={styles.title}>
            {"Lecture №: "}
            <span className={styles.titleValue}>{lectureNumber}</span>
          </div>
        </div>
        {taskData?.lessonData && "lecture_id" in taskData.lessonData && (
          <LectureContent lectureContent={taskData.lessonData.attributes} />
        )}
      </div>
    </DoubleScrollLayout>
  );
};

export default Lecture;
