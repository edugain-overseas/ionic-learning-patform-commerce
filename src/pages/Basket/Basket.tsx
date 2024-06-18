import { IonContent, IonPage } from "@ionic/react";
import React from "react";
import { useBasket } from "../../context/BasketContext";
import Header from "../../components/Header/Header";

const Basket: React.FC = () => {
  const basketInterface = useBasket();

  const headerProps = {
    left: [{ name: "back" }],
    right: [{ name: "details" }],
  };

  return (
    <IonPage id="basket">
      <Header {...headerProps} />
      <IonContent />
    </IonPage>
  );
};

export default Basket;
