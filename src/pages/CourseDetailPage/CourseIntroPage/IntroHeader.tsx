import {
  IonButton,
  IonButtons,
  IonHeader,
  IonIcon,
  IonToolbar,
} from "@ionic/react";
import { motion } from "motion/react";
import { useToast } from "../../../hooks/useToast";
import { clamp } from "../../../utils/clamp";
import bellIcon from "../../../assets/icons/header/bell.svg";
import HeaderTitle from "../../../components/Header/HeaderTitle";
import styles from "./CourseIntroPage.module.scss";
import HeaderBackBtn from "../../../components/Header/HeaderBackBtn";

type PropsType = {
  scrollProgress: number;
  title?: string;
};

const threshold = 0.7;

const IntroHeader = ({ scrollProgress, title = "" }: PropsType) => {
  const [present] = useToast();

  const handleNotification = () => {
    present({
      type: "warning",
      message: "You don't have notification yet",
      duration: 3000,
    });
  };

  const animationProgress = clamp(
    0,
    (scrollProgress - threshold) / (1 - threshold),
    1
  );

  const headerBgOpacity = animationProgress;
  const rightOpacity = animationProgress;
  const leftBgOpacity = 1 - animationProgress;

  return (
    <IonHeader className={styles.introHeader}>
      <motion.div
        className={styles.headerBg}
        style={{
          transform: `translateY(calc(100% * ${animationProgress} - 100%))`,
        }}
      />
      <IonToolbar className={styles.toolbar}>
        <IonButtons slot="start" className={styles.buttonsWrapper}>
          <motion.div
            className={styles.backBtnBg}
            style={{ opacity: leftBgOpacity }}
          />
          <HeaderBackBtn />
        </IonButtons>
        <motion.div
          style={{
            opacity: headerBgOpacity,
            transform: `translateY(calc(100% * ${animationProgress} - 100%))`,
          }}
        >
          <HeaderTitle title={title} />
        </motion.div>
        <IonButtons slot="end" className={styles.buttonsWrapper}>
          <motion.div
            style={{
              opacity: rightOpacity,
              transform: `translateY(calc(100% * ${animationProgress} - 100%))`,
              pointerEvents: animationProgress > 0 ? "auto" : "none",
            }}
          >
            <IonButton
              key="intro-notification"
              className={styles.notificationBtn}
              onClick={handleNotification}
            >
              <IonIcon src={bellIcon} className={styles.bellIcon} />
            </IonButton>
          </motion.div>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default IntroHeader;
