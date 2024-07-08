import React, { useEffect, useState } from "react";
import { IonContent, useIonRouter } from "@ionic/react";
import { useParams } from "react-router";
import { useCourses } from "../../context/CoursesContext";
import Lecture from "../../components/Lecture/Lecture";
import Test from "../../components/Test/Test";
import Header from "../../components/Header/Header";
import CourseProgressModal from "../../components/CourseProgressModal/CourseProgressModal";
import styles from "./TaskPage.module.scss";

const TaskPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

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

  const lessonData = taskData?.lessonData;

  useEffect(() => {
    if (!lessonData && taskData) {
      coursesInterface?.getLessonById(taskId, courseId);
    }
  }, [taskId, lessonData, taskData]);

  const shouldCompleteLecture = async (lessonId: number) => {    
    setIsLoading(true);
    try {
      await coursesInterface?.confirmLecture(lessonId);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const getNextLessonId = (direction: "back" | "forward") => {
    const availableLessons = courseData?.lessons
      .filter((lesson) => lesson.status !== "blocked")
      .sort((a, b) => a.number - b.number);
    if (availableLessons) {
      const targetLessonIndex =
        availableLessons?.findIndex((lesson) => lesson.id === +taskId) +
        (direction === "back" ? -1 : 1);
      return availableLessons[targetLessonIndex]?.id;
    }
    return false;
  };

  const handleNavigateLesson = async (direction: "back" | "forward") => {
    if (taskData?.type === "lecture" && taskData.status === "active") {
      await shouldCompleteLecture(taskData.id);
    }
    const targetLessonId = getNextLessonId(direction);
    if (targetLessonId) {
      router.push(
        `/courses/course/${courseId}/tasks/${targetLessonId}`,
        `${direction}`
      );
    }
  };

  const headerProps = {
    left: [
      {
        name: "prevLesson",
        className: `${getNextLessonId("back") ? "" : styles.disabled}`,
        onClick: () => handleNavigateLesson("back"),
      },
    ],
    title: taskData?.title,
    right: [
      { name: "notification" },
      {
        name: "nextLesson",
        className: `${getNextLessonId("forward") ? "" : styles.disabled}`,
        onClick: () => handleNavigateLesson("forward"),
        loading: isLoading,
      },
    ],
  };

  return (
    <>
      <Header {...headerProps} />
      <IonContent fullscreen={true}>
        {taskData?.type === "lecture" && <Lecture taskData={taskData} />}
        {taskData?.type === "test" && <Test taskData={taskData} />}
      </IonContent>
      <CourseProgressModal />
    </>
  );
};

export default TaskPage;
