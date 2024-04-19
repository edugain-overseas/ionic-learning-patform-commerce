import React, { useState } from "react";
import { IonIcon } from "@ionic/react";
import EyeOpen from "../../../assets/icons/auth/eye-open.svg";
import EyeHide from "../../../assets/icons/auth/eye-hide.svg";
import styles from "./Inputs.module.scss";
import { UseFormRegisterReturn } from "react-hook-form";

interface InputPasswordTypes {
  name: string;
  placeholder: string;
  registerProps: UseFormRegisterReturn;
  error?: string;
  status?: "valid" | "error" | false;
  height?: string;
  width?: string;
  block?: boolean;
  isError?: boolean;
  resetError?: () => void;
  disabled?: boolean;
}

const InputPassword: React.FC<InputPasswordTypes> = ({
  name,
  placeholder,
  registerProps,
  error,
  status,
  width,
  height,
  block = false,
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
      className={`${styles.inputWrapper} ${status ? styles[status] : ""}`}
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
        {placeholder}
      </span>
      <div className={styles.inputInner}>
        <input
          {...registerProps}
          type={isShow ? "text" : "password"}
          disabled={disabled}
        />
        <span className={styles.showBtn} onClick={(e) => handleClick(e)}>
          {!isShow ? <IonIcon src={EyeHide} /> : <IonIcon src={EyeOpen} />}
        </span>
      </div>
      <p className={styles.errorMessage}>{error}</p>
    </label>
  );
};

export default InputPassword;
