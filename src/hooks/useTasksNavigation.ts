import { useState } from "react";
import { useParams } from "react-router";
import { useIonRouter } from "@ionic/react";
import { useCourses } from "../context/CoursesContext";

export const useTaskNavigation = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { courseId, taskId } = useParams<{
    courseId: string;
    taskId: string;
  }>();

  const router = useIonRouter();

  const coursesInterface = useCourses();

  const courseData = coursesInterface?.courses.find(
    (course) => course.id === +courseId
  );
  const taskData = courseData?.lessons.find((lesson) => lesson.id === +taskId);

  const completeLecture = async (lessonId: number) => {
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
      await completeLecture(taskData.id);
    }
    const targetLessonId = getNextLessonId(direction);
    if (targetLessonId) {
      router.push(
        `/courses/course/${courseId}/tasks/${targetLessonId}`,
        `${direction}`
      );
    }
  };


  return {
    canGoBack: getNextLessonId('back'),
    canGoForward: getNextLessonId('forward'),
    isLoading,
    handleNavigateLesson,
  }
};
