import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonHeader,
  IonIcon,
  IonImg,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import bellIcon from "../../assets/icons/header/bell.svg";
import searchIcon from "../../assets/icons/header/search.svg";
import backIcon from "../../assets/icons/header/back.svg";
import rowIcon from "../../assets/icons/header/list-style-row.svg";
// import gridIcon from "../../assets/icons/header/list-style-grid.svg";
import logoIEU from "../../assets/icons/logoIEU.svg";
import styles from "./Header.module.scss";

interface HeaderTypes {
  title?: string;
  secondary?: boolean | undefined;
  left?: string[];
  right?: string[];
  mode?: string;
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
        <IonButton key={buttonName} className={styles.notificationBtn}>
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
    case "logo":
      return <IonImg src={logoIEU} alt="IEU logo" className={styles.logo} key={buttonName}/>;
    default:
      break;
  }
};

const Header: React.FC<HeaderTypes> = ({
  title,
  secondary = false,
  left = [],
  right = [],
  mode,
}) => {
  return (
    <IonHeader
      className={`${styles.header} ${
        mode === "transparent" ? styles.transparent : ""
      }`}
    >
      <IonToolbar
        className={`${secondary ? styles.secondary : ""} ${styles.toolbar}`}
      >
        <IonButtons slot="start" className={styles.leftButtonsWrapper}>
          {left.map((name) => renderBtn(name))}
        </IonButtons>
        {title && <IonTitle className={styles.title}>{title}</IonTitle>}
        <IonButtons slot="end">
          {right.map((name) => renderBtn(name))}
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
