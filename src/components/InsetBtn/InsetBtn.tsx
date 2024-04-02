import React from "react";
import styles from "./InsetBtn.module.scss";

interface InsetBtnTypes {
  icon?: React.ReactNode;
  width?: string | undefined;
  height?: string | undefined;
  backgroundColor?: string | undefined;
  onClick?: () => void | undefined;
  disabled?: boolean | undefined;
}

const InsetBtn: React.FC<InsetBtnTypes> = ({
  icon,
  width = "24px",
  height = "24px",
  backgroundColor,
  onClick = () => {},
  disabled = false,
}) => {
  return (
    <button
      style={{ width, height, fontSize: width }}
      className={styles.insetBtn}
      onClick={onClick}
      disabled={disabled}
    >
      <div style={backgroundColor ? { backgroundColor: backgroundColor } : {}}>
        {icon}
      </div>
    </button>
  );
};

export default InsetBtn;
