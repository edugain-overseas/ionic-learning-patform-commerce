import { FC, ReactNode, useEffect, useRef, useState } from "react";
import styles from "./LessonToolsPanel.module.scss";
import { Gesture, GestureDetail, createGesture } from "@ionic/react";
import { remToPx } from "../../utils/pxToRem";

type LessonToolsPanelProps = {
  children: ReactNode;
  inset?: string;
};

const LessonToolsPanel: FC<LessonToolsPanelProps> = ({ children, inset }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const gesture = useRef<Gesture | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  useEffect(() => {
    if (gesture.current) {
      gesture.current.destroy();
    }

    if (containerRef.current) {
      gesture.current = createGesture({
        gestureName: "lessonToolsPanel",
        el: containerRef.current,
        threshold: 10,
        direction: "x",
        onMove,
        onEnd,
      });

      gesture.current.enable();
    }
  }, [isPanelOpen]);

  const onMove = (details: GestureDetail) => {
    const deltaX = details.deltaX;
    const maxDeltaX = containerRef.current!.clientWidth - remToPx(50);

    containerRef.current!.style.removeProperty("transition");

    if (!isPanelOpen) {
      if (Math.abs(deltaX) < maxDeltaX && deltaX < 0) {
        containerRef.current?.style.setProperty(
          "transform",
          `translateX(${deltaX}px)`
        );
      } else if (deltaX >= 0) {
        containerRef.current?.style.setProperty("transform", `translateX(0)`);
      } else {
        containerRef.current?.style.setProperty(
          "transform",
          `translateX(calc(-100% + 50rem))`
        );
      }
    } else {
      if (deltaX > 0 && deltaX < maxDeltaX) {
        containerRef.current?.style.setProperty(
          "transform",
          `translateX(calc(-100% + 50rem + ${deltaX}px))`
        );
      } else if (deltaX <= 0) {
        containerRef.current?.style.setProperty(
          "transform",
          `translateX(calc(-100% + 50rem))`
        );
      } else {
        containerRef.current?.style.setProperty("transform", `translateX(0)`);
      }
    }
  };

  const onEnd = (details: GestureDetail) => {
    const shouldOpenPanel =
      !isPanelOpen &&
      Math.abs(details.deltaX) >
        containerRef.current!.offsetWidth / 2 - remToPx(50);

    const shouldClosePanel =
      isPanelOpen &&
      Math.abs(details.deltaX) > containerRef.current!.offsetWidth / 2;

    containerRef.current!.style.setProperty(
      "transition",
      "transform 0.2s ease"
    );

    if (shouldOpenPanel) {
      containerRef.current!.style.setProperty(
        "transform",
        `translateX(calc(-100% + 50rem))`
      );
      if (!isPanelOpen) {
        setIsPanelOpen(true);
      }
    } else if (shouldClosePanel) {
      containerRef.current!.style.setProperty("transform", `translateX(0)`);
      if (isPanelOpen) {
        setIsPanelOpen(false);
      }
    } else {
      // Reset position based on current state
      containerRef.current!.style.setProperty(
        "transform",
        isPanelOpen ? `translateX(calc(-100% + 50rem))` : `translateX(0)`
      );
    }
  };

  return (
    <div
      ref={containerRef}
      className={styles.container}
      style={{ inset: inset }}
    >
      {children}
    </div>
  );
};

export default LessonToolsPanel;
