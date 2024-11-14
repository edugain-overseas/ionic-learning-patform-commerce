import { FC, useEffect, useRef } from "react";
import { useBasket } from "../../context/BasketContext";
import { useUser } from "../../context/UserContext";
import { priceFormatter } from "../../utils/priceFormatter";
import styles from "./BasketCheckoutPanel.module.scss";
import CheckoutBtn from "./CheckoutBtn";

const BasketCheckoutPanel: FC = () => {
  const basketService = useBasket();

  const discountRef = useRef<HTMLDivElement>(null);

  const checkout = basketService?.checkout();

  useEffect(() => {
    if (discountRef.current) {
      discountRef.current.style.maxHeight =
        checkout?.discount === 0
          ? "0"
          : `${discountRef.current.scrollHeight}px`;
    }
  }, [checkout?.discount]);

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
      <CheckoutBtn />
    </div>
  );
};

export default BasketCheckoutPanel;
