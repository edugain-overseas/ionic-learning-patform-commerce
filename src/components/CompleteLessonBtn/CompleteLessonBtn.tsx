import { useState } from "react";
import { IonButton, IonIcon } from "@ionic/react";
import { LessonStatus } from "../../context/CoursesContext";
import checkIcon from "../../assets/icons/check-in-circle.svg";
import CommonButton from "../CommonButton/CommonButton";
import Spinner from "../Spinner/Spinner";
import styles from "./CompleteLessonBtn.module.scss";

type CompleteLessonBtnPropsType = {
  variant?: "footer" | "header";
  status: LessonStatus;
  onClick?: () => Promise<void> | void;
};

const CompleteLessonBtn = ({
  variant = "footer",
  status,
  onClick,
}: CompleteLessonBtnPropsType) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleComplete = async () => {
    setIsLoading(true);
    try {
      await onClick?.();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (variant === "footer") {
    return status === "active" ? (
      <CommonButton
        block={true}
        backgroundColor="#39BA6D"
        color="#fcfcfc"
        label="Complete"
        icon={
          isLoading ? (
            <Spinner color="#fcfcfc" className={styles.footerSpinner} />
          ) : (
            <IonIcon src={checkIcon} />
          )
        }
        className={styles.footerCompleteBtn}
        onClick={handleComplete}
        height={32}
      />
    ) : null;
  }

  return (
    <IonButton
      className={`${styles.headerCompleteBtn} ${
        status !== "active" ? styles.disabled : ""
      }`}
      onClick={handleComplete}
      disabled={status !== "active"}
    >
      <IonIcon src={checkIcon} style={{ fontSize: "20rem" }} />
    </IonButton>
  );
};

export default CompleteLessonBtn;
