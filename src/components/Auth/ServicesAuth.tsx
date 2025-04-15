import styles from "./Auth.module.scss";
import GoogleAuthButton from "./GoogleAuthButton";
import { Capacitor } from "@capacitor/core";
import AppleAuthBtn from "./AppleAuthBtn";

const ServicesAuth = () => {
  const platform = Capacitor.getPlatform();
  return (
    <div className={styles.servicesAuth}>
      <GoogleAuthButton />
      {platform !== "android" && <AppleAuthBtn />}
    </div>
  );
};

export default ServicesAuth;
