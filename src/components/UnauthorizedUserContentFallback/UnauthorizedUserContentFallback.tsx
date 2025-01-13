import { FC } from "react";
import { IonIcon } from "@ionic/react";
import WarningIcon from "../../assets/icons/warning.svg";
import styles from "./UnauthorizedUserContentFallback.module.scss";

const UnauthorizedUserContentFallback: FC<{ containerClassname?: string }> = ({
  containerClassname = "",
}) => {
  return (
    <div className={`${styles.fallbackWrapper} ${containerClassname}`}>
      <div>
        <IonIcon src={WarningIcon} />
      </div>
      <p>Available to registered users, please log in.</p>
    </div>
  );
};

export default UnauthorizedUserContentFallback;
