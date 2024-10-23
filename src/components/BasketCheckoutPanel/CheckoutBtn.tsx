import { FC, useState } from "react";
import { useCapacitorStripe } from "@capacitor-community/stripe/dist/esm/react/provider";
import { usePaymentSheet } from "../../hooks/usePaymentSheet";
import { useUser } from "../../context/UserContext";
import { useBasket } from "../../context/BasketContext";
import CommonButton from "../CommonButton/CommonButton";
import styles from "./BasketCheckoutPanel.module.scss";
import Spinner from "../Spinner/Spinner";

const CheckoutBtn: FC = () => {
  const { stripe } = useCapacitorStripe();
  const studentId = useUser()?.user.studentId;
  const items = useBasket()?.items.map((item) => item.id);

  const [isLoading, setIsLoading] = useState(false);

  if (!studentId || !items) {
    return <></>;
  }

  const { fetchPaymentIntentData } = usePaymentSheet(studentId, items);

  const handleCheckoutClick = async () => {
    try {
      setIsLoading(true);
      const paymentIntentData = await fetchPaymentIntentData();

      await stripe.createPaymentSheet({
        paymentIntentClientSecret: paymentIntentData.paymentIntent,
        customerId: paymentIntentData.customer,
        customerEphemeralKeySecret: paymentIntentData.ephemeralKey,
        merchantDisplayName: "IEU",
        enableApplePay: true,
        enableGooglePay: true,
        withZipCode: false,
      });

      const result = await stripe.presentPaymentSheet();

      console.log(result);
      
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CommonButton
      label="Checkout"
      icon={isLoading && <Spinner color="#fff" />}
      backgroundColor="#7E8CA8"
      borderRadius={5}
      color="#FCFCFC"
      width={312}
      height={40}
      className={styles.checkoutBtn}
      onClick={handleCheckoutClick}
    />
  );
};

export default CheckoutBtn;
