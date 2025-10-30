import React, { useId } from "react";
import { IonContent, IonIcon, IonPopover, IonText } from "@ionic/react";
import infoIcon from "../../assets/icons/info.svg";
import InsetBtn from "../InsetBtn/InsetBtn";
import styles from "./InfoBtn.module.scss";

const InfoBtn: React.FC<{ info?: string; ripple?: boolean }> = ({
  info,
  ripple,
}) => {
  const uniqueId = useId();

  return (
    <>
      <InsetBtn
        icon={<IonIcon src={infoIcon} style={{ fontSize: "16rem" }} />}
        width="32rem"
        height="32rem"
        disabled={false}
        id={uniqueId}
        ripple={ripple}
      />
      <IonPopover trigger={uniqueId} showBackdrop={false} alignment="end">
        <IonContent className={styles.infoContent} scrollY={false}>
          <IonText>
            <span dangerouslySetInnerHTML={{ __html: `${info}` }}></span>
          </IonText>
        </IonContent>
      </IonPopover>
    </>
  );
};

export default InfoBtn;
