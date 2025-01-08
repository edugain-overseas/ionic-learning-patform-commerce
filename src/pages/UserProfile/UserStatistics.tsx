import { FC } from "react";
import { UserType } from "../../context/UserContext";
import styles from "./UserProfile.module.scss";
import CircleProgressCard from "../../components/CircleProgressCard/CircleProgressCard";

const UserStatistics: FC<{ userData?: UserType }> = ({ userData }) => {
  const mockedAvarage = 172;
  const mockedProgress = 75;

  const isUserStatisticAvailable = userData?.username;

  return (
    <div className={styles.progressData}>
      <div className={styles.gradeWrapper}>
        <CircleProgressCard
          cardTitle="Grade Point Average"
          width={90}
          progress={isUserStatisticAvailable ? mockedAvarage * 0.5 : 0.1}
          strokeWidth={4}
          strokeColor={isUserStatisticAvailable ? "#FCC400" : "#BDC4D2"}
          progressTitle={
            <div className={styles.progressContent}>
              <span className={styles.label}>Average</span>
              <span className={styles.value}>
                {isUserStatisticAvailable ? `${mockedAvarage}(B)` : "0(*)"}
              </span>
            </div>
          }
        />
      </div>
      <div className={styles.progressWrapper}>
        <CircleProgressCard
          cardTitle="Your progress"
          width={90}
          progress={isUserStatisticAvailable ? mockedProgress : 0.1}
          strokeWidth={4}
          strokeColor={isUserStatisticAvailable ? "#39ba6d" : "#BDC4D2"}
          progressTitle={
            <div className={styles.progressContent}>
              <span className={styles.label}>Completed</span>
              <span className={styles.value}>{`${
                isUserStatisticAvailable ? mockedProgress : 0
              }%`}</span>
            </div>
          }
        />
      </div>
    </div>
  );
};

export default UserStatistics;
