import { FC } from "react";
import { CourseType, useCourses } from "../../context/CoursesContext";
import { BaseItemType } from "../../context/BasketContext";
import BasketItemAccordion from "./BasketItemAccordion";
import BasketCourseCard from "./BasketCourseCard";
import styles from "./BasketList.module.scss";
import { useUser } from "../../context/UserContext";

type BasketItemType = {
  course?: CourseType;
  confirmed: boolean;
  availableCourses?: CourseType[];
  subItemsInfo: BaseItemType[];
};

const BasketItem: FC<BasketItemType> = ({
  course,
  confirmed,
  availableCourses,
  subItemsInfo,
}) => {
  const category = useCourses()?.categories.find(
    (category) => category.id === course?.category_id
  );
  const userCourses = useUser()?.user.courses;

  const categoryTitle = category?.title;

  const coursesToPropose = availableCourses?.filter(
    (availableCourse) =>
      availableCourse.category_id === course?.category_id &&
      !userCourses?.find(
        (userCourse) => userCourse.course_id === availableCourse.id
      )
  );

  if (!course) {
    return null;
  }

  return (
    <li className={styles.basketItem}>
      <BasketCourseCard
        course={course}
        confirmed={confirmed}
        categoryTitle={categoryTitle}
      />
      {coursesToPropose && coursesToPropose.length !== 0 && (
        <BasketItemAccordion
          courses={coursesToPropose}
          itemsInfo={subItemsInfo}
        />
      )}
    </li>
  );
};

export default BasketItem;
