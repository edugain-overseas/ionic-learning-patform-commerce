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
import gridIcon from "../../assets/icons/header/list-style-grid.svg";
import SettingsIcon from "../../assets/icons/menu/settings.svg";
import SaveIcon from "../../assets/icons/save.svg";
import logoIEU from "../../assets/icons/logoIEU.svg";
import styles from "./Header.module.scss";
import { useListStyle } from "../../context/ListStyleContext";

interface buttonPropsTypes {
  name: string;
  id?: string;
  onClick?: () => void;
  className?: string;
}

interface HeaderTypes {
  title?: string;
  secondary?: boolean | undefined;
  left?: buttonPropsTypes[];
  right?: buttonPropsTypes[];
  mode?: string;
  toolbarClassName?: string;
}

const renderBtn = (props: buttonPropsTypes) => {
  switch (props.name) {
    case "back":
      return (
        <IonBackButton
          key={props.name}
          className={`${styles.backBtn} ${
            props.className ? props.className : ""
          }`}
          defaultHref="/"
          icon={backIcon}
          text={""}
        ></IonBackButton>
      );
    case "notification":
      return (
        <IonButton
          key={props.name}
          className={`${styles.notificationBtn} ${
            props.className ? props.className : ""
          }`}
          onClick={props.onClick}
          id={props.id}
        >
          <IonIcon src={bellIcon} className={styles.bellIcon} />
        </IonButton>
      );
    case "list-style":
      const changeListStyle = useListStyle()?.changeListStyle;
      const listStyle = useListStyle()?.listStyle;
      return (
        <IonButton
          key={props.name}
          className={props.className ? props.className : ""}
          id={props.id}
          onClick={changeListStyle}
        >
          <IonIcon
            src={listStyle === "card" ? rowIcon : gridIcon}
            className={styles.listStyleIcon}
          />
        </IonButton>
      );
    case "search":
      return (
        <IonButton
          key={props.name}
          className={props.className ? props.className : ""}
          onClick={props.onClick}
          id={props.id}
        >
          <IonIcon src={searchIcon} className={styles.searchIcon} />
        </IonButton>
      );
    case "settings":
      return (
        <IonButton
          key={props.name}
          className={props.className ? props.className : ""}
          id={props.id}
        >
          <IonIcon src={SettingsIcon} className={styles.settingsIcon} />
        </IonButton>
      );
    case "logo":
      return (
        <IonImg
          src={logoIEU}
          alt="IEU logo"
          className={`${styles.logo} ${props.className ? props.className : ""}`}
          key={props.name}
          onClick={props.onClick}
          id={props.id}
        />
      );
    case "save":
      return (
        <IonButton
          key={props.name}
          className={props.className ? props.className : ""}
          id={props.id}
        >
          <IonIcon src={SaveIcon} className={styles.saveIcon} />
        </IonButton>
      );
    case "prevLesson":
      return (
        <IonButton
          key={props.name}
          className={`${styles.backBtn} ${
            props.className ? props.className : ""
          }`}
          id={props.id}
        >
          <IonIcon src={backIcon} className={styles.backIcon} />
        </IonButton>
      );
    case "nextLesson":
      return (
        <IonButton
          key={props.name}
          className={`${styles.nextBtnBtn} ${
            props.className ? props.className : ""
          }`}
          id={props.id}
        >
          <IonIcon src={backIcon} className={styles.nextIcon} />
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
  mode,
  toolbarClassName,
}) => {
  return (
    <IonHeader
      className={`${styles.header} ${
        mode === "transparent" ? styles.transparent : ""
      }`}
    >
      <IonToolbar
        className={`${secondary ? styles.secondary : ""} ${styles.toolbar} ${
          toolbarClassName ? toolbarClassName : ""
        }`}
      >
        <IonButtons slot="start" className={styles.leftButtonsWrapper}>
          {left.map((props) => renderBtn(props))}
        </IonButtons>
        {title && <IonTitle size="small" className={styles.title}>{title}</IonTitle>}
        <IonButtons slot="end">
          {right.map((name) => renderBtn(name))}
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
