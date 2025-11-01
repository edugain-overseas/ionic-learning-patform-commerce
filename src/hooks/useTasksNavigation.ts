import { useState } from "react";
import { useParams } from "react-router";
import { useIonRouter } from "@ionic/react";
import { CourseType, useCourses } from "../context/CoursesContext";

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
      return await coursesInterface?.confirmLecture(lessonId);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const getNextLessonId = (
    direction: "back" | "forward",
    updatedCourses?: CourseType[]
  ) => {
    const course = updatedCourses
      ? updatedCourses.find((course) => course.id === +courseId)
      : courseData;

    const availableLessons = course?.lessons
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
    if (
      taskData?.type === "lecture" &&
      taskData.status === "active" &&
      direction === "forward"
    ) {
      const updatedCourses = await completeLecture(taskData.id);
      if (updatedCourses) {
        const targetLessonId = getNextLessonId(direction, updatedCourses);

        if (targetLessonId) {
          const targetLessonType = courseData?.lessons.find(
            (lesson) => lesson.id === +targetLessonId
          )?.type;

          const taskLink =
            targetLessonType === "exam"
              ? `/courses/course/${courseId}/exam`
              : `/courses/course/${courseId}/tasks/${targetLessonId}`;

          router.push(taskLink, `${direction}`);
        }
      } else {
        return;
      }
    }
    const targetLessonId = getNextLessonId(direction);

    if (targetLessonId) {
      const targetLessonType = courseData?.lessons.find(
        (lesson) => lesson.id === +targetLessonId
      )?.type;

      const taskLink =
        targetLessonType === "exam"
          ? `/courses/course/${courseId}/exam`
          : `/courses/course/${courseId}/tasks/${targetLessonId}`;

      router.push(taskLink, `${direction}`);
    }
  };

  return {
    canGoBack: getNextLessonId("back") !== undefined,
    canGoForward: getNextLessonId("forward") !== undefined,
    isLoading,
    handleNavigateLesson,
  };
};
