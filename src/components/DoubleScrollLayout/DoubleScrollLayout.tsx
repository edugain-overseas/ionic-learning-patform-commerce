import React, { useEffect, useRef, useState } from "react";
import styles from "./DoubleScrollLayout.module.scss";

interface DoubleScrollLayoutTypes {
  children: React.ReactNode;
  topLabel?: string;
  posterSrc: string;
  posterPosition?: "fixed" | "absolute";
}

const DoubleScrollLayout: React.FC<DoubleScrollLayoutTypes> = ({
  children,
  topLabel,
  posterSrc,
  posterPosition = "fixed",
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    const scroller = contentRef.current;
    const handleScroll = () => {
      if (scroller && scroller.scrollTop === 132) {
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
      <div className={styles.contentBackground}>
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
