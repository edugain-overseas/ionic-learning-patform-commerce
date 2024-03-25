import {
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonImg,
  IonItem,
  IonList,
  IonPage,
  IonPopover,
  IonRow,
  IonText,
  IonTitle,
  SegmentChangeEventDetail,
} from "@ionic/react";
import React, { useState } from "react";
import { coursesNavItems, categories } from "../../constants";
import Header from "../../components/Header/Header";
import SegmentNavPanel from "../../components/SegmentNavPanel/SegmentNavPanel";
import CategoryItem from "../../components/CategoryItem/CategoryItem";
import styles from "./Courses.module.scss";

const Courses: React.FC = () => {
  const [filter, setFilter] = useState<string | number>("my");

  const onSegmentChange = (event: CustomEvent<SegmentChangeEventDetail>) => {
    const { value } = event.detail;
    if (value !== undefined) {
      setFilter(value);
    }
  };

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
          setValue={onSegmentChange}
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
