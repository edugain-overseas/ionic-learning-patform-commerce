import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useCourses } from "../../context/CoursesContext";
import Lecture from "../../components/Lecture/Lecture";
import Header from "../../components/Header/Header";
import { IonContent } from "@ionic/react";
import CourseProgressModal from "../../components/CourseProgressModal/CourseProgressModal";

const TaskPage: React.FC = () => {
  const { courseId, taskId } = useParams<{
    courseId: string;
    taskId: string;
  }>();

  const coursesInterface = useCourses();

  const courseData = coursesInterface?.courses.find(
    (course) => course.id === +courseId
  );
  const taskData = courseData?.lessons.find((lesson) => lesson.id === +taskId);

  useEffect(() => {
    coursesInterface?.getLessonById(taskId, courseId);
  }, [taskId]);

  const handlePrevLesson = () => {};

  const handleNextLesson = () => {};

  const headerProps = {
    left: [{ name: "prevLesson", onClick: handlePrevLesson }],
    title: taskData?.title,
    right: [
      { name: "notification" },
      { name: "nextLesson", onClick: handleNextLesson },
    ],
  };

  return (
    <>
      <Header {...headerProps} />
      <IonContent fullscreen={true}>
        {taskData?.type === "lecture" && <Lecture taskData={taskData} />}
      </IonContent>
      <CourseProgressModal />
    </>
  );
};

export default TaskPage;
