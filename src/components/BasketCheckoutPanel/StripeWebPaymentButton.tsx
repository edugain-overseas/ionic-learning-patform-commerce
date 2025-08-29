import { FC, useEffect, useState } from "react";
import CheckoutBtn from "./CheckoutBtn";
import { instance } from "../../http/instance";
import { useBasket } from "../../context/BasketContext";
import { useUser } from "../../context/UserContext";
import { IonModal, useIonRouter, useIonToast } from "@ionic/react";
import { useCourses } from "../../context/CoursesContext";
import { useAuthUi } from "../../context/AuthUIContext";
import {
  loadStripe,
  StripeExpressCheckoutElementOptions,
} from "@stripe/stripe-js";
import {
  CheckoutProvider,
  Elements,
  ExpressCheckoutElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import CommonButton from "../CommonButton/CommonButton";
import styles from "./BasketCheckoutPanel.module.scss";
import Spinner from "../Spinner/Spinner";

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY_DEV
);

const expressCheckoutElementOptions: StripeExpressCheckoutElementOptions = {
  buttonType: { applePay: "plain", googlePay: "plain" },
  buttonTheme: {
    applePay: "black",
    googlePay: "black",
  },
  buttonHeight: 40,
  layout: {
    maxRows: 1,
  },
};

const CheckoutForm = ({ onSuccess }: { onSuccess: () => Promise<void> }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [present] = useIonToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsLoading(true);
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {},
      redirect: "if_required",
    });

    if (error) {
      present({
        message: "❌ " + error.message,
        duration: 2500,
        position: "top",
      });
    } else if (paymentIntent?.status === "succeeded") {
      present({
        message: "✅ " + "Payment successful!",
        duration: 2500,
        position: "top",
      });
      await onSuccess();
    }
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.checkoutForm}>
      <PaymentElement />
      <CommonButton
        label="Pay"
        icon={isLoading && <Spinner color="#fff" />}
        backgroundColor={isLoading ? "#BDC4D2" : "#7E8CA8"}
        borderRadius={5}
        color="#FCFCFC"
        block={true}
        height={40}
        className={styles.checkoutBtn}
        disabled={isLoading}
        type="submit"
      />
    </form>
  );
};

const StripeWebPaymentButton: FC = () => {
  const [clientSecret, setClientSecret] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [canMakePayment, setCanMakePayment] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useIonRouter();
  const userInterface = useUser();
  const basketInterface = useBasket();
  const studentId = userInterface?.user.studentId;
  const items = basketInterface?.items
    .filter((item) => item.confirmed)
    .map((item) => item.id);
  const coursesInterface = useCourses();
  const authUiInterface = useAuthUi();

  const accessToken = useUser()?.user.accessToken;

  const handleSuccessPayment = async () => {
    setIsLoading(true);
    try {
      await instance.post(
        `/stripe/course-subscribe/app?payment_intent=${clientSecret}`
      );
      basketInterface?.clearBasket();
      await coursesInterface?.getAllCourses();
      await userInterface?.getUser();

      router.push("/payment?status=success", "root", "push");
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckoutBtnClick = () => {
    if (accessToken && studentId) {
      setIsOpenModal(true);
      return;
    }
    authUiInterface?.openAuthUI("sing-up");
    authUiInterface?.setSuccessAuthCallback(() => setIsOpenModal(true));
  };

  useEffect(() => {
    const getClientSecret = async () => {
      try {
        setIsLoading(true);
        const { data } = await instance.post("/stripe/mobile/cart", {
          student_id: studentId,
          payment_items: items,
          success_url: "",
          cancel_url: "",
        });

        const paymentIntent = data.paymentIntent;
        setClientSecret(paymentIntent);
        return paymentIntent;
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (items?.length !== 0 && studentId) {
      getClientSecret();
    } else {
      setClientSecret("");
    }
  }, [items?.length, studentId]);

  useEffect(() => {
    const checkPaymentAvailability = async () => {
      const stripe = await stripePromise;
      if (!stripe) return false;

      const pr = stripe.paymentRequest({
        country: "US",
        currency: "usd",
        total: { label: "Test", amount: 1 },
      });

      const result = await pr.canMakePayment();
      setCanMakePayment(!!result);
    };
    checkPaymentAvailability();
  }, []);

  return (
    <>
      <IonModal
        isOpen={isOpenModal}
        onDidDismiss={() => setIsOpenModal(false)}
        breakpoints={[0, 1]}
        initialBreakpoint={1}
      >
        {clientSecret && (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm onSuccess={handleSuccessPayment} />
          </Elements>
        )}
      </IonModal>
      <div className={styles.paymentButtonsWrapper}>
        <CheckoutBtn
          handleClick={handleCheckoutBtnClick}
          disabled={items?.length === 0}
          isLoading={isLoading}
        />

        {clientSecret && canMakePayment && (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <ExpressCheckoutElement
              options={expressCheckoutElementOptions}
              onConfirm={handleSuccessPayment}
            />
          </Elements>
        )}
      </div>
    </>
  );
};

export default StripeWebPaymentButton;
