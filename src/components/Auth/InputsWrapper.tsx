import { FC, ReactNode, useEffect, useRef } from "react";
import styles from "./Auth.module.scss";
import { measureTextWidth } from "../../utils/measureTextWidth";

const InputsWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapperRef.current) return;

    const labels =
      wrapperRef.current.querySelectorAll<HTMLSpanElement>("label > span");
    if (!labels.length) return;

    let maxWidth = 0;

    labels.forEach((label) => {
      const computedStyle = window.getComputedStyle(label);
      const font = `${computedStyle.fontWeight} ${computedStyle.fontSize} ${computedStyle.fontFamily}`;
      const textWidth = measureTextWidth(label.textContent || "", font);

      maxWidth = Math.max(maxWidth, Math.round(textWidth));
    });

    if (maxWidth > 0) {
      labels.forEach((label) => {
        label.style.minWidth = `${maxWidth}px`;
      });
    }
  }, []);

  return (
    <div className={styles.inputsWrapper} ref={wrapperRef}>
      {children}
    </div>
  );
};

export default InputsWrapper;
