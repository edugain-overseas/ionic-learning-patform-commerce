import { instance } from "../http/instance";

export type AppleProductType = {
  product_id: string;
  apple_internal_id: string;
  item_type: string;
  item_id: number;
  reference_name: string;
  in_app_purchase_type: string;
  apple_status: string;
  error: string;
};

type AppleIAPVerificationResponseType = {
  status: string;
  transaction_id: string;
  product_id: string;
  course_ids: number[];
  newly_granted_course_ids: number[];
  already_processed: true;
};

export type GoogleProductType = {
  product_id: string;
  item_type: string;
  item_id: number;
  purchase_option_id: string;
  google_status: string;
  error: string;
};

type GoogleIAPVerificationResponseType = {
  status: string;
  orderId: string;
  productId: string;
  courseIds: number[];
  newlyGrantedCourseIds: number[];
  alreadyProcessed: true;
};

const getAppleIAPProductsStatuses = async (): Promise<AppleProductType[]> => {
  try {
    const response = await instance.get("/apple-iap/products/statuses");
    console.log("Products from apple servers: ", response.data);

    return response.data;
  } catch (error) {
    console.error("Error fetching Apple IAP products statuses:", error);
    throw error;
  }
};

const verifyApplePurchase = async (
  transactionId: string,
): Promise<AppleIAPVerificationResponseType> => {
  const response = await instance.post("/apple-iap/verify", {
    transactionId,
  });

  return response.data;
};

const getGoogleIAPProductsStatuses = async (): Promise<GoogleProductType[]> => {
  try {
    const response = await instance.get("/google-play/products/statuses");
    console.log("Products from google servers: ", response.data);

    return response.data;
  } catch (error) {
    console.error("Error fetching Google IAP products statuses:", error);
    throw error;
  }
};

const verifyGooglePurchase = async (
  purchaseToken: string,
): Promise<GoogleIAPVerificationResponseType> => {
  const response = await instance.post("/google-play/verify", {
    purchaseToken,
  });

  return response.data;
};

export const IAPServices = {
  apple: {
    getProductsStatuses: getAppleIAPProductsStatuses,
    verifyPurchase: verifyApplePurchase,
  },
  google: {
    getProductsStatuses: getGoogleIAPProductsStatuses,
    verifyPurchase: verifyGooglePurchase,
  },
};
