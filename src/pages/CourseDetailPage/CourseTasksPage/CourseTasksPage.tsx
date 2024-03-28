import { IonPage } from "@ionic/react";
import React from "react";
import Header from "../../../components/Header/Header";

const CourseTasksPage = () => {
  return (
    <IonPage>
      <Header title="tasks" left={["back"]} />
    </IonPage>
  );
};

export default CourseTasksPage;
