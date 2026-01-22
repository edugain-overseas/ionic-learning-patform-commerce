import { FC } from "react";
import { useBasket } from "../../context/BasketContext";
import { IonIcon } from "@ionic/react";
import basketIcon from "../../assets/icons/nav/basket.svg";
import styles from "./BasketIcon.module.scss";

const BasketIcon: FC = () => {
  const amount = useBasket()?.items.length;
  return (
    <div className={styles.wrapper}>
      {amount !== 0 && <span className={styles.amount}>{amount}</span>}
      <IonIcon
        src={basketIcon}
        className="custom-tab-icon"
        id="tabbar-basket-icon"
      />
    </div>
  );
};

export default BasketIcon;
