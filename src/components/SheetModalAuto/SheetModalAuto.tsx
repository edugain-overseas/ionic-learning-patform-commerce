import { IonModal, useIonViewWillLeave } from "@ionic/react";
import { useEffect, useRef, FC } from "react";
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
}) => {
  const modalRef = useRef<HTMLIonModalElement>(null);

  useIonViewWillLeave(() => {
    modalRef.current
      ? modalRef.current?.dismiss()
      : refModal?.current?.dismiss();
  }, []);

  useEffect(() => {
    setModal && setModal(modalRef);
  }, []);

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
    >
      {children}
    </IonModal>
  );
};

export default SheetModalAuto;
