import React, { useState } from "react";
import { IonContent, IonIcon, IonModal } from "@ionic/react";
import { useParams } from "react-router";
import { useCourses } from "../../../context/CoursesContext";
import { useUser } from "../../../context/UserContext";
import LectureIcon from "../../../assets/icons/document-2-lines.svg";
import TestIcon from "../../../assets/icons/task-completed.svg";
import LanguagesIcon from "../../../assets/icons/languages.svg";
import ExamIcon from "../../../assets/icons/document-grade-A.svg";
import Header from "../../../components/Header/Header";
import CourseNavPanel from "../../../components/CourseNavPanel/CourseNavPanel";
import InsetBtn from "../../../components/InsetBtn/InsetBtn";
import TaskItem from "../../../components/TaskItem/TaskItem";
import styles from "./CourseTasksPage.module.scss";
import ProgressBar from "../../../components/ProgressBar/ProgressBar";
import CommonButton from "../../../components/CommonButton/CommonButton";

const modalHeight = 432;
const firstBreakpoint = 24 / modalHeight;
const secondBreackpoint = 72 / modalHeight;

const CourseTasksPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [isModalFullHeight, setIsModalFullHeight] = useState(false);

  const course = useCourses()?.courses.find(
    (course) => course.id === +courseId
  );

  const courseUserData = useUser()?.user.courses;

  console.log(courseUserData);

  const lectures = course?.lessons.filter(
    (lesson) => lesson.type === "lecture"
  );
  const tests = course?.lessons.filter((lesson) => lesson.type === "test");

  const headerProps = {
    title: course?.title,
    left: [{ name: "back" }],
    right: [{ name: "notification" }, { name: "list-style" }],
  };

  const handleBreackpointChange = (e: CustomEvent) => {
    if (e.detail.breakpoint === 1) {
      setIsModalFullHeight(true);
    } else {
      setIsModalFullHeight(false);
    }
  };

  return (
    <>
      <Header {...headerProps} />
      <CourseNavPanel />
      <IonContent className={styles.pageContentWrapper}>
        <div className={styles.courseStats}>
          <span className={styles.type}>Materials | Tasks</span>
          <div className={styles.details}>
            <span className={styles.detailsTitle}>Details course:</span>
            <ul className={styles.statsList}>
              <li className={styles.statsItem}>
                <InsetBtn
                  width="32px"
                  height="32px"
                  icon={
                    <IonIcon src={LectureIcon} className={styles.statIcon} />
                  }
                />
                <div className={styles.statTextWrapper}>
                  <span className={styles.statLabel}>Lectures:</span>
                  <span className={styles.statValue}>{lectures?.length}</span>
                </div>
              </li>
              <li className={styles.statsItem}>
                <InsetBtn
                  width="32px"
                  height="32px"
                  icon={<IonIcon src={TestIcon} className={styles.statIcon} />}
                />
                <div className={styles.statTextWrapper}>
                  <span className={styles.statLabel}>Tests:</span>
                  <span className={styles.statValue}>{tests?.length}</span>
                </div>
              </li>
              <li className={styles.statsItem}>
                <InsetBtn
                  width="32px"
                  height="32px"
                  icon={
                    <IonIcon src={LanguagesIcon} className={styles.statIcon} />
                  }
                />
                <div className={styles.statTextWrapper}>
                  <span className={styles.statLabel}>Language:</span>
                  <span className={styles.statValue}>English</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <ul className={styles.tasksList}>
          {course?.lessons
            .sort((a, b) => a.number - b.number)
            .map((task) => (
              <TaskItem task={task} key={task.id} />
            ))}
        </ul>
        <IonModal
          initialBreakpoint={firstBreakpoint}
          breakpoints={[firstBreakpoint, secondBreackpoint, 1]}
          backdropBreakpoint={0.2}
          showBackdrop={false}
          backdropDismiss={false}
          canDismiss={false}
          handleBehavior="cycle"
          isOpen={true}
          className={`${styles.progressModal} ${
            isModalFullHeight ? styles.fullHeight : ""
          }`}
          onIonBreakpointDidChange={handleBreackpointChange}
        >
          <IonContent
            scrollY={isModalFullHeight}
            className={styles.modalContent}
          >
            <div className={styles.modalHeader}>
              <div className={styles.progressWrappper}>
                <span className={styles.progressTitle}>Content:</span>
                <div className={styles.progressInner}>
                  <span className={styles.progressLabel}>
                    Progress: 25 / 100%
                  </span>
                  <ProgressBar
                    value={25}
                    width={80}
                    height={10}
                    showValue={false}
                  />
                </div>
              </div>
              <CommonButton
                icon={<IonIcon src={ExamIcon} className={styles.examIcon} />}
                label="Exam"
                backgroundColor="#BDC4D2"
                color="#fcfcfc"
                width={102}
                height={32}
                borderRadius={5}
              />
            </div>
            <ul className={styles.progressList}>
              {course?.lessons
                .sort((a, b) => a.number - b.number)
                .map((lesson) => (
                  <li className={styles.progressItem}>
                    <div
                      className={`${styles.progressIconOuter} ${
                        lesson.status === "completed"
                          ? styles.success
                          : lesson.status === "active"
                          ? styles.inProgress
                          : ""
                      }`}
                    >
                      <div className={styles.progressIconInner}></div>
                    </div>
                    <span title={lesson.title}>{lesson.title}</span>
                  </li>
                ))}
            </ul>
          </IonContent>
        </IonModal>
      </IonContent>
    </>
  );
};

export default CourseTasksPage;
