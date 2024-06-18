import { FC } from "react";
import { IonContent, IonPage } from "@ionic/react";
import { useBasket } from "../../context/BasketContext";
import Header from "../../components/Header/Header";
import styles from "./Basket.module.scss";
import BasketList from "../../components/BasketList/BasketList";

const Basket: FC = () => {
  const basketInterface = useBasket();

  const headerProps = {
    left: [{ name: "back" }],
    title: "Basket",
    right: [{ name: "details" }],
  };

  return (
    <IonPage id="basket">
      <Header {...headerProps} />
      <IonContent className={styles.contentWrapper}>
        <BasketList />
      </IonContent>
    </IonPage>
  );
};

export default Basket;
