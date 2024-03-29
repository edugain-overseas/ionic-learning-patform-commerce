import React from "react";
import { priceFormatter } from "../../utils/priceFormatter";
import styles from "./CardPrice.module.scss";

interface CardPriceTypes {
  price?: number;
  oldPrice?: number;
  orientation?: string;
  onClick?: () => void;
  variant?: string;
}

const CardPrice: React.FC<CardPriceTypes> = ({
  price = 0,
  oldPrice,
  orientation = "vertical",
  onClick = () => {},
  variant = "default",
}) => {
  const handleClick = (e: any) => {
    e.preventDefault();
    if (onClick) {
      onClick();
    }
  };

  return (
    <div
      className={`${styles.wrapper} ${
        orientation === "horizontal" ? styles.horizontal : ""
      }`}
      onClick={handleClick}
    >
      {oldPrice && (
        <div className={styles.oldPriceWrapper}>
          <div className={styles.info}>
            <span className={styles.label}>Old price</span>
            <span className={styles.value}>{priceFormatter(oldPrice)}</span>
          </div>
        </div>
      )}
      <div
        className={styles.priceWrapper}
        style={{ color: variant === "primary" ? "#001c54" : "#7e8ca8" }}
      >
        <span className={styles.dollarSign}>$</span>
        <div className={styles.info}>
          <span className={styles.label}>New price</span>
          <span className={styles.value}>{priceFormatter(price)}</span>
        </div>
      </div>
    </div>
  );
};

export default CardPrice;
