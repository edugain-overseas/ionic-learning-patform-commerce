import { FC, ReactNode, useEffect, useRef } from "react";
import {
  useScroll,
  useTransform,
  motion,
  useMotionValueEvent,
  animate,
} from "motion/react";
import { clamp } from "../../utils/clamp";
import styles from "./StickyScrollLayout.module.scss";

type StickyScrollLayoutProps = {
  children: ReactNode;
  topLabel?: string;
  posterSrc: string;
  topScrollStartPosition?: number;
  topScrollEndPosition?: number;
  snapTrashhold?: number;
  onProgressChange?: (progress: number) => void;
};

const labelThreshold = 0.9;
const contentBorderTreshold = 0.9;

const StickyScrollLayout: FC<StickyScrollLayoutProps> = ({
  children,
  topLabel,
  posterSrc,
  topScrollStartPosition = 310,
  topScrollEndPosition = 106,
  snapTrashhold = 0.7,
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

  const labelVisibility = progress.get() < labelThreshold;

  const borderRadius =
    16 -
    16 *
      clamp(
        0,
        (progress.get() - contentBorderTreshold) / (1 - contentBorderTreshold),
        1
      );

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.style.setProperty(
        "--defaultStart",
        `${topScrollStartPosition}px`
      );
      container.style.setProperty("--defaultEnd", `${topScrollEndPosition}px`);
    }
    onProgressChange?.(0);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ro = new ResizeObserver(() => {
      el.style.setProperty("--offset-height", `${el.offsetHeight}px`);
    });

    ro.observe(el);

    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let timeout: any;
    let lastScrollTop = el.scrollTop;
    let scrollDirection: "up" | "down" | null = null;
    let isSnapping = false;

    const handleScroll = () => {
      if (isSnapping) return;

      const currentScrollTop = el.scrollTop;

      if (currentScrollTop > lastScrollTop) {
        scrollDirection = "down";
      } else if (currentScrollTop < lastScrollTop) {
        scrollDirection = "up";
      }

      lastScrollTop = currentScrollTop;

      clearTimeout(timeout);

      timeout = setTimeout(() => {
        const currentProgress = progress.get();
        if (currentProgress < snapTrashhold || currentProgress >= 1) return;

        let targetScroll: number;

        if (scrollDirection === "down") {
          targetScroll = maxOffset;
        } else {
          targetScroll = 0;
        }

        isSnapping = true;

        animate(el.scrollTop, targetScroll, {
          duration: 0.35,
          ease: "easeOut",
          onUpdate: (value) => {
            el.scrollTop = value;
          },
          onComplete: () => {
            isSnapping = false;
          },
        });
      }, 150);
    };

    el.addEventListener("scroll", handleScroll);

    return () => {
      el.removeEventListener("scroll", handleScroll);
    };
  }, [maxOffset]);

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.posterContainer}>
        <img src={posterSrc} alt={topLabel ? topLabel : "page-poster"} />
      </div>
      <div className={styles.paddingTop} />
      <motion.div
        className={styles.stickyBg}
        style={{ borderRadius: `${borderRadius}rem` }}
      />
      <div className={styles.contentContainer}>
        <motion.div
          className={styles.label}
          style={{ opacity: labelVisibility ? 1 : 0 }}
        >
          {topLabel}
        </motion.div>
        {children}
      </div>
    </div>
  );
};

export default StickyScrollLayout;
