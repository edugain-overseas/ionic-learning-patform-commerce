import { ReactNode } from "react";
import { Status } from "./ExamLanding";
import styles from "./CourseExamPage.module.scss";
import { ExamAttempt, ExamResult } from "./CourseExamPage";
import { IonIcon } from "@ionic/react";
import courseIcon from "../../../assets/icons/homeStats/courses.svg";
import studentIcon from "../../../assets/icons/homeStats/students.svg";
import scoreIcon from "../../../assets/icons/homeStats/score.svg";
import { useParams } from "react-router";
import { ExamDataType, useCourses } from "../../../context/CoursesContext";

type StatType =
  | "passing-score"
  | "exam-time"
  | "attempts-amount-left"
  | "course-score";

type StatsByStatusType = Record<ExamResult | "completed", StatType[]>;
type StatIconType = Record<StatType, string>;
type StatValueType = Record<StatType, ReactNode>;

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

const StatItem = ({
  stat,
  statValue,
}: {
  stat: StatType;
  statValue: StatValueType;
}) => {
  return (
    <div className={styles.statContainer}>
      <IonIcon src={StatIcon[stat]} />
      {statValue[stat]}
    </div>
  );
};

const ExamLandingStats = ({
  status,
  attempts,
}: {
  status: Status;
  attempts: ExamAttempt[];
}) => {
  const { courseId } = useParams<{ courseId: string }>();
  const course = useCourses()?.courses.find(
    (course) => course.id === +courseId
  );
  const exam = course?.lessons.find((lesson) => lesson.type === "exam");

  const examData = exam?.lessonData as ExamDataType;

  console.log(exam);
  console.log(course);

  const testsScore = course?.lessons.reduce((score, lesson) => {
    if (lesson.type === "test" && typeof lesson.score === "number") {
      return (score += lesson.score);
    }
    return score;
  }, 0);

  if (!status || !exam || !examData) return null;

  const statValue: StatValueType = {
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
        <span>{examData.attempts - attempts.length}</span> attempts
      </div>
    ),
    "course-score": (
      <div className={`${styles.statValueContainer} ${styles.scoreContainer}`}>
        <span>{testsScore}/</span>
        <div>
          <span>{200 - examData.score}</span>
          Points
        </div>
      </div>
    ),
  };

  console.log(StatsByStatus[status]);

  return (
    <div className={styles.statsWrapper}>
      <ul className={styles.statsGrid} style={{ fontSize: 20 }}>
        {StatsByStatus[status].map((stat) => (
          <li key={stat}>
            <StatItem stat={stat} statValue={statValue} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExamLandingStats;
