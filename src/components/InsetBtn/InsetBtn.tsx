import React from "react";
import styles from "./InsetBtn.module.scss";

interface InsetBtnTypes {
  icon: string | undefined;
  width: string | undefined;
  height: string | undefined;
  onClick: () => void | undefined;
  disabled: boolean | undefined;
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
      <div>
        <img src={icon} />
      </div>
    </button>
  );
};

export default InsetBtn;
