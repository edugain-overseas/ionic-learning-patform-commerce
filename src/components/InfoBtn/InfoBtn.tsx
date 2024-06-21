import React from "react";
import { IonContent, IonIcon, IonPopover, IonText } from "@ionic/react";
import infoIcon from "../../assets/icons/info.svg";
import InsetBtn from "../InsetBtn/InsetBtn";
import styles from "./InfoBtn.module.scss";

const InfoBtn: React.FC<{ info?: string; id: string; ripple?: boolean }> = ({
  info,
  id,
  ripple,
}) => {
  return (
    <>
      <InsetBtn
        icon={<IonIcon src={infoIcon} style={{ fontSize: "16rem" }} />}
        width="32rem"
        height="32rem"
        disabled={false}
        onClick={() => {}}
        id={id}
        ripple={ripple}
      />
      <IonPopover trigger={id}>
        <IonContent className={styles.infoContent} scrollY={false}>
          <IonText>{info}</IonText>
        </IonContent>
      </IonPopover>
    </>
  );
};

export default InfoBtn;
