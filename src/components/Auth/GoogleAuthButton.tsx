import { FC, useState } from "react";
import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";
import { IonIcon } from "@ionic/react";
import { useUser } from "../../context/UserContext";
import { useToast } from "../../hooks/useToast";
import Google from "../../assets/icons/auth/google.svg";
import CommonButton from "../CommonButton/CommonButton";
import Spinner from "../Spinner/Spinner";
import styles from "./Auth.module.scss";

const GoogleAuthButton: FC = () => {
  const userInterface = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [present] = useToast();

  const handleGoogleSingIn = async () => {
    try {
      setIsLoading(true);
      const googleUser = await GoogleAuth.signIn();

      const googleToken = googleUser?.authentication?.idToken;
      if (googleToken) {
        const user = await userInterface?.loginWithGoogle(googleToken);
        present({
          type: "success",
          message: `Hello ${user?.username}!`,
        });
      } else {
        present({
          type: "error",
          message: `Google service is unvailable`,
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
