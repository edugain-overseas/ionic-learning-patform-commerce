import React from "react";
import { LessonType } from "../../context/CoursesContext";
import { IonIcon, IonItem } from "@ionic/react";
import { serverName } from "../../http/server";
import TaskTypeIcon from "../../assets/icons/task-progress.svg";
import StatusIcon from "../../assets/icons/check-in-circle.svg";
import TimeIcon from "../../assets/icons/clock.svg";
import QuestonIcon from "../../assets/icons/document-question.svg";
import styles from "./TaskItem.module.scss";

interface TaskItemType {
  task: LessonType;
}

const TaskItem: React.FC<TaskItemType> = ({ task }) => {
  console.log(task);

  return (
    <IonItem
      routerLink={task.status !== "blocked" ? "/" : undefined}
      routerDirection="forward"
      button
      detail={false}
      lines="none"
      className={`${styles.wrapper} ${
        task.status === "completed" ? styles.completed : ""
      }`}
    >
      <img
        src={`${serverName}/${task.image_path}`}
        alt={task.title}
        className={styles.taskPoster}
      />
      <div className={styles.taskInfo}>
        <div className={styles.taskTitle}>
          <span title={task.title}>{task.title}</span>
        </div>
        <div className={styles.taskProps}>
          <div className={styles.taskProp}>
            <IonIcon src={TaskTypeIcon} className={styles.taskPropIcon} />
            <span
              className={styles.taskPropText}
            >{`Type of activity: ${task.type}`}</span>
          </div>
          {task.status === "active" || task.status === "completed" ? (
            <div className={styles.taskProp}>
              <IonIcon src={StatusIcon} className={styles.taskPropIcon} />
              <span className={`${styles.taskPropText}`}>
                Status:{` `}
                <span
                  className={`${styles.statusPropValue} ${styles[task.status]}`}
                >
                  {task.status}
                </span>
              </span>
            </div>
          ) : (
            <>
              <div className={styles.taskProp}>
                <IonIcon src={TimeIcon} className={styles.taskPropIcon} />
                <span
                  className={styles.taskPropText}
                >{`Scheduled time: ${task.scheduled_time} min`}</span>
              </div>
              {task.type === "test" && (
                <div className={styles.taskProp}>
                  <IonIcon src={QuestonIcon} className={styles.taskPropIcon} />
                  <span className={styles.taskPropText}>{`Questions: ${
                    task.question_amount || 8
                  }`}</span>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </IonItem>
  );
};

export default TaskItem;
