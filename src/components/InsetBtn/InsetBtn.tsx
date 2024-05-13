import React, { MouseEventHandler } from "react";
import styles from "./InsetBtn.module.scss";

interface InsetBtnTypes {
  icon?: React.ReactNode;
  width?: string | undefined;
  height?: string | undefined;
  backgroundColor?: string | undefined;
  onClick?: () => void | undefined;
  disabled?: boolean | undefined;
  id?: string;
}

const InsetBtn: React.FC<InsetBtnTypes> = ({
  icon,
  width = "24px",
  height = "24px",
  backgroundColor,
  onClick = () => {},
  disabled = false,
  id = undefined,
}) => {
  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onClick();
  };
  return (
    <button
      style={{ width, height, fontSize: width }}
      className={styles.insetBtn}
      onClick={handleClick}
      disabled={disabled}
      id={id ? id : undefined}
    >
      <div style={backgroundColor ? { backgroundColor: backgroundColor } : {}}>
        {icon}
      </div>
    </button>
  );
};

export default InsetBtn;
