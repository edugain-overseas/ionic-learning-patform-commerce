import { FC, useState } from "react";
import { IonIcon, useIonRouter, useIonToast } from "@ionic/react";
import { useUser } from "../../context/UserContext";
import { useParams } from "react-router";
import { useCourses } from "../../context/CoursesContext";
import ExamIcon from "../../assets/icons/document-grade-A.svg";
import ProgressBar from "../ProgressBar/ProgressBar";
import CommonButton from "../CommonButton/CommonButton";
import EqualSpaceContainer from "../EqualSpaceContainer/EqualSpaceContainer";
import CustomSheetModal from "../CustomSheetModal/CustomSheetModal";
import styles from "./CourseProgressModal.module.scss";

interface CourseProgressModalType {
  isAnimating?: boolean;
}

const modalHeight = 432;
const firstBreakpoint = 24 / modalHeight;
const secondBreackpoint = 72 / modalHeight;

const CourseProgressModal: FC<CourseProgressModalType> = ({ isAnimating }) => {
  const { courseId } = useParams<{ courseId: string }>();
  const [present] = useIonToast();
  const router = useIonRouter();

  const modalParent = document.querySelector("ion-tabs");

  const course = useCourses()?.courses.find(
    (course) => course.id === +courseId
  );

  const handleLinkTaskLinkClick = (id: number) => {
    const lesson = course?.lessons.find((lesson) => lesson.id === id);
    if (!lesson) {
      return;
    }

    const isLessonAvailable = lesson?.status !== "blocked";

    if (!isLessonAvailable) {
      present({
        message:
          "This lesson is not availabel. Please complete previous lessons",
        duration: 2500,
        position: "top",
      });
      return;
    }
    router.push(`/courses/course/${courseId}/tasks/${lesson.id}`);
  };

  console.log(course);
  

  return (
    <CustomSheetModal
      height={432}
      portalTo={modalParent ? modalParent : undefined}
      position={["0", "0", "60rem", "0"]}
      breakpoints={[firstBreakpoint, secondBreackpoint, 1]}
      initialBreakpoint={firstBreakpoint}
      allowFullViewOnLastBreakpoint={true}
      isAnimating={isAnimating}
    >
      <div className={styles.modalHeader}>
        <EqualSpaceContainer
          leftItem={
            <div className={styles.progressWrappper}>
              <span className={styles.progressTitle}>Content:</span>
              <div className={styles.progressInner}>
                <span className={styles.progressLabel}>
                  {`Progress: ${course?.progress} / 100%`}
                </span>
                <ProgressBar
                  value={course?.progress}
                  width={42}
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
              block={true}
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
              <span
                title={lesson.title}
                onClick={() => handleLinkTaskLinkClick(lesson.id)}
              >
                {lesson.title}
              </span>
            </li>
          ))}
      </ul>
    </CustomSheetModal>
  );
};

export default CourseProgressModal;
