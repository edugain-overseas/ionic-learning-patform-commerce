import { FC } from "react";
// import { IonIcon } from "@ionic/react";
// import MedIcon from "../../assets/images/HomeHero/icon-med.svg";
// import EngineeringIcon from "../../assets/images/HomeHero/icon-engineering.svg";
import styles from "./HomeHero.module.scss";

const InnerRotationCircle: FC = () => {
  return (
    <div className={styles.innerRotationCircle}>
      <div className={styles.medWrapper}>
        {/* <IonIcon src={MedIcon} /> */}
      </div>
      <div className={styles.engineeringWrapper}>
        {/* <IonIcon src={EngineeringIcon} /> */}
      </div>
    </div>
  );
};

export default InnerRotationCircle;
