// import { useEffect, useRef, useState } from "react";
// import { createGesture, IonIcon } from "@ionic/react";
// import { useLessonTabbarLayout } from "../../hooks/useTabbarLayout";
// import { useCourseProgressModalLayout } from "../../hooks/useCourseProgressModalLayout";
// import { remToPx } from "../../utils/pxToRem";
// import eyeOpen from "../../assets/icons/auth/eye-open.svg";
// import eyeHide from "../../assets/icons/auth/eye-hide.svg";
// import styles from "./ViewModeToggleButton.module.scss";


// const TABBAR_SIZE_Y = 60;
// const PROGRESS_MODAL_SIZE_Y = 32;
// const HEADER_SIZE_Y = 56;
// const BTN_SIZE_X = 50;
// const BTN_SIZE_Y = 40;

// const ViewModeToggleButton = () => {
//   const btnRef = useRef<HTMLDivElement>(null);
//   const [isFullscreen, setIsFullscreen] = useState(false);
//   const [showTabbar, hideTabbar] = useLessonTabbarLayout();
//   const [showModal, hideModal] = useCourseProgressModalLayout();

//   const tabbarSizeY = remToPx(TABBAR_SIZE_Y);
//   const progressModalSizeY = remToPx(PROGRESS_MODAL_SIZE_Y);
//   const headerSizeY = remToPx(HEADER_SIZE_Y);
//   const btnSizeX = remToPx(BTN_SIZE_X);
//   const btnSizeY = remToPx(BTN_SIZE_Y);

//   const offsetBottom = isFullscreen ? 0 : tabbarSizeY + progressModalSizeY;

//   const [position, setPosition] = useState({
//     x: window.innerWidth - btnSizeX,
//     y: window.innerHeight - offsetBottom - btnSizeY,
//   });

//   useEffect(() => {
//     const el = btnRef.current;
//     if (!el) return;

//     let startX = 0;
//     let startY = 0;

//     const middleX = window.innerWidth / 2;

//     const gesture = createGesture({
//       el,
//       gestureName: "view-mode-toggle-drag-button",
//       threshold: 0,

//       onStart: () => {
//         el.style.transition = "none";
//         startX = position.x;
//         startY = position.y;
//       },

//       onMove: (ev) => {
//         const x = startX + ev.deltaX;

//         const y = Math.min(
//           window.innerHeight - offsetBottom - btnSizeY,
//           Math.max(headerSizeY, startY + ev.deltaY)
//         );

//         el.style.transform = `translate(${x}px, ${y}px)`;
//       },

//       onEnd: (ev) => {
//         let x = startX + ev.deltaX;
//         let y = startY + ev.deltaY;

//         y = Math.min(
//           window.innerHeight - offsetBottom - btnSizeY,
//           Math.max(headerSizeY, y)
//         );

//         if (x + btnSizeX / 2 < middleX) {
//           x = 0;
//           el.style.borderRadius = "0 9rem 9rem 0";
//           el.style.paddingInline = "14rem 4rem";
//         } else {
//           x = window.innerWidth - btnSizeX;
//           el.style.borderRadius = "9rem 0 0 9rem";
//           el.style.paddingInline = "4rem 14rem";
//         }

//         el.style.transition = "transform 0.25s ease-out";

//         setPosition({ x, y });
//       },
//     });

//     gesture.enable();

//     return () => gesture.destroy();
//   }, [position, isFullscreen]);

//   const toggleFullscreen = () => setIsFullscreen(!isFullscreen);

//   useEffect(() => {
//     if (isFullscreen) {
//       hideTabbar();
//       hideModal();
//     } else {
//       showTabbar();
//       showModal();

//       if (window.innerHeight - offsetBottom - btnSizeY < position.y) {
//         if (btnRef.current) {
//           btnRef.current.style.transition = "transform 0.25s ease-out";
//         }
//         setPosition((prev) => ({
//           ...prev,
//           y: window.innerHeight - offsetBottom - btnSizeY,
//         }));
//       }
//     }
//   }, [isFullscreen]);

//   useEffect(() => {
//     return () => {
//       showModal();
//       showTabbar();
//     };
//   }, []);

//   return (
//     <div
//       className={styles.toggleViewContainer}
//       ref={btnRef}
//       style={{
//         transform: `translate(${position.x}px, ${position.y}px)`,
//       }}
//     >
//       <button onClick={toggleFullscreen}>
//         <span>
//           <IonIcon src={isFullscreen ? eyeOpen : eyeHide} />
//         </span>
//       </button>
//     </div>
//   );
// };

// export default ViewModeToggleButton;

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

const SAFE_PADDING = 8;

const getSafeArea = () => {
  const style = getComputedStyle(document.documentElement);

  return {
    top: parseFloat(style.getPropertyValue("--ion-safe-area-top")) || 0,
    bottom: parseFloat(style.getPropertyValue("--ion-safe-area-bottom")) || 0,
  };
};

const ViewModeToggleButton = () => {
  const btnRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef({ x: 0, y: 0 });

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [, forceUpdate] = useState({});

  const [showTabbar, hideTabbar] = useLessonTabbarLayout();
  const [showModal, hideModal] = useCourseProgressModalLayout();

  const tabbarSizeY = remToPx(TABBAR_SIZE_Y);
  const progressModalSizeY = remToPx(PROGRESS_MODAL_SIZE_Y);
  const headerSizeY = remToPx(HEADER_SIZE_Y);
  const btnSizeX = remToPx(BTN_SIZE_X);
  const btnSizeY = remToPx(BTN_SIZE_Y);

  const offsetBottom = isFullscreen ? 0 : tabbarSizeY + progressModalSizeY;

  const getBounds = () => {
    const { top, bottom } = getSafeArea();

    return {
      minY: headerSizeY + top + SAFE_PADDING,
      maxY:
        window.innerHeight -
        offsetBottom -
        btnSizeY -
        bottom -
        SAFE_PADDING,
    };
  };

  const setPosition = (pos: { x: number; y: number }) => {
    positionRef.current = pos;

    if (btnRef.current) {
      btnRef.current.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
    }

    forceUpdate({});
  };

  useEffect(() => {
    const bounds = getBounds();

    setPosition({
      x: window.innerWidth - btnSizeX,
      y: bounds.maxY,
    });
  }, []);

  useEffect(() => {
    const el = btnRef.current;
    if (!el) return;

    let startX = 0;
    let startY = 0;

    const gesture = createGesture({
      el,
      gestureName: "view-mode-toggle-drag-button",
      threshold: 0,

      onStart: () => {
        const pos = positionRef.current;

        el.style.transition = "none";

        startX = pos.x;
        startY = pos.y;
      },

      onMove: (ev) => {
        const bounds = getBounds();

        const x = startX + ev.deltaX;

        const y = Math.min(
          bounds.maxY,
          Math.max(bounds.minY, startY + ev.deltaY)
        );

        el.style.transform = `translate(${x}px, ${y}px)`;
      },

      onEnd: (ev) => {
        const bounds = getBounds();

        let x = startX + ev.deltaX;
        let y = startY + ev.deltaY;

        y = Math.min(bounds.maxY, Math.max(bounds.minY, y));

        const middleX = window.innerWidth / 2;

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
  }, [offsetBottom]);

  const toggleFullscreen = () => {
    setIsFullscreen((prev) => !prev);
  };

  useEffect(() => {
    const bounds = getBounds();

    if (isFullscreen) {
      hideTabbar();
      hideModal();
    } else {
      showTabbar();
      showModal();
    }

    const pos = positionRef.current;

    if (pos.y > bounds.maxY) {
      setPosition({
        ...pos,
        y: bounds.maxY,
      });
    }
  }, [isFullscreen]);

  useEffect(() => {
    const handleResize = () => {
      const bounds = getBounds();
      const pos = positionRef.current;

      setPosition({
        ...pos,
        y: Math.min(pos.y, bounds.maxY),
      });
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [offsetBottom]);

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
        transform: `translate(${positionRef.current.x}px, ${positionRef.current.y}px)`,
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
