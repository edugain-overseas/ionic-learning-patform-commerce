import { FC } from "react";
import styles from "./UserProfile.module.scss";
import CircleProgressCard from "../../components/CircleProgressCard/CircleProgressCard";
import { UserType } from "../../types/user";
import InfoBtn from "../../components/InfoBtn/InfoBtn";
import { letterGrade } from "../../utils/letterGrade";

// const mockedAvarage = 172;
// const mockedProgress = 75;

// const gradeDescription =
//   "This statistic shows the average grade of all the courses you have completed. It is calculated based on your final scores across all completed courses, giving you an overview of your overall learning performance.";
// const progressDescription =
//   "This statistic represents the total progress across all the courses you have purchased. It sums up your progress in each course, giving you an overview of how much you have completed in your learning journey.";

const UserStatistics: FC<{ userData?: UserType }> = ({ userData }) => {
  const isUserStatisticAvailable = userData?.username;

  const userCourses = userData?.courses || [];

  const userAvarageScore = userCourses.length
    ? Math.round(
        userCourses.reduce((sum, course) => {
          return sum + course.grade;
        }, 0) / userCourses.length,
      )
    : undefined;

  const userTotalProgress = userCourses.length
    ? Math.round(
        userCourses.reduce((sum, course) => {
          return sum + course.progress;
        }, 0) / userCourses.length,
      )
    : undefined;

  return (
    <div className={styles.progressData}>
      <h3 className={styles.sectionHeader}>Your progress</h3>
      <div className={styles.infoBtnWrapper}>
        <InfoBtn info="The average score is calculated based on all courses you have completed" />
      </div>
      <div className={styles.graphStats}>
        <div>
          <CircleProgressCard
            cardTitle="Grade Point Average"
            width={124}
            progress={
              isUserStatisticAvailable && userAvarageScore
                ? userAvarageScore * 0.5
                : 0.1
            }
            strokeWidth={8}
            strokeColor={isUserStatisticAvailable ? "#FCC400" : "#BDC4D2"}
            progressTitle={
              <div className={styles.progressContent}>
                <span className={styles.label}>Average</span>
                <span className={styles.value}>
                  {isUserStatisticAvailable && userAvarageScore
                    ? `${userAvarageScore}(${letterGrade(userAvarageScore)})`
                    : "0(*)"}
                </span>
              </div>
            }
          />
        </div>
        <div>
          <CircleProgressCard
            cardTitle="Your progress"
            width={124}
            progress={
              isUserStatisticAvailable && userTotalProgress
                ? userTotalProgress
                : 0.1
            }
            strokeWidth={8}
            strokeColor={isUserStatisticAvailable ? "#39ba6d" : "#BDC4D2"}
            progressTitle={
              <div className={styles.progressContent}>
                <span className={styles.label}>Completed</span>
                <span className={styles.value}>{`${
                  isUserStatisticAvailable && userTotalProgress
                    ? userTotalProgress
                    : 0
                }%`}</span>
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default UserStatistics;
