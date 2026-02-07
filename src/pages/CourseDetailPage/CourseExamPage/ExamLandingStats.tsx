import React, { ReactNode } from "react";
import { Status } from "./ExamLanding";
import styles from "./CourseExamPage.module.scss";
import { ExamResult } from "./CourseExamPage";
import { IonIcon } from "@ionic/react";
import courseIcon from "../../../assets/icons/homeStats/courses.svg";
import studentIcon from "../../../assets/icons/homeStats/students.svg";
import scoreIcon from "../../../assets/icons/homeStats/score.svg";

type StatType =
  | "passing-score"
  | "exam-time"
  | "attempts-amount-left"
  | "course-score";

type StatsByStatusType = Record<ExamResult | "completed", StatType[]>;
type StatIconType = Record<StatType, string>;

const StatsByStatus: StatsByStatusType = {
  no_result: [
    "passing-score",
    "exam-time",
    "attempts-amount-left",
    "course-score",
  ],
  acceptable: [],
  absolute: [],
  failed: [],
  completed: [],
};

const StatIcon: StatIconType = {
  "passing-score": courseIcon,
  "exam-time": studentIcon,
  "attempts-amount-left": scoreIcon,
  "course-score": studentIcon,
};

const StatItem = ({ stat }: { stat: StatType }) => {
  return (
    <div className={styles.statContainer}>
      <IonIcon src={StatIcon[stat]} />
    </div>
  );
};

const ExamLandingStats = ({ status }: { status: Status }) => {
  // const exam =
  if (!status) return null;
  console.log(StatsByStatus[status]);

  return (
    <div className={styles.statsWrapper}>
      <ul className={styles.statsGrid}>
        {StatsByStatus[status].map((stat) => (
          <li key={stat}>
            <StatItem stat={stat} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExamLandingStats;
