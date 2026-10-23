import { FC, useEffect, useRef } from "react";
import { useIonViewDidLeave } from "@ionic/react";
import heroImage from "../../assets/images/HomeHero/happy-student.png";
import OuterRotationCircle from "./OuterRotationCircle";
import InnerRotationCircle from "./InnerRotationCircle";
import styles from "./HomeHero.module.scss";

const HomeHero: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useIonViewDidLeave(() => {
    if (containerRef.current) {
      containerRef.current.classList.remove(styles.animated);
    }
  });

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.classList.add(styles.animated);
    }
  }, []);

  return (
    <div
      className={styles.outerWrapper}
      ref={containerRef}
      id="home-hero-animated"
    >
      <OuterRotationCircle />
      <div className={styles.innerWrapper}>
        <InnerRotationCircle />
        <div className={styles.innerCircle}></div>
        <div className={styles.mediaObjectWrapper}>
          <div className={styles.mediaObject}>
            <img src={heroImage} loading="eager" />
          </div>
          <div className={styles.mediaObjectShadow}>
            <img src={heroImage} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeHero;
