import { FC, useCallback } from "react";
import { ResultType } from "./Search";
import {
  CategoryType,
  CourseType,
  LessonType,
} from "../../context/CoursesContext";
import styles from "./Search.module.scss";
import CategoryItem from "../../components/CategoryItem/CategoryItem";
import CourseItem from "../../components/CourseItem/CourseItem";
import TaskItem from "../../components/TaskItem/TaskItem";

type SearchReslutSectionProps = {
  data: CategoryType[] | CourseType[] | LessonType[];
  type: ResultType;
};

const SearchReslutSection: FC<SearchReslutSectionProps> = ({ data, type }) => {
  const elementsByType = useCallback(() => {
    switch (type) {
      case "categories":
        return (data as CategoryType[]).map((category) => (
          <CategoryItem category={category} key={category.id} />
        ));
      case "courses":
        return (data as CourseType[]).map((course) => (
          <CourseItem course={course} key={course.id} />
        ));
      case "lessons":
        return (data as LessonType[]).map((lesson) => (
          <TaskItem task={lesson} key={lesson.id} />
        ));
      default:
        return null;
    }
  }, [type]);

  return (
    <div className={styles.searchResultSection} id={type}>
      <h3>{type}</h3>
      <ul>{elementsByType()}</ul>
    </div>
  );
};

export default SearchReslutSection;
