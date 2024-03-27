import React from "react";
import { IonIcon, IonRouterLink } from "@ionic/react";
import { courseTypes } from "../../constants";
import subject from "../../assets/images/subject_image.png";
import basket from "../../assets/icons/tabs/basket.svg";
import ProgressBar from "../ProgressBar/ProgressBar";
import CardPrice from "../CardPrice/CardPrice";
import InsetBtn from "../InsetBtn/InsetBtn";
import styles from "./CourseItem.module.scss";

const progress = 25;

interface CourseItemTypes {
  course: courseTypes;
}

const CourseItem: React.FC<CourseItemTypes> = ({ course }) => {
  return (
    <li className={styles.itemWrapper}>
      <IonRouterLink
        routerLink={`/courses/${course.id}`}
        className={styles.link}
      >
        <div
          className={styles.courseAvatarWrapper}
          style={{ background: `url(${subject})` }}
        >
          <img src={subject} alt={course.title} />
        </div>
        <div className={styles.courseInfo}>
          <div className={styles.colLeft}>
            <h3 className={styles.courseTitle}>
              {course.title} {course.title}
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
