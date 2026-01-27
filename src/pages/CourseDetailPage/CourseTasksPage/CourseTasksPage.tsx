import { FC, useState } from "react";
import { IonContent, IonIcon, createAnimation } from "@ionic/react";
import { useParams } from "react-router";
import { useCourses } from "../../../context/CoursesContext";
import { remToPx } from "../../../utils/pxToRem";
import { debounce } from "../../../utils/debounce";
import LectureIcon from "../../../assets/icons/document-2-lines.svg";
import TestIcon from "../../../assets/icons/task-completed.svg";
import LanguagesIcon from "../../../assets/icons/languages.svg";
import Header from "../../../components/Header/Header";
import CourseNavPanel from "../../../components/CourseNavPanel/CourseNavPanel";
import InsetBtn from "../../../components/InsetBtn/InsetBtn";
import TaskItem from "../../../components/TaskItem/TaskItem";
import CourseProgressModal from "../../../components/CourseProgressModal/CourseProgressModal";
import customSheetModalStyles from "../../../components/CustomSheetModal/CustomSheetModal.module.scss";
import styles from "./CourseTasksPage.module.scss";

const firstBreakpoint = 24;
const secondBreackpoint = 72;

const CourseTasksPage: FC = () => {
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
    left: [{ name: "back", defaultHref: undefined }],
    right: [{ name: "list-style" }],
  };

  // const handleScroll = (e: CustomEvent) => {
  //   if (e.detail.deltaY > 0) {
  //     const modalContentRef = document.getElementById(
  //       "custom-sheet-modal-content"
  //     );

  //     const secondPoint = Math.round(remToPx(60 + secondBreackpoint));

  //     if (modalContentRef) {
  //       const modalHeight = Math.round(modalContentRef.clientHeight);

  //       if (modalHeight === secondPoint) {
  //         if (animatingModal) return;
  //         setAnimatingModal(true);
  //         createAnimation()
  //           .addElement(modalContentRef)
  //           .beforeAddClass(customSheetModalStyles.directionDown)
  //           .afterRemoveClass(customSheetModalStyles.directionDown)
  //           .fromTo(
  //             "height",
  //             `${secondBreackpoint}rem`,
  //             `${firstBreakpoint}rem`
  //           )
  //           .easing("ease-out")
  //           .duration(300)
  //           .play();
  //       }
  //     }
  //   }
  // };

  // const handleScrollEnd = debounce((e: CustomEvent) => {
  //   const modalContentRef = document.getElementById(
  //     "custom-sheet-modal-content"
  //   );

  //   if (modalContentRef) {
  //     if (animatingModal) {
  //       createAnimation()
  //         .addElement(modalContentRef)
  //         .beforeAddClass(customSheetModalStyles.directionUp)
  //         .afterRemoveClass(customSheetModalStyles.directionUp)
  //         .fromTo("height", `${firstBreakpoint}rem`, `${secondBreackpoint}rem`)
  //         .easing("ease-in")
  //         .duration(300)
  //         .play();
  //       setAnimatingModal(false);
  //     }
  //   }
  // }, 300);

  const CourseStats = () => (
    <div className={styles.courseStats}>
      <span className={styles.type}>Details Course:</span>
      <div className={styles.details}>
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
        // onIonScroll={handleScroll}
        // onIonScrollEnd={handleScrollEnd}
      >
        <CourseStats />
        <ul className={styles.tasksList}>
          {course?.lessons &&
            [...course.lessons]
              .sort((a, b) => a.number - b.number)
              .map((task) => <TaskItem task={task} key={task.id} />)}
        </ul>
        <CourseProgressModal isAnimating={animatingModal} />
      </IonContent>
    </>
  );
};

export default CourseTasksPage;
