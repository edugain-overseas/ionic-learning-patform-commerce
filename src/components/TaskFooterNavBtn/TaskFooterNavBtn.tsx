import { FC } from "react";
import { IonIcon } from "@ionic/react";
import ArrowIcon from "../../assets/icons/header/back.svg";
import styles from "./TaskFooterNavBtn.module.scss";
import { useTaskNavigation } from "../../hooks/useTasksNavigation";
import Spinner from "../Spinner/Spinner";

type TaskFooterNavBtnProps = {
  direction: "return" | "next";
};

const TaskFooterNavBtn: FC<TaskFooterNavBtnProps> = ({ direction }) => {
  const { canGoBack, canGoForward, isLoading, handleNavigateLesson } =
    useTaskNavigation();

  const isDisabled = direction === "next" ? !canGoForward : !canGoBack;

  return (
    <button
      className={`${styles.navButton} ${styles[direction]}`}
      disabled={isDisabled}
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
