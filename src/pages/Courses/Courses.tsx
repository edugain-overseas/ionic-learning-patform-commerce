import { IonContent, IonPage } from "@ionic/react";
import React, { useState } from "react";
import { coursesNavItems } from "../../constants/nav";
import { useCourses } from "../../context/CoursesContext";
import Header from "../../components/Header/Header";
import SegmentNavPanel from "../../components/SegmentNavPanel/SegmentNavPanel";
import CategoryItem from "../../components/CategoryItem/CategoryItem";
import styles from "./Courses.module.scss";

const Courses: React.FC = () => {
  const categories = useCourses()?.categories;

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
          {categories?.map((category) => (
            <CategoryItem category={category} key={category.id} />
          ))}
        </ul>
      </IonContent>
    </IonPage>
  );
};

export default Courses;
