import { useEffect } from "react";
import { Capacitor } from "@capacitor/core";
import { Stripe } from "@capacitor-community/stripe";
import { NativePurchases, PURCHASE_TYPE } from "@capgo/native-purchases";

export const useSetupPayment = () => {
  useEffect(() => {
    const setupStripe = async () => {
      await Stripe.initialize({
        publishableKey: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY_DEV,
      });
    };

    const setupIAP = async () => {
      // let transactionListener: any = null;

      try {
        // transactionListener = await (NativePurchases as any).addListener(
        //   "purchaseUpdated",
        //   (transaction: any) => {
        //     console.log(
        //       "[Слухач] Отримано фонове оновлення транзакції від Apple:",
        //       transaction,
        //     );
        //     if (transaction?.transactionId) {
        //       // verifyTransactionOnBackend(transaction.transactionId);
        //     }
        //   },
        // );

        //prod version
        // const productIds = await instance.getProductIds();

        const productIds = [
          "courses.feu.com.bundle.cognitive_psychology",
          "feu.course.57",
        ];

        const products = await NativePurchases.getProducts({
          productIdentifiers: productIds,
          productType: PURCHASE_TYPE.INAPP,
        });

        console.log(
          `[Тест] Зв'язок з ${
            Capacitor.getPlatform() === "ios"
              ? "Apple StoreKit"
              : "Google Play Billing"
          } встановлено. Знайдено продуктів:`,
          products.products,
        );
      } catch (error) {
        console.error("[Тест] Помилка ініціалізації NativePurchases:", error);
      }
    };

    if (Capacitor.isNativePlatform()) {
      setupIAP();
    } else {
      setupStripe();
    }
  }, []);
};
