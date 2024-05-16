import { FC, MouseEventHandler } from "react";
import { IonIcon } from "@ionic/react";
import playIcon from "../../assets/icons/player/play.svg";
import pauseIcon from "../../assets/icons/player/pause.svg";
import styles from "./VideoPlayer.module.scss";

type PlayPauseBtnType = {
  videoRef: HTMLVideoElement | null;
};

const PlayPauseBtn: FC<PlayPauseBtnType> = ({ videoRef }) => {
  const togglePlayPause: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    if (videoRef?.paused) {
      videoRef.play();
    } else {
      videoRef?.pause();
    }
  };

  return (
    <button className={styles.playPauseBtn} onClick={togglePlayPause}>
      {videoRef?.paused ? (
        <IonIcon src={playIcon} className={styles.playIcon} />
      ) : (
        <IonIcon src={pauseIcon} className={styles.pauseIcon} />
      )}
    </button>
  );
};

export default PlayPauseBtn;
