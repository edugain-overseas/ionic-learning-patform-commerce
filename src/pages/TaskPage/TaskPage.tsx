import React, { useEffect } from "react";
import { IonContent, useIonRouter } from "@ionic/react";
import { useParams } from "react-router";
import { useCourses } from "../../context/CoursesContext";
import { useLessonTabbarLayout } from "../../hooks/useTabbarLayout";
import Lecture from "../../components/Lecture/Lecture";
import Test from "../../components/Test/Test";
import Header from "../../components/Header/Header";
import CourseProgressModal from "../../components/CourseProgressModal/CourseProgressModal";
import styles from "./TaskPage.module.scss";

const TaskPage: React.FC = () => {
  useLessonTabbarLayout();

  const router = useIonRouter();

  const { courseId, taskId } = useParams<{
    courseId: string;
    taskId: string;
  }>();

  const coursesInterface = useCourses();

  const courseData = coursesInterface?.courses.find(
    (course) => course.id === +courseId
  );
  const taskData = courseData?.lessons.find((lesson) => lesson.id === +taskId);

  if (taskData?.type === "exam") {
    router.push(`/courses/course/${courseId}/exam`, "none", "replace");
  }

  const lessonData = taskData?.lessonData;

  useEffect(() => {
    if (!lessonData && taskData) {
      coursesInterface?.getLessonById(taskId, courseId);
    }
  }, [taskId, lessonData, taskData]);

  const headerProps = {
    left: [{ name: "back", defaultHref: `/courses/course/${courseId}/tasks` }],
    title: taskData?.title,
    right: [{ name: "notification" }],
  };

  return (
    <>
      <Header {...headerProps} />
      <IonContent
        fullscreen={true}
        scrollY={false}
        className={`${styles.content} ${
          taskData?.type ? styles[taskData.type] : ""
        }`}
      >
        {taskData?.type === "lecture" && <Lecture taskData={taskData} />}
        {taskData?.type === "test" && <Test taskData={taskData} key={taskId}/>}
      </IonContent>
      <CourseProgressModal />
    </>
  );
};

export default TaskPage;
