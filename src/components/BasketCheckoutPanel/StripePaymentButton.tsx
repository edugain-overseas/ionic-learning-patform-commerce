import { FC, useState } from "react";
import CheckoutBtn from "./CheckoutBtn";
import { instance } from "../../http/instance";
import { useBasket } from "../../context/BasketContext";
import { useUser } from "../../context/UserContext";
import { Stripe } from "@capacitor-community/stripe";
import { useIonRouter, useIonToast } from "@ionic/react";
import { useCourses } from "../../context/CoursesContext";

const StripePaymentButton: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [present] = useIonToast();
  const router = useIonRouter();
  const coursesInterface = useCourses();

  const items = useBasket()
    ?.items.filter((item) => item.confirmed)
    .map((item) => item.id);

  const studentId = useUser()?.user.studentId;

  const handleSuccessPayment = async () => {
    await coursesInterface?.getAllCourses();

    present({
      message: "Payment successful! Your order is being processed.",
      duration: 2500,
      position: "top",
    });

    router.push(
      `/payment?status=success&items_ids=${JSON.stringify(items)}`,
      "root",
      "push"
    );
  };

  const handlePaymentBtnClick = async () => {
    try {
      setIsLoading(true);

      // Create payment intent
      const { data } = await instance.post("/stripe/mobile/cart", {
        student_id: studentId,
        payment_items: items,
        success_url: "",
        cancel_url: "",
      });

      const paymentIntent = data.paymentIntent;

      // Create the payment sheet
      await Stripe.createPaymentSheet({
        paymentIntentClientSecret: paymentIntent,
        merchantDisplayName: "IEU courses",
        withZipCode: false,
      });

      // Present the payment sheet
      const { paymentResult } = await Stripe.presentPaymentSheet();

      if (paymentResult === "paymentSheetCompleted") {
        setTimeout(handleSuccessPayment, 5000);

        // Notify the user (optional)
      } else {
        console.log("Payment not completed.");
        present({
          message: "Payment was not completed. Please try again.",
          duration: 2500,
        });
      }
    } catch (error) {
      console.error("Error during payment:", error);
      present({
        message:
          "An error occurred during the payment process. Please try again.",
        duration: 2500,
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (items?.length === 0) {
    return null;
  }

  if (!studentId) {
    return null;
  }

  return (
    <CheckoutBtn
      handleClick={handlePaymentBtnClick}
      isLoading={isLoading}
      disabled={isLoading}
    />
  );
};

export default StripePaymentButton;
