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
      <IonRouterLink routerLink={`/courses/${course.id}`}>
        <div className={styles.courseAvatarWrapper}>
          <img src={subject} alt={course.title} />
        </div>
        <div className={styles.courseInfo}>
          <div className={styles.col}>
            <h3 className={styles.courseTitle}>{course.title}</h3>
            <div className={styles.progress}>
              <span>Progress:</span>
              <ProgressBar value={progress} width={172} height={10} />
            </div>
          </div>
          <div className={styles.col}>
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
