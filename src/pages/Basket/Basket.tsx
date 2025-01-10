import { FC } from "react";
import { IonContent, IonIcon, IonPage } from "@ionic/react";
import { useBasket } from "../../context/BasketContext";
import EmptyBasketIcon from "../../assets/icons/empty_basket.svg";
import Header from "../../components/Header/Header";
import BasketList from "../../components/BasketList/BasketList";
import BasketCheckoutPanel from "../../components/BasketCheckoutPanel/BasketCheckoutPanel";
import styles from "./Basket.module.scss";

const headerProps = {
  left: [{ name: "back" }],
  title: "Basket",
  right: [{ name: "details" }],
};

const EmptyBasketFallback: FC = () => {
  return (
    <div className={styles.empty}>
      <IonIcon src={EmptyBasketIcon} />
      <span className={styles.emptyMessage}>
        There are no items added to the cart.
      </span>
    </div>
  );
};

const Basket: FC = () => {
  const basket = useBasket();
  const isEmptyBasket = !basket || basket.items.length === 0;

  console.log(isEmptyBasket);

  return (
    <IonPage id="basket">
      <Header {...headerProps} />
      {isEmptyBasket ? (
        <EmptyBasketFallback />
      ) : (
        <IonContent className={styles.contentWrapper} scrollY>
          <BasketList />
        </IonContent>
      )}

      <BasketCheckoutPanel />
    </IonPage>
  );
};

export default Basket;
