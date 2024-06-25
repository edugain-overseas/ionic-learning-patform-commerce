import React, { useEffect, useRef, useState } from "react";
import styles from "./DoubleScrollLayout.module.scss";
import { remToPx } from "../../utils/pxToRem";
import { ScrollCustomEvent } from "@ionic/react";

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
      if (scroller) {
        const { offsetHeight, scrollTop, scrollHeight } = scroller;
        if (
          // scroller &&
          // Math.round(scroller.scrollTop) ===
          //   Math.round(remToPx(scrollTriggerValue))
          offsetHeight + scrollTop ===
          scrollHeight
        ) {
          setScroll(true);
        } else setScroll(false);
      }
    };

    scroller?.addEventListener("scroll", handleScroll);

    return () => scroller?.removeEventListener("scroll", handleScroll);
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
        style={{ height: `calc(100% + ${scrollTriggerValue}rem)` }}
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
