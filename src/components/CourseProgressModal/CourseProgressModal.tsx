import { FC } from "react";
import { IonIcon } from "@ionic/react";
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

  const modalParent = document.querySelector("ion-tabs");

  const courseUserData = useUser()?.user.courses.find(
    (userCourse) => userCourse.course_id === +courseId
  );
  const course = useCourses()?.courses.find(
    (course) => course.id === +courseId
  );

  console.log(courseUserData);

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
                  {`Progress: ${courseUserData?.progress} / 100%`}
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
    </CustomSheetModal>
  );
};

export default CourseProgressModal;
