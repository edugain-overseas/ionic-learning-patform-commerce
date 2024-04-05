import React, { useState } from "react";
import { IonIcon } from "@ionic/react";
import { validatePassword } from "../../../utils/inputsValidateHandler";
import EyeOpen from "../../../assets/icons/auth/eye-open.svg";
import EyeHide from "../../../assets/icons/auth/eye-hide.svg";
import styles from "./Inputs.module.scss";

interface InputPasswordTypes {
  name: string;
  value: string;
  onChange: (value: string) => void;
  height?: string;
  width?: string;
  block?: boolean;
  isError?: boolean;
  resetError?: () => void;
  disabled?: boolean;
}

const InputPassword: React.FC<InputPasswordTypes> = ({
  name,
  width,
  height,
  block = false,
  value,
  onChange,
  isError = false,
  resetError = () => {},
  disabled = false,
}) => {
  const [isShow, setIsShow] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsShow((prev) => !prev);
  };

  return (
    <label
      className={`${styles.inputWrapper} ${
        validatePassword(value) && !isError
          ? styles.valid
          : isError
          ? styles.error
          : ""
      }`}
      style={{
        width: block ? "100%" : width ? width : "auto",
        height: height ? height : "auto",
      }}
    >
      <span
        className={`${styles.label} ${
          name === "New password" ? styles.newPassword : ""
        }`}
      >
        {name}
      </span>
      <div className={styles.inputInner}>
        <input
          type={isShow ? "text" : "password"}
          name={name}
          value={value}
          onChange={(e) => {
            resetError();
            onChange(e.target.value);
          }}
          disabled={disabled}
        />
        <span className={styles.showBtn} onClick={(e) => handleClick(e)}>
          {!isShow ? <IonIcon src={EyeHide} /> : <IonIcon src={EyeOpen} />}
        </span>
      </div>
    </label>
  );
};

export default InputPassword;
