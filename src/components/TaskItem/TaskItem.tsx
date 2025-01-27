import { FC } from "react";
import { LessonType } from "../../context/CoursesContext";
import { IonIcon, IonItem } from "@ionic/react";
import { serverName } from "../../http/server";
import TaskTypeIcon from "../../assets/icons/task-progress.svg";
import StatusIcon from "../../assets/icons/check-in-circle.svg";
import TimeIcon from "../../assets/icons/clock.svg";
import QuestonIcon from "../../assets/icons/document-question.svg";
import styles from "./TaskItem.module.scss";
import { useListStyle } from "../../context/ListStyleContext";

interface TaskItemType {
  task: LessonType;
}



const TaskItem: FC<TaskItemType> = ({ task }) => {
  const listStyle = useListStyle()?.listStyle;
  console.log(task);

  const Type = () => (
    <div className={styles.taskProp}>
      <IonIcon src={TaskTypeIcon} className={styles.taskPropIcon} />
      <span
        className={styles.taskPropText}
      >{`Type of activity: ${task.type}`}</span>
    </div>
  );

  const Status = () => (
    <div className={styles.taskProp}>
      <IonIcon src={StatusIcon} className={styles.taskPropIcon} />
      <span className={`${styles.taskPropText}`}>
        Status:{` `}
        <span
          className={`${styles.statusPropValue} ${
            task.status ? styles[task.status] : ""
          }`}
        >
          {task.status}
        </span>
      </span>
    </div>
  );

  const ScheduledTime = () => (
    <div className={styles.taskProp}>
      <IonIcon src={TimeIcon} className={styles.taskPropIcon} />
      <span
        className={styles.taskPropText}
      >{`Scheduled time: ${task.scheduled_time} min`}</span>
    </div>
  );

  const QuestionAmount = () => (
    <div className={styles.taskProp}>
      <IonIcon src={QuestonIcon} className={styles.taskPropIcon} />
      <span
        className={styles.taskPropText}
      >{`Questions: ${task.count_questions}`}</span>
    </div>
  );

  return (
    <IonItem
      routerLink={
        task.status !== "blocked"
          ? `/courses/course/${task.course_id}/tasks/${task.id}`
          : undefined
      }
      routerDirection="forward"
      button
      detail={false}
      lines="none"
      className={`${styles.wrapper} ${
        task.status === "completed" ? styles.completed : ""
      } ${listStyle === "row" ? styles.row : ""}`}
    >
      {listStyle === "card" && (
        <img
          src={`${serverName}/${task.image_path}`}
          alt={task.title}
          className={styles.taskPoster}
        />
      )}
      <div className={styles.taskInfo}>
        <div className={styles.taskTitle}>
          <span title={task.title}>{task.title}</span>
        </div>
        <div className={styles.taskProps}>
          {listStyle === "row" ? (
            <>
              {task.status === "completed" || task.status === "active" ? (
                <Status />
              ) : (
                <Type />
              )}
              <ScheduledTime />
              {task.type === "test" && <QuestionAmount />}
            </>
          ) : (
            <>
              <Type />
              {task.status === "active" || task.status === "completed" ? (
                <Status />
              ) : (
                <>
                  <ScheduledTime />
                  {task.type === "test" && <QuestionAmount />}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </IonItem>
  );
};

export default TaskItem;
