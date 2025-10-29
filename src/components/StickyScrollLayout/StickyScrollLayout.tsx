import { FC, ReactNode, useEffect, useRef } from "react";
import styles from "./StickyScrollLayout.module.scss";

type StickyScrollLayoutProps = {
  children: ReactNode;
  topLabel?: string;
  posterSrc: string;
  topScrollStartPosition?: number;
  topScrollEndPosition?: number;
};

const StickyScrollLayout: FC<StickyScrollLayoutProps> = ({
  children,
  topLabel,
  posterSrc,
  topScrollStartPosition = 310,
  topScrollEndPosition = 68,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (container) {
      container.style.setProperty("--defaultStart", `${topScrollStartPosition}px`);
      container.style.setProperty("--defaultEnd", `${topScrollEndPosition}px`);
    }
  }, []);

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.posterContainer}>
        <img src={posterSrc} alt={topLabel ? topLabel : "page-poster"} />
      </div>
      <div className={styles.contentBackground}>
        {topLabel && <span className={styles.label}>{topLabel}</span>}
      </div>
      <div className={styles.contentContainer}>{children}</div>
    </div>
  );
};

export default StickyScrollLayout;

