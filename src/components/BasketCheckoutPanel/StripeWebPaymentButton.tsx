// import { FC, useEffect, useState } from "react";
// import {
//   loadStripe,
//   StripeExpressCheckoutElementOptions,
// } from "@stripe/stripe-js";
// import {
//   Elements,
//   ExpressCheckoutElement,
//   PaymentElement,
//   useElements,
//   useStripe,
// } from "@stripe/react-stripe-js";
// import { instance } from "../../http/instance";
// import { useBasket } from "../../context/BasketContext";
// import { useUser } from "../../context/UserContext";
// import { IonModal, useIonRouter } from "@ionic/react";
// import { useCourses } from "../../context/CoursesContext";
// import { useAuthUi } from "../../context/AuthUIContext";
// import { useToast } from "../../hooks/useToast";
// import CheckoutBtn from "./CheckoutBtn";
// import CommonButton from "../CommonButton/CommonButton";
// import Spinner from "../Spinner/Spinner";
// import styles from "./BasketCheckoutPanel.module.scss";

// const stripePromise = loadStripe(
//   import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY_DEV,
// );

// const expressCheckoutElementOptions: StripeExpressCheckoutElementOptions = {
//   paymentMethods: {
//     googlePay: "auto",
//     applePay: "auto",
//     link: "never",
//     paypal: "never",
//     amazonPay: "never",
//   },
//   buttonType: {
//     applePay: "plain",
//     googlePay: "plain",
//   },
//   buttonTheme: {
//     applePay: "black",
//     googlePay: "black",
//   },
//   buttonHeight: 40,
//   layout: {
//     maxRows: 1,
//   },
// };

// const CheckoutForm = ({ onSuccess }: { onSuccess: () => Promise<void> }) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [isLoading, setIsLoading] = useState(false);
//   const [present] = useToast();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!stripe || !elements) return;

//     setIsLoading(true);
//     const { error, paymentIntent } = await stripe.confirmPayment({
//       elements,
//       confirmParams: {},
//       redirect: "if_required",
//     });

//     if (error) {
//       present({
//         type: "error",
//         message: error.message,
//       });
//     } else if (paymentIntent?.status === "succeeded") {
//       present({
//         type: "success",
//         message: "Payment successful!",
//       });
//       await onSuccess();
//     }
//     setIsLoading(false);
//   };

//   return (
//     <form onSubmit={handleSubmit} className={styles.checkoutForm}>
//       <PaymentElement
//         options={{ layout: { type: "accordion", defaultCollapsed: false } }}
//         onLoadError={(e) => console.log("error", e)}
//         onReady={(e) => console.log("ready", e)}
//       />
//       <CommonButton
//         label="Pay"
//         icon={isLoading && <Spinner color="#fff" />}
//         backgroundColor={isLoading ? "#BDC4D2" : "#5D6977"}
//         borderRadius={5}
//         color="#FCFCFC"
//         block={true}
//         height={40}
//         className={styles.checkoutBtn}
//         disabled={isLoading}
//         type="submit"
//       />
//     </form>
//   );
// };

// const StripeWebPaymentButton: FC = () => {
//   const [clientSecret, setClientSecret] = useState(null);
//   const [isOpenModal, setIsOpenModal] = useState(false);
//   const [canMakePayment, setCanMakePayment] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const router = useIonRouter();
//   const userInterface = useUser();
//   const basketInterface = useBasket();
//   const studentId = userInterface?.user.studentId;
//   const items = basketInterface?.items
//     .filter((item) => item.confirmed)
//     .map((item) => item.id);
//   const coursesInterface = useCourses();
//   const authUiInterface = useAuthUi();

//   const accessToken = useUser()?.user.accessToken;

//   const handleSuccessPayment = async () => {
//     setIsLoading(true);
//     try {
//       await instance.post(
//         `/stripe/course-subscribe/app?payment_intent=${clientSecret}`,
//       );
//       basketInterface?.clearBasket();
//       await coursesInterface?.getAllCourses();
//       await userInterface?.getUser();

//       router.push("/payment?status=success", "root", "push");
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleCheckoutBtnClick = () => {
//     if (accessToken && studentId) {
//       setIsOpenModal(true);
//       return;
//     }
//     authUiInterface?.openAuthUI("sing-up");
//     authUiInterface?.setSuccessAuthCallback(() => {
//       setIsOpenModal(true);
//     });
//   };

//   useEffect(() => {
//     const getClientSecret = async () => {
//       try {
//         setIsLoading(true);
//         const { data } = await instance.post("/stripe/mobile/cart", {
//           student_id: studentId,
//           payment_items: items,
//           success_url: "",
//           cancel_url: "",
//         });

//         const paymentIntent = data.paymentIntent;

//         console.log("fetchingClientSecret");

//         setClientSecret(paymentIntent);
//         return paymentIntent;
//       } catch (error) {
//         console.log(error);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     console.log(items, studentId);

//     if (items?.length !== 0 && studentId) {
//       getClientSecret();
//     } else {
//       setClientSecret(null);
//       setIsOpenModal(false);
//     }
//   }, [items?.length, studentId]);

//   useEffect(() => {
//     const checkPaymentAvailability = async () => {
//       const stripe = await stripePromise;
//       if (!stripe) return false;

//       const pr = stripe.paymentRequest({
//         country: "US",
//         currency: "eur",
//         total: { label: "Test", amount: 1 },
//       });

//       const result = await pr.canMakePayment();
//       console.log(result);

//       setCanMakePayment(!!result);
//     };
//     checkPaymentAvailability();
//   }, []);

//   return (
//     <>
//       <IonModal
//         isOpen={isOpenModal}
//         onDidDismiss={() => setIsOpenModal(false)}
//         breakpoints={[0, 1]}
//         initialBreakpoint={1}
//         className={styles.paymentModal}
//       >
//         {clientSecret && (
//           <Elements stripe={stripePromise} options={{ clientSecret }}>
//             <CheckoutForm onSuccess={handleSuccessPayment} />
//           </Elements>
//         )}
//       </IonModal>
//       <div className={styles.paymentButtonsWrapper}>
//         <CheckoutBtn
//           handleClick={handleCheckoutBtnClick}
//           disabled={items?.length === 0 || isLoading}
//           isLoading={isLoading}
//         />

//         {clientSecret && canMakePayment && (
//           <Elements stripe={stripePromise} options={{ clientSecret }}>
//             <ExpressCheckoutElement
//               options={expressCheckoutElementOptions}
//               onConfirm={handleSuccessPayment}
//               onLoadError={(e) => console.log("error", e)}
//               onReady={(e) => console.log("ready", e)}
//             />
//           </Elements>
//         )}
//       </div>
//     </>
//   );
// };

// export default StripeWebPaymentButton;

import { FC, useEffect, useState } from "react";
import {
  loadStripe,
  StripeExpressCheckoutElementOptions,
} from "@stripe/stripe-js";
import {
  Elements,
  ExpressCheckoutElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { instance } from "../../http/instance";
import { useBasket } from "../../context/BasketContext";
import { useUser } from "../../context/UserContext";
import { IonModal, useIonRouter } from "@ionic/react";
import { useCourses } from "../../context/CoursesContext";
import { useAuthUi } from "../../context/AuthUIContext";
import { useToast } from "../../hooks/useToast";
import CheckoutBtn from "./CheckoutBtn";
import CommonButton from "../CommonButton/CommonButton";
import Spinner from "../Spinner/Spinner";
import styles from "./BasketCheckoutPanel.module.scss";

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY_DEV,
);

const expressCheckoutElementOptions: StripeExpressCheckoutElementOptions = {
  paymentMethods: {
    googlePay: "auto",
    applePay: "auto",
    link: "never",
    paypal: "never",
    amazonPay: "never",
  },
  buttonType: {
    applePay: "plain",
    googlePay: "plain",
  },
  buttonTheme: {
    applePay: "black",
    googlePay: "black",
  },
  buttonHeight: 40,
  layout: {
    maxRows: 1,
  },
};

// --- КОМПОНЕНТ 1: Форма для звичайної картки в модалці ---
const CheckoutForm = ({ onSuccess }: { onSuccess: () => Promise<void> }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [present] = useToast();

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
      present({ type: "error", message: error.message });
    } else if (paymentIntent?.status === "succeeded") {
      present({ type: "success", message: "Payment successful!" });
      await onSuccess();
    }
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.checkoutForm}>
      <PaymentElement
        options={{ layout: { type: "accordion", defaultCollapsed: false } }}
      />
      <CommonButton
        label="Pay"
        icon={isLoading && <Spinner color="#fff" />}
        backgroundColor={isLoading ? "#BDC4D2" : "#5D6977"}
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

// --- КОМПОНЕНТ 2: Окремий підкомпонент для кнопки Apple/Google Pay (ВИПРАВЛЕНО) ---
const ExpressPayButton = ({ onSuccess }: { onSuccess: () => Promise<void> }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [present] = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleExpressConfirm = async () => {
    if (!stripe || !elements) return;

    setIsProcessing(true);

    // 1. Обов'язково валідуємо стан елементів перед списанням
    const { error: submitError } = await elements.submit();
    if (submitError) {
      present({ type: "error", message: submitError.message });
      setIsProcessing(false);
      return;
    }

    // 2. Викликаємо списання коштів через Apple Pay / Google Pay гаманець
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/payment-confirm`,
      },
      redirect: "if_required",
    });

    if (error) {
      present({ type: "error", message: error.message });
    } else if (paymentIntent?.status === "succeeded") {
      present({ type: "success", message: "Express payment successful!" });
      // 3. Тільки після успішного списання викликаємо ваш бекенд-обробник
      await onSuccess();
    }
    setIsProcessing(false);
  };

  return (
    <div style={{ width: "100%", position: "relative" }}>
      {isProcessing && (
        <div style={{ textAlign: "center", marginBottom: "5px" }}>
          <Spinner color="#000" />
        </div>
      )}
      <ExpressCheckoutElement
        options={expressCheckoutElementOptions}
        onConfirm={handleExpressConfirm}
        onLoadError={(e) => console.log("ExpressCheckout error", e)}
        onReady={(e) => console.log("ExpressCheckout ready", e)}
      />
    </div>
  );
};

// --- ГОЛОВНИЙ КОМПОНЕНТ ПАНЕЛІ ОПЛАТИ ---
const StripeWebPaymentButton: FC = () => {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
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
        `/stripe/course-subscribe/app?payment_intent=${clientSecret}`,
      );
      basketInterface?.clearBasket();
      await coursesInterface?.getAllCourses();
      await userInterface?.getUser();

      router.push("/payment?status=success", "root", "push");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckoutBtnClick = () => {
    if (accessToken && studentId) {
      setIsOpenModal(true);
      return;
    }
    authUiInterface?.openAuthUI("sing-up");
    authUiInterface?.setSuccessAuthCallback(() => {
      setIsOpenModal(true);
    });
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

        setClientSecret(data.paymentIntent);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (items?.length !== 0 && studentId) {
      getClientSecret();
    } else {
      setClientSecret(null);
      setIsOpenModal(false);
    }
  }, [items?.length, studentId]);

  useEffect(() => {
    const checkPaymentAvailability = async () => {
      const stripe = await stripePromise;
      if (!stripe) return;

      // Створюємо тимчасовий paymentRequest суто для перевірки наявності гаманців у користувача
      const pr = stripe.paymentRequest({
        country: "US",
        currency: "eur",
        total: { label: "Total", amount: 100 },
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
        className={styles.paymentModal}
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
          disabled={items?.length === 0 || isLoading}
          isLoading={isLoading}
        />

        {/* Рендеримо загорнуту у Elements експрес-кнопку тільки якщо є clientSecret та пристрій підтримує швидку оплату */}
        {clientSecret && canMakePayment && (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <ExpressPayButton onSuccess={handleSuccessPayment} />
          </Elements>
        )}
      </div>
    </>
  );
};

export default StripeWebPaymentButton;

