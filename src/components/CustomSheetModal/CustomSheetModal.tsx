import { FC, ReactNode, useEffect, useRef } from "react";
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
import { useParams } from "react-router";

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
  isAnimating?: boolean;
  id?: string;
};

const CustomSheetModal: FC<CustomSheetModalType> = ({
  children,
  portalTo,
  position = ["0", "0", "0", "0"],
  height,
  width = "100%",
  breakpoints,
  initialBreakpoint = 1,
  allowFullViewOnLastBreakpoint = false,
  modalBackgroundColor = "rgba(255, 255, 255, 0.9)",
  isAnimating,
  id = "",
}) => {
  const { taskId } = useParams<{ taskId: string }>();
  const maxHeight = height * breakpoints[breakpoints.length - 1];

  const modalRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLButtonElement>(null);
  const gesture = useRef<Gesture | null>(null);
  const animation = useRef<Animation | null>(null);
  const started = useRef<boolean>(false);

  const currentHeight = useRef<number>(initialBreakpoint * maxHeight);

  useEffect(() => {
    const closeModal = () => {
      if (started.current) {
        animation.current!.destroy();
        started.current = false;
      }

      createAnimation()
        .addElement(modalContentRef.current!)
        .beforeAddClass(styles.directionUp)
        .afterRemoveClass(styles.directionUp)
        .duration(300)
        .easing("ease-in")
        .fromTo(
          "height",
          `${currentHeight.current}rem`,
          `${breakpoints[0] * height}rem`
        )
        .play();

      modalRef.current?.classList.remove(styles.fullView);

      backdropRef.current?.style.setProperty(
        "background",
        `rgba(255, 255, 255, 0)`
      );
    };
    closeModal();
  }, [taskId]);

  // use effect for setting all css variables, gesture and creating animation
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

      const className =
        ev.deltaY < 0 ? styles.directionUp : styles.directionDown;

      modalContentRef.current?.classList.add(className);

      const step = getStep(ev);

      if (step > breakpoints[breakpoints.length - 2]) {
        const backdropOpacity = clamp(0, step, 1) * 0.65;
        backdropRef.current?.style.setProperty(
          "background",
          `rgba(255, 255, 255, ${backdropOpacity})`
        );
      }

      animation.current!.progressStep(step);
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

      if (step > points[1]) {
        backdropRef.current?.style.setProperty(
          "background",
          `rgba(255, 255, 255, 0.65)`
        );
      } else {
        backdropRef.current?.style.setProperty(
          "background",
          `rgba(255, 255, 255, 0)`
        );
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

  // use effect for handling animation when any outside animation was used
  useEffect(() => {
    if (isAnimating) {
      console.log(isAnimating);

      animation.current?.destroy();
      started.current = false;
    }
  }, [isAnimating]);

  // on handleButton click
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

    if (nextStepIndex === breakpoints.length - 1) {
      backdropRef.current?.style.setProperty(
        "background",
        `rgba(255, 255, 255, 0.65)`
      );
    } else {
      backdropRef.current?.style.setProperty(
        "background",
        `rgba(255, 255, 255, 0)`
      );
    }

    toggleFullView(nextStepIndex);
  };

  // handle modal full view and toggle menu styles
  const toggleFullView = (nextStepIndex: number) => {
    if (
      nextStepIndex === breakpoints.length - 1 &&
      allowFullViewOnLastBreakpoint
    ) {
      modalRef.current?.classList.add(styles.fullView);
    } else {
      modalRef.current?.classList.remove(styles.fullView);
    }
  };

  return createPortal(
    <div className={styles.modalWrapper} ref={modalRef} id={id}>
      <div className={styles.backdrop} ref={backdropRef}></div>
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
            <span className={styles.leftBar}></span>
            <span className={styles.rightBar}></span>
          </button>
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </div>,
    portalTo ? portalTo : document.body
  );
};

export default CustomSheetModal;
