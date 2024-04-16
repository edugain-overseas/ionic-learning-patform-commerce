import React from "react";
import styles from "./InputWithLabel.module.scss";

interface InputWithLabelTypes {
  value: string;
  onChange: (value: string) => void;
  name?: string;
}

const InputWithLabel: React.FC<InputWithLabelTypes> = ({
  value,
  onChange,
  name,
}) => {
  return (
    <label className={styles.wrapper}>
      {name && <span className={styles.inputName}>{name}:</span>}
      <input
        className={styles.input}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
};

export default InputWithLabel;
