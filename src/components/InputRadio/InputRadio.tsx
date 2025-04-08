import React, { ChangeEventHandler } from "react";
import styles from "./InputRadio.module.scss";

interface InputRadioType {
  className?: CSSModuleClasses | string;
  name: string;
  value?: number;
  checked: boolean;
  labelText: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const InputRadio: React.FC<InputRadioType> = ({
  className,
  name,
  value,
  checked,
  labelText,
  onChange,
}) => {
  return (
    <label
      className={`${className ? className : ""} ${
        checked ? `${styles.option} ${styles.optionChecked}` : styles.option
      }`}
    >
      <span className={styles.radioBtn}></span>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      {labelText}
    </label>
  );
};

export default InputRadio;
