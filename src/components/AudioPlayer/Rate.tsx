import { FC } from "react";
import styles from "./AudioPlayer.module.scss";

type RateProps = {
  rate: number;
  audioRef: HTMLAudioElement | null;
};

const Rate: FC<RateProps> = ({ rate, audioRef }) => {
  const handleChangeRate = () => {
    if (audioRef) {
      const rate = audioRef?.playbackRate;
      if (rate === 2) {
        audioRef.playbackRate = 0.25;
      } else {
        audioRef.playbackRate += 0.25;
      }
    }
  };

  return (
    <button className={styles.rate} onClick={handleChangeRate}>
      {rate}x
    </button>
  );
};

export default Rate;
