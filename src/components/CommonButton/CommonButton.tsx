import React from "react";
import styles from "./CommonButton.module.scss";
import { IonRippleEffect } from "@ionic/react";

interface CommonButtonTypes {
  id?: string;
  type?: "button" | "submit" | "reset" | undefined;
  width?: number;
  height?: number;
  block?: boolean;
  borderRadius?: number;
  border?: string;
  label?: string;
  icon?: React.ReactNode;
  color?: string;
  backgroundColor?: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const CommonButton: React.FC<CommonButtonTypes> = ({
  id,
  type = "button",
  width,
  height,
  block = false,
  borderRadius = 0,
  border,
  label,
  icon,
  color,
  backgroundColor,
  className,
  disabled,
  onClick,
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    onClick && onClick();
  };
  return (
    <button
      className={`${styles.wrapper} ${className ? className : undefined} ${
        disabled ? "" : "ion-activatable"
      }`}
      style={{
        width: block ? "100%" : width ? `${width}rem` : "auto",
        height: height ? `${height}rem` : "auto",
        color: color ? color : "inherit",
        backgroundColor: backgroundColor ? backgroundColor : "inherit",
        borderRadius: `${borderRadius}rem`,
        border: border ? border : "none",
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
