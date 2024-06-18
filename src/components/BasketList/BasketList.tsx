import { FC } from "react";
import { useBasket } from "../../context/BasketContext";
import styles from "./BasketList.module.scss";
import BasketItem from "./BasketItem";
import { useCourses } from "../../context/CoursesContext";

const BasketList: FC = () => {
  const basketInterface = useBasket();
  const courses = useCourses()?.courses;
  const items = basketInterface?.items;

  if (items?.length === 0) {
    return null;
  }

  return (
    <ul className={styles.basketList}>
      {items?.map((item) => (
        <BasketItem
          key={item.id}
          course={courses?.find(({ id }) => item.id === id)}
          confirmed={item.confirmed}
        />
      ))}
    </ul>
  );
};

export default BasketList;
