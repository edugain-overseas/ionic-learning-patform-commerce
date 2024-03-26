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
import rowIcon from "../../assets/icons/header/list-style-row.svg";
// import gridIcon from "../../assets/icons/header/list-style-grid.svg";
import styles from "./Header.module.scss";

interface HeaderTypes {
  title: string;
  secondary: boolean | undefined;
  left: string[];
  right: string[];
}

const renderBtn = (buttonName: string) => {
  switch (buttonName) {
    case "back":
      return (
        <IonBackButton
          key={buttonName}
          className={styles.backBtn}
          defaultHref="/"
          icon={backIcon}
          text={""}
        ></IonBackButton>
      );
    case "notification":
      return (
        <IonButton key={buttonName}>
          <IonIcon src={bellIcon} className={styles.bellIcon} />
        </IonButton>
      );
    case "list-style":
      return (
        <IonButton key={buttonName}>
          <IonIcon src={rowIcon} className={styles.rowIcon} />
        </IonButton>
      );
    case "search":
      return (
        <IonButton key={buttonName}>
          <IonIcon src={searchIcon} className={styles.searchIcon} />
        </IonButton>
      );

    default:
      break;
  }
};

const Header: React.FC<HeaderTypes> = ({
  title,
  secondary = false,
  left = [],
  right = [],
}) => {

  return (
    <IonHeader className={styles.header}>
      <IonToolbar
        className={`${secondary ? styles.secondary : ""} ${styles.toolbar}`}
      >
        <IonButtons slot="start">
          {left.map((name) => renderBtn(name))}
          {/* <IonBackButton
            className={styles.backBtn}
            defaultHref="/"
            icon={backIcon}
            text={""}
          ></IonBackButton>
          <IonButton>
            <IonIcon src={bellIcon} className={styles.bellIcon} />
          </IonButton> */}
        </IonButtons>
        <IonTitle className={styles.title}>{title}</IonTitle>
        <IonButtons slot="end">
          {right.map((name) => renderBtn(name))}
          {/* <IonButton>
            <IonIcon src={rowIcon} className={styles.rowIcon} />
          </IonButton>
          <IonButton>
            <IonIcon src={searchIcon} className={styles.searchIcon} />
          </IonButton> */}
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
