import { FC, useEffect, useRef } from "react";
import styles from "./HomeHero.module.scss";
import OuterRotationCircle from "./OuterRotationCircle";
import InnerRotationCircle from "./InnerRotationCircle";
import { useIonViewDidLeave } from "@ionic/react";

const HomeHero: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useIonViewDidLeave(() => {
    if (containerRef.current) {
      containerRef.current.classList.remove(styles.animated);
    }
  });

  return (
    <div
      className={`${styles.outerWrapper} ${styles.animated}`}
      ref={containerRef}
    >
      <OuterRotationCircle />
      <div className={styles.innerWrapper}>
        <InnerRotationCircle />
        <div className={styles.innerCircle}></div>
        <div className={styles.mediaObjectWrapper}>
          <div className={styles.mediaObject}></div>
          <div className={styles.mediaObjectShadow}></div>
        </div>
      </div>
    </div>
  );
};

export default HomeHero;
