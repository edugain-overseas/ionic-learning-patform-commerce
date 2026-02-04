import { useParams } from "react-router";
import { useCourses } from "../context/CoursesContext";
import { useEffect, useState } from "react";

export const useFilter = () => {
  const { categoryId } = useParams<{ categoryId: string }>();

  const courses = useCourses()?.courses.filter(
    (course) => course.category_id === +categoryId
  );

  const isUserHavePurchasedCourse =
    courses?.filter((course) => course.bought)?.length !== 0;

  const [filter, setFilter] = useState<string>(
    isUserHavePurchasedCourse ? "In process" : "Available"
  );

  useEffect(() => {
    if (isUserHavePurchasedCourse) {
      setFilter("In process");
    } else {
      setFilter("Available");
    }
  }, [isUserHavePurchasedCourse]);

  return { filter, setFilter };
};
