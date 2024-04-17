import React from "react";
import { IonIcon, IonRouterLink } from "@ionic/react";
import { courseTypes } from "../../constants";
import subject from "../../assets/images/subject_image.png";
import basket from "../../assets/icons/tabs/basket.svg";
import CardPrice from "../CardPrice/CardPrice";
import InsetBtn from "../InsetBtn/InsetBtn";
import styles from "./CourseItem.module.scss";
import { CourseType } from "../../context/CoursesContext";
import { serverName } from "../../http/server";

// const progress = 25;

interface CourseItemTypes {
  course: CourseType;
}

const CourseItem: React.FC<CourseItemTypes> = ({ course }) => {
  return (
    <li className={styles.itemWrapper}>
      <IonRouterLink
        className={styles.link}
        routerLink={`/courses/course/${course.id}`}
        routerDirection="forward"
      >
        <div
          className={styles.courseAvatarWrapper}
          style={{ backgroundImage: `url(${serverName}/${course.image_path})` }}
        >
          <img src={`${serverName}/${course.image_path}`} alt={course.title} />
        </div>
        <div className={styles.courseInfo}>
          <div className={styles.colLeft}>
            <h3 className={styles.courseTitle}>
              {course.title}
            </h3>
            <div className={styles.progress}>
              <span>Progress: Not purchased</span>
            </div>
          </div>
          <div className={styles.colRight}>
            <CardPrice oldPrice={course.old_price} price={course.price} />
            <InsetBtn
              icon={<IonIcon className={styles.basketIcon} src={basket} />}
              width="32px"
              height="32px"
            />
          </div>
        </div>
      </IonRouterLink>
    </li>
  );
};

export default CourseItem;
