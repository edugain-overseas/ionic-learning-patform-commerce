// import { useState } from "react";
// import { Capacitor } from "@capacitor/core";
// import { Stripe } from "@capacitor-community/stripe";
// import { NativePurchases, PURCHASE_TYPE } from "@capgo/native-purchases";
// import { AppleProductType, IAPServices } from "../utils/IAP";
// import { useBilling } from "../context/BillingContext";

// export const useSetupPayment = () => {
//   const { setIAPProducts } = useBilling();
//   const isNativePlatform = Capacitor.isNativePlatform();

//   const initPayments = async () => {
//     const setupStripe = async () => {
//       await Stripe.initialize({
//         publishableKey: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY_DEV,
//       });
//     };

//     const setupIAP = async () => {
//       try {
//         const productsStatuses = await IAPServices.apple.getProductsStatuses();

//         setIAPProducts(productsStatuses);

//         const productIds = productsStatuses.map(
//           (product) => product.product_id,
//         );

//         const products = await NativePurchases.getProducts({
//           productIdentifiers: productIds,
//           productType: PURCHASE_TYPE.INAPP,
//         });

//         console.log(
//           `[Тест] Зв'язок з ${
//             Capacitor.getPlatform() === "ios"
//               ? "Apple StoreKit"
//               : "Google Play Billing"
//           } встановлено. Знайдено продуктів:`,
//           products.products,
//         );
//       } catch (error) {
//         console.error("[Тест] Помилка ініціалізації NativePurchases:", error);
//       }
//     };

//     if (isNativePlatform) {
//       setupIAP();
//     } else {
//       setupStripe();
//     }
//   };

//   return initPayments;
// };

import { Capacitor } from "@capacitor/core";
import { Stripe } from "@capacitor-community/stripe";
import { NativePurchases, PURCHASE_TYPE } from "@capgo/native-purchases";
import { IAPServices } from "../utils/IAP";
import { useBilling } from "../context/BillingContext";

export const useSetupPayment = () => {
  const { setIAPProducts, setIsIAPLoading } = useBilling();

  const initPayments = async (): Promise<void> => {
    const isNativePlatform = Capacitor.isNativePlatform();

    if (!isNativePlatform) {
      await Stripe.initialize({
        publishableKey: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY_DEV,
      });
      setIsIAPLoading(false);
      return;
    }

    try {
      setIsIAPLoading(true);
      const productsStatuses =
        Capacitor.getPlatform() === "ios"
          ? await IAPServices.apple.getProductsStatuses()
          : await IAPServices.google.getProductsStatuses();

      setIAPProducts(productsStatuses);

      const productIds = productsStatuses.map((product) => product.product_id);

      const products = await NativePurchases.getProducts({
        productIdentifiers: productIds,
        productType: PURCHASE_TYPE.INAPP,
      });

      console.log("[StoreKit] Успішно ініціалізовано:", products.products);
    } catch (error) {
      console.error("[StoreKit] Помилка ініціалізації:", error);
    } finally {
      setIsIAPLoading(false);
    }
  };

  return { initPayments };
};
