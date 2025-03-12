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
  scrollTriggerValue = 230,
}) => {
  const outerContentRef = useRef<HTMLDivElement>(null);
  const innerContentRef = useRef<HTMLDivElement>(null);
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    const outerScroller = outerContentRef.current;
    const innerScroller = innerContentRef.current;
    const handleOuterScroll = () => {
      if (outerScroller) {
        const { offsetHeight, scrollTop, scrollHeight } = outerScroller;
        if (offsetHeight + Math.round(scrollTop) >= scrollHeight) {
          setScroll(true);
        } else {
          setScroll(false);
        }
      }
    };

    const handleInnerScroll = () => {
      if (innerScroller) {
        const { scrollTop } = innerScroller;
        if (scrollTop === 0) {
          setScroll(false)
        }
      }
    };

    outerScroller?.addEventListener("scroll", handleOuterScroll);
    innerScroller?.addEventListener("scroll", handleInnerScroll);

    return () => {
      outerScroller?.removeEventListener("scroll", handleOuterScroll);
      innerScroller?.removeEventListener("scroll", handleInnerScroll);
    };
  }, [outerContentRef, innerContentRef]);

  return (
    <div className={styles.pageWrapper} ref={outerContentRef}>
      <img
        src={posterSrc}
        className={styles.poster}
        style={{ position: posterPosition }}
      />
      <div
        className={`${styles.contentBackground} ${
          isBackgroundBlured ? styles.backgroundBlured : ""
        }`}
        style={{
          height: `calc(100% + ${scrollTriggerValue}rem - var(--ion-safe-area-top))`,
        }}
      >
        <div
          ref={innerContentRef}
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
