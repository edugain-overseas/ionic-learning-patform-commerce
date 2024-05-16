import { FC, MouseEventHandler } from "react";
import { IonIcon } from "@ionic/react";
import fullscreenIcon from "../../assets/icons/player/fullscreen.svg";
import exitFullscreenIcon from "../../assets/icons/player/fullscreen-exit.svg";
import styles from "./VideoPlayer.module.scss";

type FullScreenBtnType = {
  containerRef: HTMLDivElement | null;
};

const FullScreenBtn: FC<FullScreenBtnType> = ({ containerRef }) => {
  const handleToogleFullscreen: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    if (document.fullscreenElement === null) {
      containerRef?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };
  return (
    <button className={styles.fullscreen} onClick={handleToogleFullscreen}>
      <IonIcon
        src={
          document.fullscreenElement === null
            ? fullscreenIcon
            : exitFullscreenIcon
        }
      />
    </button>
  );
};

export default FullScreenBtn;
