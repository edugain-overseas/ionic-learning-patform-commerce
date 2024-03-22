import {
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonImg,
  IonItem,
  IonList,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  SegmentChangeEventDetail,
} from "@ionic/react";
import React, { useState } from "react";
import { coursesNavItems, categories } from "../../constants";
import InfoIcon from "../../assets/icons/info.svg";
import categoryIcon from "../../assets/icons/category.svg";
import Header from "../../components/Header/Header";
import SegmentNavPanel from "../../components/SegmentNavPanel/SegmentNavPanel";
import InsetBtn from "../../components/InsetBtn/InsetBtn";
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
      <Header title="Courses" />
      <IonContent className="custom-content-wrapper">
        <SegmentNavPanel
          value={filter}
          setValue={onSegmentChange}
          items={coursesNavItems}
        />
        <IonGrid className={styles.categoriesList}>
          {categories.map((category) => (
            <IonRow key={category.id} className={styles.categoriesItem}>
              <IonCol size="auto">
                <IonImg src={categoryIcon} />
              </IonCol>
              <IonCol>
                <IonText>
                  <h3>{category.title}</h3>
                </IonText>
                <IonText>
                  <p>
                    (Complete all 4 courses to receive a <b>MBA Certificate</b>)
                  </p>
                </IonText>
              </IonCol>
              <IonCol size="auto">
                <InsetBtn
                  icon={InfoIcon}
                  width="32px"
                  height="32px"
                  disabled={false}
                  onClick={() => {}}
                />
              </IonCol>
            </IonRow>
          ))}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Courses;
