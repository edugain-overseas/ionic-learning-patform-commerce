import { useState } from "react";
import { IonIcon } from "@ionic/react";
import Apple from "../../assets/icons/auth/apple.svg";
import CommonButton from "../CommonButton/CommonButton";
import Spinner from "../Spinner/Spinner";
import styles from "./Auth.module.scss";

const AppleAuthBtn = () => {
  const [isLoading, setIsLoading] = useState(false);

  const icon = isLoading ? (
    <Spinner />
  ) : (
    <IonIcon src={Apple} className={styles.servicesIcon} />
  );

  const handleAppleSingIn = () => {
    console.log("Apple sing in");
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
