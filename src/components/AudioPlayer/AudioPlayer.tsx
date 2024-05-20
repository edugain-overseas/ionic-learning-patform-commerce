import { AudioHTMLAttributes, FC, useRef, useState } from "react";
import PlayPauseBtn from "./PlayPauseBtn";
import Timeline from "./Timeline";
import Duration from "./Duration";
import Rate from "./Rate";
import styles from "./AudioPlayer.module.scss";

interface AudioPlayerProps extends AudioHTMLAttributes<HTMLAudioElement> {}

const AudioPlayer: FC<AudioPlayerProps> = ({ ...props }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [rate, setRate] = useState<number>(1);

  const handleLoadedData = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleTimeUpdate = () => {
    const audioCurrentTime = audioRef.current?.currentTime;
    const audioDuration = audioRef.current?.duration;
    if (audioCurrentTime) {
      setCurrentTime(audioCurrentTime);

      if (audioDuration) {
        const percent = audioCurrentTime / audioDuration;

        containerRef.current?.style.setProperty(
          "--current-progress",
          `${percent}`
        );
      }
    }
  };

  const handleRateChange = () => {
    if (audioRef.current) {
      setRate(audioRef.current.playbackRate);
    }
  };

  return (
    <div className={styles.container} ref={containerRef}>
      <audio
        ref={audioRef}
        {...props}
        onTimeUpdate={handleTimeUpdate}
        onLoadedData={handleLoadedData}
        onRateChange={handleRateChange}
      />
      <div className={styles.player}>
        <PlayPauseBtn audioRef={audioRef.current} />
        <div className={styles.timeContainer}>
          <Timeline
            audioRef={audioRef.current}
            containerRef={containerRef.current}
          />
          <Duration currentTime={currentTime} duration={duration} />
        </div>
        <Rate rate={rate} audioRef={audioRef.current} />
      </div>
    </div>
  );
};

export default AudioPlayer;
