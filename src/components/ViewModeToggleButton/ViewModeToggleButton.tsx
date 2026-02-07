import { useEffect, useRef, useState } from "react";
import { createGesture, IonIcon } from "@ionic/react";
import { useLessonTabbarLayout } from "../../hooks/useTabbarLayout";
import { useCourseProgressModalLayout } from "../../hooks/useCourseProgressModalLayout";
import { remToPx } from "../../utils/pxToRem";
import eyeOpen from "../../assets/icons/auth/eye-open.svg";
import eyeHide from "../../assets/icons/auth/eye-hide.svg";
import styles from "./ViewModeToggleButton.module.scss";


const TABBAR_SIZE_Y = 60;
const PROGRESS_MODAL_SIZE_Y = 32;
const HEADER_SIZE_Y = 56;
const BTN_SIZE_X = 50;
const BTN_SIZE_Y = 40;

const ViewModeToggleButton = () => {
  const btnRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showTabbar, hideTabbar] = useLessonTabbarLayout();
  const [showModal, hideModal] = useCourseProgressModalLayout();

  const tabbarSizeY = remToPx(TABBAR_SIZE_Y);
  const progressModalSizeY = remToPx(PROGRESS_MODAL_SIZE_Y);
  const headerSizeY = remToPx(HEADER_SIZE_Y);
  const btnSizeX = remToPx(BTN_SIZE_X);
  const btnSizeY = remToPx(BTN_SIZE_Y);

  const offsetBottom = isFullscreen ? 0 : tabbarSizeY + progressModalSizeY;

  const [position, setPosition] = useState({
    x: window.innerWidth - btnSizeX,
    y: window.innerHeight - offsetBottom - btnSizeY,
  });

  useEffect(() => {
    const el = btnRef.current;
    if (!el) return;

    let startX = 0;
    let startY = 0;

    const middleX = window.innerWidth / 2;

    const gesture = createGesture({
      el,
      gestureName: "view-mode-toggle-drag-button",
      threshold: 0,

      onStart: () => {
        el.style.transition = "none";
        startX = position.x;
        startY = position.y;
      },

      onMove: (ev) => {
        const x = startX + ev.deltaX;

        const y = Math.min(
          window.innerHeight - offsetBottom - btnSizeY,
          Math.max(headerSizeY, startY + ev.deltaY)
        );

        el.style.transform = `translate(${x}px, ${y}px)`;
      },

      onEnd: (ev) => {
        let x = startX + ev.deltaX;
        let y = startY + ev.deltaY;

        y = Math.min(
          window.innerHeight - offsetBottom - btnSizeY,
          Math.max(headerSizeY, y)
        );

        if (x + btnSizeX / 2 < middleX) {
          x = 0;
          el.style.borderRadius = "0 9rem 9rem 0";
          el.style.paddingInline = "14rem 4rem";
        } else {
          x = window.innerWidth - btnSizeX;
          el.style.borderRadius = "9rem 0 0 9rem";
          el.style.paddingInline = "4rem 14rem";
        }

        el.style.transition = "transform 0.25s ease-out";

        setPosition({ x, y });
      },
    });

    gesture.enable();

    return () => gesture.destroy();
  }, [position, isFullscreen]);

  const toggleFullscreen = () => setIsFullscreen(!isFullscreen);

  useEffect(() => {
    if (isFullscreen) {
      hideTabbar();
      hideModal();
    } else {
      showTabbar();
      showModal();

      if (window.innerHeight - offsetBottom - btnSizeY < position.y) {
        if (btnRef.current) {
          btnRef.current.style.transition = "transform 0.25s ease-out";
        }
        setPosition((prev) => ({
          ...prev,
          y: window.innerHeight - offsetBottom - btnSizeY,
        }));
      }
    }
  }, [isFullscreen]);

  useEffect(() => {
    return () => {
      showModal();
      showTabbar();
    };
  }, []);

  return (
    <div
      className={styles.toggleViewContainer}
      ref={btnRef}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
    >
      <button onClick={toggleFullscreen}>
        <span>
          <IonIcon src={isFullscreen ? eyeOpen : eyeHide} />
        </span>
      </button>
    </div>
  );
};

export default ViewModeToggleButton;
