import { FC } from "react";
import { Link } from "react-router-dom";
import successImg from "../../../assets/images/Success.webp";
import ArrowIcon from "../../../assets/icons/header/back.svg";
import styles from "./CourseBuyStatusPage.module.scss";
import { IonIcon } from "@ionic/react";

const Success: FC = () => {
  return (
    <div className={styles.content}>
      <div className={styles.topWrapper}>
        <img src={successImg} alt="success" />
        <p>Your purchase</p>
        <p> Was successful</p>
      </div>
      <Link to="/my-education" className={styles.link}>
        <span>Go to the purchased course</span>
        <IonIcon src={ArrowIcon} />
      </Link>
    </div>
  );
};

export default Success;
