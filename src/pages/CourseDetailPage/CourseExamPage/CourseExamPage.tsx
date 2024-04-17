import { IonPage } from "@ionic/react";
import React from "react";
import Header from "../../../components/Header/Header";

const CourseExamPage = () => {
  const headerProps = {
    title: "Intro",
    left: [{ name: "back" }],
  };
  return (
    <IonPage>
      <Header {...headerProps} />
    </IonPage>
  );
};

export default CourseExamPage;
