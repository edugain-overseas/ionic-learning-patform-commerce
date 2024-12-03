import { FC } from "react";
import styles from "./CourseBuyStatusPage.module.scss";
import { Link } from "react-router-dom";
import { useCourses } from "../../../context/CoursesContext";
import { IonImg } from "@ionic/react";
import successImg from "../../../assets/images/symbo-with-hand.png";
import CourseItem from "../../../components/CourseItem/CourseItem";

const Success: FC<{ coursesIds: number[] }> = ({ coursesIds }) => {
  const courses = useCourses()?.courses.filter((course) =>
    coursesIds.includes(course.id)
  );

  return (
    <div className={styles.content}>
      <h1>
        <span>
          Success!
          <IonImg src={successImg} style={{ width: "32rem" }} />
        </span>
        You successfully bought
      </h1>
      {courses && (
        <ul>
          {courses.map((course) => (
            <CourseItem course={course} key={course.id} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Success;
