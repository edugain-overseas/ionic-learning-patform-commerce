import React from "react";
import styles from "./InsetBtn.module.scss";

interface InsetBtnTypes {
  icon?: React.ReactNode;
  width?: string | undefined;
  height?: string | undefined;
  onClick?: () => void | undefined;
  disabled?: boolean | undefined;
}

const InsetBtn: React.FC<InsetBtnTypes> = ({
  icon,
  width = "24px",
  height = "24px",
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
      <div>{icon}</div>
    </button>
  );
};

export default InsetBtn;
