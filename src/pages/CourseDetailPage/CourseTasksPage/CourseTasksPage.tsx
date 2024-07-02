import { FC, useState } from "react";
import {
  // CreateAnimation,
  IonContent,
  IonIcon,
  // ScrollBaseDetail,
  // ScrollDetail,
  createAnimation,
} from "@ionic/react";
import { useParams } from "react-router";
import { useCourses } from "../../../context/CoursesContext";
import { remToPx } from "../../../utils/pxToRem";
import LectureIcon from "../../../assets/icons/document-2-lines.svg";
import TestIcon from "../../../assets/icons/task-completed.svg";
import LanguagesIcon from "../../../assets/icons/languages.svg";
import Header from "../../../components/Header/Header";
import CourseNavPanel from "../../../components/CourseNavPanel/CourseNavPanel";
import InsetBtn from "../../../components/InsetBtn/InsetBtn";
import TaskItem from "../../../components/TaskItem/TaskItem";
import CourseProgressModal from "../../../components/CourseProgressModal/CourseProgressModal";
import styles from "./CourseTasksPage.module.scss";
import customSheetModalStyles from "../../../components/CustomSheetModal/CustomSheetModal.module.scss";

const firstBreakpoint = 24;
const secondBreackpoint = 72;

const CourseTasksPage: FC = () => {
  // const modalRef = useRef<HTMLIonModalElement>(null);
  // const animatingModal = useRef(false);
  const [animatingModal, setAnimatingModal] = useState(false);

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

  // const handleScroll = async (e: CustomEvent<ScrollDetail>) => {
  //   const modalHeight = 432;
  //   const firstBreakpoint = 24 / modalHeight;
  //   const secondBreackpoint = 72 / modalHeight;

  //   const currentBreackpoint = await modalRef.current?.getCurrentBreakpoint();

  //   if (e.detail.deltaY > 0 && currentBreackpoint !== firstBreakpoint) {
  //     modalRef.current?.setCurrentBreakpoint(firstBreakpoint);
  //   } else if (
  //     e.detail.deltaY < 0 &&
  //     currentBreackpoint !== secondBreackpoint
  //   ) {
  //     modalRef.current?.setCurrentBreakpoint(secondBreackpoint);
  //   }
  // };

  const handleScroll = () => {
    const modalContentRef = document.getElementById(
      "custom-sheet-modal-content"
    );

    const secondPoint = Math.round(remToPx(60 + secondBreackpoint));

    if (modalContentRef) {
      const modalHeight = Math.round(modalContentRef.clientHeight);

      if (modalHeight === secondPoint) {
        if (animatingModal) return;
        setAnimatingModal(true);
        createAnimation()
          .addElement(modalContentRef)
          .beforeAddClass(customSheetModalStyles.directionDown)
          .afterRemoveClass(customSheetModalStyles.directionDown)
          .fromTo("height", `${secondBreackpoint}rem`, `${firstBreakpoint}rem`)
          .easing("ease-out")
          .duration(300)
          .play();
      }
    }
  };

  const handleScrollEnd = () => {
    const modalContentRef = document.getElementById(
      "custom-sheet-modal-content"
    );

    if (modalContentRef) {
      if (animatingModal) {
        createAnimation()
          .addElement(modalContentRef)
          .beforeAddClass(customSheetModalStyles.directionUp)
          .afterRemoveClass(customSheetModalStyles.directionUp)
          .fromTo("height", `${firstBreakpoint}rem`, `${secondBreackpoint}rem`)
          .easing("ease-in")
          .duration(300)
          .play();
        setAnimatingModal(false);
      }
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
        onIonScrollEnd={handleScrollEnd}
      >
        <CourseStats />
        <ul className={styles.tasksList}>
          {course?.lessons &&
            [...course.lessons]
              .sort((a, b) => a.number - b.number)
              .map((task) => <TaskItem task={task} key={task.id} />)}
        </ul>
        <CourseProgressModal
          // modalRef={modalRef}
          isAnimating={animatingModal}
        />
      </IonContent>
    </>
  );
};

export default CourseTasksPage;
