import { FC, ReactNode, useEffect, useRef, useState } from "react";
import styles from "./CustomSheetModal.module.scss";
import { createPortal } from "react-dom";
import {
  Animation,
  Gesture,
  GestureDetail,
  createAnimation,
  createGesture,
} from "@ionic/react";
import { clamp } from "../../utils/clamp";
import { pxToRem } from "../../utils/pxToRem";

type CustomSheetModalType = {
  portalTo?: HTMLElement | HTMLIonTabsElement;
  position?: string[];
  children: ReactNode;
  isOpen?: boolean;
  height: number;
  width?: number;
  breakpoints: number[];
  initialBreakpoint?: number;
  allowFullViewOnLastBreakpoint?: boolean;
  modalBackgroundColor?: string;
};

const CustomSheetModal: FC<CustomSheetModalType> = ({
  children,
  portalTo,
  position = ["0", "0", "0", "0"],
  isOpen = true,
  height,
  width = "100%",
  breakpoints,
  initialBreakpoint = 1,
  allowFullViewOnLastBreakpoint = false,
  modalBackgroundColor = "rgba(255, 255, 255, 0.9)",
}) => {
  const minHeight = height * breakpoints[0];
  const maxHeight = height * breakpoints[breakpoints.length - 1];

  const modalRef = useRef<HTMLDivElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLButtonElement>(null);
  const gesture = useRef<Gesture | null>(null);
  const animation = useRef<Animation | null>(null);
  const started = useRef<boolean>(false);

  const currentHeight = useRef<number>(initialBreakpoint * maxHeight);

  useEffect(() => {
    const modal = modalRef.current;

    modal?.style.setProperty("--modal-background-color", modalBackgroundColor);
    position.forEach((pos, i) => {
      switch (i) {
        case 0:
          modal?.style.setProperty("--top", `${pos}`);
          break;
        case 1:
          modal?.style.setProperty("--right", `${pos}`);
          break;
        case 2:
          modal?.style.setProperty("--bottom", `${pos}`);
          break;
        case 3:
          modal?.style.setProperty("--left", `${pos}`);
          break;
        default:
          break;
      }
    });

    const handle = handleRef.current;
    const modalContent = modalContentRef.current;

    if (handle === null || modalContent === null || animation.current) return;

    animation.current = createAnimation()
      .addElement(modalContent)
      .duration(300)
      .fromTo("height", "0", `${maxHeight}rem`);

    gesture.current = createGesture({
      el: handle,
      gestureName: "custom-sheet-modal-gesture",
      threshold: 0,
      onMove: (ev) => handleMove(ev),
      onEnd: (ev) => handleEnd(ev),
    });

    gesture.current.enable(true);

    const handleMove = (ev: GestureDetail) => {
      if (!started.current) {
        animation.current = createAnimation()
          .addElement(modalContent)
          .duration(300)
          .fromTo("height", "0", `${maxHeight}rem`);

        animation.current!.progressStart();

        started.current = true;
      }

      //   const dicection =
      const className =
        ev.deltaY < 0 ? styles.directionUp : styles.directionDown;

      modalContentRef.current?.classList.add(className);

      //   const hasClassName = Array(modalContentRef.current?.classList)
      //   console.log(hasClassName);

      animation.current!.progressStep(getStep(ev));
    };

    const handleEnd = (ev: GestureDetail) => {
      if (!started.current) {
        return;
      }

      gesture.current!.enable(false);

      const points: number[] = [];
      breakpoints.forEach((breakpoin, index, breakpoints) => {
        if (index !== 0) {
          points.push((breakpoin - breakpoints[index - 1]) / 2);
        }
      });

      const step = getStep(ev);

      if (step <= points[0]) {
        currentHeight.current = height * breakpoints[0];
        animation.current?.progressStep(breakpoints[0]);
        toggleFullView(0);
      } else if (step > points[0] && step <= points[1]) {
        currentHeight.current = height * breakpoints[1];
        animation.current?.progressStep(breakpoints[1]);
        toggleFullView(1);
      } else if (step > points[1]) {
        currentHeight.current = height * breakpoints[2];
        animation.current?.progressEnd(1, step);
        toggleFullView(2);
      }

      modalContentRef.current?.classList.remove(styles.directionDown);
      modalContentRef.current?.classList.remove(styles.directionUp);

      gesture.current!.enable(true);
    };

    const getStep = (ev: GestureDetail) => {
      const delta = currentHeight.current - pxToRem(ev.deltaY);
      const step = clamp(0, delta / maxHeight, 1);
      return step;
    };
  }, [modalRef, handleRef]);

  useEffect(() => {
    const toogleMenuBtn = document.querySelector(".custom-toggle-menu");
    if (
      allowFullViewOnLastBreakpoint &&
      initialBreakpoint === breakpoints[breakpoints.length - 1]
    ) {
      toogleMenuBtn?.classList.add(styles.hide);
    }

    return () => toogleMenuBtn?.classList.remove(styles.hide);
  }, []);

  const toggleBreakpoint = () => {
    const currentStep = currentHeight.current / maxHeight;
    const currentStepIndex = breakpoints.findIndex(
      (breakpoint) => breakpoint === currentStep
    );
    const nextStepIndex = currentStepIndex + 1;

    const nexStep = breakpoints[nextStepIndex];

    if (started.current) {
      animation.current!.destroy();
      started.current = false;
    }

    if (currentStepIndex < breakpoints.length - 1) {
      createAnimation()
        .addElement(modalContentRef.current!)
        .beforeAddClass(styles.directionUp)
        .afterRemoveClass(styles.directionUp)
        .duration(300)
        .easing("ease-in")
        .fromTo(
          "height",
          `${currentHeight.current}rem`,
          `${nexStep * height}rem`
        )
        .play();

      currentHeight.current = height * nexStep;
    } else {
      createAnimation()
        .addElement(modalContentRef.current!)
        .beforeAddClass(styles.directionDown)
        .afterRemoveClass(styles.directionDown)
        .duration(300)
        .easing("ease-out")
        .fromTo(
          "height",
          `${currentHeight.current}rem`,
          `${breakpoints[0] * height}rem`
        )
        .play();

      currentHeight.current = height * breakpoints[0];
    }

    toggleFullView(nextStepIndex);
  };

  const toggleFullView = (nextStepIndex: number) => {
    if (
      nextStepIndex === breakpoints.length - 1 &&
      allowFullViewOnLastBreakpoint
    ) {
      modalRef.current?.classList.add(styles.fullView);
      document.querySelector(".custom-toggle-menu")?.classList.add(styles.hide);
    } else {
      modalRef.current?.classList.remove(styles.fullView);
      document
        .querySelector(".custom-toggle-menu")
        ?.classList.remove(styles.hide);
    }
  };

  return createPortal(
    <div className={styles.modalWrapper} ref={modalRef}>
      <div className={styles.backdrop}>
        <div
          className={styles.modal}
          style={{
            height: `${initialBreakpoint * height}rem`,
            width: width,
          }}
          ref={modalContentRef}
          id="custom-sheet-modal-content"
        >
          <div className={styles.handle}>
            <button
              className={styles.handleButton}
              onClick={toggleBreakpoint}
              ref={handleRef}
            >
              {/* <span></span> */}
              <span className={styles.leftBar}></span>
              <span className={styles.rightBar}></span>
            </button>
          </div>
          <div className={styles.content}>{children}</div>
        </div>
      </div>
    </div>,
    portalTo ? portalTo : document.body
  );
};

export default CustomSheetModal;
