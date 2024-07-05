import { FC, useRef, useState } from "react";
import styles from "./VideoPlayer.module.scss";
import { formatDuration } from "../../utils/formatDuration";
import SkipButton from "./SkipButton";
import PlayPauseBtn from "./PlayPauseBtn";
import Timeline from "./Timeline";
import Duration from "./Duration";
import FullScreenBtn from "./FullScreenBtn";

const VideoPlayer: FC<{ url: string }> = ({ url }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false);
  const [showControls, setShowControls] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number | string>(0);
  const [duration, setDuration] = useState<number>(0);
  // const [poster, setPoster] = useState<string>("");

  // const captureFirstFrame = (video: HTMLVideoElement) => {
  //   const canvas = document.createElement("canvas");
  //   canvas.width = video.videoWidth;
  //   canvas.height = video.videoHeight;
  //   const ctx = canvas.getContext("2d");
  //   if (ctx) {
  //     ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  //     const dataURL = canvas.toDataURL("image/png");
  //     setPoster(dataURL);
  //   }
  // };

  const handleLoadedData = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  // const handleCanPlay = () => {
    
    
  //   if (videoRef.current) {
  //     captureFirstFrame(videoRef.current);
  //   }
  // };

  const toggleShowControls = () => {
    setShowControls((prev) => !prev);
  };

  const handleTimeUpdate = () => {
    const videoCurrentTime = videoRef.current?.currentTime;

    const videoDuration = videoRef.current?.duration;
    if (videoCurrentTime) {
      setCurrentTime(formatDuration(videoCurrentTime));

      if (videoDuration) {
        const percent = videoCurrentTime / videoDuration;

        containerRef.current?.style.setProperty(
          "--current-progress",
          `${percent}`
        );
      }
    }
  };

  return (
    <div
      className={styles.container}
      onClick={toggleShowControls}
      ref={containerRef}
    >
      <video
        src={url}
        className={styles.video}
        ref={videoRef}
        onPlay={() => setIsVideoPlaying(true)}
        onPause={() => setIsVideoPlaying(false)}
        onLoadedData={handleLoadedData}
        // onCanPlay={handleCanPlay}
        onTimeUpdate={handleTimeUpdate}
      ></video>
      <div
        className={`${styles.controlsContainer} ${
          showControls ? styles.active : ""
        } ${!isVideoPlaying ? styles.fixed : ""}`}
      >
        <div className={styles.playbackControls}>
          <SkipButton videoRef={videoRef.current} skipValue={-10} />
          <PlayPauseBtn videoRef={videoRef.current} />
          <SkipButton videoRef={videoRef.current} skipValue={10} />
        </div>
        <div className={styles.bottomTools}>
          <Timeline
            videoRef={videoRef.current}
            containerRef={containerRef.current}
          />
          <div className={styles.tools}>
            <Duration duration={duration} currentTime={currentTime} />
            <FullScreenBtn containerRef={containerRef.current} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
