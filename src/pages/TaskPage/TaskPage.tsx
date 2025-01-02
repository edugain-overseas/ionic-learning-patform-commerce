import React, { useEffect } from "react";
import { IonContent } from "@ionic/react";
import { useParams } from "react-router";
import { useCourses } from "../../context/CoursesContext";
import { useTaskNavigation } from "../../hooks/useTasksNavigation";
import Lecture from "../../components/Lecture/Lecture";
import Test from "../../components/Test/Test";
import Header from "../../components/Header/Header";
import CourseProgressModal from "../../components/CourseProgressModal/CourseProgressModal";
import styles from "./TaskPage.module.scss";

const TaskPage: React.FC = () => {
  const { canGoBack, canGoForward, isLoading, handleNavigateLesson } =
    useTaskNavigation();

  const { courseId, taskId } = useParams<{
    courseId: string;
    taskId: string;
  }>();

  const coursesInterface = useCourses();

  const courseData = coursesInterface?.courses.find(
    (course) => course.id === +courseId
  );
  const taskData = courseData?.lessons.find((lesson) => lesson.id === +taskId);

  const lessonData = taskData?.lessonData;

  useEffect(() => {
    if (!lessonData && taskData) {
      coursesInterface?.getLessonById(taskId, courseId);      
    }
  }, [taskId, lessonData, taskData]);

  const headerProps = {
    left: [
      {
        name: "prevLesson",
        className: `${canGoBack ? "" : styles.disabled}`,
        onClick: () => handleNavigateLesson("back"),
      },
    ],
    title: taskData?.title,
    right: [
      { name: "notification" },
      {
        name: "nextLesson",
        className: `${canGoForward ? "" : styles.disabled}`,
        onClick: () => handleNavigateLesson("forward"),
        loading: isLoading,
      },
    ],
  };

  return (
    <>
      <Header {...headerProps} />
      <IonContent fullscreen={true} className={styles.content}>
        {taskData?.type === "lecture" && <Lecture taskData={taskData} />}
        {taskData?.type === "test" && <Test taskData={taskData} />}
      </IonContent>
      <CourseProgressModal />
    </>
  );
};

export default TaskPage;
