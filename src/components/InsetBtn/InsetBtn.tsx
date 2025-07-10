import React, { MouseEvent, MouseEventHandler } from "react";
import styles from "./InsetBtn.module.scss";
import { IonRippleEffect } from "@ionic/react";

interface InsetBtnTypes {
  icon?: React.ReactNode;
  width?: string | undefined;
  height?: string | undefined;
  fontSize?: string | undefined;
  buttonClassName?: string | undefined;
  backgroundColor?: string | undefined;
  buttonBackgroundColor?: string | undefined;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean | undefined;
  id?: string;
  ripple?: boolean;
}

const InsetBtn: React.FC<InsetBtnTypes> = ({
  icon,
  width = "24rem",
  height = "24rem",
  fontSize,
  buttonClassName,
  buttonBackgroundColor,
  backgroundColor,
  id,
  onClick = () => {},
  disabled = false,
  ripple = false,
}) => {
  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onClick(e);
  };

  return (
    <button
      style={{
        width,
        height,
        fontSize: fontSize ? fontSize : width,
        backgroundColor: buttonBackgroundColor,
      }}
      className={`${styles.insetBtn} ion-activatable ${
        buttonClassName ? buttonClassName : ""
      }`}
      onClick={handleClick}
      disabled={disabled}
      id={id}
    >
      <div style={backgroundColor ? { backgroundColor: backgroundColor } : {}}>
        {icon}
      </div>
      {ripple && <IonRippleEffect></IonRippleEffect>}
    </button>
  );
};

export default InsetBtn;
