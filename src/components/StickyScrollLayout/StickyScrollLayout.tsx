import { FC, ReactNode, useEffect, useRef } from "react";
import { useScroll, useTransform, motion } from "motion/react";
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

  const { scrollY } = useScroll({ container: containerRef });

  const maxOffset = topScrollStartPosition - topScrollEndPosition;

  const moveY = useTransform(scrollY, [0, maxOffset], [0, -maxOffset]);

  useEffect(() => {
    const container = containerRef.current;

    if (container) {
      container.style.setProperty(
        "--defaultStart",
        `${topScrollStartPosition}px`
      );
      container.style.setProperty("--defaultEnd", `${topScrollEndPosition}px`);
    }
  }, []);

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.posterContainer}>
        <img src={posterSrc} alt={topLabel ? topLabel : "page-poster"} />
      </div>
      <motion.div className={styles.contentBackground} style={{ y: moveY }}>
        {topLabel && <span className={styles.label}>{topLabel}</span>}
      </motion.div>
      <div className={styles.contentContainer}>{children}</div>
    </div>
  );
};

export default StickyScrollLayout;
