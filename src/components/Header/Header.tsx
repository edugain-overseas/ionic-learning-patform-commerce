import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonHeader,
  IonIcon,
  IonImg,
  IonToolbar,
} from "@ionic/react";
import { FC } from "react";
import { useListStyle } from "../../context/ListStyleContext";
import bellIcon from "../../assets/icons/header/bell.svg";
import searchIcon from "../../assets/icons/header/search.svg";
import backIcon from "../../assets/icons/header/back.svg";
import rowIcon from "../../assets/icons/header/list-style-row.svg";
import gridIcon from "../../assets/icons/header/list-style-grid.svg";
import filterIcon from "../../assets/icons/header/filter.svg";
import SettingsIcon from "../../assets/icons/menu/settings.svg";
import SaveIcon from "../../assets/icons/save.svg";
import logoIEU from "../../assets/icons/logoIEU.svg";
import detailsIcon from "../../assets/icons/header/details.svg";
import styles from "./Header.module.scss";
import HeaderTitle from "./HeaderTitle";
import Spinner from "../Spinner/Spinner";

interface buttonPropsTypes {
  name: string;
  id?: string;
  onClick?: () => void;
  className?: string;
  loading?: boolean;
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
    case "filter":
      return (
        <IonButton
          key={props.name}
          className={props.className ? props.className : ""}
          id={props.id}
        >
          <IonIcon src={filterIcon} />
        </IonButton>
      );
    case "search":
      return (
        <IonButton
          key={props.name}
          className={props.className ? props.className : ""}
          routerLink="/search"
          routerDirection="forward"
          id={props.id}
        >
          <IonIcon src={searchIcon} className={styles.searchIcon} />
        </IonButton>
      );
    case "settings":
      return (
        <IonButton
          key={props.name}
          className={`${styles.settingsBtn} ${
            props.className ? props.className : ""
          }`}
          id={props.id}
        >
          <IonIcon src={SettingsIcon} className={styles.settingsIcon} />
        </IonButton>
      );
    case "details":
      return (
        <IonButton
          key={props.name}
          className={`${styles.detailsBtn} ${
            props.className ? props.className : ""
          }`}
          id={props.id}
          onClick={props.onClick}
        >
          <IonIcon src={detailsIcon} className={styles.detailsIcon} />
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
          onClick={props.onClick}
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
          onClick={props.onClick}
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
          onClick={props.onClick}
        >
          {props.loading ? (
            <Spinner />
          ) : (
            <IonIcon src={backIcon} className={styles.nextIcon} />
          )}
        </IonButton>
      );
    default:
      break;
  }
};

const Header: FC<HeaderTypes> = ({
  title = "",
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
        <IonButtons slot="start" className={styles.buttonsWrapper}>
          {left.map((props) => renderBtn(props))}
        </IonButtons>
        <HeaderTitle title={title} />
        <IonButtons slot="end" className={styles.buttonsWrapper}>
          {right.map((name) => renderBtn(name))}
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
