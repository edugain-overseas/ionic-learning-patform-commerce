import { FC } from "react";
import { formatDuration } from "../../utils/formatDuration";
import styles from "./TestTimer.module.scss";

const TestTimer: FC<{ time: number }> = ({ time }) => {
  return (
    <div className={styles.wrapper}>
      <span>{"Time: " + formatDuration(time)}</span>
    </div>
  );
};

export default TestTimer;
