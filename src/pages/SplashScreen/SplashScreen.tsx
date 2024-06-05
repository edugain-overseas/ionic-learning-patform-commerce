import { FC } from "react";
import Lottie from "lottie-react";
import splashAnimation from "../../assets/test.json";
import styles from "./SplashScreen.module.scss";

const SplashScreen: FC<{ onAnimationEnd: () => void }> = ({
  onAnimationEnd,
}) => {

  return (
    <div className={styles.wrapper}>
      <Lottie
        animationData={splashAnimation}
        loop={false}
        autoPlay={true}
        className={styles.lottieWrapper}
        onComplete={onAnimationEnd}
      />
    </div>
  );
};

export default SplashScreen;
