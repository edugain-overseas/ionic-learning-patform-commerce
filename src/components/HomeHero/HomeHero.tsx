import { FC } from "react";
import styles from "./HomeHero.module.scss";
import OuterRotationCircle from "./OuterRotationCircle";
import InnerRotationCircle from "./InnerRotationCircle";

const HomeHero: FC = () => {
  return (
    <div className={styles.outerWrapper}>
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
