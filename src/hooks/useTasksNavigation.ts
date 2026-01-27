import { useParams } from "react-router";
import { useIonRouter } from "@ionic/react";
import { CourseType, useCourses } from "../context/CoursesContext";

export const useTaskNavigation = () => {
  const { courseId, taskId } = useParams<{
    courseId: string;
    taskId: string;
  }>();

  const router = useIonRouter();

  const coursesInterface = useCourses();

  const courseData = coursesInterface?.courses.find(
    (course) => course.id === +courseId
  );

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
    const targetLessonId = getNextLessonId(direction);

    if (targetLessonId) {
      const targetLessonType = courseData?.lessons.find(
        (lesson) => lesson.id === +targetLessonId
      )?.type;

      const taskLink =
        targetLessonType === "exam"
          ? `/course/${courseId}/exam`
          : `/course/${courseId}/tasks/${targetLessonId}`;

      router.push(taskLink, `${direction}`);
    }
  };

  return {
    canGoBack: getNextLessonId("back") !== undefined,
    canGoForward: getNextLessonId("forward") !== undefined,
    handleNavigateLesson,
  };
};
