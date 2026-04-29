import { MouseEvent } from "react";
import { IonIcon, useIonRouter } from "@ionic/react";
import { flyToBasket } from "../../utils/flyToTarget";
import { useBasket } from "../../context/BasketContext";
import basketIcon from "../../assets/icons/nav/basket.svg";
import styles from "./BuyCourseBtn.module.scss";
import CommonButton from "../CommonButton/CommonButton";

const BuyCourseBtn = ({
  courseId,
  className,
}: {
  courseId: number;
  className?: string;
}) => {
  const basket = useBasket();
  const router = useIonRouter();

  const isCourseInBasket =
    basket?.items.findIndex((item) => item.id === courseId) !== -1;

  const toggleItem = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    const buttonEl = e.currentTarget;

    if (isCourseInBasket) {
      basket?.toggleItemToBasket(courseId);
    } else {
      flyToBasket(buttonEl)
        ?.onFinish(() => basket?.toggleItemToBasket(courseId))
        .play();
    }
  };

  const handleOpenNavigateToBasket = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    router.push("/basket");
  };

  return (
    <CommonButton
      icon={<IonIcon className={styles.basketIcon} src={basketIcon} />}
      label={isCourseInBasket ? "Open" : "Buy"}
      onClick={isCourseInBasket ? handleOpenNavigateToBasket : toggleItem}
      className={`${styles.buyCourseBtn} ${
        isCourseInBasket ? styles.bgBlue : styles.bgRed
      } ${className}`}
    />
  );
};

export default BuyCourseBtn;
