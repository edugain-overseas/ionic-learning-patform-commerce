import React from "react";
import styles from "./CommonButton.module.scss";

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
  onClick,
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (type !== "submit") {
      e.preventDefault();
      e.stopPropagation();
    }    
    onClick && onClick();
  };
  return (
    <button
      className={`${styles.wrapper} ${className ? className : undefined}`}
      style={{
        width: block ? "100%" : width ? `${width}px` : "auto",
        height: height ? `${height}px` : "auto",
        color: color ? color : "inherit",
        backgroundColor: backgroundColor ? backgroundColor : "inherit",
        borderRadius: `${borderRadius}px`,
        border: border ? border : "none",
      }}
      onClick={handleClick}
      id={id}
      type={type}
    >
      {label && <span className={styles.label}>{label}</span>}
      {icon && icon}
    </button>
  );
};

export default CommonButton;
