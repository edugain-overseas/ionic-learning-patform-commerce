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
import { useProtectedNavigation } from "../../hooks/useProtectedNavigation";

export type SegmentItem = {
  value: string;
  label: string;
  isAllowed?: boolean;
  denyMessage?: string;
};

type SegmentNavPanelTypes = {
  items: SegmentItem[];
  value?: string | number;
  setValue?: Dispatch<SetStateAction<any>>;
  routerNav?: boolean;
};

const SegmentNavPanel: React.FC<SegmentNavPanelTypes> = ({
  items,
  value,
  setValue,
  routerNav = false,
}) => {
  const pathname = useLocation().pathname;
  const activeValue = routerNav
    ? items.find((item) => item.value === pathname && item.isAllowed !== false)
        ?.value
    : value;

  const protectedNavigate = useProtectedNavigation();

  const onChange = (event: CustomEvent<SegmentChangeEventDetail>) => {
    const { value } = event.detail;
    if (value !== undefined) {
      setValue && setValue(`${value}`);
    }
  };

  return (
    <IonSegment
      scrollable={true}
      value={activeValue}
      className={styles.segment}
      onIonChange={!routerNav && setValue ? onChange : undefined}
    >
      {items.map(
        ({ label, value, isAllowed = true, denyMessage = "Access denied" }) => (
          <IonSegmentButton
            key={label}
            mode="md"
            value={value}
            disabled={!isAllowed}
            className={styles.segmentBtn}
            onClick={
              routerNav
                ? (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    protectedNavigate(isAllowed, value, denyMessage);
                  }
                : undefined
            }
          >
            <IonLabel className={styles.segmentLabel}>{label}</IonLabel>
          </IonSegmentButton>
        )
      )}
    </IonSegment>
  );
};

export default SegmentNavPanel;
