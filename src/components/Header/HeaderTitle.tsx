import { FC, useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./Header.module.scss";

const HeaderTitle: FC<{ title: string }> = ({ title }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLSpanElement>(null);
  const [isRendered, setIsRendered] = useState(false);

  useLayoutEffect(() => {
    if (wrapperRef.current && titleRef.current) {
      const wrapperWidth = wrapperRef.current.clientWidth;
      const titleWidth = titleRef.current.clientWidth;
      if (titleWidth > wrapperWidth) {
        titleRef.current.classList.add(styles.carousel);
      }
    }
  }, [isRendered, title]);

  useEffect(() => {
    setIsRendered(true);
  }, []);

  return (
    <div className={styles.titleWrapper} ref={wrapperRef}>
      <span className={styles.title} ref={titleRef}>
        {title}
      </span>
    </div>
  );
};

export default HeaderTitle;
