import {
  IonContent,
  IonIcon,
  IonModal,
  useIonViewDidLeave,
  useIonViewWillLeave,
} from "@ionic/react";
import { FC, RefObject, useEffect, useState } from "react";
import ExamIcon from "../../assets/icons/document-grade-A.svg";
import ProgressBar from "../ProgressBar/ProgressBar";
import CommonButton from "../CommonButton/CommonButton";
import styles from "./CourseProgressModal.module.scss";
import { useUser } from "../../context/UserContext";
import { useParams } from "react-router";
import { useCourses } from "../../context/CoursesContext";
import EqualSpaceContainer from "../EqualSpaceContainer/EqualSpaceContainer";

interface CourseProgressModalType {
  modalRef?: RefObject<HTMLIonModalElement> | null;
}

const modalHeight = 432;
const firstBreakpoint = 24 / modalHeight;
const secondBreackpoint = 72 / modalHeight;

const CourseProgressModal: FC<CourseProgressModalType> = ({ modalRef }) => {
  const { courseId } = useParams<{ courseId: string }>();
  const [isModalFullHeight, setIsModalFullHeight] = useState(false);

  const courseUserData = useUser()?.user.courses.find(
    (userCourse) => userCourse.course_id === +courseId
  );
  const course = useCourses()?.courses.find(
    (course) => course.id === +courseId
  );

  const handleBreackpointChange = (e: CustomEvent) => {
    if (e.detail.breakpoint === 1) {
      modalRef?.current?.classList.add(styles.fullHeight);
    } else {
      modalRef?.current?.classList.remove(styles.fullHeight);
    }
  };

  const toggleBreackpoint = async () => {
    const currentBreackpoint = await modalRef?.current?.getCurrentBreakpoint();
    switch (currentBreackpoint) {
      case firstBreakpoint:
        modalRef?.current?.setCurrentBreakpoint(secondBreackpoint);
        break;
      case secondBreackpoint:
        modalRef?.current?.classList.add(styles.fullHeight);
        modalRef?.current?.setCurrentBreakpoint(1);
        break;
      case 1:
        modalRef?.current?.classList.remove(styles.fullHeight);
        modalRef?.current?.setCurrentBreakpoint(firstBreakpoint);
        break;
      default:
        break;
    }
  };

  return (
    <IonModal
      ref={modalRef}
      initialBreakpoint={firstBreakpoint}
      breakpoints={[firstBreakpoint, secondBreackpoint, 1]}
      backdropBreakpoint={0.2}
      showBackdrop={false}
      backdropDismiss={false}
      canDismiss={false}
      handle={false}
      handleBehavior="cycle"
      isOpen={true}
      className={styles.progressModal}
      onIonBreakpointDidChange={handleBreackpointChange}
    >
      <IonContent className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <button
            type="button"
            className={styles.handleButton}
            onClick={toggleBreackpoint}
          >
            <span></span>
          </button>
          <EqualSpaceContainer
            leftItem={
              <div className={styles.progressWrappper}>
                <span className={styles.progressTitle}>Content:</span>
                <div className={styles.progressInner}>
                  <span className={styles.progressLabel}>
                    Progress: 25 / 100%
                  </span>
                  <ProgressBar
                    value={courseUserData?.progress}
                    width={80}
                    height={10}
                    showValue={false}
                  />
                </div>
              </div>
            }
            rightItem={
              <CommonButton
                icon={<IonIcon src={ExamIcon} className={styles.examIcon} />}
                label="Exam"
                backgroundColor="#BDC4D2"
                color="#fcfcfc"
                width={102}
                height={32}
                borderRadius={5}
              />
            }
          />
        </div>
        <ul className={styles.progressList}>
          {course?.lessons
            .sort((a, b) => a.number - b.number)
            .map((lesson) => (
              <li className={styles.progressItem} key={lesson.id}>
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
  );
};

export default CourseProgressModal;
