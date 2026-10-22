import { FC } from "react";
import { IonIcon } from "@ionic/react";
import { useParams } from "react-router";
import { useCourses } from "../../context/CoursesContext";
import { useProtectedNavigation } from "../../hooks/useProtectedNavigation";
import ExamIcon from "../../assets/icons/document-grade-A.svg";
import ProgressBar from "../ProgressBar/ProgressBar";
import CommonButton from "../CommonButton/CommonButton";
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

  const modalParent = document.querySelector("ion-tabs");

  const course = useCourses()?.courses.find(
    (course) => course.id === +courseId,
  );

  const isCoursePurchased = course?.bought;
  const protectedNavigate = useProtectedNavigation();

  const handleTaskNavigate = (id?: number, isExam = false) => {
    const lesson = course?.lessons.find((lesson) => lesson.id === id);
    if (!lesson) {
      return;
    }

    console.log(lesson, isExam);

    const isLessonAvailable = lesson?.status !== "blocked";
    const isAllowed = !!(isCoursePurchased && isLessonAvailable);
    const path = `/course/${courseId}/${
      isExam ? "exam" : `tasks/${lesson.id}`
    }`;
    const message = isCoursePurchased
      ? "This lesson is not availabel. Please complete previous lessons"
      : "Please purchase the course to gain access to the lesson";

    protectedNavigate(isAllowed, path, message);
  };

  const handleExamClick = () => {
    const examLessonId = course?.lessons.find(
      (lesson) => lesson.type === "exam",
    )?.id;

    handleTaskNavigate(examLessonId, true);
  };
  
  if (!course) return null;

  return (
    <CustomSheetModal
      height={432}
      portalTo={modalParent ? modalParent : undefined}
      position={["0", "0", "var(--tabbar-offset)", "0"]}
      breakpoints={[firstBreakpoint, secondBreackpoint, 1]}
      initialBreakpoint={firstBreakpoint}
      allowFullViewOnLastBreakpoint={true}
      isAnimating={isAnimating}
      // id={`course-progress-modal-${courseId}`}
      id={`course-progress-modal`}
    >
      <div className={styles.modalHeader}>
        <div className={styles.btnsContainer}>
          <div className={styles.progressWrappper}>
            <span className={styles.progressTitle}>Content:</span>
            <div className={styles.progressInner}>
              <span className={styles.progressLabel}>
                {`Progress: ${course?.progress ? course.progress : 0} / 100%`}
              </span>
              <ProgressBar
                value={course?.progress}
                width={90}
                height={10}
                showValue={false}
                wrapperStyles={{ flexGrow: 1 }}
              />
            </div>
          </div>
          <CommonButton
            icon={<IonIcon src={ExamIcon} className={styles.examIcon} />}
            label="Exam"
            backgroundColor="#BDC4D2"
            color="#fcfcfc"
            width={103}
            height={32}
            borderRadius={5}
            onClick={handleExamClick}
          />
        </div>
      </div>
      <ul className={styles.progressList}>
        {course?.lessons
          .sort((a, b) => a.number - b.number)
          .map((lesson) => (
            <li
              className={styles.progressItem}
              key={lesson.id}
              onClick={() =>
                handleTaskNavigate(lesson.id, lesson.type === "exam")
              }
            >
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
    </CustomSheetModal>
  );
};

export default CourseProgressModal;
