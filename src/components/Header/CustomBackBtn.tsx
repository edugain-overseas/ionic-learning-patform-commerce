import { useIonAlert } from "@ionic/react";
import { useHistory } from "react-router";
import { IonButton, IonIcon } from "@ionic/react";
import backIcon from "../../assets/icons/header/back.svg";
import styles from "./Header.module.scss";

export type CustomBackButtonProps = {
  defaultHref?: string;
  header?: string;
  message?: string;
  className?: string;
  confirmCallback?: () => Promise<void>;
  cancelCallback?: () => Promise<void>;
};

const CustomBackButton: React.FC<CustomBackButtonProps> = ({
  defaultHref = "/",
  header = "Are you sure?",
  message = "Do you really want to go back?",
  className = "",
  confirmCallback,
  cancelCallback,
}) => {
  const history = useHistory();
  const [presentAlert] = useIonAlert();

  const handleBackClick = async () => {
    presentAlert({
      header,
      message,
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: async () => {
            try {
              await cancelCallback?.();
            } catch (error) {
              console.log(error);
            }
          },
        },
        {
          text: "Yes",
          handler: async () => {
            try {
              await confirmCallback?.();
            } catch (error) {
              console.log(error);
            } finally {
              if (history.length > 1) {
                history.goBack();
              } else {
                history.replace(defaultHref);
              }
            }
          },
        },
      ],
    });
  };

  return (
    <IonButton
      fill="clear"
      className={`${styles.backBtn} ${className}`}
      onClick={handleBackClick}
    >
      <IonIcon icon={backIcon} />
    </IonButton>
  );
};

export default CustomBackButton;
