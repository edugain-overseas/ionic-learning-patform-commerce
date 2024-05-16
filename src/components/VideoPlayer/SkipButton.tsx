import { FC, MouseEventHandler, Ref } from "react";
import { IonIcon } from "@ionic/react";
import skipMinusIcon from "../../assets/icons/player/skip-10-minus.svg";
import skipPlusIcon from "../../assets/icons/player/skip-10-plus.svg";
import styles from "./VideoPlayer.module.scss";

type SkipButtonType = {
  skipValue: number;
  videoRef: HTMLVideoElement | null;
};

const SkipButton: FC<SkipButtonType> = ({ skipValue, videoRef }) => {
  const skip: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    if (videoRef) videoRef.currentTime += skipValue;
  };

  return (
    <button className={styles.skipBtn} onClick={skip}>
      <IonIcon src={skipValue < 0 ? skipMinusIcon : skipPlusIcon} />
    </button>
  );
};

export default SkipButton;
