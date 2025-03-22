import React, { Dispatch, SetStateAction } from "react";
import styles from "./SegmentNavPanel.module.scss";
import {
  IonLabel,
  IonSegment,
  IonSegmentButton,
  SegmentChangeEventDetail,
  useIonRouter,
} from "@ionic/react";
import { useLocation } from "react-router";

interface SegmentNavPanelTypes {
  items: { value: string; label: string }[];
  value?: string | number;
  setValue?: Dispatch<SetStateAction<any>>;
  routerNav?: boolean;
}

const SegmentNavPanel: React.FC<SegmentNavPanelTypes> = ({
  items,
  value,
  setValue,
  routerNav = false,
}) => {
  const pathmane = useLocation().pathname;
  const router = useIonRouter()

  const onChange = (event: CustomEvent<SegmentChangeEventDetail>) => {
    const { value } = event.detail;
    if (value !== undefined) {
      setValue && setValue(`${value}`);
    }
  };

  return (
    <IonSegment
      scrollable={true}
      value={routerNav ? pathmane : value}
      className={styles.segment}
      onIonChange={setValue && onChange}
    >
      {items.map(({ label, value }) => (
        <IonSegmentButton
          key={label}
          value={value}
          mode="md"
          className={styles.segmentBtn}
          onClick={
            routerNav
              ? (e) => {
                  e.preventDefault();
                  router.push(value, 'root')
                }
              : undefined
          }
        >
          <IonLabel className={styles.segmentLabel}>{label}</IonLabel>
        </IonSegmentButton>
      ))}
    </IonSegment>
  );
};

export default SegmentNavPanel;
