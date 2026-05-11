import { IonAlert, IonContent, IonPage } from "@ionic/react";
import { FC, useState } from "react";
import { useUser } from "../../context/UserContext";
import { useToast } from "../../hooks/useToast";
import { instance } from "../../http/instance";
import Header from "../../components/Header/Header";
import CommonButton from "../../components/CommonButton/CommonButton";
import Spinner from "../../components/Spinner/Spinner";
import styles from "./Settings.module.scss";

const Settings: FC = () => {
  const user = useUser();
  const [present] = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const isUser = user?.user.accessToken;

  const handleDeleteAccount = async () => {
    if (!isUser) {
      present({ type: "error", message: "Please sing in you account first." });
      return;
    }
    try {
      setIsLoading(true);
      const response = await instance.delete("/user/delete-account");
      user.refreshUser();
      present({ type: "success", message: response.data.message });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const hederProps = {
    left: [{ name: "back" }],
    title: "Settings",
  };

  return (
    <IonPage className="primaryPage">
      <Header {...hederProps} />
      <IonContent>
        <div className={styles.mainTools}>
          <CommonButton
            label="Delete Account"
            block={true}
            height={40}
            className={styles.button}
            id="delete-account"
            icon={isLoading ? <Spinner color="light" /> : null}
            disabled={isLoading || !isUser}
          />
        </div>
        <IonAlert
          trigger={`delete-account`}
          header="Delete Account"
          message="Are you sure you want to delete your account?"
          className={`${styles.alert} ${styles.customAlert}`}
          buttons={[
            {
              role: "confirm",
              text: "Yes",
              handler: handleDeleteAccount,
            },
            {
              role: "cancel",
              text: "Cancel",
            },
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default Settings;
