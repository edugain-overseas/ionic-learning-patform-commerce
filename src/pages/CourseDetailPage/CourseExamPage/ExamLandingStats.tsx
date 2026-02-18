import { ReactNode } from "react";
import { IonIcon } from "@ionic/react";
import { Status } from "./ExamLanding";
import { ExamAttempt, ExamResult } from "./CourseExamPage";
import { useParams } from "react-router";
import { useExamLandidngStats } from "../../../hooks/useExamLandindgStats";
import { letterGrade } from "../../../utils/letterGrade";
import courseIcon from "../../../assets/icons/homeStats/courses.svg";
import studentIcon from "../../../assets/icons/homeStats/students.svg";
import scoreIcon from "../../../assets/icons/homeStats/score.svg";
import styles from "./ExamLandingStats.module.scss";

type StatType =
  | "passing-score"
  | "exam-time"
  | "attempts-amount-left"
  | "course-score"
  | "point-scored"
  | "time-spent"
  | "final-score";

type StatsByStatusType = Record<ExamResult | "completed", StatType[]>;
type StatIconType = Record<StatType, string>;
type StatValueType = Record<StatType, ReactNode>;

const STATS_BY_STATUS: StatsByStatusType = {
  no_result: [
    "passing-score",
    "exam-time",
    "attempts-amount-left",
    "course-score",
  ],
  acceptable: ["point-scored", "time-spent", "final-score"],
  absolute: ["point-scored", "time-spent", "final-score"],
  failed: ["point-scored", "time-spent", "final-score"],
  completed: ["point-scored", "time-spent", "final-score"],
};

const STAT_ICONS: StatIconType = {
  "passing-score": courseIcon,
  "exam-time": studentIcon,
  "attempts-amount-left": scoreIcon,
  "course-score": courseIcon,
  "point-scored": courseIcon,
  "time-spent": studentIcon,
  "final-score": courseIcon,
};

const STAT_LABEL: StatValueType = {
  "passing-score": (
    <span className={styles.statLabel}>
      <b>Points</b> for passing the Exam
    </span>
  ),
  "exam-time": (
    <span className={styles.statLabel}>
      <b>Time</b> to pass the Exam
    </span>
  ),
  "attempts-amount-left": (
    <span className={styles.statLabel}>
      <b>The best</b> result will be upheld
    </span>
  ),
  "course-score": (
    <span className={styles.statLabel}>
      <b>Scores</b> in tests
    </span>
  ),
  "point-scored": (
    <span className={styles.statLabel}>
      <b>Points</b> scored
    </span>
  ),
  "time-spent": (
    <span className={styles.statLabel}>
      <b>Time</b> spent on completion
    </span>
  ),
  "final-score": (
    <span className={styles.statLabel}>
      <b>Your</b> final score
    </span>
  ),
};

const COURSE_MAX_SCORE = 200;

const ExamLandingStats = ({
  status,
  attempts,
}: {
  status: Status;
  attempts: ExamAttempt[];
}) => {
  const { courseId } = useParams<{ courseId: string }>();

  const { course, exam, examData, testsScore, attemptsLeft, bestAttempt } =
    useExamLandidngStats({
      courseId: +courseId,
      examAttempts: attempts,
    });

  if (!status || !exam || !examData) return null;

  const STAT_VALUES: StatValueType = {
    "passing-score": (
      <div className={styles.statValueContainer}>
        <span>{examData.score}</span> Points
      </div>
    ),
    "exam-time": (
      <div className={styles.statValueContainer}>
        <span>{examData.timer}</span> min
      </div>
    ),
    "attempts-amount-left": (
      <div className={styles.statValueContainer}>
        <span>{attemptsLeft}</span> attempts
      </div>
    ),
    "course-score": (
      <div className={`${styles.statValueContainer} ${styles.scoreContainer}`}>
        <span>{testsScore}/</span>
        <div>
          <span>{Math.max(0, COURSE_MAX_SCORE - examData.score)}</span>
          Points
        </div>
      </div>
    ),
    "point-scored": (
      <div className={`${styles.statValueContainer} ${styles.scoreContainer}`}>
        <span>{bestAttempt?.attempt_score}/</span>
        <div>
          <span>{examData.score}</span>
          Points
        </div>
      </div>
    ),
    "time-spent": (
      <div className={`${styles.statValueContainer} ${styles.scoreContainer}`}>
        <span>{bestAttempt?.spent_minutes}/</span>
        <div>
          <span>{examData.timer}</span>
          min
        </div>
      </div>
    ),
    "final-score": (
      <div className={styles.statValueContainer}>
        <span>{`${bestAttempt?.attempt_score + testsScore}(${letterGrade(
          bestAttempt?.attempt_score + testsScore
        )})`}</span>
      </div>
    ),
  };
  
  return (
    <div className={styles.statsWrapper}>
      <ul className={styles.statsGrid} style={{ fontSize: 20 }}>
        {STATS_BY_STATUS[status].map((stat) => (
          <li key={stat}>
            <div className={styles.statContainer}>
              <IonIcon src={STAT_ICONS[stat]} className={styles.statIcon} />
              {STAT_VALUES[stat]}
              {STAT_LABEL[stat]}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExamLandingStats;
