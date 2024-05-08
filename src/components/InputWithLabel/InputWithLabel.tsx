import { ComponentProps, FC } from "react";
import styles from "./InputWithLabel.module.scss";
import { UseFormRegisterReturn } from "react-hook-form";

interface InputWithLabelTypes extends ComponentProps<"input"> {
  label?: string;
  placeholder?: string;
  errorMessage?: string;
  registerProps?: UseFormRegisterReturn;
}

const InputWithLabel: FC<InputWithLabelTypes> = ({
  label,
  errorMessage,
  registerProps,
  ...rest
}) => {
  return (
    <label className={styles.wrapper}>
      {label && <span className={styles.inputName}>{label}:</span>}
      <input className={styles.input} {...registerProps} {...rest} />
      {errorMessage && <span className={styles.error}>{errorMessage}</span>}
    </label>
  );
};

export default InputWithLabel;
