import { FC } from "react";
import styles from "./UserProfile.module.scss";
import CircleProgressCard from "../../components/CircleProgressCard/CircleProgressCard";
import { UserType } from "../../types/user";

const mockedAvarage = 172;
const mockedProgress = 75;

const gradeDescription =
  "This statistic shows the average grade of all the courses you have completed. It is calculated based on your final scores across all completed courses, giving you an overview of your overall learning performance.";
const progressDescription =
  "This statistic represents the total progress across all the courses you have purchased. It sums up your progress in each course, giving you an overview of how much you have completed in your learning journey.";

const UserStatistics: FC<{ userData?: UserType }> = ({ userData }) => {
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
          infoText={gradeDescription}
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
          infoText={progressDescription}
        />
      </div>
    </div>
  );
};

export default UserStatistics;
