import { IonModal, useIonViewWillLeave } from "@ionic/react";
import { useEffect, useRef, FC, useState } from "react";
import styles from "./SheetModalAuto.module.scss";

interface SheetModalAutoTypes {
  children: React.ReactNode;
  refModal?: React.RefObject<HTMLIonModalElement>;
  isOpen?: boolean;
  onDidDissmiss?: () => void;
  trigger?: string;
  className?: string;
  setModal?: (modalRef: React.RefObject<HTMLIonModalElement>) => void;
  keyboardClose?: boolean;
  isPresentingElement?: boolean;
}

const SheetModalAuto: FC<SheetModalAutoTypes> = ({
  children,
  refModal,
  isOpen,
  onDidDissmiss,
  trigger,
  className,
  setModal,
  keyboardClose,
  isPresentingElement = true,
}) => {
  const modalRef = useRef<HTMLIonModalElement>(null);
  const [presentingElement, setPresentingElement] =
    useState<HTMLElement | null>(null);

  useIonViewWillLeave(() => {
    modalRef.current
      ? modalRef.current?.dismiss()
      : refModal?.current?.dismiss();
  }, []);

  useEffect(() => {
    setModal && setModal(modalRef);
  }, []);

  // useEffect(() => {
  //   const presentingElement = document.querySelector(
  //     ".tabs-inner div.ion-page:not(.page-hidden)"
  //   ) as HTMLElement | null;

  //   console.log(presentingElement);

  //   if (presentingElement) {
  //     setPresentingElement(presentingElement);
  //   }
  // }, []);

  return (
    <IonModal
      ref={refModal ? refModal : modalRef}
      className={`${styles.modal} ${className ? className : ""}`}
      isOpen={isOpen}
      onDidDismiss={onDidDissmiss}
      breakpoints={[0, 1]}
      initialBreakpoint={1}
      trigger={trigger}
      keyboardClose={keyboardClose}
      presentingElement={
        isPresentingElement && presentingElement ? presentingElement : undefined
      }
    >
      {children}
    </IonModal>
  );
};

export default SheetModalAuto;
