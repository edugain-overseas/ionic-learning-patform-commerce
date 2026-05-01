import { FC } from "react";
import { IonIcon } from "@ionic/react";
import coursesIcon from "../../assets/icons/homeStats/courses.svg";
import studentIcon from "../../assets/icons/homeStats/students.svg";
import scoreIcon from "../../assets/icons/homeStats/score.svg";
import styles from "./Test.module.scss";

const TIMER = 60;
const MIN_SCORE = 20;

type TestLandingPropsType = {
  timer?: number;
  passingScore?: number;
  attemptsLeft?: number;
  maxScore?: number;
};

const TestStat = ({
  icon,
  value,
  label,
  description,
}: {
  icon: string;
  value: number;
  label: string;
  description: string;
}) => {
  return (
    <div className={styles.landingStat}>
      <IonIcon src={icon} />
      <p>
        <span>{value ? value : null} </span>
        {label}
      </p>
      <p dangerouslySetInnerHTML={{ __html: description }}></p>
    </div>
  );
};

const TestLanding: FC<TestLandingPropsType> = ({
  timer = 0,
  passingScore = 0,
  attemptsLeft = 0,
  maxScore = 0,
}) => {
  console.log(timer, passingScore, attemptsLeft, maxScore);

  return (
    <div className={styles.landingWrapper}>
      <h3>Welcome to Your Assessment</h3>
      <p>
        This test will assess your knowledge based on the lecture material
        you've just studied. All questions are designed to reinforce and
        evaluate your understanding of key concepts.
      </p>
      <br />
      <br />
      <ul className={styles.landingStats}>
        <li>
          <TestStat
            icon={coursesIcon}
            value={passingScore}
            label="Points"
            description="<b>Points</b> for passing the Test"
          />
        </li>
        <li>
          <TestStat
            icon={studentIcon}
            value={timer}
            label="min"
            description="<b>Time</b> to pass the Test"
          />
        </li>
        <li>
          <TestStat
            icon={scoreIcon}
            value={attemptsLeft}
            label="attempts"
            description="<b>The best</b> result will be upheld"
          />
        </li>
        {!!maxScore && (
          <li>
            <TestStat
              icon={coursesIcon}
              value={maxScore}
              label="Points"
              description={"<b>Points</b> scored in best attempt"}
            />
          </li>
        )}
      </ul>
      <br />
      <br />
      <p>
        Please read each question carefully and answer to the best of your
        ability. Your results will help track your progress through the course.
      </p>
      <br />
      <br />
      <p>
        <b>Good luck!</b>
      </p>
    </div>
  );
};

export default TestLanding;
