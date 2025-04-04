import { FC, useRef, useState } from "react";
import { CourseType } from "../../context/CoursesContext";
import BasketCourseCard from "./BasketCourseCard";
import styles from "./BasketList.module.scss";

type BasketItemAccordionType = {
  courses: CourseType[];
};

const BasketItemAccordion: FC<BasketItemAccordionType> = ({ courses }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    if (contentRef.current) {
      contentRef.current.style.maxHeight = isOpen
        ? "0"
        : `${contentRef.current.scrollHeight}px`;
      setIsOpen((prev) => !prev);
    }
  };

  return (
    <div className={styles.basketAccordion}>
      <div className={styles.content} slot="content" ref={contentRef}>
        <ul className={styles.basketAccordionCoursesList}>
          {courses.map((course) => (
            <li className={styles.basketAccordionCoursesItem} key={course.id}>
              <BasketCourseCard
                course={course}
                confirmed={false}
                subItem={true}  
              />
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.header} onClick={handleToggle}>
        <span>{`${isOpen ? "Hide" : "See"} all available courses`}</span>
      </div>
    </div>
  );
};

export default BasketItemAccordion;
