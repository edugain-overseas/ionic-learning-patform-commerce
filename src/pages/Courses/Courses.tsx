import { IonContent, IonPage } from "@ionic/react";
import React, { useState } from "react";
import { coursesNavItems } from "../../constants/nav";
import { useCourses } from "../../context/CoursesContext";
import Header from "../../components/Header/Header";
import SegmentNavPanel from "../../components/SegmentNavPanel/SegmentNavPanel";
import CategoryItem from "../../components/CategoryItem/CategoryItem";
import styles from "./Courses.module.scss";
import { useUser } from "../../context/UserContext";

const Courses: React.FC = () => {
  const coursesInterface = useCourses();
  const categories = coursesInterface?.categories;
  const courses = coursesInterface?.courses;
  const userCourses = useUser()?.user.courses;

  const handleFilterCategory = () => {
    switch (filter) {
      case "my": {
        let userCoursesIds: number[] = [];
        userCourses?.forEach((course) => userCoursesIds.push(course.course_id));

        let categoriesWithPurchasedCoursesIds: number[] = [];
        courses?.forEach((course) => {
          if (userCoursesIds.includes(course.id)) {
            categoriesWithPurchasedCoursesIds.push(course.category_id);
          }
        });

        return categories?.filter((category) =>
          categoriesWithPurchasedCoursesIds.includes(category.id)
        );
      }
      case "available":
        return categories;
      case "completed": {
        const completedUserCourses = userCourses?.filter(
          (course) => course.progress === 100
        );
        let userCoursesIds: number[] = [];
        completedUserCourses?.forEach((course) =>
          userCoursesIds.push(course.course_id)
        );

        let categoriesWithPurchasedCoursesIds: number[] = [];
        courses?.forEach((course) => {
          if (userCoursesIds.includes(course.id)) {
            categoriesWithPurchasedCoursesIds.push(course.category_id);
          }
        });

        return categories?.filter((category) =>
          categoriesWithPurchasedCoursesIds.includes(category.id)
        );
      }
      default:
        break;
    }
  };

  const [filter, setFilter] = useState<string>("my");

  const headerProps = {
    title: "Courses",
    left: [{ name: "back" }, { name: "notification", onClick: () => {} }],
    right: [
      { name: "list-style", onClick: () => {} },
      { name: "search", onClick: () => {} },
    ],
  };

  return (
    <IonPage>
      <Header {...headerProps} />
      <IonContent className="custom-content-wrapper">
        <SegmentNavPanel
          value={filter}
          setValue={setFilter}
          items={coursesNavItems}
        />
        <ul className={styles.categoriesList}>
          {handleFilterCategory()?.map((category) => (
            <CategoryItem category={category} key={category.id} />
          ))}
        </ul>
      </IonContent>
    </IonPage>
  );
};

export default Courses;
