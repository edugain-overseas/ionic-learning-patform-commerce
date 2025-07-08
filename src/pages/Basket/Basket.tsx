import { FC } from "react";
import {
  IonContent,
  IonIcon,
  IonItem,
  IonList,
  IonPage,
  IonPopover,
} from "@ionic/react";
import { useBasket } from "../../context/BasketContext";
import EmptyBasketIcon from "../../assets/icons/empty_basket.svg";
import Header from "../../components/Header/Header";
import BasketList from "../../components/BasketList/BasketList";
import BasketCheckoutPanel from "../../components/BasketCheckoutPanel/BasketCheckoutPanel";
import styles from "./Basket.module.scss";
import { Link } from "react-router-dom";

const headerProps = {
  left: [{ name: "back" }],
  title: "Basket",
  right: [{ name: "details", id: "basket-header-popover-trigger" }],
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
    <IonPage id="basket" className="primaryPage">
      <Header {...headerProps} />
      <IonPopover
        trigger="basket-header-popover-trigger"
        side="bottom"
        alignment="start"
        arrow={false}
        dismissOnSelect={true}
      >
        <IonList className={styles.headerMenuList}>
          <IonItem
            button={true}
            detail={false}
            onClick={() => basket?.clearBasket()}
            // style={{ fontSize: "12rem", color: "var(--ion-color-primary)" }}
          >
            Clear basket
          </IonItem>
          <IonItem button={true} detail={false}>
            <Link
              to="/courses"
              style={{
                fontSize: "12rem",
                color: "var(--ion-color-light)",
                width: "100%",
                height: "100%",
                display: 'flex',
                alignItems: 'center'
              }}
            >
              Back to courses
            </Link>
          </IonItem>
        </IonList>
      </IonPopover>
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
