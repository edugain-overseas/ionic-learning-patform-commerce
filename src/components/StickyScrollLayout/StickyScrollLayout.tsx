import { FC, ReactNode, useEffect, useRef } from "react";
import {
  useScroll,
  useTransform,
  motion,
  useMotionValueEvent,
} from "motion/react";
import { clamp } from "../../utils/clamp";
import styles from "./StickyScrollLayout.module.scss";

type StickyScrollLayoutProps = {
  children: ReactNode;
  topLabel?: string;
  posterSrc: string;
  topScrollStartPosition?: number;
  topScrollEndPosition?: number;
  onProgressChange?: (progress: number) => void;
};

const labelThreshold = 0.7;

const StickyScrollLayout: FC<StickyScrollLayoutProps> = ({
  children,
  topLabel,
  posterSrc,
  topScrollStartPosition = 310,
  topScrollEndPosition = 106,
  onProgressChange,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll({ container: containerRef });

  const maxOffset = topScrollStartPosition - topScrollEndPosition;

  const progress = useTransform(scrollY, [maxOffset, 0], [1, 0], {
    clamp: true,
  });

  useMotionValueEvent(progress, "change", (value) => {
    onProgressChange?.(value);
  });

  const labelOpacity =
    1 - clamp(0, (progress.get() - labelThreshold) / (1 - labelThreshold), 1);

  useEffect(() => {
    const container = containerRef.current;

    if (container) {
      container.style.setProperty(
        "--defaultStart",
        `${topScrollStartPosition}px`
      );
      container.style.setProperty("--defaultEnd", `${topScrollEndPosition}px`);
    }
    onProgressChange?.(0)
  }, []);

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.posterContainer}>
        <img src={posterSrc} alt={topLabel ? topLabel : "page-poster"} />
      </div>
      <div className={styles.contentContainer}>
        <motion.div className={styles.label} style={{ opacity: labelOpacity }}>
          {topLabel}
        </motion.div>
        {children}
      </div>
    </div>
  );
};

export default StickyScrollLayout;
