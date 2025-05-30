import React from "react";
import { LessonType, useCourses } from "../../context/CoursesContext";
import DoubleScrollLayout from "../DoubleScrollLayout/DoubleScrollLayout";
import { serverName } from "../../http/server";
import styles from "./Lecture.module.scss";
import LectureContent from "./LectureContent";
import EqualSpaceContainer from "../EqualSpaceContainer/EqualSpaceContainer";
import TaskFooterNavBtn from "../TaskFooterNavBtn/TaskFooterNavBtn";
import PrimaryScrollConteinerLayout from "../PrimaryScrollConteinerLayout/PrimaryScrollConteinerLayout";
import Spinner from "../Spinner/Spinner";

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
    <PrimaryScrollConteinerLayout
      posterSrc={`${serverName}/${taskData.image_path}`}
      topLabel="Lecture"
      endPosition={208}
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
        {taskData?.lessonData && "lecture_id" in taskData.lessonData ? (
          <LectureContent lectureContent={taskData.lessonData.attributes} />
        ) : (
          <div className="items-center-wrapper">
            <Spinner />
          </div>
        )}
        <div className={styles.lectureFooter}>
          <EqualSpaceContainer
            containerClassname={styles.btnsWrapper}
            leftItem={<TaskFooterNavBtn direction="return" type="lecture" />}
            rightItem={<TaskFooterNavBtn direction="next" type="lecture" />}
          />
        </div>
      </div>
    </PrimaryScrollConteinerLayout>
  );
};

export default Lecture;
