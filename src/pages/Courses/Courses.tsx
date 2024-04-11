import { IonContent, IonPage, SegmentChangeEventDetail } from "@ionic/react";
import React, { useState } from "react";
import { coursesNavItems } from "../../constants/nav";
import { categories } from "../../constants";
import Header from "../../components/Header/Header";
import SegmentNavPanel from "../../components/SegmentNavPanel/SegmentNavPanel";
import CategoryItem from "../../components/CategoryItem/CategoryItem";
import styles from "./Courses.module.scss";

const Courses: React.FC = () => {
  const [filter, setFilter] = useState<string>("my");

  return (
    <IonPage>
      <Header
        title="Courses"
        secondary={false}
        left={["back", "notification"]}
        right={["list-style", "search"]}
      />
      <IonContent className="custom-content-wrapper">
        <SegmentNavPanel
          value={filter}
          setValue={setFilter}
          items={coursesNavItems}
        />
        <ul className={styles.categoriesList}>
          {categories.map((category) => (
            <CategoryItem category={category} key={category.id} />
          ))}
        </ul>
      </IonContent>
    </IonPage>
  );
};

export default Courses;
