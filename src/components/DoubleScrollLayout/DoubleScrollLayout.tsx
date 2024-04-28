import React, { useEffect, useRef, useState } from "react";
import styles from "./DoubleScrollLayout.module.scss";

interface DoubleScrollLayoutTypes {
  children: React.ReactNode;
  topLabel?: string;
  posterSrc: string;
  posterPosition?: "fixed" | "absolute";
  isBackgroundBlured?: boolean;
  scrollTriggerValue?: number;
}

const DoubleScrollLayout: React.FC<DoubleScrollLayoutTypes> = ({
  children,
  topLabel,
  posterSrc,
  posterPosition = "fixed",
  isBackgroundBlured = true,
  scrollTriggerValue = 132,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    const scroller = contentRef.current;
    const handleScroll = () => {
      if (scroller && scroller.scrollTop === scrollTriggerValue) {
        setScroll(true);
      } else setScroll(false);
    };

    scroller && scroller.addEventListener("scroll", handleScroll);

    return () => {
      scroller && scroller.removeEventListener("scroll", handleScroll);
    };
  }, [contentRef.current]);
  return (
    <div className={styles.pageWrapper} ref={contentRef}>
      <img
        src={posterSrc}
        className={styles.poster}
        style={{ position: posterPosition }}
      />
      <div
        className={`${styles.contentBackground} ${
          isBackgroundBlured ? styles.backgroundBlured : ""
        }`}
        style={{ height: `calc(100% + ${scrollTriggerValue}px)` }}
      >
        <div
          className={`${styles.contentInner}  ${scroll ? styles.scroll : ""}`}
        >
          <div className={styles.contenWrapper}>{children}</div>
        </div>
        {topLabel && <div className={styles.topLabel}>{topLabel}</div>}
      </div>
    </div>
  );
};

export default DoubleScrollLayout;
