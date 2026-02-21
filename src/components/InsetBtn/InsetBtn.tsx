import React, { MouseEvent, MouseEventHandler } from "react";
import styles from "./InsetBtn.module.scss";
import { IonRippleEffect } from "@ionic/react";

type InsetBtnType = {
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
  type?: "button" | "submit" | "reset";
};

const InsetBtn: React.FC<InsetBtnType> = ({
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
  type = "button",
}) => {
  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    if (type !== "submit") {
      e.preventDefault();
      e.stopPropagation();
    }
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
      type={type}
    >
      <div style={backgroundColor ? { backgroundColor: backgroundColor } : {}}>
        {icon}
      </div>
      {ripple && <IonRippleEffect></IonRippleEffect>}
    </button>
  );
};

export default InsetBtn;
