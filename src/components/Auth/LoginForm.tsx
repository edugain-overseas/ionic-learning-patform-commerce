import React, { useState } from "react";
import { IonIcon } from "@ionic/react";
import SingIn from "../../assets/icons/auth/sing-in.svg";
import Google from "../../assets/icons/auth/google.svg";
import InputText from "./Inputs/InutText";
import InputPassword from "./Inputs/InputPassword";
import CommonButton from "../CommonButton/CommonButton";
import styles from "./Auth.module.scss";

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = () => {
    console.log("submit");
  };
  return (
    <div className={styles.formWrapper}>
      <div className={styles.formHeader}>
        <span className={styles.title}>Sing in</span>
        <span className={styles.link}>
          If you don't have an account yet,{" "}
          <span className={styles.modalReTrigger}>sign up here!</span>
        </span>
      </div>
      <div className={styles.inputsWrapper}>
        <InputText
          name="Username"
          value={username}
          onChange={setUsername}
          height="32px"
        />
        <InputPassword
          name="Password"
          value={password}
          onChange={setPassword}
          height="32px"
        />
      </div>
      <div className={styles.btnsWrapper}>
        <CommonButton
          onClick={handleSubmit}
          label="Sing in"
          icon={<IonIcon src={SingIn} className={styles.formBtnIcon} />}
          backgroundColor="#001C54"
          color="#fcfcfc"
          block={true}
          height={32}
          borderRadius={5}
        />
        <div className={styles.btnsDivider}>
          <span>or continue with</span>
        </div>
        <CommonButton
          onClick={handleSubmit}
          label="Account Google"
          icon={<IonIcon src={Google} className={styles.googleIcon} />}
          backgroundColor="transparent"
          color="#001C54"
          border="1px solid #7E8CA8"
          block={true}
          height={32}
          borderRadius={5}
          className={styles.googleBtn}
        />
      </div>
    </div>
  );
};

export default LoginForm;
