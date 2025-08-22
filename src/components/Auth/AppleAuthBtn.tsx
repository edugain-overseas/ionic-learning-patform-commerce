import { useState } from "react";
import {
  SignInWithApple,
  SignInWithAppleOptions,
  SignInWithAppleResponse,
} from "@capacitor-community/apple-sign-in";
import { IonIcon, useIonToast } from "@ionic/react";
import { useUser } from "../../context/UserContext";
import { Capacitor } from "@capacitor/core";
import Apple from "../../assets/icons/auth/apple.svg";
import CommonButton from "../CommonButton/CommonButton";
import Spinner from "../Spinner/Spinner";
import styles from "./Auth.module.scss";

const AppleAuthBtn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [present] = useIonToast();
  const userInterface = useUser();

  const icon = isLoading ? (
    <Spinner />
  ) : (
    <IonIcon src={Apple} className={styles.servicesIcon} />
  );

  const handleAppleSingIn = async () => {
    const platform = Capacitor.getPlatform();
    if (platform === "android") return;

    const clientId =
      platform === "ios" ? "io.ieucourses.app" : "com.ieu.ieucourses";

    let options: SignInWithAppleOptions = {
      clientId,
      redirectURI: "https://vps2.online",
      // redirectURI: "https://7dac-176-38-25-248.ngrok-free.app/",
      scopes: "email name",
      state: "12345",
      nonce: "nonce",
    };

    setIsLoading(true);

    try {
      const result: SignInWithAppleResponse = await SignInWithApple.authorize(
        options
      );
      const user = await userInterface?.loginWithApple(result, platform);

      present({
        message: `Hello ${user?.username}!`,
        duration: 2500,
        position: "top",
      });
    } catch (error) {
      console.log(error);

      present({
        message: `Apple service is unvailable`,
        duration: 2500,
        position: "bottom",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CommonButton
      onClick={handleAppleSingIn}
      label="Using Apple"
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

export default AppleAuthBtn;
