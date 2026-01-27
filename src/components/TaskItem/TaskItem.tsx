import { FC } from "react";
import { LessonType, useCourses } from "../../context/CoursesContext";
import { IonIcon, IonItem } from "@ionic/react";
import { useListStyle } from "../../context/ListStyleContext";
import { useProtectedNavigation } from "../../hooks/useProtectedNavigation";
import { serverName } from "../../http/server";
import TaskTypeIcon from "../../assets/icons/task-progress.svg";
import StatusIcon from "../../assets/icons/check-in-circle.svg";
import TimeIcon from "../../assets/icons/clock.svg";
import QuestonIcon from "../../assets/icons/document-question.svg";
import styles from "./TaskItem.module.scss";

interface TaskItemType {
  task: LessonType;
}

const TaskItem: FC<TaskItemType> = ({ task }) => {
  const listStyle = useListStyle()?.listStyle;
  const protectedNavigate = useProtectedNavigation();

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

  const taskLink =
    task.type === "exam"
      ? `/course/${task.course_id}/exam`
      : `/course/${task.course_id}/tasks/${task.id}`;

  const isCoursePurchased = useCourses()?.courses.find(
    (course) => course.id === task.course_id
  )?.bought;

  const isNavigationAllowed = !!(
    isCoursePurchased && task.status !== "blocked"
  );

  const handleItemClick = () => {
    protectedNavigate(
      isNavigationAllowed,
      taskLink,
      "You can not access this lesson becouse it is blocked"
    );
  };

  return (
    <IonItem
      button
      detail={false}
      lines="none"
      className={`${styles.wrapper} ${
        task.status === "completed" ? styles.completed : ""
      } ${listStyle === "row" ? styles.row : ""}`}
      onClick={handleItemClick}
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
