import { useState } from "react";
import { NativePurchases, PURCHASE_TYPE } from "@capgo/native-purchases";
import { useBasket } from "../../context/BasketContext";
import CheckoutBtn from "./CheckoutBtn";

const InAppPurchaseButton = () => {
  const [isLoading, setIsLoading] = useState(false);

  const basketInterface = useBasket();

  const basketItems = basketInterface?.items;

  const handleApplePayCheckout = async () => {
    if (isLoading || !basketItems) return;

    // тестові айтеми
    const itemsToPay = [{ id: "courses.feu.com.bundle.cognitive_psychology" }, { id: "feu.course.57" }];

    try {
      setIsLoading(true);
      console.log("=== ЗАПУСК ЛОКАЛЬНОГО ТЕСТУ ОПЛАТИ ЧЕРЕЗ КНОПКУ ===");

      for (const item of itemsToPay) {
        const targetAppleProductId = item.id;
        console.log(`[Тест] Запит FaceID для: ${targetAppleProductId}`);

        const transaction = await NativePurchases.purchaseProduct({
          productIdentifier: targetAppleProductId,
          productType: PURCHASE_TYPE.INAPP,
        });

        console.log(
          "[Тест] Успішний платіж у Sandbox! Дані Apple:",
          transaction,
        );

        if (transaction?.transactionId) {
          console.log(
            `[Тест] Курс ${item.id} успішно оплачено. ID транзакції: ${transaction.transactionId}`,
          );
          // await verifyTransactionOnFastAPI(item.id, transaction.transactionId);
        }
      }

      alert("Всі тестові товари з кошика успішно сплачені локально!");
    } catch (error: any) {
      console.warn(
        "[Тест] Оплату скасовано або сталася помилка StoreKit:",
        error,
      );
      alert("Оплату кошика скасовано користувачем.");
    } finally {
      setIsLoading(false);
    }
  };

  return <CheckoutBtn isLoading={isLoading} handleClick={handleApplePayCheckout} />;
};

export default InAppPurchaseButton;
