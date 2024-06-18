import { FC } from "react";
import { CourseType, useCourses } from "../../context/CoursesContext";
import styles from "./BasketList.module.scss";
import { useBasket } from "../../context/BasketContext";
import { serverName } from "../../http/server";
import { categories } from "../../constants";
import { priceFormatter } from "../../utils/priceFormatter";

type BasketItemType = {
  course?: CourseType;
  confirmed: boolean;
};

const BasketItem: FC<BasketItemType> = ({ course, confirmed }) => {
  const basketInterface = useBasket();
  const categoryTitle = useCourses()?.categories.find(
    (category) => category.id === course?.category_id
  )?.title;

  return (
    <li className={styles.basketItem}>
      {course && (
        <div className={styles.courseCard}>
          <label className={styles.radioButton}>
            <input
              type="checkbox"
              checked={confirmed}
              onChange={() => basketInterface?.toggleConfirmItem(course.id)}
            />
          </label>
          <div
            className={styles.coursePoster}
            style={{
              backgroundImage: `url(${serverName}/${course.image_path})`,
            }}
          >
            <div
              className={styles.imageWrapper}
              style={{
                backgroundImage: `url(${serverName}/${course.image_path})`,
              }}
            ></div>
          </div>
          <div className={styles.courseInfo}>
            <div className={styles.titleWrapper}>
              <h2>{course.title}</h2>
            </div>
            <div className={styles.secondaryInfoWrapper}>
              <span>Category:</span>
              <span>{categoryTitle}</span>
            </div>
            {course.old_price ? (
              <div className={styles.priceWrapper}>
                <div className={styles.secondaryInfoWrapper}>
                  <span>Old price:</span>
                  <span>{priceFormatter(course.old_price)} USD</span>
                </div>
                <div className={styles.secondaryInfoWrapper}>
                  <span>New price:</span>
                  <span>{priceFormatter(course.price)} USD</span>
                </div>
              </div>
            ) : (
              <div className={styles.secondaryInfoWrapper}>
                <span>Price:</span>
                <span>{priceFormatter(course.price)} USD</span>
              </div>
            )}
          </div>
        </div>
      )}
    </li>
  );
};

export default BasketItem;
