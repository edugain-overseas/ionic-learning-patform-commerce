import { IonAlert } from "@ionic/react";
import CommonButton from "../CommonButton/CommonButton";
import styles from "./Test.module.scss";

const ManualClearAttemptsButton = ({
  handleClear,
}: {
  handleClear: () => Promise<void>;
}) => {
  return (
    <>
      <CommonButton
        label="Retake"
        id="manual-clear-attempts"
        block={true}
        height={32}
        backgroundColor="transparent"
        color="var(--ion-color-dark)"
        border="1rem solid var(--ion-color-dark)"
        borderRadius={5}
        className={styles.landingBtn}
      />
      <IonAlert
        trigger="manual-clear-attempts"
        header="You've run out of attempts"
        message="Are you sure you want to clear all previous attempts? This action
          cannot be undone."
        className={`${styles.alert} ${styles.customAlert}`}
        buttons={[
          {
            role: "confirm",
            text: "Yes",
            handler: handleClear,
          },
          {
            role: "cancel",
            text: "Cancel",
          },
        ]}
      />
    </>
  );
};

export default ManualClearAttemptsButton;
