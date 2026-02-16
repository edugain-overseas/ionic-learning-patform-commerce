import { ExamDataType, useCourses } from "../context/CoursesContext";
import { ExamAttempt } from "../pages/CourseDetailPage/CourseExamPage/CourseExamPage";

export const useExamLandidngStats = ({
  courseId,
  examAttempts,
}: {
  courseId: number;
  examAttempts: ExamAttempt[];
}) => {
  const courses = useCourses()?.courses;

  const course = courses?.find((course) => course.id === courseId);

  const exam = course?.lessons.find((lesson) => lesson.type === "exam");

  const examData = exam?.lessonData as ExamDataType | undefined;

  const testsScore = course
    ? course.lessons.reduce(
        (score, lesson) =>
          typeof lesson.score === "number" ? (score += lesson.score) : score,
        0
      )
    : 0;

  const attemptsLeft = examData
    ? Math.max(0, examData.attempts - examAttempts.length)
    : 0;

  return { course, exam, examData, testsScore, attemptsLeft };
};
