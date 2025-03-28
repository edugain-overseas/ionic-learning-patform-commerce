import { FC, useState } from "react";
import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";
import { IonIcon, useIonToast } from "@ionic/react";
import Google from "../../assets/icons/auth/google.svg";
import CommonButton from "../CommonButton/CommonButton";
import styles from "./Auth.module.scss";
import { useUser } from "../../context/UserContext";
import Spinner from "../Spinner/Spinner";

const GoogleAuthButton: FC = () => {
  const userInterface = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [present] = useIonToast();

  const handleGoogleSingIn = async () => {
    try {
      setIsLoading(true);
      const googleUser = await GoogleAuth.signIn();

      const googleToken = googleUser?.authentication?.idToken;
      if (googleToken) {
        const user = await userInterface?.loginWithGoogle(googleToken);
        present({
          message: `Hello ${user?.username}!`,
          duration: 2500,
          position: "top",
        });
      } else {
        present({
          message: `Google service is unvailable`,
          duration: 2500,
          position: "bottom",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const icon = isLoading ? (
    <Spinner />
  ) : (
    <IonIcon src={Google} className={styles.servicesIcon} />
  );

  return (
    <CommonButton
      onClick={handleGoogleSingIn}
      label="Using Google"
      icon={icon}
      backgroundColor="transparent"
      color="#001C54"
      border="1rem solid #7E8CA8"
      block={true}
      height={32}
      borderRadius={5}
      className={styles.serviceBtn}
    />
  );
};

export default GoogleAuthButton;
