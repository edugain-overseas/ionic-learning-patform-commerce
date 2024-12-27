import { FC } from "react";
import { IonIcon } from "@ionic/react";
import BusinessIcon from "../../assets/images/HomeHero/icon-business.svg";
import ClockIcon from "../../assets/images/HomeHero/icon-clock.svg";
import ItIcon from "../../assets/images/HomeHero/icon-it.svg";
import LawIcon from "../../assets/images/HomeHero/icon-law.svg";
import GradeAIcon from "../../assets/images/HomeHero/icon-gradeA.svg";
import SocialIcon from "../../assets/images/HomeHero/icon-social.svg";
import NotificationIcon from "../../assets/images/HomeHero/icon-notification.svg";
import styles from "./HomeHero.module.scss";

const OuterRotationCircle: FC = () => {
  return (
    <div className={styles.outerRotationCircle}>
      <div className={styles.businessWrapper}>
        <IonIcon src={BusinessIcon} />
      </div>
      <div className={styles.clockWrapper}>
        <IonIcon src={ClockIcon} />
      </div>
      <div className={styles.itWrapper}>
        <IonIcon src={ItIcon} />
      </div>
      <div className={styles.lawWrapper}>
        <IonIcon src={LawIcon} />
      </div>
      <div className={styles.gradeWrapper}>
        <IonIcon src={GradeAIcon} />
      </div>
      <div className={styles.socialWrapper}>
        <IonIcon src={SocialIcon} />
      </div>
      <div className={styles.notificationWrapper}>
        <IonIcon src={NotificationIcon} />
      </div>
    </div>
  );
};

export default OuterRotationCircle;
