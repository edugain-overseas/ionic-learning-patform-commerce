import { FC } from "react";
import { useBasket } from "../../context/BasketContext";
import { useCourses } from "../../context/CoursesContext";
import BasketItem from "./BasketItem";
import styles from "./BasketList.module.scss";

const BasketList: FC = () => {
  const basketInterface = useBasket();
  const courses = useCourses()?.courses;
  const items = basketInterface?.items;
  const availableCourses = courses?.filter(
    (course) => !items?.find((item) => item.id === course.id)
  );  

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
          subItemsInfo={item.subItems}
          availableCourses={availableCourses}
        />
      ))}
    </ul>
  );
};

export default BasketList;
