import React, { MouseEvent } from "react";
import styles from "./CommonButton.module.scss";
import { IonRippleEffect } from "@ionic/react";

interface CommonButtonTypes {
  id?: string;
  type?: "button" | "submit" | "reset";
  width?: number;
  height?: number | string;
  block?: boolean;
  borderRadius?: number;
  border?: string;
  label?: string;
  icon?: React.ReactNode;
  color?: string;
  backgroundColor?: string;
  className?: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

const CommonButton: React.FC<CommonButtonTypes> = ({
  id,
  type = "button",
  width,
  height = "auto",
  block = false,
  borderRadius = 5,
  border,
  label,
  icon,
  color,
  backgroundColor,
  className,
  disabled,
  onClick,
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
  };
  return (
    <button
      className={`${styles.wrapper} ${className ? className : undefined} ${
        disabled ? "" : "ion-activatable"
      }`}
      style={{
        width: block ? "100%" : width ? `${width}rem` : "auto",
        height: typeof height === "number" ? `${height}rem` : height,
        backgroundColor: backgroundColor && backgroundColor,
        borderRadius: `${borderRadius}rem`,
        border: border ? border : "none",
        color: color && color,
      }}
      onClick={handleClick}
      id={id}
      type={type}
      disabled={disabled}
    >
      {label && <span className={styles.label}>{label}</span>}
      {icon && icon}
      {!disabled && <IonRippleEffect></IonRippleEffect>}
    </button>
  );
};

export default CommonButton;
