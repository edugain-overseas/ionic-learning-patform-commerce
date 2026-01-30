import { IonContent, IonPage } from "@ionic/react";
import React, { useState } from "react";
import {
  coursesFilter,
  myStudyFilter,
  MyStudyFilterNameType,
} from "../../constants/nav";
import { useCourses } from "../../context/CoursesContext";
import { useUser } from "../../context/UserContext";
import Header from "../../components/Header/Header";
import CategoryItem from "../../components/CategoryItem/CategoryItem";
import SegmentNavPanel from "../../components/SegmentNavPanel/SegmentNavPanel";
import PageRefresher from "../../components/PageRefresher/PageRefresher";
import styles from "./MyStudy.module.scss";

const MyStudy: React.FC = () => {
  const userInterface = useUser();
  const coursesInterface = useCourses();
  const isLoggedIn = userInterface?.user.username !== "";
  const categories = coursesInterface?.categories;
  const courses = coursesInterface?.courses;
  const userCourses = userInterface?.user.courses;
  const [filter, setFilter] = useState<MyStudyFilterNameType>(
    myStudyFilter[0].value
  );

  const handleFilterCategory = () => {
    const purchasedCourses = courses?.filter((course) => course.bought);
    let categoriesIds: number[] = [];

    switch (filter) {
      case "in progress": {
        purchasedCourses?.forEach((course) => {
          if (course.progress === 100) return;

          if (!categoriesIds.includes(course.category_id)) {
            categoriesIds.push(course.category_id);
          }
        });

        return categories?.filter((category) =>
          categoriesIds.includes(category.id)
        );
      }
      case "completed":
        purchasedCourses?.forEach((course) => {
          if (course.progress !== 100) return;

          if (!categoriesIds.includes(course.category_id)) {
            categoriesIds.push(course.category_id);
          }
        });

        return categories?.filter((category) =>
          categoriesIds.includes(category.id)
        );
      case "all courses": {
        purchasedCourses?.forEach((course) => {
          if (!categoriesIds.includes(course.category_id)) {
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
    title: "My Study",
    left: [{ name: "back" }, { name: "search", onClick: () => {} }],
    right: [{ name: "notification" }, { name: "user" }],
  };

  const onRefresh = async () => {
    coursesInterface?.getAllCategories();
    coursesInterface?.getAllCourses();
  };

  return (
    <IonPage id="my-study" className="primaryPage">
      <Header {...headerProps} />
      <IonContent className="custom-content-wrapper">
        <div style={{ marginBottom: "12rem" }}>
          <SegmentNavPanel
            value={filter}
            setValue={setFilter}
            items={myStudyFilter}
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

export default MyStudy;
