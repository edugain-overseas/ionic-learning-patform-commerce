import { FC } from "react";
import { IonIcon } from "@ionic/react";
import cancelImg from "../../../assets/images/Cancel.webp";
import ReloadIcon from "../../../assets/icons/header/back.svg";
import styles from "./CourseBuyStatusPage.module.scss";

const Cancel: FC = () => {
  return (
    <div className={styles.content}>
      <div className={styles.topWrapper}>
        <img src={cancelImg} alt="cancel" />
        <p>Sorry</p>
        <p>something went wrong</p>
      </div>
      <button className={styles.btn}>
        <span>Go to the purchased course</span>
        <IonIcon src={ReloadIcon} />
      </button>
    </div>
  );
};

export default Cancel;
