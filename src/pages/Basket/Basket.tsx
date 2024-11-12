import { FC } from "react";
import { IonContent, IonPage } from "@ionic/react";
import Header from "../../components/Header/Header";
import BasketList from "../../components/BasketList/BasketList";
import BasketCheckoutPanel from "../../components/BasketCheckoutPanel/BasketCheckoutPanel";
import styles from "./Basket.module.scss";

const Basket: FC = () => {
  const headerProps = {
    left: [{ name: "back" }],
    title: "Basket",
    right: [{ name: "details" }],
  };

  return (
    <IonPage id="basket">
      <Header {...headerProps} />
      <IonContent className={styles.contentWrapper} scrollY>
        <BasketList />
      </IonContent>
      <BasketCheckoutPanel />
    </IonPage>
  );
};

export default Basket;
