import { IonContent, IonPage } from "@ionic/react";
import React, { useEffect, useState } from "react";
import {
  coursesPrivateNavItems,
  coursesPublicNavItems,
} from "../../constants/nav";
import { useCourses } from "../../context/CoursesContext";
import { useUser } from "../../context/UserContext";
import Header from "../../components/Header/Header";
import CategoryItem from "../../components/CategoryItem/CategoryItem";
import SegmentNavPanel from "../../components/SegmentNavPanel/SegmentNavPanel";
import styles from "./Courses.module.scss";

const Courses: React.FC = () => {
  const userInterface = useUser();
  const coursesInterface = useCourses();
  const isLoggedIn = userInterface?.user.username !== "";
  const categories = coursesInterface?.categories;
  const courses = coursesInterface?.courses;
  const userCourses = userInterface?.user.courses;
  const [filter, setFilter] = useState<string>(isLoggedIn ? "my" : "available");

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

  useEffect(() => {
    if (isLoggedIn) {
      setFilter("my");
    } else {
      setFilter("available");
    }
  }, [isLoggedIn]);

  const headerProps = {
    title: "Categories of Courses",
    left: [{ name: "back" }, { name: "notification", onClick: () => {} }],
    right: [
      { name: "filter", onClick: () => {} },
      { name: "search", onClick: () => {} },
    ],
  };

  return (
    <IonPage id="courses" className="primaryPage">
      <Header {...headerProps} />
      <IonContent className="custom-content-wrapper">
        {isLoggedIn && (
          <SegmentNavPanel
            value={filter}
            setValue={setFilter}
            items={isLoggedIn ? coursesPrivateNavItems : coursesPublicNavItems}
          />
        )}
        <ul
          className={styles.categoriesList}
          style={{ paddingTop: isLoggedIn ? 0 : "16rem" }}
        >
          {handleFilterCategory()?.map((category) => (
            <CategoryItem category={category} key={category.id} />
          ))}
        </ul>
      </IonContent>
    </IonPage>
  );
};

export default Courses;
