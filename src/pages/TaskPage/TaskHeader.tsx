import { IonButtons, IonHeader, IonToolbar } from "@ionic/react";
import { motion } from "motion/react";
import { clamp } from "../../utils/clamp";
import { LessonType } from "../../context/CoursesContext";
import HeaderTitle from "../../components/Header/HeaderTitle";
import HeaderBackBtn from "../../components/Header/HeaderBackBtn";
import CompleteLessonBtn from "../../components/CompleteLessonBtn/CompleteLessonBtn";
import styles from "./TaskPage.module.scss";

type PropsType = {
  scrollProgress: number;
  taskData?: LessonType;
};

const threshold = 0.7;

const TaskHeader = ({ scrollProgress, taskData }: PropsType) => {
  const animationProgress = clamp(
    0,
    (scrollProgress * 1.25 - threshold) / (1 - threshold),
    1
  );

  const headerBgOpacity = animationProgress;
  const btnBgOpacity = 1 - animationProgress;

  return (
    <IonHeader className={styles.taskHeader}>
      <motion.div
        className={styles.headerBg}
        // style={{ opacity: headerBgOpacity }}
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
              <CompleteLessonBtn status={taskData.status} variant="header" />
            </>
          )}
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default TaskHeader;
