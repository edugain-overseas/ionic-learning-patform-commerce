import { FC, MouseEventHandler, useRef } from "react";
import styles from "./AudioPlayer.module.scss";

type TimelineType = {
  audioRef: HTMLAudioElement | null;
  containerRef: HTMLDivElement | null;
};

const Timeline: FC<TimelineType> = ({ audioRef, containerRef }) => {
  const timelineRef = useRef<HTMLDivElement>(null);

  const handleTimelineClick: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    const rect = timelineRef.current?.getBoundingClientRect();
    if (rect) {
      const targetPosition =
        Math.min(Math.max(0, e.nativeEvent.x - rect.x), rect.width) /
        rect.width;
      if (audioRef) {
        audioRef.currentTime = audioRef.duration * targetPosition;
      }
      containerRef?.style.setProperty(
        "--current-progress",
        `${targetPosition}`
      );
    }
  };

  return (
    <div
      ref={timelineRef}
      className={styles.timeline}
      onClick={handleTimelineClick}
    ></div>
  );
};

export default Timeline;
