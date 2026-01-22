import React, { MouseEventHandler } from "react";
import { priceFormatter } from "../../utils/priceFormatter";
import styles from "./CardPrice.module.scss";

interface CardPriceTypes {
  price?: number;
  oldPrice?: number;
  onClick?: () => void;
}

const CardPrice: React.FC<CardPriceTypes> = ({
  price = 0,
  oldPrice,
  onClick = () => {},
}) => {
  const handleClick: MouseEventHandler = (e) => {
    e.preventDefault();
    if (onClick) {
      onClick();
    }
  };

  return (
    <div className={styles.wrapper} onClick={handleClick}>
      <div className={styles.priceWrapper}>
        <span className={styles.dollarSign}>$</span>
        <div className={styles.info}>
          <span className={styles.label}>
            {oldPrice ? "New price" : "Price"}
          </span>
          <span className={styles.value}>{priceFormatter(price)}</span>
        </div>
      </div>
      {oldPrice && (
        <div className={styles.oldPriceWrapper}>
          <div className={styles.info}>
            <span className={styles.label}>Old price</span>
            <span className={styles.value}>{priceFormatter(oldPrice)}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardPrice;
