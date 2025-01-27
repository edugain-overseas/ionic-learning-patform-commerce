import { FC } from "react";
import { IonIcon } from "@ionic/react";
import ArrowIcon from "../../assets/icons/header/back.svg";
import styles from "./TaskFooterNavBtn.module.scss";
import { useTaskNavigation } from "../../hooks/useTasksNavigation";
import Spinner from "../Spinner/Spinner";

type TaskFooterNavBtnProps = {
  direction: "return" | "next";
  type?: "lecture" | "test";
};

const TaskFooterNavBtn: FC<TaskFooterNavBtnProps> = ({
  direction,
  type = "test",
}) => {
  const { canGoBack, canGoForward, isLoading, handleNavigateLesson } =
    useTaskNavigation();

  const isDisabled = direction === "next" ? !canGoForward : !canGoBack;

  // console.log(direction, canGoBack, canGoForward);

  return (
    <button
      className={`${styles.navButton} ${styles[direction]}`}
      disabled={type === "lecture" ? false : isDisabled}
      onClick={() =>
        handleNavigateLesson(direction === "return" ? "back" : "forward")
      }
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <IonIcon src={ArrowIcon} className={styles.icon} />
          <span className={styles.label}>{direction}</span>
        </>
      )}
    </button>
  );
};

export default TaskFooterNavBtn;
