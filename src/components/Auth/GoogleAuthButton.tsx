import { FC, useState } from "react";
// import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";
import { SocialLogin } from "@capgo/capacitor-social-login";
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

      const googleUser = await SocialLogin.login({
        provider: "google",
        options: {
          scopes: ["profile", "email"],
        },
      });

      if (googleUser.result && "idToken" in googleUser.result) {
        const googleToken = googleUser.result.idToken;

        if (googleToken) {
          const user = await userInterface?.loginWithGoogle(googleToken);
          present({
            type: "success",
            message: `Hello ${user?.username}!`,
          });
        } else {
          present({
            type: "error",
            message: `Google service is unavailable (Token is empty)`,
          });
        }
      } else {
        present({
          type: "error",
          message: `Google returned an offline code instead of ID Token`,
        });
      }
    } catch (error) {
      console.log("GOOGLE SINGIN ERROR: ", error);
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
      color="#37384B"
      border="1rem solid #5D6977"
      block={true}
      height={32}
      borderRadius={5}
      className={styles.serviceBtn}
    />
  );
};

export default GoogleAuthButton;
