import React from "react";
import UserIcon from "../../../assets/icons/user.svg";
import styles from "./AvatarFallback.module.scss";
import { IonIcon } from "@ionic/react";

const AvatarFallback = ({ size = 80 }) => {
  return (
    <div
      className={styles.wrapper}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        fontSize: `${size * 0.54}px`,
      }}
    >
      <IonIcon src={UserIcon} />
    </div>
  );
};

export default AvatarFallback;
