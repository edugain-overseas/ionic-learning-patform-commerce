import { FC, MouseEventHandler, useRef, useState } from "react";
import { IonIcon } from "@ionic/react";
import playIcon from "../../assets/icons/player/play.svg";
import pauseIcon from "../../assets/icons/player/pause.svg";
import skipMinusIcon from "../../assets/icons/player/skip-10-minus.svg";
import skipPlusIcon from "../../assets/icons/player/skip-10-plus.svg";
import fullscreenIcon from "../../assets/icons/player/fullscreen.svg";
import exitFullscreenIcon from "../../assets/icons/player/fullscreen-exit.svg";
import styles from "./VideoPlayer.module.scss";

const VideoPlayer: FC<{ url: string }> = ({ url }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false);
  const [showControls, setShowControls] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [currenTime, setCurrenTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  const handleLoadedData = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const togglePlayPause: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();

    if (videoRef.current?.paused) {
      videoRef.current.play();
    } else {
      videoRef.current?.pause();
    }
  };

  const toggleShowControls: MouseEventHandler<HTMLDivElement> = (e) => {
    setShowControls((prev) => !prev);
  };

  const skip = (duration: number) => {
    if (videoRef.current) videoRef.current.currentTime += duration;
  };

  return (
    <div className={styles.container} onClick={toggleShowControls}>
      <video
        src={url}
        className={styles.video}
        ref={videoRef}
        onPlay={() => setIsVideoPlaying(true)}
        onPause={() => setIsVideoPlaying(false)}
        onLoadedData={handleLoadedData}
      ></video>
      <div
        className={`${styles.controlsContainer} ${
          showControls ? styles.active : ""
        } ${!isVideoPlaying ? styles.fixed : ""}`}
      >
        <div className={styles.playbackControls}>
          <button
            className={styles.skipBtn}
            onClick={(e) => {
              e.stopPropagation();
              skip(-10);
            }}
          >
            <IonIcon src={skipMinusIcon} />
          </button>
          <button className={styles.playPauseBtn} onClick={togglePlayPause}>
            {isVideoPlaying ? (
              <IonIcon src={pauseIcon} className={styles.pauseIcon} />
            ) : (
              <IonIcon src={playIcon} className={styles.playIcon} />
            )}
          </button>
          <button
            className={styles.skipBtn}
            onClick={(e) => {
              e.stopPropagation();
              skip(10);
            }}
          >
            <IonIcon src={skipPlusIcon} />
          </button>
        </div>
        <div className={styles.bottomTools}>
          <div className={styles.timeline}>
            <div className={styles.track}></div>
          </div>
          <div className={styles.tools}>
            <div className={styles.duration}>{`${currenTime}/${duration}`}</div>
            <button className={styles.fullscreen}>
              <IonIcon
                src={isFullscreen ? exitFullscreenIcon : fullscreenIcon}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
