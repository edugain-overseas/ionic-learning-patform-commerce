import React from "react";
import {
  validateEmail,
  validateText,
  validateCode,
} from "../../../utils/inputsValidateHandler";
import styles from "./Inputs.module.scss";

interface InputTextTypes {
  name: string;
  value: string;
  onChange: (value: string) => void;
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
  width,
  height,
  block = false,
  value,
  onChange,
  isError = false,
  resetError = () => {},
  disabled = false,
}) => {
  return (
    <label
      className={`${styles.inputWrapper} ${
        isStateValid(name, value) && !isError
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
          name === "Recovery code" ? styles.newPassword : ""
        }`}
      >
        {name}
      </span>
      <input
        type="text"
        name={name}
        value={value}
        onChange={(e) => {
          resetError();
          onChange(e.target.value);
        }}
        disabled={disabled}
      />
    </label>
  );
};

export default InputText;
