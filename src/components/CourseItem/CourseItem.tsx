import React, { useRef } from "react";
import { IonRippleEffect, IonRouterLink } from "@ionic/react";
import { CourseType } from "../../context/CoursesContext";
import { serverName } from "../../http/server";
import { useUser } from "../../context/UserContext";
import { useListStyle } from "../../context/ListStyleContext";
import CardPrice from "../CardPrice/CardPrice";
import ProgressBar from "../ProgressBar/ProgressBar";
import CardGrade from "../CardGrade/CardGrade";
import InfoBtn from "../InfoBtn/InfoBtn";
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

  return (
    <li className={styles.itemWrapper} ref={itemRef}>
      <IonRouterLink
        className={`${styles.link} ${
          listStyle === "row" ? styles.row : ""
        } ion-activatable`}
        routerLink={`/courses/course/${course.id}`}
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
          <div className={styles.colLeft}>
            <h3 className={styles.courseTitle}>{course.title}</h3>
          </div>
          <div className={styles.colRight}>
            {userCourseData ? (
              <>
                <CardGrade grade={course.grade} />
                <InfoBtn info={course.intro_text} />
              </>
            ) : (
              <>
                <CardPrice oldPrice={course.old_price} price={course.price} />
                <BuyCourseBtn courseId={course.id} />
              </>
            )}
          </div>
        </div>
        <div className={styles.progress}>
          Progress:{" "}
          {userCourseData ? (
            <ProgressBar
              value={course.progress}
              width={160}
              height={10}
              showValue={false}
            />
          ) : (
            "Not purchased"
          )}
        </div>
        <IonRippleEffect></IonRippleEffect>
      </IonRouterLink>
    </li>
  );
};

export default CourseItem;
