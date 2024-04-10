import React from "react";
import { IonContent, IonIcon, IonPopover, IonText } from "@ionic/react";
import infoIcon from "../../assets/icons/info.svg";
import InsetBtn from "../InsetBtn/InsetBtn";
import styles from "./InfoBtn.module.scss";

const InfoBtn: React.FC<{ info: string }> = ({ info }) => {
  return (
    <>
      <InsetBtn
        icon={<IonIcon src={infoIcon} style={{ fontSize: "16px" }} />}
        width="32px"
        height="32px"
        disabled={false}
        onClick={() => {}}
      />
      <IonPopover trigger="info-trigger">
        <IonContent className={styles.infoContent}>
          <IonText>{info}</IonText>
        </IonContent>
      </IonPopover>
    </>
  );
};

export default InfoBtn;
