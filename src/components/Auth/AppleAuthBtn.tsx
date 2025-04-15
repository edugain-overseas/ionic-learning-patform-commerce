import { useState } from "react";
import { IonIcon } from "@ionic/react";
import Apple from "../../assets/icons/auth/apple.svg";
import CommonButton from "../CommonButton/CommonButton";
import Spinner from "../Spinner/Spinner";
import styles from "./Auth.module.scss";
import { Capacitor } from "@capacitor/core";
import {
  SignInWithApple,
  SignInWithAppleOptions,
  SignInWithAppleResponse,
} from "@capacitor-community/apple-sign-in";

const AppleAuthBtn = () => {
  const [isLoading, setIsLoading] = useState(false);

  const icon = isLoading ? (
    <Spinner />
  ) : (
    <IonIcon src={Apple} className={styles.servicesIcon} />
  );

  const handleAppleSingIn = async () => {
    console.log("Apple sing in");
    const platform = Capacitor.getPlatform();
    if (platform === "android") return;

    let options: SignInWithAppleOptions = {
      clientId: "io.ieucourses.app",
      redirectURI: "https://vps2.xyz/home",
      scopes: "email name",
      state: "12345",
      nonce: "nonce",
    };

    setIsLoading(true);

    try {
      const result: SignInWithAppleResponse = await SignInWithApple.authorize(
        options
      );
      console.log(result.response);
      alert(JSON.stringify(result.response));
    } catch (error) {
      console.log(error);
      alert(JSON.stringify(error));
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
