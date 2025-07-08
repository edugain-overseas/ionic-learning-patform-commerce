import { useEffect, useRef, useState } from "react";
import image from "../../assets/images/subject_image.png";
import styles from "./StickyScrollLayout.module.scss";

type StickyScrollLayoutProps = {
  children: React.ReactNode;
  topLabel?: string;
  posterSrc: string;
  startPosition?: number;
  endPosition?: number;
};

const StickyScrollLayout = ({
  children,
  topLabel,
  posterSrc,
  startPosition = 310,
  endPosition = 68,
}: StickyScrollLayoutProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = () => {
    const scrollTop = containerRef.current!.scrollTop;

    setScrollY(scrollTop);
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.setProperty(
        "--startPosition",
        `${startPosition}px`
      );
      containerRef.current.style.setProperty(
        "--endPosition",
        `${endPosition}px`
      );
    }
  }, [startPosition, endPosition, containerRef.current]);

  return (
    <div
      className={styles.container}
      onScroll={handleScroll}
      ref={containerRef}
    >
      <div className={styles.top}>
        <img src={posterSrc} />
      </div>

      <div className={styles.bottom}>
        {topLabel && <div className={styles.topLabel}>{topLabel}</div>}
        <div className={styles.bottomBg}>
          <div className={styles.contentInner}>
            <div
              className={styles.scrollingText}
              style={{
                transform: `translateY(-${Math.max(
                  0,
                  scrollY - (startPosition - endPosition)
                )}px)`,
              }}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickyScrollLayout;
