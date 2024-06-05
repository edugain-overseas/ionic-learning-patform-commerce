import { FC, useRef } from "react";
import {
  IonContent,
  IonIcon,
  ScrollDetail,
} from "@ionic/react";
import { useParams } from "react-router";
import { useCourses } from "../../../context/CoursesContext";
import LectureIcon from "../../../assets/icons/document-2-lines.svg";
import TestIcon from "../../../assets/icons/task-completed.svg";
import LanguagesIcon from "../../../assets/icons/languages.svg";
import Header from "../../../components/Header/Header";
import CourseNavPanel from "../../../components/CourseNavPanel/CourseNavPanel";
import InsetBtn from "../../../components/InsetBtn/InsetBtn";
import TaskItem from "../../../components/TaskItem/TaskItem";
import CourseProgressModal from "../../../components/CourseProgressModal/CourseProgressModal";
import styles from "./CourseTasksPage.module.scss";

const CourseTasksPage: FC = () => {
  const modalRef = useRef<HTMLIonModalElement>(null);
  const { courseId } = useParams<{ courseId: string }>();

  const course = useCourses()?.courses.find(
    (course) => course.id === +courseId
  );

  const lectures = course?.lessons.filter(
    (lesson) => lesson.type === "lecture"
  );
  const tests = course?.lessons.filter((lesson) => lesson.type === "test");

  const headerProps = {
    title: course?.title,
    left: [{ name: "back" }],
    right: [{ name: "notification" }, { name: "list-style" }],
  };

  const handleScroll = async (e: CustomEvent<ScrollDetail>) => {
    const modalHeight = 432;
    const firstBreakpoint = 24 / modalHeight;
    const secondBreackpoint = 72 / modalHeight;

    const currentBreackpoint = await modalRef.current?.getCurrentBreakpoint();

    if (e.detail.deltaY > 0 && currentBreackpoint !== firstBreakpoint) {
      modalRef.current?.setCurrentBreakpoint(firstBreakpoint);
    } else if (
      e.detail.deltaY < 0 &&
      currentBreackpoint !== secondBreackpoint
    ) {
      modalRef.current?.setCurrentBreakpoint(secondBreackpoint);
    }
  };

  const CourseStats = () => (
    <div className={styles.courseStats}>
      <span className={styles.type}>Materials | Tasks</span>
      <div className={styles.details}>
        <span className={styles.detailsTitle}>Details course:</span>
        <ul className={styles.statsList}>
          <li className={styles.statsItem}>
            <InsetBtn
              width="32px"
              height="32px"
              icon={<IonIcon src={LectureIcon} className={styles.statIcon} />}
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
              icon={<IonIcon src={LanguagesIcon} className={styles.statIcon} />}
            />
            <div className={styles.statTextWrapper}>
              <span className={styles.statLabel}>Language:</span>
              <span className={styles.statValue}>English</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );

  return (
    <>
      <Header {...headerProps} />
      <CourseNavPanel />
      <IonContent
        className={styles.pageContentWrapper}
        scrollEvents={true}
        onIonScroll={handleScroll}
      >
        <CourseStats />
        <ul className={styles.tasksList}>
          {course?.lessons &&
            [...course.lessons]
              .sort((a, b) => a.number - b.number)
              .map((task) => <TaskItem task={task} key={task.id} />)}
        </ul>
        <CourseProgressModal modalRef={modalRef} />
      </IonContent>
    </>
  );
};

export default CourseTasksPage;
