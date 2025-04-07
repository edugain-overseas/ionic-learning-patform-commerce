import React from "react";
import InfoBtn from "../InfoBtn/InfoBtn";
import CircleProgressBar from "../CircleProgressBar/CircleProgressBar";
import styles from "./CircleProgressCard.module.scss";

interface CircleProgressCardTypes {
  cardTitle: string;
  progressTitle?: string | React.ReactNode;
  strokeBackgroundColor?: string;
  progress?: number;
  strokeColor?: string;
  outerColor?: string;
  width?: number;
  strokeWidth?: number;
  infoText?: string;
}

const CircleProgressCard: React.FC<CircleProgressCardTypes> = ({
  cardTitle,
  progressTitle,
  strokeBackgroundColor = "#fafafa",
  progress,
  strokeColor,
  outerColor = "#f7f6f5",
  width,
  strokeWidth,
  infoText,
}) => {
  return (
    <div className={styles.wrapper}>
      <h4>{cardTitle}</h4>
      <div
        className={styles.progressOuter}
        style={{ backgroundColor: outerColor }}
      >
        <div className={styles.progress}>
          <CircleProgressBar
            strokeColor={strokeColor}
            progress={progress}
            width={width}
            strokeWidth={strokeWidth}
            backgroundColor={strokeBackgroundColor}
          />
        </div>
        <div className={styles.progressInner}>{progressTitle}</div>
      </div>
      <div className={styles.infoBtnWrapper}>
        <InfoBtn info={infoText || cardTitle} />
      </div>
    </div>
  );
};

export default CircleProgressCard;
