import React from "react";
import { LessonType, useCourses } from "../../context/CoursesContext";
import { serverName } from "../../http/server";
import StickyScrollLayout from "../StickyScrollLayout/StickyScrollLayout";
import LectureContent from "./LectureContent";
import EqualSpaceContainer from "../EqualSpaceContainer/EqualSpaceContainer";
import TaskFooterNavBtn from "../TaskFooterNavBtn/TaskFooterNavBtn";
import Spinner from "../Spinner/Spinner";
import styles from "./Lecture.module.scss";

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
    <StickyScrollLayout
      posterSrc={`${serverName}/${taskData.image_path}`}
      topLabel="Lecture"
      topScrollEndPosition={208}
    >
      <div className={styles.contentInnerWrapper}>
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
          <div className={styles.contentInner}>
            <LectureContent lectureContent={taskData.lessonData.attributes} />
          </div>
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
    </StickyScrollLayout>
  );
};

export default Lecture;
