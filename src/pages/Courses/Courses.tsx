import { IonContent, IonPage, RefresherEventDetail } from "@ionic/react";
import React, { useState } from "react";
import { coursesFilter } from "../../constants/nav";
import { useCourses } from "../../context/CoursesContext";
import { useUser } from "../../context/UserContext";
import Header from "../../components/Header/Header";
import CategoryItem from "../../components/CategoryItem/CategoryItem";
import SegmentNavPanel from "../../components/SegmentNavPanel/SegmentNavPanel";
import PageRefresher from "../../components/PageRefresher/PageRefresher";
import styles from "./Courses.module.scss";

const Courses: React.FC = () => {
  const userInterface = useUser();
  const coursesInterface = useCourses();
  const isLoggedIn = userInterface?.user.username !== "";
  const categories = coursesInterface?.categories;
  const courses = coursesInterface?.courses;
  const userCourses = userInterface?.user.courses;
  const [filter, setFilter] = useState<string>(coursesFilter[0].value);

  const handleFilterCategory = () => {
    const availableCourses = courses?.filter((course) => !course.bought);
    let categoriesIds: number[] = [];

    switch (filter) {
      case "all": {
        availableCourses?.forEach((course) => {
          if (!categoriesIds.includes(course.category_id)) {
            categoriesIds.push(course.category_id);
          }
        });

        return categories?.filter((category) =>
          categoriesIds.includes(category.id)
        );
      }
      case "short courses":
        availableCourses?.forEach((course) => {
          if (
            course.type === "short" &&
            !categoriesIds.includes(course.category_id)
          ) {
            categoriesIds.push(course.category_id);
          }
        });
        return categories?.filter((category) =>
          categoriesIds.includes(category.id)
        );
      case "long courses": {
        availableCourses?.forEach((course) => {
          if (
            course.type === "long" &&
            !categoriesIds.includes(course.category_id)
          ) {
            categoriesIds.push(course.category_id);
          }
        });
        return categories?.filter((category) =>
          categoriesIds.includes(category.id)
        );
      }
      default:
        break;
    }
  };

  const headerProps = {
    title: "Categories",
    left: [{ name: "back" }, { name: "search", onClick: () => {} }],
    right: [{ name: "notification" }, { name: "user" }],
  };

  const onRefresh = coursesInterface?.getAllCategories;

  return (
    <IonPage id="courses" className="primaryPage">
      <Header {...headerProps} />
      <IonContent className="custom-content-wrapper">
        <div style={{ marginBottom: "12rem" }}>
          <SegmentNavPanel
            value={filter}
            setValue={setFilter}
            items={coursesFilter}
          />
        </div>
        {onRefresh && <PageRefresher onRefresh={onRefresh} />}
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
