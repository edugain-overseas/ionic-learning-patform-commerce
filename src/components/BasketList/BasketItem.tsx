import { FC, useEffect, useRef, useState } from "react";
import {
  Animation,
  Gesture,
  GestureDetail,
  IonIcon,
  createAnimation,
  createGesture,
} from "@ionic/react";
import { CourseType, useCourses } from "../../context/CoursesContext";
import { useUser } from "../../context/UserContext";
import { useBasket } from "../../context/BasketContext";
import { clamp } from "../../utils/clamp";
import deteleIcon from "../../assets/icons/delete.svg";
import arrowIcon from "../../assets/icons/arrow-right.svg";
import BasketItemAccordion from "./BasketItemAccordion";
import BasketCourseCard from "./BasketCourseCard";
import styles from "./BasketList.module.scss";
import { transition } from "@ionic/core/dist/types/utils/transition";

type BasketItemType = {
  course?: CourseType;
  confirmed: boolean;
  availableCourses?: CourseType[];
  hasAccordion: boolean;
};

const MAX_TRANSLATE = -339;
const TOGGLE_SHOW_DELETE_TRANSLATE = -32;

const BasketItem: FC<BasketItemType> = ({
  course,
  confirmed,
  availableCourses,
  hasAccordion,
}) => {
  if (!course) {
    return null;
  }
  const cardRef = useRef<HTMLDivElement | null>(null);
  const iconWrapperRef = useRef<HTMLDivElement | null>(null);
  const animation = useRef<Animation | null>(null);
  const gesture = useRef<Gesture | null>(null);
  const initialStep = useRef<number>(0);
  const started = useRef<boolean>(false);
  const [isDeleteShown, setIsDeleteShown] = useState(false);

  const basketInterface = useBasket();

  const category = useCourses()?.categories?.find(
    (category) => category.id === course?.category_id
  );
  const userCourses = useUser()?.user.courses;

  const categoryTitle = category?.title;

  const coursesToPropose = availableCourses?.filter(
    (availableCourse) =>
      availableCourse.category_id === course?.category_id &&
      !userCourses?.find(
        (userCourse) => userCourse.course_id === availableCourse.id
      )
  );

  useEffect(() => {
    if (animation.current) return;

    animation.current = createAnimation()
      .addElement(cardRef.current!)
      .duration(200)
      .fromTo("transform", "translateX(0)", `translateX(${MAX_TRANSLATE}rem)`);

    gesture.current = createGesture({
      el: cardRef.current!,
      threshold: 10,
      gestureName: "card-drag",
      onMove: (ev) => onMove(ev),
      onEnd: (ev) => onEnd(ev),
    });

    gesture.current.enable(true);

    const onMove = (ev: GestureDetail) => {
      if (!started.current) {
        animation.current!.progressStart();
        cardRef.current?.nextElementSibling?.classList.add(styles.shown);
        cardRef.current?.classList.add(styles["gesture-active"]);
        started.current = true;
      }
      const step = getStep(ev);
      iconWrapperRef.current?.style.setProperty("width", `${step * 100}%`);

      animation.current!.progressStep(step);
    };

    const onEnd = (ev: GestureDetail) => {
      if (!started.current) {
        return;
      }

      gesture.current!.enable(false);

      const step = getStep(ev);
      const shouldComplete = step > 0.35;

      if (shouldComplete) {
        cardRef.current?.classList.add(styles.deleting);
      } else {
        setIsDeleteShown(false);
      }

      animation
        .current!.progressEnd(shouldComplete ? 1 : 0, step)
        .onFinish(() => {
          gesture.current!.enable(true);
          cardRef.current?.nextElementSibling?.classList.remove(styles.shown);
          cardRef.current?.classList.remove(styles["gesture-active"]);
          if (shouldComplete && course?.id) {
            basketInterface?.toggleItemToBasket(course.id);
          }
          if (!shouldComplete) {
            iconWrapperRef.current?.style.setProperty("width", `32rem`);
          }
        });

      initialStep.current = shouldComplete ? MAX_TRANSLATE : 0;
      started.current = false;
    };

    const getStep = (ev: GestureDetail) => {
      console.log(initialStep.current);

      const delta = initialStep.current + ev.deltaX;
      return clamp(0, delta / MAX_TRANSLATE, 1);
    };
  }, [cardRef]);

  const toggleShowDelete = () => {
    if (!animation.current) return;

    const shouldOpen = !isDeleteShown;
    setIsDeleteShown(shouldOpen);

    const step = shouldOpen ? TOGGLE_SHOW_DELETE_TRANSLATE / MAX_TRANSLATE : 0;

    if (step) {
      cardRef.current?.nextElementSibling?.classList.add(styles.shown);
      cardRef.current?.classList.add(styles["gesture-active"]);
    } else {
      cardRef.current?.nextElementSibling?.classList.remove(styles.shown);
      cardRef.current?.classList.remove(styles["gesture-active"]);
    }

    animation.current.progressStart().progressStep(step);
    initialStep.current = TOGGLE_SHOW_DELETE_TRANSLATE;
  };

  const handleDeleteBtnClick = () => {
    if (!animation.current) return;
    cardRef.current?.classList.add(styles.deleting);

    animation
      .current!.progressEnd(1, TOGGLE_SHOW_DELETE_TRANSLATE / MAX_TRANSLATE)
      .onFinish(() => {
        gesture.current!.enable(true);
        cardRef.current?.nextElementSibling?.classList.remove(styles.shown);
        cardRef.current?.classList.remove(styles["gesture-active"]);
        basketInterface?.toggleItemToBasket(course.id);
      });

    initialStep.current = MAX_TRANSLATE;
    started.current = false;
  };

  return (
    <li className={styles.basketItem}>
      <div className={styles.card} ref={cardRef}>
        <BasketCourseCard
          course={course}
          confirmed={confirmed}
          categoryTitle={categoryTitle}
        />
        {hasAccordion && coursesToPropose && coursesToPropose.length !== 0 && (
          <BasketItemAccordion courses={coursesToPropose} />
        )}
        <button className={styles.toggleShowDelete} onClick={toggleShowDelete}>
          {isDeleteShown ? (
            <IonIcon src={arrowIcon} className={styles.arrowIcon} />
          ) : (
            <IonIcon src={deteleIcon} className={styles.deleteIcon} />
          )}
        </button>
      </div>
      <div className={styles.deleteWrapper}>
        <div className={styles.iconWrapper} ref={iconWrapperRef}>
          <IonIcon
            src={deteleIcon}
            onClick={() => isDeleteShown && handleDeleteBtnClick()}
          />
        </div>
      </div>
    </li>
  );
};

export default BasketItem;
