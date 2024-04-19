import React from "react";
import {
  validateEmail,
  validateText,
  validateCode,
} from "../../../utils/inputsValidateHandler";
import styles from "./Inputs.module.scss";
import { UseFormRegisterReturn } from "react-hook-form";

interface InputTextTypes {
  name: string;
  placeholder: string;
  registerProps: UseFormRegisterReturn;
  error?: string;
  status?: "valid" | "error" | false;
  width?: string;
  height?: string;
  block?: boolean;
  isError?: boolean;
  resetError?: () => void;
  disabled?: boolean;
}

const isStateValid = (name: string, value: string) => {
  switch (name) {
    case "Email":
      return validateEmail(value);
    case "Verificarion code":
      return validateCode(value);
    case "Recovery code":
      return validateCode(value);
    default:
      return validateText(value);
  }
};

const InputText: React.FC<InputTextTypes> = ({
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
          name === "Recovery code" ? styles.newPassword : ""
        }`}
      >
        {placeholder}
      </span>
      <input type="text" {...registerProps} disabled={disabled} />
      <p className={styles.errorMessage}>{error}</p>
    </label>
  );
};

export default InputText;
