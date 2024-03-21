import {
  IonContent,
  IonLabel,
  IonPage,
  IonSegment,
  IonSegmentButton,
} from "@ionic/react";
import React from "react";
import Header from "../../components/Header/Header";
import styles from './Courses.module.scss'

const Courses: React.FC = () => {
  return (
    <IonPage>
      <Header title="Courses" />
      <IonContent className="custom-content-wrapper">
        <IonSegment scrollable={true} value="my" className={styles.segment} mode="ios">
          <IonSegmentButton value="my" mode="md">
            <IonLabel>My Courses</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="available" mode="md">
            <IonLabel>Available Courses</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="completed" mode="md">
            <IonLabel>Completed Courses</IonLabel>
          </IonSegmentButton>
        </IonSegment>
        <div>
          <h1>Courses Page</h1>
          <p>Welcome to the courses page!</p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Courses;
