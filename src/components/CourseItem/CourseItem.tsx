import React, { MouseEvent, useRef } from "react";
import { IonIcon, IonRippleEffect, IonRouterLink } from "@ionic/react";
import { CourseType } from "../../context/CoursesContext";
import { serverName } from "../../http/server";
import { useUser } from "../../context/UserContext";
import basketIcon from "../../assets/icons/tabs/basket.svg";
import deleteIcon from "../../assets/icons/delete.svg";
import CardPrice from "../CardPrice/CardPrice";
import InsetBtn from "../InsetBtn/InsetBtn";
import ProgressBar from "../ProgressBar/ProgressBar";
import styles from "./CourseItem.module.scss";
import CardGrade from "../CardGrade/CardGrade";
import InfoBtn from "../InfoBtn/InfoBtn";
import { useListStyle } from "../../context/ListStyleContext";
import { useBasket } from "../../context/BasketContext";
import { pulseOne } from "../../animations/cardAnimations";
import { flyToBasket } from "../../utils/flyToTarget";

interface CourseItemTypes {
  course: CourseType;
}

const CourseItem: React.FC<CourseItemTypes> = ({ course }) => {
  const itemRef = useRef<HTMLLIElement>(null);
  const userCourseData = useUser()?.user?.courses?.find(
    (userCourse) => userCourse.course_id === course.id
  );

  const basket = useBasket();

  const listStyle = useListStyle()?.listStyle;

  const isCourseInBasket =
    basket?.items.findIndex((item) => item.id === course.id) !== -1;

  const toggleItem = (e: MouseEvent<HTMLButtonElement>) => {
    const buttonEl = e.currentTarget;

    if (!itemRef.current) return;

    if (isCourseInBasket) {
      pulseOne(itemRef.current)
        .onFinish(() => basket?.toggleItemToBasket(course.id))
        .play();
    } else {
      flyToBasket(buttonEl)
        ?.onFinish(() => basket?.toggleItemToBasket(course.id))
        .play();
    }
  };

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
                <InsetBtn
                  icon={
                    <IonIcon
                      className={
                        isCourseInBasket ? styles.removeIcon : styles.basketIcon
                      }
                      src={isCourseInBasket ? deleteIcon : basketIcon}
                    />
                  }
                  width="32rem"
                  height="32rem"
                  onClick={toggleItem}
                />
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
