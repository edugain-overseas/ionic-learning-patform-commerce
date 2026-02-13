import { IonButtons, IonHeader, IonToolbar } from "@ionic/react";
import { motion } from "motion/react";
import { clamp } from "../../utils/clamp";
import { LessonType, useCourses } from "../../context/CoursesContext";
import HeaderTitle from "../../components/Header/HeaderTitle";
import HeaderBackBtn from "../../components/Header/HeaderBackBtn";
import CompleteLessonBtn from "../../components/CompleteLessonBtn/CompleteLessonBtn";
import styles from "./TaskPage.module.scss";

type PropsType = {
  scrollProgress: number;
  taskData?: LessonType;
  onTestCompleteClick?: () => Promise<void> | void;
};

const threshold = 0.7;

const TaskHeader = ({
  scrollProgress,
  taskData,
  onTestCompleteClick,
}: PropsType) => {
  const animationProgress = clamp(
    0,
    (scrollProgress * 1.25 - threshold) / (1 - threshold),
    1
  );

  const btnBgOpacity = 1 - animationProgress;

  const completeLecture = async () => {
    if (!taskData) return;
    if (taskData.status === "completed") return;

    await useCourses?.()?.confirmLecture(taskData.id);
  };

  return (
    <IonHeader className={styles.taskHeader}>
      <motion.div
        className={styles.headerBg}
        style={{
          transform: `translateY(calc(100% * ${animationProgress} - 100%))`,
        }}
      />
      <IonToolbar className={styles.toolbar}>
        <IonButtons slot="start" className={styles.buttonsWrapper}>
          <motion.div
            className={styles.backBtnBg}
            style={{ opacity: btnBgOpacity }}
          />
          <HeaderBackBtn />
        </IonButtons>
        <motion.div
          style={{
            opacity: animationProgress,
            transform: `translateY(calc(100% * ${animationProgress} - 100%))`,
          }}
        >
          <HeaderTitle title={taskData?.title || ""} />
        </motion.div>
        <IonButtons slot="end" className={styles.buttonsWrapper}>
          {taskData?.status && (
            <>
              <motion.div
                className={styles.confirmBtnBg}
                style={{ opacity: btnBgOpacity }}
              />
              <CompleteLessonBtn
                status={taskData.status}
                variant="header"
                onClick={
                  taskData.type === "lecture"
                    ? completeLecture
                    : onTestCompleteClick
                }
              />
            </>
          )}
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default TaskHeader;
