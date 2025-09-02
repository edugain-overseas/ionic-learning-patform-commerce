import { FC, useEffect, useState } from "react";
import { Stripe } from "@capacitor-community/stripe";
import { IonIcon, useIonRouter, useIonToast } from "@ionic/react";
import { instance } from "../../http/instance";
import { useBasket } from "../../context/BasketContext";
import { useUser } from "../../context/UserContext";
import { useAuthUi } from "../../context/AuthUIContext";
import { useCourses } from "../../context/CoursesContext";
import AppleIcon from "../../assets/icons/auth/apple.svg";
import GoogleIcon from "../../assets/icons/auth/google.svg";
import CheckoutBtn from "./CheckoutBtn";
import CommonButton from "../CommonButton/CommonButton";
import Spinner from "../Spinner/Spinner";
import styles from "./BasketCheckoutPanel.module.scss";

const StripeNativePaymentButton: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isApplePayAvailable, setIsApplePayAvailable] = useState(false);
  const [isApplePayLoading, setIsApplePayLoading] = useState(false);
  const [isGooglePayAvailable, setIsGooglePayAvailable] = useState(false);
  const [isGooglePayLoading, setIsGooglePayLoading] = useState(false);
  const [present] = useIonToast();
  const router = useIonRouter();
  const coursesInterface = useCourses();
  const authUiInterface = useAuthUi();
  const basketInterface = useBasket();

  const items = basketInterface?.items
    .filter((item) => item.confirmed)
    .map((item) => item.id);

  const isButtonActive = items?.length !== 0;

  const userInterface = useUser();
  const studentId = userInterface?.user.studentId;

  const accessToken = useUser()?.user.accessToken;

  const handleSuccessPayment = async () => {
    await coursesInterface?.getAllCourses();
    await userInterface?.getUser();

    router.push("/payment?status=success", "root", "push");
  };

  const fetchPaymentIntent = async (validStudentId: number) => {
    const { data } = await instance.post("/stripe/mobile/cart", {
      student_id: validStudentId,
      payment_items: items,
      success_url: "",
      cancel_url: "",
    });

    return data.paymentIntent;
  };

  const handlePayment = async (studentId: number) => {
    try {
      setIsLoading(true);

      const paymentIntent = await fetchPaymentIntent(studentId);

      if (!paymentIntent) return;

      await Stripe.createPaymentSheet({
        paymentIntentClientSecret: paymentIntent,
        merchantDisplayName: "IEU courses",
        withZipCode: false,
        enableApplePay: true,
        applePayMerchantId: import.meta.env.VITE_APPLE_MERCHANT_ID,
        enableGooglePay: true,
      });

      // Present the payment sheet
      const { paymentResult } = await Stripe.presentPaymentSheet();

      if (paymentResult === "paymentSheetCompleted") {
        await instance.post(
          `/stripe/course-subscribe/app?payment_intent=${paymentIntent}`
        );
        handleSuccessPayment();
      } else {
        console.log("Payment not completed.");
        present({
          message: "Payment was not completed. Please try again.",
          duration: 2500,
          position: "top",
        });
      }
    } catch (error) {
      console.log("Error during payment:", error);
      present({
        message:
          "An error occurred during the payment process. Please try again.",
        duration: 2500,
        position: "top",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckoutBtnClick = () => {
    if (!isButtonActive) {
      present({
        message: "There are no courses in your basket yet!",
        duration: 2000,
        position: "top",
      });
      return;
    }

    if (accessToken && studentId) {
      handlePayment(studentId);
      return;
    }
    authUiInterface?.openAuthUI("sing-up");
    authUiInterface?.setSuccessAuthCallback((freshStudentId: number) =>
      handlePayment(freshStudentId)
    );
  };

  const handlePayWithApple = async (studentId: number) => {
    setIsApplePayLoading(true);
    try {
      const paymentIntent = await fetchPaymentIntent(studentId);

      const total = basketInterface?.checkout().total;
      if (!total) return;

      const amount = total * 100;

      await Stripe.createApplePay({
        paymentIntentClientSecret: paymentIntent,
        merchantIdentifier: import.meta.env.VITE_APPLE_MERCHANT_ID,
        paymentSummaryItems: [
          {
            label: "IEU courses",
            amount,
          },
        ],
        countryCode: "US",
        currency: "USD",
      });

      const result = await Stripe.presentApplePay();
      if (result.paymentResult === "applePayCompleted") {
        handleSuccessPayment();
      }
    } catch (err) {
      console.log("Apple Pay error:", err);
    } finally {
      setIsApplePayLoading(false);
    }
  };

  const handlePayWithAppleBtnClick = async () => {
    if (!isButtonActive) {
      present({
        message: "There are no courses in your basket yet!",
        duration: 2000,
        position: "top",
      });
      return;
    }

    if (accessToken && studentId) {
      handlePayWithApple(studentId);
      return;
    }
    authUiInterface?.openAuthUI("sing-up");
    authUiInterface?.setSuccessAuthCallback((freshStudentId: number) =>
      handlePayWithApple(freshStudentId)
    );
  };

  const handlePayWithGoogle = async (studentId: number) => {
    setIsGooglePayLoading(true);
    try {
      const paymentIntent = await fetchPaymentIntent(studentId);

      const total = basketInterface?.checkout().total;
      if (!total) return;

      const amount = total * 100;

      await Stripe.createGooglePay({
        paymentIntentClientSecret: paymentIntent,
        merchantIdentifier: import.meta.env.VITE_APPLE_MERCHANT_ID, //change to google merchant id???
        paymentSummaryItems: [
          {
            label: "IEU courses",
            amount,
          },
        ],
        countryCode: "US",
        currency: "USD",
      });

      const result = await Stripe.presentGooglePay();
      if (result.paymentResult === "googlePayCompleted") {
        handleSuccessPayment();
      }
    } catch (err) {
      console.log("Google Pay error:", err);
    } finally {
      setIsGooglePayLoading(false);
    }
  };

  const handlePayWithGoogleBtnClick = async () => {
    if (!isButtonActive) {
      present({
        message: "There are no courses in your basket yet!",
        duration: 2000,
        position: "top",
      });
      return;
    }

    if (accessToken && studentId) {
      handlePayWithGoogle(studentId);
      return;
    }
    authUiInterface?.openAuthUI("sing-up");
    authUiInterface?.setSuccessAuthCallback((freshStudentId: number) =>
      handlePayWithGoogle(freshStudentId)
    );
  };

  useEffect(() => {
    const checkApplePay = async () => {
      try {
        await Stripe.isApplePayAvailable();
        setIsApplePayAvailable(true);
      } catch (error) {
        console.log(error);
      }
    };
    const checkGooglePay = async () => {
      try {
        await Stripe.isGooglePayAvailable();
        setIsGooglePayAvailable(true);
      } catch (error) {
        console.log(error);
      }
    };
    checkApplePay();
    checkGooglePay();
  }, []);

  if (!studentId && accessToken) {
    return null;
  }

  return (
    <div className={styles.paymentButtonsWrapper}>
      <CheckoutBtn
        handleClick={handleCheckoutBtnClick}
        isLoading={isLoading}
        disabled={!isButtonActive}
      />
      {isApplePayAvailable && (
        <CommonButton
          label="Pay with"
          icon={
            isApplePayLoading ? (
              <Spinner color="#fff" />
            ) : (
              <IonIcon src={AppleIcon} className={styles.serviceIcon} />
            )
          }
          width={162}
          height="40px"
          backgroundColor="#343434"
          color="#fcfcfc"
          onClick={handlePayWithAppleBtnClick}
          borderRadius={5}
        />
      )}
      {isGooglePayAvailable && (
        <CommonButton
          label="Pay with"
          icon={
            isApplePayLoading ? (
              <Spinner color="#fff" />
            ) : (
              <IonIcon src={GoogleIcon} className={styles.serviceIcon} />
            )
          }
          width={162}
          height="40px"
          backgroundColor="#fcfcfc"
          color="#343434"
          onClick={handlePayWithGoogleBtnClick}
          borderRadius={5}
        />
      )}
    </div>
  );
};

export default StripeNativePaymentButton;
