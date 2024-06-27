import { FC, ReactNode, useEffect, useRef, useState } from "react";
import styles from "./CustomSheetModal.module.scss";
import { createPortal } from "react-dom";

type CustomSheetModalType = {
  portalTo?: HTMLElement | HTMLIonTabsElement;
  position?: string[];
  children: ReactNode;
  isOpen?: boolean;
  height?: number;
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
  width,
  breakpoints,
  initialBreakpoint = 1,
  allowFullViewOnLastBreakpoint = false,
  modalBackgroundColor = "rgba(255, 255, 255, 0.9)",
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [currentBreakpoint, setCurrentBreakpoint] =
    useState<number>(initialBreakpoint);

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
  }, []);

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
    const currentBreakpointIndex = breakpoints.findIndex(
      (breakpoint) => breakpoint === currentBreakpoint
    );

    if (currentBreakpointIndex < breakpoints.length - 1) {
      setCurrentBreakpoint(breakpoints[currentBreakpointIndex + 1]);
    } else {
      setCurrentBreakpoint(breakpoints[0]);
    }

    toggleFullView(breakpoints[currentBreakpointIndex + 1]);
  };

  const toggleFullView = (breakpoint: number) => {
    const lastBreakpoint = breakpoints[breakpoints.length - 1];
    if (breakpoint === lastBreakpoint && allowFullViewOnLastBreakpoint) {
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
      <div
        className={styles.backdrop}
        // style={{ inset: Array.from(position, (pos) => pos + "rem").join(" ") }}
      >
        <div
          className={styles.modal}
          style={{
            height: height ? `${currentBreakpoint * height}rem` : "auto",
            width: width || "100%",
          }}
        >
          <div className={styles.handle}>
            <button className={styles.handleButton} onClick={toggleBreakpoint}>
              <span></span>
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
