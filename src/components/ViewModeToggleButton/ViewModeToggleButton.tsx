import { useEffect, useState } from "react";
import { IonIcon } from "@ionic/react";
import { useLessonTabbarLayout } from "../../hooks/useTabbarLayout";
import { useCourseProgressModalLayout } from "../../hooks/useCourseProgressModalLayout";
import eyeOpen from "../../assets/icons/auth/eye-open.svg";
import eyeHide from "../../assets/icons/auth/eye-hide.svg";
import styles from "./ViewModeToggleButton.module.scss";

const ViewModeToggleButton = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showTabbar, hideTabbar] = useLessonTabbarLayout();
  const [showModal, hideModal] = useCourseProgressModalLayout();

  const toggleFullscreen = () => setIsFullscreen(!isFullscreen);

  useEffect(() => {
    if (isFullscreen) {
      hideTabbar();
      hideModal();
    } else {
      showTabbar();
      showModal();
    }
  }, [isFullscreen]);

  return (
    <div className={styles.toggleViewContainer}>
      <button onClick={toggleFullscreen}>
        <span>
          <IonIcon src={isFullscreen ? eyeOpen : eyeHide} />
        </span>
      </button>
    </div>
  );
};

export default ViewModeToggleButton;
