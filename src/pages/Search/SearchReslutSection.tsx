import { FC, useCallback } from "react";
import { ResultType } from "./Search";
import {
  CategoryType,
  CourseType,
  InstructionType,
} from "../../context/CoursesContext";
import { IntructionAccordion } from "../Instructions/Instructions";
import CategoryItem from "../../components/CategoryItem/CategoryItem";
import CourseItem from "../../components/CourseItem/CourseItem";
import styles from "./Search.module.scss";

type SearchReslutSectionProps = {
  data: CategoryType[] | CourseType[] | InstructionType[];
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
      case "instructions":
        return (data as InstructionType[]).map((instruction) => (
          <IntructionAccordion key={instruction.id} instruction={instruction} />
        ));
      default:
        return null;
    }
  }, [type]);

  return (
    <div className={styles.searchResultSection} id={type}>
      <h3 className={styles.title}>
        Results in <span>{type}</span>
      </h3>
      <ul>{elementsByType()}</ul>
    </div>
  );
};

export default SearchReslutSection;
