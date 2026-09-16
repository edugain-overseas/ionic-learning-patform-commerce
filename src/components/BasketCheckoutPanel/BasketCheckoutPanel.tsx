import { FC, useEffect, useRef } from "react";
import { Capacitor } from "@capacitor/core";
import { useBasket } from "../../context/BasketContext";
import { priceFormatter } from "../../utils/priceFormatter";
import StripeNativePaymentButton from "./StripeNativePaymentButton";
import StripeWebPaymentButton from "./StripeWebPaymentButton";
import InAppPurchaseButton from "./InAppPurchaseButton";
import styles from "./BasketCheckoutPanel.module.scss";

const CheckoutButton: FC = () => {
  const platform = Capacitor.getPlatform();

  if (platform === "ios") {
    return <InAppPurchaseButton />;
  }
  if (platform === "android") {
    return <StripeNativePaymentButton />;
  }
  return <StripeWebPaymentButton />;
};

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
              {checkout?.subTotal && priceFormatter(checkout.subTotal)} EUR
            </span>
          </div>
          <div className={styles.info}>
            <span>Discount:</span>
            <span>
              {checkout?.discount && priceFormatter(checkout.discount)} EUR
            </span>
          </div>
        </div>
      </div>
      <div className={styles.subWrapper}>
        <div className={styles.info}>
          <span>Total payment:</span>
          <span className={styles.total}>
            {priceFormatter(checkout?.total ? checkout?.total : 0)} EUR
          </span>
        </div>
      </div>
      <CheckoutButton />
    </div>
  );
};

export default BasketCheckoutPanel;
