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
// import { remToPx } from "../../utils/pxToRem";
// import CheckoutBtn from "./CheckoutBtn";
// import CommonButton from "../CommonButton/CommonButton";
// import Spinner from "../Spinner/Spinner";
// import styles from "./BasketCheckoutPanel.module.scss";

// const stripePromise = loadStripe(
//   import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY_DEV,
//   {
//     developerTools: { assistant: { enabled: false } },
//   },
// );

// const expressCheckoutElementOptions: StripeExpressCheckoutElementOptions = {
//   paymentMethods: {
//     googlePay: "auto",
//     applePay: "auto",
//     link: "never",
//     paypal: "never",
//     amazonPay: "never",
//     klarna: "never",
//   },
//   buttonType: {
//     applePay: "plain",
//     googlePay: "plain",
//   },
//   buttonTheme: {
//     applePay: "black",
//     googlePay: "black",
//   },
//   buttonHeight: remToPx(40),
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
//       present({ type: "error", message: error.message });
//     } else if (paymentIntent?.status === "succeeded") {
//       present({ type: "success", message: "Payment successful!" });
//       await onSuccess();
//     }
//     setIsLoading(false);
//   };

//   return (
//     <form onSubmit={handleSubmit} className={styles.checkoutForm}>
//       <PaymentElement
//         options={{ layout: { type: "accordion", defaultCollapsed: false } }}
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
//   const [clientSecret, setClientSecret] = useState<string | null>(null);
//   const [isOpenModal, setIsOpenModal] = useState(false);
//   const [isExpressAvailable, setIsExpressAvailable] = useState(false);
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
//     } finally {
//       setIsLoading(false);
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

//         setClientSecret(data.paymentIntent);
//       } catch (error) {
//         console.log(error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     if (items?.length !== 0 && studentId) {
//       getClientSecret();
//     } else {
//       setClientSecret(null);
//       setIsOpenModal(false);
//     }
//   }, [items?.length, studentId]);

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
//         {clientSecret && (
//           <Elements stripe={stripePromise} options={{ clientSecret }}>
//             <div style={{ display: isExpressAvailable ? "block" : "none" }}>
//               <ExpressCheckoutElement
//                 options={expressCheckoutElementOptions}
//                 onConfirm={handleSuccessPayment}
//                 onLoadError={(e) => console.log("ExpressCheckout error", e)}
//                 onReady={(e) => {
//                   const methods = e.availablePaymentMethods;
//                   if (methods && (methods.applePay || methods.googlePay)) {
//                     setIsExpressAvailable(true);
//                   } else {
//                     setIsExpressAvailable(false);
//                   }
//                 }}
//               />
//             </div>
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
import { remToPx } from "../../utils/pxToRem";
import CheckoutBtn from "./CheckoutBtn";
import CommonButton from "../CommonButton/CommonButton";
import Spinner from "../Spinner/Spinner";
import styles from "./BasketCheckoutPanel.module.scss";

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY_DEV,
  { developerTools: { assistant: { enabled: false } } },
);

const expressCheckoutElementOptions: StripeExpressCheckoutElementOptions = {
  paymentMethods: {
    googlePay: "auto",
    applePay: "auto",
    link: "never",
    paypal: "never",
    amazonPay: "never",
    klarna: "never",
  },
  buttonType: {
    applePay: "plain",
    googlePay: "plain",
  },
  buttonTheme: {
    applePay: "black",
    googlePay: "black",
  },
  buttonHeight: remToPx(40),
  layout: {
    maxRows: 1,
  },
};

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

const ExpressCheckoutInner = ({
  onSuccess,
  setIsExpressAvailable,
}: {
  onSuccess: () => Promise<void>;
  setIsExpressAvailable: (avail: boolean) => void;
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [present] = useToast();

  const handleExpressConfirm = async () => {
    if (!stripe || !elements) return;

    const { error: submitError } = await elements.submit();
    if (submitError) {
      present({ type: "error", message: submitError.message });
      return;
    }

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {},
      redirect: "if_required",
    });

    if (error) {
      present({ type: "error", message: error.message });
    } else if (paymentIntent?.status === "succeeded") {
      present({ type: "success", message: "Express payment successful!" });
      await onSuccess();
    }
  };

  return (
    <ExpressCheckoutElement
      options={expressCheckoutElementOptions}
      onConfirm={handleExpressConfirm}
      onLoadError={(e) => console.log("ExpressCheckout error", e)}
      onReady={(e) => {
        const methods = e.availablePaymentMethods;
        if (methods && (methods.applePay || methods.googlePay)) {
          setIsExpressAvailable(true);
        } else {
          setIsExpressAvailable(false);
        }
      }}
    />
  );
};

const StripeWebPaymentButton: FC = () => {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isExpressAvailable, setIsExpressAvailable] = useState(false);
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
        {clientSecret && (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <div style={{ display: isExpressAvailable ? "block" : "none" }}>
              <ExpressCheckoutInner
                onSuccess={handleSuccessPayment}
                setIsExpressAvailable={setIsExpressAvailable}
              />
            </div>
          </Elements>
        )}
      </div>
    </>
  );
};

export default StripeWebPaymentButton;
