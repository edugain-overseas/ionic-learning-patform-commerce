import { Capacitor } from "@capacitor/core";
import { NativePurchases, PURCHASE_TYPE } from "@capgo/native-purchases";
import { IAPServices } from "../utils/IAP";
import { useBilling } from "../context/BillingContext";

export const useSetupPayment = () => {
  const { setIAPProducts, setIsIAPLoading } = useBilling();

  const initPayments = async (): Promise<void> => {
    const isNativePlatform = Capacitor.isNativePlatform();

    if (!isNativePlatform) {
      // const { Stripe } = await import("@capacitor-community/stripe");

      // await Stripe.initialize({
      //   publishableKey: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY_DEV,
      // });

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

      const productIds = productsStatuses.map(
        (product) => product.product_id,
      );

      const products = await NativePurchases.getProducts({
        productIdentifiers: productIds,
        productType: PURCHASE_TYPE.INAPP,
      });

      console.log(
        "[IAP] Успішно ініціалізовано:",
        products.products,
      );
    } catch (error) {
      console.error(
        "[IAP] Помилка ініціалізації:",
        error,
      );
    } finally {
      setIsIAPLoading(false);
    }
  };

  return { initPayments };
};
