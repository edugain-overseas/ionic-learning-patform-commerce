import { IonButton, IonIcon, useIonRouter } from "@ionic/react";
import backIcon from "../../assets/icons/header/back.svg";
import styles from "./Header.module.scss";

type HeaderBackButtonProps = {
  className?: string;
};

const HeaderBackBtn = ({ className }: HeaderBackButtonProps) => {
  const router = useIonRouter();

  const handleBack = async () => {
    if (router.canGoBack()) {
      router.goBack();
    } else {
      router.push("/", "back");
    }
  };
  return (
    <IonButton
      className={`${styles.backBtn} ${className ? className : ""}`}
      onClick={handleBack}
    >
      <IonIcon src={backIcon} />
    </IonButton>
  );
};

export default HeaderBackBtn;
