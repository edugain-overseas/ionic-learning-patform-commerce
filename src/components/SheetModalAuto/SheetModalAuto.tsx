import { IonModal, useIonViewWillLeave } from "@ionic/react";
import React, { useEffect, useRef } from "react";
import styles from "./SheetModalAuto.module.scss";

interface SheetModalAutoTypes {
  children: React.ReactNode;
  ref?: React.RefObject<HTMLIonModalElement>;
  isOpen?: boolean;
  onDidDissmiss?: () => void;
  trigger?: string;
  className?: string;
  setModal?: (modalRef: React.RefObject<HTMLIonModalElement>) => void;
}

const SheetModalAuto: React.FC<SheetModalAutoTypes> = ({
  children,
  ref,
  isOpen,
  onDidDissmiss,
  trigger,
  className,
  setModal,
}) => {
  const modalRef = useRef<HTMLIonModalElement>(null);

  useIonViewWillLeave(() => {
    modalRef.current?.dismiss();
  }, []);

  useEffect(() => {
    setModal && setModal(modalRef);
  }, []);

  return (
    <IonModal
      ref={ref ? ref : modalRef}
      className={`${styles.modal} ${className ? className : ""}`}
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
