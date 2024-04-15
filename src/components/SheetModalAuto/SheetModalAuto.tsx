import { IonModal, useIonViewWillLeave } from "@ionic/react";
import React, { useRef } from "react";
import styles from "./SheetModalAuto.module.scss";

interface SheetModalAutoTypes {
  children: React.ReactNode;
  isOpen?: boolean;
  onDidDissmiss?: () => void;
  trigger?: string;
}

const SheetModalAuto: React.FC<SheetModalAutoTypes> = ({
  children,
  isOpen,
  onDidDissmiss,
  trigger,
}) => {
  const modalRef = useRef<HTMLIonModalElement>(null);

  useIonViewWillLeave(() => {
    modalRef.current?.dismiss();
  }, []);

  return (
    <IonModal
      ref={modalRef}
      className={styles.modal}
      isOpen={isOpen}
      onDidDismiss={onDidDissmiss}
      breakpoints={[0, 1]}
      initialBreakpoint={1}
      trigger={trigger}
    >
      {children}
    </IonModal>
  );
};

export default SheetModalAuto;