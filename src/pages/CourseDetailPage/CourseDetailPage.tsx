import React, { useEffect } from "react";
import { IonPage, IonRouterOutlet } from "@ionic/react";
import { Route, useLocation, useParams } from "react-router";
import { useUser } from "../../context/UserContext";
import { useCourses } from "../../context/CoursesContext";
import CourseIntroPage from "./CourseIntroPage/CourseIntroPage";
import CourseTasksPage from "./CourseTasksPage/CourseTasksPage";
import CourseExamPage from "./CourseExamPage/CourseExamPage";
import TaskPage from "../TaskPage/TaskPage";
import CourseExamBlockedPage from "./CourseExamBlockedPage/CourseExamBlockedPage";
import CourseProgressModal from "../../components/CourseProgressModal/CourseProgressModal";

const CourseDetailPage: React.FC = () => {
  const { courseId } = useParams<{
    courseId: string;
  }>();
  const accessToken = useUser()?.user.accessToken;
  const userId = useUser()?.user.userId;
  const coursesInterface = useCourses();
  const { pathname } = useLocation();

  useEffect(() => {
    if (accessToken) {
      if (courseId) {
        coursesInterface?.getCourseDetailById(courseId);
      }
    }
  }, [courseId, accessToken, userId]);

  const shouldShowModal = pathname.includes(`/course/${courseId}/tasks`);

  return (
    <IonPage id="course-page">
      <IonRouterOutlet animated={false}>
        <Route path={`/course/:courseId`} component={CourseIntroPage} exact />
        <Route
          path={`/course/:courseId/tasks`}
          component={CourseTasksPage}
          exact
        />
        <Route path={`/course/:courseId/tasks/:taskId`} component={TaskPage} />
        <Route path={`/course/:courseId/exam`} component={CourseExamPage} />
        <Route
          path={`/course/:courseId/exam-blocked`}
          component={CourseExamBlockedPage}
        />
      </IonRouterOutlet>

      {shouldShowModal && <CourseProgressModal key={`modal-${courseId}`} />}
    </IonPage>
  );
};

export default CourseDetailPage;
