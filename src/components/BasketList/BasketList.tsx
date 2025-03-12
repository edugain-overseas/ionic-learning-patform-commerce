import { FC } from "react";
import { useBasket } from "../../context/BasketContext";
import { useCourses } from "../../context/CoursesContext";
import { groupByKey } from "../../utils/groupByKey";
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

  const groupedItemsByCategoryId = groupByKey(items, "categoryId");

  if (!groupedItemsByCategoryId) {
    return null;
  }

  return (
    <ul className={styles.basketList}>
      {Array.from(groupedItemsByCategoryId, ([categoryId, categoryItems]) => {
        console.log(categoryItems);

        return (
          <li key={categoryId}>
            <ul>
              {categoryItems.map((item, index, array) => (
                <BasketItem
                  key={item.id}
                  course={courses?.find(({ id }) => item.id === id)}
                  confirmed={item.confirmed}
                  availableCourses={availableCourses}
                  hasAccordion={index + 1 === array.length}
                />
              ))}
            </ul>
          </li>
        );
      })}
    </ul>
  );
};

export default BasketList;
