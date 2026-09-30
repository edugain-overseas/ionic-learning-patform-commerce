import { Capacitor } from "@capacitor/core";
import { useState } from "react";
import { useIonRouter } from "@ionic/react";
import { NativePurchases, PURCHASE_TYPE } from "@capgo/native-purchases";
import { useBasket } from "../../context/BasketContext";
import { useBilling } from "../../context/BillingContext";
import { IAPServices } from "../../utils/IAP";
import { useCourses } from "../../context/CoursesContext";
import { useUser } from "../../context/UserContext";
import { useAuthUi } from "../../context/AuthUIContext";
import CheckoutBtn from "./CheckoutBtn";

const InAppPurchaseButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useIonRouter();

  const basketInterface = useBasket();
  const coursesInterface = useCourses();
  const userInterface = useUser();
  const authUiInterface = useAuthUi();
  const { IAPProducts, isIAPLoading } = useBilling();

  const basketItems = basketInterface?.items;
  const accessToken = userInterface?.user.accessToken;

  const platform = Capacitor.getPlatform();
  const isIOS = platform === "ios";

  const handleIAPCheckout = async () => {
    if (isLoading || isIAPLoading || !basketItems || basketItems.length === 0)
      return;

    const itemsToPay = basketItems
      .map((item) => {
        return IAPProducts.find(
          (product) =>
            product.item_type === "course" && product.item_id === item.id,
        );
      })
      .filter(Boolean);

    if (itemsToPay.length === 0) {
      alert("No matching App Store products found for items in the basket.");
      return;
    }

    const verificationResults: any[] = [];

    try {
      setIsLoading(true);
      console.log("=== STARTING APPLE IN-APP PURCHASE ===");

      if (itemsToPay.length > 1) {
        alert(
          "Apple supports purchasing items one by one. You will need to confirm each course separately.",
        );
      }

      for (const item of itemsToPay) {
        const targetAppleProductId = item!.product_id;
        console.log(
          `[StoreKit] Requesting FaceID for: ${targetAppleProductId}`,
        );

        const transaction = await NativePurchases.purchaseProduct({
          productIdentifier: targetAppleProductId,
          productType: PURCHASE_TYPE.INAPP,
        });

        console.log("[StoreKit] Purchase successful in Sandbox:", transaction);

        if (transaction?.transactionId) {
          console.log(
            `[Server] Verifying transaction ${transaction.transactionId}...`,
          );

          const verificationResult = isIOS
            ? await IAPServices.apple.verifyPurchase(transaction.transactionId)
            : await IAPServices.google.verifyPurchase(
                transaction.transactionId,
              );

          console.log("[Server] Backend verified item:", verificationResult);

          verificationResults.push(verificationResult);

          if (basketInterface?.toggleItemToBasket) {
            basketInterface.toggleItemToBasket(item!.item_id);
          }
        }
      }
    } catch (error: any) {
      console.warn("[StoreKit] Payment cycle interrupted or canceled:", error);
      if (verificationResults.length === 0) {
        alert("Basket payment was canceled by the user.");
        return;
      }
    } finally {
      setIsLoading(false);
    }

    if (verificationResults.length > 0) {
      try {
        setIsLoading(true);
        console.log(
          "[Checkout] Processing successful purchases...",
          verificationResults,
        );

        basketInterface?.clearBasket();
        await coursesInterface?.getAllCourses();
        await userInterface?.getUser();

        router.push("/payment?status=success", "root", "push");
      } catch (err) {
        console.error(
          "[Checkout] Error updating user data after payment:",
          err,
        );
        router.push("/payment?status=success", "root", "push");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleCheckoutBtnClick = () => {
    if (!accessToken) {
      authUiInterface?.openAuthUI("sing-up");
      authUiInterface?.setSuccessAuthCallback(() => {
        handleIAPCheckout();
      });
      return;
    }
    handleIAPCheckout();
  };

  return (
    <CheckoutBtn
      isLoading={isLoading || isIAPLoading}
      handleClick={handleCheckoutBtnClick}
      disabled={isIAPLoading || !(basketItems && basketItems.length > 0)}
    />
  );
};

export default InAppPurchaseButton;
