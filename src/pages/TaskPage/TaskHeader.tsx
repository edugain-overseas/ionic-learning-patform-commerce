import {
  IonButton,
  IonButtons,
  IonHeader,
  IonIcon,
  IonToolbar,
} from "@ionic/react";
import { motion, transform } from "motion/react";
import { clamp } from "../../utils/clamp";
import { LessonType, useCourses } from "../../context/CoursesContext";
import backIcon from "../../assets/icons/header/back.svg";
import HeaderTitle from "../../components/Header/HeaderTitle";
import HeaderBackBtn from "../../components/Header/HeaderBackBtn";
import CompleteLessonBtn from "../../components/CompleteLessonBtn/CompleteLessonBtn";
import styles from "./TaskPage.module.scss";
import { useTaskNavigation } from "../../hooks/useTasksNavigation";

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
    1,
  );

  const btnBgOpacity = 1 - animationProgress;
  const confirmLecture = useCourses?.()?.confirmLecture;

  const completeLecture = async () => {
    if (!taskData) return;
    if (taskData.status === "completed") return;

    await confirmLecture?.(taskData.id);
  };

  const taskNavigation = useTaskNavigation();

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
            <div style={{ position: "relative" }}>
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
            </div>
          )}
          {taskData?.status === "completed" && taskNavigation.canGoForward && (
            <div style={{ position: "relative" }}>
              <motion.div
                className={styles.confirmBtnBg}
                style={{ opacity: btnBgOpacity }}
              />
              <IonButton onClick={()=>taskNavigation.handleNavigateLesson('forward')}>
                <IonIcon src={backIcon} style={{ rotate: "180deg" }} />
              </IonButton>
            </div>
          )}
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default TaskHeader;
