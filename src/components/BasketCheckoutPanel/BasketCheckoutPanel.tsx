import { FC, useEffect, useRef } from "react";
import { useBasket } from "../../context/BasketContext";
import { priceFormatter } from "../../utils/priceFormatter";
import CommonButton from "../CommonButton/CommonButton";
import styles from "./BasketCheckoutPanel.module.scss";

const BasketCheckoutPanel: FC = () => {
  const basketInterface = useBasket();

  const discountRef = useRef<HTMLDivElement>(null);

  const checkout = basketInterface?.checkout();

  useEffect(() => {
    if (discountRef.current) {
      discountRef.current.style.maxHeight =
        checkout?.discount === 0
          ? "0"
          : `${discountRef.current.scrollHeight}px`;
    }
  }, [checkout?.discount]);

  console.log(checkout);

  return (
    <div className={styles.checkoutWrapper}>
      <div className={styles.discount} ref={discountRef}>
        <div className={styles.subWrapper}>
          <div className={styles.info}>
            <span>Subtotal:</span>
            <span>
              {checkout?.subTotal && priceFormatter(checkout.subTotal)} USD
            </span>
          </div>
          <div className={styles.info}>
            <span>Discount:</span>
            <span>
              {checkout?.discount && priceFormatter(checkout.discount)} USD
            </span>
          </div>
        </div>
      </div>
      <div className={styles.subWrapper}>
        <div className={styles.info}>
          <span>Total payment:</span>
          <span className={styles.total}>
            {priceFormatter(checkout!.total)} USD
          </span>
        </div>
      </div>
      <CommonButton
        label="Checkout"
        backgroundColor="#7E8CA8"
        borderRadius={5}
        color="#FCFCFC"
        width={312}
        height={32}
        className={styles.checkoutBtn}
      />
    </div>
  );
};

export default BasketCheckoutPanel;
