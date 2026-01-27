import { FC, ReactElement } from "react";
import {
  IonButton,
  IonButtons,
  IonHeader,
  IonIcon,
  IonImg,
  IonToolbar,
} from "@ionic/react";
import { useToast } from "../../hooks/useToast";
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
import CustomBackButton, { CustomBackButtonProps } from "./CustomBackBtn";
import HeaderTitle from "./HeaderTitle";
import Spinner from "../Spinner/Spinner";
import HeaderAvatar from "./HeaderAvatar";
import HeaderBackBtn from "./HeaderBackBtn";
import styles from "./Header.module.scss";

interface ButtonPropsTypes extends CustomBackButtonProps {
  name: string;
  id?: string;
  onClick?: () => void;
  className?: string;
  loading?: boolean;
  defaultHref?: string;
}

interface HeaderTypes {
  title?: string | ReactElement;
  secondary?: boolean | undefined;
  left?: ButtonPropsTypes[];
  right?: ButtonPropsTypes[];
  mode?: string;
  toolbarClassName?: string;
  headerClassName?: string;
}

const renderBtn = (props: ButtonPropsTypes, handleNotification: () => void) => {
  switch (props.name) {
    case "back":
      return <HeaderBackBtn className={props.className} key={props.name} />;
    case "custom-back":
      return (
        <CustomBackButton
          key={props.name}
          header={props.header}
          message={props.message}
          defaultHref={props.defaultHref}
          confirmCallback={props.confirmCallback}
          cancelCallback={props.cancelCallback}
        />
      );
    case "notification":
      return (
        <IonButton
          key={props.name}
          className={`${styles.notificationBtn} ${
            props.className ? props.className : ""
          }`}
          onClick={props.onClick ? props.onClick : handleNotification}
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
            src={listStyle === "card" ? gridIcon : rowIcon}
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
    case "user":
      return (
        <IonButton
          key={props.name}
          className={props.className ? props.className : ""}
          routerLink="/my-profile"
          routerDirection="forward"
          id={props.id}
        >
          <HeaderAvatar />
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
  headerClassName,
}) => {
  const [present] = useToast();

  const handleNotification = () => {
    present({
      type: "warning",
      message: "You don't have notification yet",
      duration: 3000,
    });
  };

  return (
    <IonHeader
      className={`${styles.header} ${mode ? styles[mode] : ""} ${
        headerClassName ? headerClassName : ""
      }`}
    >
      <IonToolbar
        className={`${secondary ? styles.secondary : ""} ${styles.toolbar} ${
          toolbarClassName ? toolbarClassName : ""
        }`}
      >
        <IonButtons slot="start" className={styles.buttonsWrapper}>
          {left.map((props) => renderBtn(props, handleNotification))}
        </IonButtons>
        <HeaderTitle title={title} />
        <IonButtons slot="end" className={styles.buttonsWrapper}>
          {right.map((props) => renderBtn(props, handleNotification))}
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
