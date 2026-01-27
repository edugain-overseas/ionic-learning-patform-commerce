import React from "react";
import { useParams } from "react-router";
import { useCourses } from "../../context/CoursesContext";
import { courseNavItems } from "../../constants/nav";
import SegmentNavPanel, {
  SegmentItem,
} from "../SegmentNavPanel/SegmentNavPanel";

const CourseNavPanel: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const course = useCourses()?.courses.find(
    (course) => course.id === +courseId
  );
  const isCoursePurchased = course?.bought;
  const isExamAllowed =
    course?.lessons.find((lesson) => lesson.type === "exam")?.status !==
    "blocked";

  const denyMessage = isCoursePurchased
    ? "This lesson is not availabel. Please complete previous lessons"
    : "You can not access this lesson becouse it is blocked";

  const examItem: SegmentItem = {
    value: `/course/${courseId}/exam`,
    label: "Exam | Certificate",
    isAllowed: !!(isCoursePurchased && isExamAllowed),
    denyMessage,
  };

  return (
    <SegmentNavPanel
      items={[...courseNavItems(courseId), examItem]}
      routerNav={true}
    />
  );
};

export default CourseNavPanel;
