import {
  // GestureDetail,
  IonContent,
  IonPage,
  IonSegment,
  IonSegmentButton,
  // ScrollCustomEvent,
  ScrollDetail,
  SegmentChangeEventDetail,
  // createGesture,
  // useIonViewWillEnter,
} from "@ionic/react";
import React, {
  // UIEventHandler,
  // useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useParams } from "react-router";
import { useCourses } from "../../context/CoursesContext";
import { useUser } from "../../context/UserContext";
import categoryContrastIcon from "../../assets/icons/category-contrast.svg";
import Header from "../../components/Header/Header";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import CourseItem from "../../components/CourseItem/CourseItem";
import styles from "./CategoryDetailPage.module.scss";

const maxScrollValue = 96;

const CategoryDetailPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  
  const category = useCourses()?.categories.find(
    ({ id }) => id === +categoryId
  );

  const courses = useCourses()?.courses.filter(
    (course) => course.category_id === +categoryId
  );

  const userCourses = useUser()?.user.courses;

  const handleProgress = useMemo(() => {
    let coursesIds: number[] = [];
    courses?.forEach((course) => coursesIds.push(course.id));

    const purchasedCoursesData = userCourses?.filter((course) =>
      coursesIds.includes(course.course_id)
    );
    if (courses && purchasedCoursesData) {
      return Math.round(
        purchasedCoursesData?.reduce(
          (total, course) =>
            course.progress ? total + course.progress : total,
          0
        ) / (courses.length ? courses.length : 1)
      );
    }
  }, [userCourses]);

  const contentRef = useRef<HTMLIonContentElement>(null);
  const topContentRef = useRef<HTMLDivElement>(null);
  const bottomInnerRef = useRef<HTMLDivElement>(null);
  // const bottomSheet = useRef<HTMLDivElement>(null);
  // const bottomSheetController = useRef<HTMLButtonElement>(null);

  const [filter, setFilter] = useState<string>("All");

  const handleScroll = (e: CustomEvent<ScrollDetail>) => {
    topContentRef.current?.style.setProperty(
      "--hide-coefficient",
      `${e.detail.scrollTop / maxScrollValue}`
    );
  };

  const handleScrollEnd = async () => {
    const scrollEl = await contentRef.current?.getScrollElement();
    const currentScroll = scrollEl?.scrollTop;
    console.log(currentScroll);

    if (!currentScroll && currentScroll !== 0) {
      return;
    }

    if ((maxScrollValue - currentScroll) / maxScrollValue > 0.5) {
      contentRef.current?.scrollToTop(150);
      bottomInnerRef.current?.style.setProperty("overflow", "hidden");
    } else {
      contentRef.current?.scrollToBottom(150);
      bottomInnerRef.current?.style.setProperty("overflow", "auto");
    }
  };

  // useIonViewWillEnter(() => {
  //   const parentElementHeight =
  //     bottomSheet.current?.parentElement?.clientHeight;
  //   if (parentElementHeight && topContentRef.current?.clientHeight) {
  //     setCurrentHeight(
  //       Math.max(
  //         parentElementHeight - topContentRef.current?.clientHeight + 61,
  //         bottomSheet.current.clientHeight
  //       )
  //     );
  //   }
  // });

  // useEffect(() => {
  //   if (bottomSheetController.current && bottomSheet.current?.clientHeight) {
  //     const target = bottomSheetController.current;
  //     const parentElementHeight =
  //       bottomSheet.current?.parentElement?.clientHeight;

  //     if (topContentRef.current?.clientHeight && parentElementHeight) {
  //       const maxHeight = parentElementHeight + 61 - 56;
  //       const minHeight = parentElementHeight + 61 - 152;

  //       const gesture = createGesture({
  //         el: target,
  //         direction: "y",
  //         onMove: (detail) => onMove(detail),
  //         gestureName: "bottomSheet",
  //         onEnd: () => onEnd(maxHeight, minHeight),
  //       });

  //       gesture.enable();
  //     }
  //   }
  // }, [bottomSheetController.current, bottomSheet.current?.clientHeight]);

  // const onMove = (detail: GestureDetail) => {
  //   if (bottomSheet.current && currentHeight) {
  //     bottomSheet.current.style.transition = "none";
  //     bottomSheet.current.style.height = `${currentHeight - detail.deltaY}px`;
  //   }
  // };

  // const onEnd = (maxHeight: number, minHeight: number) => {
  //   const parentElementHeight =
  //     bottomSheet.current?.parentElement?.clientHeight;

  //   if (
  //     bottomSheet.current?.clientHeight &&
  //     topContentRef.current?.clientHeight &&
  //     parentElementHeight
  //   ) {
  //     const resultHeight =
  //       bottomSheet.current.clientHeight < maxHeight ? minHeight : maxHeight;
  //     bottomSheet.current.style.height = `${resultHeight}px`;

  //     if (maxHeight === resultHeight) {
  //       setShowDetail(false);
  //       setCurrentHeight(maxHeight);
  //     } else {
  //       setShowDetail(true);
  //       setCurrentHeight(minHeight);
  //     }
  //     bottomSheet.current.style.transition = "height 0.2s ease-out";
  //     setCurrentHeight(resultHeight);
  //   }
  // };

  const onSegmentChange = (event: CustomEvent<SegmentChangeEventDetail>) => {
    const { value } = event.detail;
    if (value !== undefined) {
      setFilter(`${value}`);
    }
  };

  const handleFilterCourses = () => {
    let userCoursesIds: number[] = [];
    userCourses?.forEach((course) => userCoursesIds.push(course.course_id));
    switch (filter) {
      case "All":
        return courses;
      case "In process":
        return courses?.filter((course) => userCoursesIds.includes(course.id));
      case "Available":
        return courses?.filter((course) => !userCoursesIds.includes(course.id));
      default:
        break;
    }
  };

  const headerProps = {
    title: "My Courses",
    secondary: true,
    left: [{ name: "back" }],
    right: [
      { name: "notification", onClick: () => {} },
      { name: "list-style", onClick: () => {} },
    ],
  };

  return (
    <IonPage className={styles.papeWrapper}>
      <Header {...headerProps} />
      <IonContent
        className={styles.contentWrapper}
        scrollEvents={true}
        onIonScroll={handleScroll}
        onIonScrollEnd={handleScrollEnd}
        ref={contentRef}
      >
        <div className={styles.topContentWrapper} ref={topContentRef}>
          <div className={styles.topScaler}>
            <div className={styles.pageTitle}>
              <div className={styles.categoryImage}>
                <img src={categoryContrastIcon} />
              </div>
              <div className={styles.categoryTitle}>
                <h3>{category?.title}</h3>
                <p>
                  (Complete all {courses?.length} courses to receive a{" "}
                  <b>MBA Certificate</b>)
                </p>
              </div>
            </div>
            <div className={styles.progressWrapper}>
              <span className={styles.progressValue}>
                Progress: {handleProgress} / 100%
              </span>
              <ProgressBar
                value={handleProgress}
                disabled={false}
                height={10}
                showValue={false}
              />
            </div>
          </div>
          <IonSegment
            value={filter}
            className={styles.segment}
            mode="ios"
            onIonChange={onSegmentChange}
          >
            <IonSegmentButton className={styles.segmentBtn} value="All">
              <span>All courses</span>
            </IonSegmentButton>
            <IonSegmentButton className={styles.segmentBtn} value="In process">
              <span>In process</span>
            </IonSegmentButton>
            <IonSegmentButton className={styles.segmentBtn} value="Available">
              <span>Available</span>
            </IonSegmentButton>
          </IonSegment>
        </div>
        <div
          className={`${styles.bottomOuter} ${styles.background}`}
          // ref={bottomSheet}
        >
          <div className={styles.controllerWrapper}>
            <button
              // ref={bottomSheetController}
              className={styles.controller}
            ></button>
          </div>
          <div className={styles.bottomInner} ref={bottomInnerRef}>
            <div className={styles.innerHeader}>
              <div>{filter}</div>
              <div>
                <span>Purchased:</span>{" "}
                {`${
                  userCourses?.filter((userCourse) =>
                    courses?.find(
                      (course) => course.id === userCourse.course_id
                    )
                  ).length
                } / ${courses?.length}`}
              </div>
            </div>
            <ul className={styles.coursesList}>
              {handleFilterCourses()?.map((course) => (
                <CourseItem course={course} key={course.id} />
              ))}
            </ul>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default CategoryDetailPage;
