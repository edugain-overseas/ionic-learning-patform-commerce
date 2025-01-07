import { FC, useEffect, useState } from "react";
import { useBasket } from "../../context/BasketContext";
import { useUser } from "../../context/UserContext";
import { instance } from "../../http/instance";
import CheckoutBtn from "./CheckoutBtn";

const WebPayment: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [paymentLink, setLaymentLink] = useState(null);

  const items = useBasket()
    ?.items.filter((item) => item.confirmed)
    .map((item) => item.id);

  const studentId = useUser()?.user.studentId;

  useEffect(() => {
    const getPaymentLink = async () => {
      try {
        setIsLoading(true);

        const success_url =
          window.location.origin +
          "/courses/buy?status=success&session_id={CHECKOUT_SESSION_ID}";

        const cancel_url =
          window.location.origin + "/courses/buy?status=cancel";

        const { data } = await instance.post("/stripe/cart", {
          student_id: studentId,
          payment_items: items,
          success_url,
          cancel_url,
        });

        setLaymentLink(data.link);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    console.log(items, studentId);

    if (items?.length && studentId) {
      getPaymentLink();
    }
  }, [items?.length, studentId]);

  if (!items || !studentId) {
    return <></>;
  }

  const handleLinkClick = () => {
    if (paymentLink) {
      window.location.href = paymentLink;
    }
  };

  return (
    <CheckoutBtn
      isLoading={isLoading}
      handleClick={handleLinkClick}
      disabled={items.length === 0 || isLoading || !paymentLink}
    />
  );
};

export default WebPayment;
