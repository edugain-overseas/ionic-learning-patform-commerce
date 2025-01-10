import { useParams } from "react-router";
import { useCourses } from "../context/CoursesContext";
import { useUser } from "../context/UserContext";
import { useEffect, useState } from "react";

export const useFilter = () => {
  const { categoryId } = useParams<{ categoryId: string }>();

  const courses = useCourses()?.courses.filter(
    (course) => course.category_id === +categoryId
  );

  const userCourses = useUser()?.user.courses;
  const isUserHavePurchasedCourse =
    courses?.filter((course) =>
      userCourses?.find((userCourse) => userCourse.course_id === course.id)
    )?.length !== 0;

  const [filter, setFilter] = useState<string>(
    isUserHavePurchasedCourse ? "All courses" : "In process"
  );

  useEffect(() => {
    if (isUserHavePurchasedCourse) {
      setFilter("In process");
    } else {
      setFilter("All courses");
    }
  }, [isUserHavePurchasedCourse]);

  return { filter, setFilter };
};
