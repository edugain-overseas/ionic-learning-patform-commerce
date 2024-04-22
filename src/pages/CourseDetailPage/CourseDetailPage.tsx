import React, { useEffect } from "react";
import { IonPage } from "@ionic/react";
import { Redirect, Route, useParams } from "react-router";
import { useUser } from "../../context/UserContext";
import { useCourses } from "../../context/CoursesContext";
import CourseIntroPage from "./CourseIntroPage/CourseIntroPage";
import CourseTasksPage from "./CourseTasksPage/CourseTasksPage";
import CourseExamPage from "./CourseExamPage/CourseExamPage";

const CourseDetailPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const accessToken = useUser()?.user.accessToken;
  const coursesInterface = useCourses();

  useEffect(() => {
    if (courseId && accessToken) {
      coursesInterface?.getCourseDetailById(courseId);
    }
  }, [courseId, accessToken]);

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
      <Redirect from="/courses/course" to={`/courses/course/${courseId}`} exact/>
    </IonPage>
  );
};

export default CourseDetailPage;
