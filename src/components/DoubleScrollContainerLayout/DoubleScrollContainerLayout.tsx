import { FC } from "react";
import styles from "./DoubleScrollContainerLayout.module.scss";

interface DoubleScrollContainerLayoutType {
  children: React.ReactNode;
  topLabel?: string;
  posterSrc: string;
  posterPosition?: "fixed" | "absolute";
  isBackgroundBlured?: boolean;
}

const DoubleScrollContainerLayout: FC<DoubleScrollContainerLayoutType> = ({
  children,
  topLabel,
  posterSrc,
  posterPosition = "fixed",
  isBackgroundBlured = true,
}) => {
  return (
    <div className={styles.pageWrapper}>
      <img
        src={posterSrc}
        className={styles.poster}
        style={{ position: posterPosition }}
      />
      <div
        className={`${styles.contentBackground} ${
          isBackgroundBlured ? styles.backgroundBlured : ""
        }`}
      ></div>
      <div className={styles.contentInner}>
        <div className={styles.contenWrapper}>{children}</div>
      </div>
      {/* {topLabel && <div className={styles.topLabel}>{topLabel}</div>} */}
    </div>
  );
};

export default DoubleScrollContainerLayout;
