import React from "react";
import styles from "./ProgressBar.module.scss";

interface ProgressBarTypes {
  width?: number | undefined;
  height?: number | undefined;
  value?: number | undefined;
  disabled?: boolean | undefined;
  showValue?: boolean | undefined;
}

const colors = {
  full: "#2DE000",
  high: "#ABFC00",
  medium: "#F7FC00",
  low: "#FCC400",
};

const handleProgressColor = (value: number) => {
  if (0 <= value && value <= 33) {
    return colors.low;
  }
  if (33 < value && value <= 66) {
    return colors.medium;
  }
  if (66 < value && value < 100) {
    return colors.high;
  }
  if (value >= 100) {
    return colors.full;
  }
  return "transparent";
};

const ProgressBar: React.FC<ProgressBarTypes> = ({
  width = 171,
  height = 24,
  value,
  disabled = false,
  showValue = true,
}) => {
  console.log(value);

  return (
    <div
      className={styles.outerWrapper}
      style={{
        width: `${width}rem`,
        height: `${height}rem`,
        borderRadius: `${width * 0.03}rem`,
        padding: `${width * 0.0175}rem`,
      }}
    >
      <div
        className={styles.innerWrapper}
        style={{ borderRadius: `${width * 0.023}rem` }}
      >
        <div
          className={`${styles.progress} ${disabled ? styles.disabled : ""}`}
          style={{
            width: value !== undefined && value <= 100 ? `${value}%` : "100%",
            borderRadius: `${width * 0.023}rem`,
            backgroundColor: value ? `${handleProgressColor(value)}` : "none",
          }}
        ></div>
        {showValue && (
          <span style={{ fontSize: `${(10 / 24) * height}rem` }}>
            {disabled
              ? "Not purchased"
              : value && value >= 100
              ? "Completed"
              : `${value ? value : 0} / 100 %`}
          </span>
        )}
      </div>
    </div>
  );
};

export default ProgressBar;
