import { MouseEvent } from "react";
import { IonIcon } from "@ionic/react";
import { flyToBasket } from "../../utils/flyToTarget";
import { useBasket } from "../../context/BasketContext";
import basketIcon from "../../assets/icons/tabs/basket.svg";
import deleteIcon from "../../assets/icons/delete.svg";
import InsetBtn from "../InsetBtn/InsetBtn";
import styles from "./BuyCourseBtn.module.scss";

const BuyCourseBtn = ({
  courseId,
  className,
}: {
  courseId: number;
  className?: string;
}) => {
  const basket = useBasket();

  const isCourseInBasket =
    basket?.items.findIndex((item) => item.id === courseId) !== -1;

  const toggleItem = (e: MouseEvent<HTMLButtonElement>) => {
    const buttonEl = e.currentTarget;

    if (isCourseInBasket) {
      basket?.toggleItemToBasket(courseId);
    } else {
      flyToBasket(buttonEl)
        ?.onFinish(() => basket?.toggleItemToBasket(courseId))
        .play();
    }
  };

  return (
    <InsetBtn
      icon={
        <IonIcon
          className={isCourseInBasket ? styles.removeIcon : styles.basketIcon}
          src={isCourseInBasket ? deleteIcon : basketIcon}
        />
      }
      width="32rem"
      height="32rem"
      onClick={toggleItem}
      buttonClassName={className}
    />
  );
};

export default BuyCourseBtn;
