import React, { useRef } from "react";
import { IonRippleEffect, IonRouterLink } from "@ionic/react";
import { CourseType } from "../../context/CoursesContext";
import { serverName } from "../../http/server";
import { useUser } from "../../context/UserContext";
import { useListStyle } from "../../context/ListStyleContext";
import CardPrice from "../CardPrice/CardPrice";
import ProgressBar from "../ProgressBar/ProgressBar";
import CardGrade from "../CardGrade/CardGrade";
import styles from "./CourseItem.module.scss";
import BuyCourseBtn from "../BuyCourseBtn/BuyCourseBtn";

interface CourseItemTypes {
  course: CourseType;
}

const CourseItem: React.FC<CourseItemTypes> = ({ course }) => {
  const itemRef = useRef<HTMLLIElement>(null);
  const userCourseData = useUser()?.user?.courses?.find(
    (userCourse) => userCourse.course_id === course.id
  );

  const listStyle = useListStyle()?.listStyle;

console.log(course.bought);


  return (
    <li className={styles.itemWrapper} ref={itemRef}>
      <IonRouterLink
        className={`${styles.link} ${
          listStyle === "row" ? styles.row : ""
        } ion-activatable`}
        routerLink={`/course/${course.id}`}
        routerDirection="forward"
      >
        {listStyle === "card" && (
          <div
            className={styles.courseAvatarWrapper}
            style={{
              backgroundImage: `url(${encodeURI(
                `${serverName}/${course.image_path}`
              )})`,
            }}
          >
            <div className={styles.imageWrapper}>
              <div
                style={{
                  backgroundImage: `url(${encodeURI(
                    `${serverName}/${course.image_path}`
                  )})`,
                }}
              ></div>
            </div>
          </div>
        )}
        <div className={styles.courseInfo}>
          <h3 className={styles.courseTitle}>{course.title}</h3>
          <div className={styles.btnsWrapper}>
            {course.bought ? (
              <>
                <div className={styles.progress}>
                  Progress:{" "}
                  <ProgressBar
                    value={course.progress}
                    width={160}
                    height={10}
                    showValue={false}
                  />
                </div>
                <CardGrade grade={course.grade} />
              </>
            ) : (
              <>
                <CardPrice
                  oldPrice={course.old_price}
                  price={course.price}
                />
                <BuyCourseBtn courseId={course.id} />
              </>
            )}
          </div>
        </div>
        <IonRippleEffect></IonRippleEffect>
      </IonRouterLink>
    </li>
  );
};

export default CourseItem;
