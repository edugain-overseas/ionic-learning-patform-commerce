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
  type?: 'email' | 'text';
  placeholder: string;
  registerProps: UseFormRegisterReturn;
  error?: string;
  status?: "valid" | "error" | false;
  width?: string;
  height?: string;
  block?: boolean;
  disabled?: boolean;
}

const InputText: React.FC<InputTextTypes> = ({
  name,
  type='text',
  placeholder,
  registerProps,
  error,
  status,
  width,
  height,
  block = false,
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
      <input type={type} {...registerProps} disabled={disabled} />
      <p className={styles.errorMessage}>{error}</p>
    </label>
  );
};

export default InputText;
