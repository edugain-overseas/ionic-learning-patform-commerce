import { FC } from "react";
import { formatDuration } from "../../utils/formatDuration";
import styles from "./VideoPlayer.module.scss";

type DurationType = {
  duration: number;
  currentTime: number | string;
};

const Duration: FC<DurationType> = ({ duration, currentTime }) => {
  return (
    <div className={styles.duration}>{`
  ${currentTime}/${formatDuration(duration)}
    `}</div>
  );
};

export default Duration;
