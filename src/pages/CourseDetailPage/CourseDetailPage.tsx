import React, { useEffect } from "react";
import { IonPage } from "@ionic/react";
import { Redirect, Route, useParams } from "react-router";
import { useUser } from "../../context/UserContext";
import { useCourses } from "../../context/CoursesContext";
import CourseIntroPage from "./CourseIntroPage/CourseIntroPage";
import CourseTasksPage from "./CourseTasksPage/CourseTasksPage";
import CourseExamPage from "./CourseExamPage/CourseExamPage";
import TaskPage from "../TaskPage/TaskPage";

const CourseDetailPage: React.FC = () => {
  const { courseId } = useParams<{
    courseId: string;
  }>();
  const accessToken = useUser()?.user.accessToken;
  const userId = useUser()?.user.userId;
  const coursesInterface = useCourses();

  useEffect(() => {
    if (accessToken) {
      if (courseId) {
        coursesInterface?.getCourseDetailById(courseId);
      }
    }
  }, [courseId, accessToken, userId]);

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
      <Route
        path={`/courses/course/:courseId/tasks/:taskId`}
        component={TaskPage}
      />
    </IonPage>
  );
};

export default CourseDetailPage;
