import { FC, useState } from "react";
import { Stripe } from "@capacitor-community/stripe";
import { usePaymentSheet } from "../../hooks/usePaymentSheet";
import { useUser } from "../../context/UserContext";
import { useBasket } from "../../context/BasketContext";
import CheckoutBtn from "./CheckoutBtn";

const NativePayment: FC = () => {
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
      console.log("PaymentIntentData:", paymentIntentData);

      await Stripe.createPaymentSheet({
        paymentIntentClientSecret: paymentIntentData.paymentIntent,
        customerId: paymentIntentData.customer,
        customerEphemeralKeySecret: paymentIntentData.ephemeralKey,
        merchantDisplayName: "IEU",
        enableApplePay: true,
        enableGooglePay: true,
        withZipCode: false,
      });

      const result = await Stripe.presentPaymentSheet();

      console.log(result);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CheckoutBtn
      isLoading={isLoading}
      handleClick={handleCheckoutClick}
      disabled={items.length === 0 || isLoading}
    />
  );
};

export default NativePayment;
