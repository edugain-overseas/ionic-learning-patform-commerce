import React from "react";
import { IonPage} from "@ionic/react";
import { Redirect, Route, useParams } from "react-router";
import CourseIntroPage from "./CourseIntroPage/CourseIntroPage";
import CourseTasksPage from "./CourseTasksPage/CourseTasksPage";
import CourseExamPage from "./CourseExamPage/CourseExamPage";

const CourseDetailPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();

  return (
    <IonPage>
      <Route
        path={`/courses/course/:courseId`}
        component={CourseIntroPage}
        exact
      />
      <Route
        path={`/courses/course/:courseId/tasks`}
        component={CourseTasksPage}
        exact
      />
      <Route
        path={`/courses/course/:courseId/exam`}
        component={CourseExamPage}
        exact
      />
      <Redirect from="/" to={`/courses/course/${courseId}`} />
    </IonPage>
  );
};

export default CourseDetailPage;
