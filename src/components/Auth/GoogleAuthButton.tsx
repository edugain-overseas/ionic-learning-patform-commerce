import { FC } from "react";
import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";
import { IonIcon } from "@ionic/react";
import Google from "../../assets/icons/auth/google.svg";
import CommonButton from "../CommonButton/CommonButton";
import styles from "./Auth.module.scss";

const GoogleAuthButton: FC = () => {
    
  const handleGoogleSingIn = async () => {
    const user = await GoogleAuth.signIn();
    console.log(user);
  };

  return (
    <CommonButton
      onClick={handleGoogleSingIn}
      label="Account Google"
      icon={<IonIcon src={Google} className={styles.googleIcon} />}
      backgroundColor="transparent"
      color="#001C54"
      border="1rem solid #7E8CA8"
      block={true}
      height={32}
      borderRadius={5}
      className={styles.googleBtn}
    />
  );
};

export default GoogleAuthButton;
