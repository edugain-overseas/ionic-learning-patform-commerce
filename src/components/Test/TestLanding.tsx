import { FC } from "react";
import styles from "./Test.module.scss";

const TIMER = 60;
const MIN_SCORE = 20;

const TestLanding: FC = () => {
  const welcomeText = `This test will assess your knowledge based on the lecture material you've just studied. All questions are designed to reinforce and evaluate your understanding of key concepts.
    </br>
    </br>
<b>🕒 Time Limit: ${TIMER} minutes</b>
    </br>
<b>🎯 Passing Score: ${MIN_SCORE}</b>
    </br>
    </br>
Please read each question carefully and answer to the best of your ability. Your results will help track your progress through the course.
    </br>
    </br>
<b>Good luck!</b>`;

  return (
    <div className={styles.landingWrapper}>
      <h3>Welcome to Your Assessment</h3>
      <p dangerouslySetInnerHTML={{ __html: welcomeText }}></p>
      
    </div>
  );
};

export default TestLanding;
