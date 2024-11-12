import { FC } from "react";
import { ItemType, useBasket } from "../../context/BasketContext";
import { useCourses } from "../../context/CoursesContext";
import BasketItem from "./BasketItem";
import styles from "./BasketList.module.scss";

const BasketList: FC = () => {
  const basketInterface = useBasket();
  const coursesInterface = useCourses();
  const courses = coursesInterface?.courses;
  const items = basketInterface?.items;
  const availableCourses = courses?.filter(
    (course) => !items?.find((item) => item.id === course.id) && !course.bought
  );

  const groupedItemsByCategoryId = items?.reduce((res, item) => {
    if (!res.has(item.categoryId)) {
      res.set(item.categoryId, []);
    }
    res.get(item.categoryId)?.push(item);
    return res;
  }, new Map<number, ItemType[]>());

  if (!groupedItemsByCategoryId) {
    return null;
  }

  return (
    <ul className={styles.basketList}>
      {Array.from(groupedItemsByCategoryId, ([categoryId, categoryItems]) => (
        <li key={categoryId}>
          <ul>
            {categoryItems.map((item, index, array) => (
              <BasketItem
                key={item.id}
                course={courses?.find(({ id }) => item.id === id)}
                confirmed={item.confirmed}
                subItemsInfo={item.subItems}
                availableCourses={availableCourses}
                hasAccordion={index + 1 === array.length}
              />
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
};

export default BasketList;
