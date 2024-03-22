import React from "react";
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
  setValue: (event: CustomEvent<SegmentChangeEventDetail>) => void;
}

const SegmentNavPanel: React.FC<SegmentNavPanelTypes> = ({
  items,
  value,
  setValue,
}) => {
  return (
    <IonSegment
      scrollable={true}
      value={value}
      className={styles.segment}
      onIonChange={setValue}
    >
      <IonSegmentButton value="my" mode="md" className={styles.segmentBtn}>
        <IonLabel className={styles.segmentLabel}>My Courses</IonLabel>
      </IonSegmentButton>
      <IonSegmentButton
        value="available"
        mode="md"
        className={styles.segmentBtn}
      >
        <IonLabel className={styles.segmentLabel}>Available Courses</IonLabel>
      </IonSegmentButton>
      <IonSegmentButton
        value="completed"
        mode="md"
        className={styles.segmentBtn}
      >
        <IonLabel className={styles.segmentLabel}>Completed Courses</IonLabel>
      </IonSegmentButton>
    </IonSegment>
  );
};

export default SegmentNavPanel;
