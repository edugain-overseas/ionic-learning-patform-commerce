import { FC, useEffect, useRef, useState } from "react";
import { pxToRem } from "../../utils/pxToRem";
import styles from "./PrimaryScrollConteinerLayout.module.scss";

interface DoubleScrollContainerLayoutType {
  children: React.ReactNode;
  topLabel?: string;
  posterSrc: string;
  startPosition?: number;
  endPosition?: number;
}

const PrimaryScrollConteinerLayout: FC<DoubleScrollContainerLayoutType> = ({
  children,
  topLabel,
  posterSrc,
  startPosition = 310,
  endPosition = 68,
}) => {
  const pageWrapperRef = useRef<HTMLDivElement | null>(null);
  const backgroundRef = useRef<HTMLDivElement | null>(null);
  const [isTrigerReached, setIsTriggerReached] = useState(false);
  const [pageContentHeight, setPageContentHeight] = useState(0);

  const labelHeight = topLabel ? 24 : 0;
  const bgTriggerPosition = startPosition - endPosition;
  const scrollMarginTrigger = bgTriggerPosition - labelHeight / 2;

  useEffect(() => {
    const handleScroll = () => {
      if (!pageWrapperRef.current || !backgroundRef.current) {
        return;
      }

      const scrollValueInRem = pxToRem(pageWrapperRef.current?.scrollTop);

      if (scrollValueInRem >= scrollMarginTrigger) {
        if (!isTrigerReached) {
          setIsTriggerReached(true);
        }
      }

      if (scrollValueInRem && scrollValueInRem < scrollMarginTrigger) {
        setIsTriggerReached(false);
      }
    };

    pageWrapperRef.current?.addEventListener("scroll", handleScroll);

    return () =>
      pageWrapperRef.current?.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    requestAnimationFrame(() => {
      if (pageWrapperRef.current?.clientHeight && !pageContentHeight) {
        setPageContentHeight(pxToRem(pageWrapperRef.current?.clientHeight));
      }
    });
  }, [pageWrapperRef.current]);

  console.log(isTrigerReached);

  return (
    <>
      <img
        src={posterSrc}
        className={styles.poster}
        style={{
          height: `calc(${startPosition + 16}rem + var(--ion-safe-area-top))`,
        }}
      />
      <div
        className={styles.pageWrapper}
        ref={pageWrapperRef}
        style={{
          marginTop: isTrigerReached
            ? `calc(${endPosition + labelHeight / 2}rem)`
            : `calc(${endPosition - labelHeight / 2}rem)`,
          height: `calc(100% - ${endPosition - labelHeight / 2}rem)`,
          paddingTop: `${bgTriggerPosition}rem`,
        }}
      >
        <div
          className={`${styles.contentBackground}`}
          ref={backgroundRef}
          style={{
            height: `calc(100% + ${scrollMarginTrigger}rem)`,
            position: isTrigerReached ? "fixed" : "sticky",
            top: isTrigerReached
              ? `calc(${endPosition}rem + var(--ion-safe-area-top))`
              : `-${scrollMarginTrigger}rem`,
          }}
        >
          {topLabel && <div className={styles.topLabel}>{topLabel}</div>}
        </div>
        <div
          className={styles.contentInner}
          style={{
            marginTop: isTrigerReached
              ? `-${labelHeight}rem`
              : `calc(-${pageContentHeight - labelHeight / 2}rem)`,
          }}
        >
          <div className={styles.contenWrapper}>{children}</div>
        </div>
      </div>
    </>
  );
};

export default PrimaryScrollConteinerLayout;
