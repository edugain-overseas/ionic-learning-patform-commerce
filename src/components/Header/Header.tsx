import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonHeader,
  IonIcon,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import bellIcon from "../../assets/icons/header/bell.svg";
import searchIcon from "../../assets/icons/header/search.svg";
import backIcon from "../../assets/icons/header/back.svg";
import styles from "./Header.module.scss";

interface HeaderTypes {
  title: string;
}

const Header: React.FC<HeaderTypes> = ({ title }) => {
  return (
    <IonHeader className={styles.header}>
      <IonToolbar className={styles.toolbar}>
        <IonButtons slot="start">
          <IonBackButton
            className={styles.backBtn}
            defaultHref="/"
            color="primary"
            icon={backIcon}
            text={""}
          ></IonBackButton>
        </IonButtons>
        <IonTitle className={styles.title}>{title}</IonTitle>
        <IonButtons slot="end">
          <IonButton>
            <IonIcon src={bellIcon} className={styles.bellIcon} />
          </IonButton>
          <IonButton>
            <IonIcon src={searchIcon} className={styles.searchIcon} />
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
