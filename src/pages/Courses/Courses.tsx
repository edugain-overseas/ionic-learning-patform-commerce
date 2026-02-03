import { IonContent, IonPage } from "@ionic/react";
import React, { useState } from "react";
import { coursesFilter } from "../../constants/nav";
import { useCourses } from "../../context/CoursesContext";
import { useUser } from "../../context/UserContext";
import Header from "../../components/Header/Header";
import CategoryItem from "../../components/CategoryItem/CategoryItem";
import SegmentNavPanel from "../../components/SegmentNavPanel/SegmentNavPanel";
import PageRefresher from "../../components/PageRefresher/PageRefresher";
import Auth from "../../components/Auth/Auth";
import styles from "./Courses.module.scss";

const Courses: React.FC = () => {
  const coursesInterface = useCourses();
  const categories = coursesInterface?.categories;
  const courses = coursesInterface?.courses;
  const [filter, setFilter] = useState<string>(coursesFilter[0].value);
  const [isScrolling, setIsScrolling] = useState(false);

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

  const isAuthShown = !useUser()?.user.accessToken;

  return (
    <IonPage id="courses" className="primaryPage">
      <Header {...headerProps} />
      <IonContent
        className={`custom-content-wrapper ${styles.content} ${
          isAuthShown ? styles.withAuthPanel : ""
        }`}
        scrollEvents={true}
        onIonScrollStart={() => setIsScrolling(true)}
        onIonScrollEnd={() => setIsScrolling(false)}
      >
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
      <Auth hidden={isScrolling} />
    </IonPage>
  );
};

export default Courses;
