import { FC } from "react";
import { IonIcon } from "@ionic/react";
import InsetBtn from "../InsetBtn/InsetBtn";
import playIcon from "../../assets/icons/player/play.svg";
import pauseIcon from "../../assets/icons/player/pause.svg";
import styles from "./AudioPlayer.module.scss";

type PlayPauseBtnProps = {
  audioRef: HTMLAudioElement | null;
};

const PlayPauseBtn: FC<PlayPauseBtnProps> = ({ audioRef }) => {
  const handleTogglePlay = () => {
    if (!audioRef?.paused) {
      audioRef?.pause();
    } else {
      audioRef.play();
    }
  };
  return (
    <InsetBtn
      icon={
        <IonIcon
          src={audioRef?.paused ? playIcon : pauseIcon}
          className={styles.playPauseIcon}
        />
      }
      width="32rem"
      height="32rem"
      onClick={handleTogglePlay}
    />
  );
};

export default PlayPauseBtn;
