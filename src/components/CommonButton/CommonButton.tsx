import React from "react";
import styles from "./CommonButton.module.scss";

interface CommonButtonTypes {
  width?: number;
  height?: number;
  borderRadius?: number;
  border?: string;
  label?: string;
  icon?: React.ReactNode;
  color?: string;
  backgroundColor?: string;
  onClick: () => void;
}

const CommonButton: React.FC<CommonButtonTypes> = ({
  width,
  height,
  borderRadius = 0,
  border,
  label,
  icon,
  color,
  backgroundColor,
  onClick = () => {},
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    onClick();
  };
  return (
    <button
      className={styles.wrapper}
      style={{
        width: width ? `${width}px` : "auto",
        height: height ? `${height}px` : "auto",
        color: color ? color : "inherit",
        backgroundColor: backgroundColor ? backgroundColor : "inherit",
        borderRadius: `${borderRadius}px`,
        border: border ? border : "none",
      }}
      onClick={handleClick}
    >
      {label && <span className={styles.label}>{label}</span>}
      {icon && icon}
    </button>
  );
};

export default CommonButton;
