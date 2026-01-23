import { FC, ReactNode, useEffect, useRef } from "react";
import {
  useScroll,
  useTransform,
  motion,
  useMotionValueEvent,
} from "motion/react";
import styles from "./StickyScrollLayout.module.scss";

type StickyScrollLayoutProps = {
  children: ReactNode;
  topLabel?: string;
  posterSrc: string;
  topScrollStartPosition?: number;
  topScrollEndPosition?: number;
  onProgressChange?: (progress: number) => void;
};

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
      <div className={styles.contentContainer}>{children}</div>
    </div>
  );
};

export default StickyScrollLayout;
