import React, { useEffect, useState } from "react";
import { IonContent, useIonRouter, useIonViewWillLeave } from "@ionic/react";
import { useParams } from "react-router";
import { useCourses } from "../../context/CoursesContext";
import Lecture from "../../components/Lecture/Lecture";
import Test from "../../components/Test/Test";
import CourseProgressModal from "../../components/CourseProgressModal/CourseProgressModal";
import TaskHeader from "./TaskHeader";
import ViewModeToggleButton from "../../components/ViewModeToggleButton/ViewModeToggleButton";
import styles from "./TaskPage.module.scss";

const TaskPage: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);

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

  return (
    <>
      {taskData?.type === "lecture" && (
        <>
          <TaskHeader taskData={taskData} scrollProgress={scrollProgress} />
          <IonContent
            fullscreen={true}
            scrollY={false}
            className={`${styles.content} ${
              taskData?.type ? styles[taskData.type] : ""
            }`}
          >
            <Lecture
              key={taskId}
              taskData={taskData}
              onScrollProgress={(value) => setScrollProgress(value)}
            />
          </IonContent>
        </>
      )}
      {taskData?.type === "test" && (
        <Test
          taskData={taskData}
          onScrollProgress={(value) => setScrollProgress(value)}
          scrollProgress={scrollProgress}
        />
      )}
      <CourseProgressModal />
      <ViewModeToggleButton />
    </>
  );
};

export default TaskPage;
