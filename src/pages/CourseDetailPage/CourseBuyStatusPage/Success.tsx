import { FC, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCourses } from "../../../context/CoursesContext";
import { IonImg } from "@ionic/react";
import successImg from "../../../assets/images/symbo-with-hand.png";
import styles from "./CourseBuyStatusPage.module.scss";

const Success: FC<{ coursesIds: number[] }> = ({ coursesIds }) => {
  const coursesInterface = useCourses();
  const courses = coursesInterface?.courses.filter((course) =>
    coursesIds.includes(course.id)
  );

  useEffect(() => {    
    // coursesInterface?.getAllCourses();
  }, [coursesIds]);


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
            <Link
              to={`/courses/course/${course.id}`}
              style={{
                fontSize: "16rem",
                textAlign: "center",
                display: "block",
              }}
            >
              {course.title}
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Success;
