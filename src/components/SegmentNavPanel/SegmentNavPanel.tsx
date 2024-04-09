import React, { Dispatch, SetStateAction } from "react";
import styles from "./SegmentNavPanel.module.scss";
import {
  IonLabel,
  IonSegment,
  IonSegmentButton,
  SegmentChangeEventDetail,
} from "@ionic/react";

interface SegmentNavPanelTypes {
  items: { value: string; label: string }[];
  value: string | number;
  setValue: Dispatch<SetStateAction<string>>;
}

const SegmentNavPanel: React.FC<SegmentNavPanelTypes> = ({
  items,
  value,
  setValue,
}) => {
  const onChange = (event: CustomEvent<SegmentChangeEventDetail>) => {
    const { value } = event.detail;
    if (value !== undefined) {
      setValue(`${value}`);
    }
  };

  return (
    <IonSegment
      scrollable={true}
      value={value}
      className={styles.segment}
      onIonChange={onChange}
    >
      {items.map(({ label, value }) => (
        <IonSegmentButton
          key={label}
          value={value}
          mode="md"
          className={styles.segmentBtn}
        >
          <IonLabel className={styles.segmentLabel}>{label}</IonLabel>
        </IonSegmentButton>
      ))}
    </IonSegment>
  );
};

export default SegmentNavPanel;
