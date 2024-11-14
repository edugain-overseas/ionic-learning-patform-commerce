import { FC } from "react";
import { CourseType } from "../../context/CoursesContext";
import { useBasket } from "../../context/BasketContext";
import { serverName } from "../../http/server";
import { priceFormatter } from "../../utils/priceFormatter";
import styles from "./BasketList.module.scss";

type BasketCourseCardType = {
  course: CourseType;
  confirmed: boolean;
  categoryTitle?: string;
  subItem?: boolean;
};

const BasketCourseCard: FC<BasketCourseCardType> = ({
  course,
  confirmed,
  categoryTitle,
  subItem = false,
}) => {
  const basketInterface = useBasket();

  return (
    <div className={styles.courseCard}>
      <label className={styles.radioButton}>
        <input
          type="checkbox"
          checked={confirmed}
          onChange={() =>
            subItem
              ? basketInterface?.toggleItemToBasket(course.id)
              : basketInterface?.toggleConfirmItem(course.id)
          }
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
              <span className={styles.oldPrice}>
                {priceFormatter(course.old_price)} USD
              </span>
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
  );
};

export default BasketCourseCard;
