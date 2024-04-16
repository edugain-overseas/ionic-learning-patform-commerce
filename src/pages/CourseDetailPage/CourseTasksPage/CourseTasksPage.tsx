import { IonPage } from "@ionic/react";
import React from "react";
import Header from "../../../components/Header/Header";

const CourseTasksPage = () => {
  const headerProps = {
    title: "Tasks",
    left: [{ name: "back" }],
  };
  return (
    <IonPage>
      <Header {...headerProps} />
    </IonPage>
  );
};

export default CourseTasksPage;
