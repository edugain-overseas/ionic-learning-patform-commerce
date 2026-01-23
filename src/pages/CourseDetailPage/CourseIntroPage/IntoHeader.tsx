import React from "react";
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonHeader,
  IonIcon,
  IonToolbar,
} from "@ionic/react";
import { motion } from "motion/react";
import { useToast } from "../../../hooks/useToast";
import { clamp } from "../../../utils/clamp";
import back from "../../../assets/icons/header/back.svg";
import bellIcon from "../../../assets/icons/header/bell.svg";
import HeaderTitle from "../../../components/Header/HeaderTitle";
import styles from "./CourseIntroPage.module.scss";

type PropsType = {
  scrollProgress: number;
  title?: string;
};

const threshold = 0.4;

const IntoHeader = ({ scrollProgress, title = "" }: PropsType) => {
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
      <IonToolbar className={styles.toolbar}>
        <motion.div
          className={styles.headerBg}
          style={{ opacity: headerBgOpacity }}
        />
        <IonButtons slot="start" className={styles.buttonsWrapper}>
          <motion.div
            className={styles.backBtnBg}
            style={{ opacity: leftBgOpacity }}
          />
          <IonBackButton
            key="intro-back"
            className={styles.backBtn}
            defaultHref={"/"}
            icon={back}
            text={""}
          ></IonBackButton>
        </IonButtons>
        <motion.div style={{ opacity: headerBgOpacity }}>
          <HeaderTitle title={title} />
        </motion.div>
        <IonButtons slot="end" className={styles.buttonsWrapper}>
          <motion.div
            style={{
              opacity: rightOpacity,
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

export default IntoHeader;
