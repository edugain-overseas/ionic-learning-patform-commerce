import { FC } from "react";
import { IonIcon } from "@ionic/react";
import WarningIcon from "../../assets/icons/warning.svg";
import styles from "./UserProfile.module.scss";

const UserCerficatesFallback: FC = () => {
  return (
    <div className={styles.fallbackWrapper}>
      <div className={styles.warningCircleWrapper}>
        <IonIcon src={WarningIcon} />
      </div>
      <p>Available to registered users, please log in.</p>
    </div>
  );
};

export default UserCerficatesFallback;
