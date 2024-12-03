import { FC, useEffect, useRef } from "react";
import { Capacitor } from "@capacitor/core";
import { CapacitorStripeProvider } from "@capacitor-community/stripe/dist/esm/react/provider";
import { useBasket } from "../../context/BasketContext";
import { priceFormatter } from "../../utils/priceFormatter";
import CheckoutBtn from "./CheckoutBtn";
import styles from "./BasketCheckoutPanel.module.scss";
import WebPayment from "./WebPayment";
import NativePayment from "./NativePayment";

const BasketCheckoutPanel: FC = () => {
  const basketService = useBasket();

  const discountRef = useRef<HTMLDivElement>(null);

  const checkout = basketService?.checkout();

  const isNative = Capacitor.isNativePlatform();

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
      {isNative ? (
        <CapacitorStripeProvider
          publishableKey={import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY_DEV}
          fallback={<p>Loading...</p>}
        >
          <NativePayment />
        </CapacitorStripeProvider>
      ) : (
        <WebPayment />
      )}
    </div>
  );
};

export default BasketCheckoutPanel;
