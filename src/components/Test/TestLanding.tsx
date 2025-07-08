import { FC } from "react";
import styles from "./Test.module.scss";
import CountUp from "react-countup";

const TIMER = 60;
const MIN_SCORE = 20;

type TestLandingPropsType = {
  timer?: number;
  minScore?: number;
};

const TestLanding: FC<TestLandingPropsType> = ({ timer = 0, minScore = 0 }) => {
  return (
    <div className={styles.landingWrapper}>
      <h3>Welcome to Your Assessment</h3>
      <p>
        This test will assess your knowledge based on the lecture material
        you've just studied. All questions are designed to reinforce and
        evaluate your understanding of key concepts.
        <br />
        <br />
        <b>
          🕒 Time Limit:{" "}
          <CountUp
            end={timer}
            duration={1.5}
            style={{ minWidth: "2ch", display: "inline-block" }}
          />{" "}
          minutes
        </b>
        <br />
        <b>
          🎯 Passing Score:{" "}
          <CountUp
            end={minScore}
            duration={1.5}
            style={{ minWidth: "2ch", display: "inline-block" }}
          />
        </b>
        <br />
        <br />
        Please read each question carefully and answer to the best of your
        ability. Your results will help track your progress through the course.
        <br />
        <br />
        <b>Good luck!</b>
      </p>
    </div>
  );
};

export default TestLanding;
