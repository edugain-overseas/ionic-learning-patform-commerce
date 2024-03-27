import React from "react";
import { IonBackButton, IonHeader, IonPage } from "@ionic/react";
import { useParams } from "react-router";

const CourseDetailPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();

  console.log(courseId);

  return (
    <IonPage>
      <IonHeader>
        <IonBackButton text={""} />
      </IonHeader>
    </IonPage>
  );
};

export default CourseDetailPage;
