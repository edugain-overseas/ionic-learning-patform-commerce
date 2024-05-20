import { FC } from "react";
import { formatDuration } from "../../utils/formatDuration";
import styles from "./AudioPlayer.module.scss";

type DurationProps = {
  currentTime: number;
  duration: number;
};

const Duration: FC<DurationProps> = ({ currentTime, duration }) => {
  return (
    <div className={styles.duration}>
      {`${formatDuration(currentTime)} / ${formatDuration(duration)}`}
    </div>
  );
};

export default Duration;
