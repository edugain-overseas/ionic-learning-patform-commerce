import { FC, ReactElement, useEffect, useRef } from "react";
import styles from "./Header.module.scss";

const HeaderTitle: FC<{ title: string | ReactElement }> = ({ title }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    requestAnimationFrame(() => {
      if (wrapperRef.current && titleRef.current) {
        const wrapperWidth = wrapperRef.current.clientWidth;
        const titleWidth = titleRef.current.clientWidth;
        if (titleWidth > wrapperWidth) {
          titleRef.current.classList.add(styles.carousel);
        }
      }
    });
  }, [title]);

  return (
    <div className={styles.titleWrapper} ref={wrapperRef}>
      <span className={styles.title} ref={titleRef}>
        {title}
      </span>
    </div>
  );
};

export default HeaderTitle;
