import { instance } from "../http/instance";

type paymentIntentResponseDataType = {
  paymentIntent: string;
  customer: string;
  ephemeralKey: string;
};

export const usePaymentSheet = (studentId: number, items: number[]) => {
  const fetchPaymentIntentData = async () => {
    const reqBody = {
      student_id: studentId,
      payment_items: items,
    };
    try {
      const {
        data: paymentIntentResponseData,
      }: { data: paymentIntentResponseDataType } = await instance.post(
        "stripe/mobile/cart",
        reqBody
      );

      return paymentIntentResponseData;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return { fetchPaymentIntentData };
};
