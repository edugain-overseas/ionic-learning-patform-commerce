import { FC, useState } from "react";
import { IonIcon } from "@ionic/react";
import { LessonType } from "../../context/CoursesContext";
import InsetBtn from "../InsetBtn/InsetBtn";
import CheckIcon from "../../assets/icons/check-in-circle.svg";
import Spinner from "../Spinner/Spinner";
import styles from "./LessonToolsPanel.module.scss";

type TestToolsProps = {
  test: LessonType;
  handleSubmitCurrentAttempt: () => Promise<void>;
  handleOpenAttemptsModal: () => void;
};

const TestTools: FC<TestToolsProps> = ({
  test,
  handleSubmitCurrentAttempt,
  handleOpenAttemptsModal,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitCurrentAttemptClick = async () => {
    setIsLoading(true);
    await handleSubmitCurrentAttempt();
    setIsLoading(false);
  };

  return (
    <div className={styles.toolsContainer}>
      <InsetBtn
        icon={
          isLoading ? <Spinner color="#fff" /> : <IonIcon src={CheckIcon} />
        }
        width="32rem"
        height="32rem"
        fontSize="14rem"
        buttonClassName={styles.submitAttemptBtn}
        backgroundColor="#39BA6D"
        buttonBackgroundColor="rgba(255, 255, 255, 0.65)"
        ripple={true}
        onClick={handleSubmitCurrentAttemptClick}
        disabled={test.status === "completed"}
      />
      {test.status !== "completed" && (
        <button
          className={styles.openAttemptsModalBtn}
          onClick={handleOpenAttemptsModal}
        >
          <span>Open Attempts</span>
        </button>
      )}
    </div>
  );
};

export default TestTools;
