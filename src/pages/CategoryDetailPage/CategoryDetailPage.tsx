import {
  IonContent,
  IonPage,
  IonSegment,
  IonSegmentButton,
  ScrollDetail,
  SegmentChangeEventDetail,
  useIonViewDidLeave,
  useIonViewWillEnter,
} from "@ionic/react";
import React, { useMemo, useRef } from "react";
import { useParams } from "react-router";
import { useCourses } from "../../context/CoursesContext";
import { useUser } from "../../context/UserContext";
import { useFilter } from "../../hooks/useCategoryDetailPageFilter";
import { remToPx } from "../../utils/pxToRem";
import { changeStausBarTheme } from "../../hooks/useStatusBar";
import categoryContrastIcon from "../../assets/icons/category-contrast.svg";
import Header from "../../components/Header/Header";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import CourseItem from "../../components/CourseItem/CourseItem";
import UnauthorizedUserContentFallback from "../../components/UnauthorizedUserContentFallback/UnauthorizedUserContentFallback";
import Auth from "../../components/Auth/Auth";
import styles from "./CategoryDetailPage.module.scss";

const MAX_SCROLL_VALUE = 112;

const headerProps = {
  title: "Courses",
  secondary: true,
  left: [{ name: "back" }],
  right: [{ name: "list-style", onClick: () => {} }],
};

const CategoryDetailPage: React.FC = () => {
  useIonViewWillEnter(() => {
    changeStausBarTheme("Dark");
  });

  useIonViewDidLeave(() => {
    changeStausBarTheme("Light");
  });

  const { categoryId } = useParams<{ categoryId: string }>();

  const category = useCourses()?.categories.find(
    ({ id }) => id === +categoryId
  );

  const courses = useCourses()?.courses.filter(
    (course) => course.category_id === +categoryId
  );

  const userCourses = useUser()?.user.courses;

  const { filter, setFilter } = useFilter();

  const showContentFallback =
    filter === "In process" && userCourses?.length === 0;

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

  const handleScroll = (e: CustomEvent<ScrollDetail>) => {
    topContentRef.current?.style.setProperty(
      "--hide-coefficient",
      `${e.detail.scrollTop / remToPx(MAX_SCROLL_VALUE)}`
    );
  };

  const handleScrollEnd = async () => {
    const scrollEl = await contentRef.current?.getScrollElement();
    const currentScroll = scrollEl?.scrollTop;

    if (!currentScroll && currentScroll !== 0) {
      return;
    }

    if (
      (remToPx(MAX_SCROLL_VALUE) - currentScroll) / remToPx(MAX_SCROLL_VALUE) >
      0.5
    ) {
      contentRef.current?.scrollToTop(300);
      bottomInnerRef.current?.style.setProperty("overflow", "hidden");
    } else {
      contentRef.current?.scrollToBottom(0);
      bottomInnerRef.current?.style.setProperty("overflow", "auto");
    }
  };

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
      case "All courses":
        return courses;
      case "In process":
        return courses?.filter((course) => userCoursesIds.includes(course.id));
      case "Available":
        return courses?.filter((course) => !userCoursesIds.includes(course.id));
      default:
        break;
    }
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
        style={{ overflow: "hidden" }}
      >
        <div className={styles.topContentWrapper} ref={topContentRef}>
          <div className={styles.topScaler}>
            <div className={styles.pageTitle}>
              <div className={styles.categoryImage}>
                <img src={categoryContrastIcon} />
              </div>
              <div className={styles.categoryTitle}>
                <h3>{category?.title}</h3>
                <p
                  dangerouslySetInnerHTML={{
                    __html: category?.certificate_info
                      ? category.certificate_info
                      : `(Complete all ${courses?.length} courses to receive a <b>Certificate</b>)`,
                  }}
                ></p>
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
            <IonSegmentButton className={styles.segmentBtn} value="In process">
              <span>In process</span>
            </IonSegmentButton>
            <IonSegmentButton className={styles.segmentBtn} value="Available">
              <span>Available</span>
            </IonSegmentButton>
            <IonSegmentButton className={styles.segmentBtn} value="All courses">
              <span>All courses</span>
            </IonSegmentButton>
          </IonSegment>
        </div>
        <div className={`${styles.bottomOuter} ${styles.background}`}>
          <div className={styles.controllerWrapper}>
            <button className={styles.controller}></button>
          </div>
          <div className={styles.bottomInner} ref={bottomInnerRef}>
            <div className={styles.innerHeader}>
              <div></div>
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
            {showContentFallback ? (
              <UnauthorizedUserContentFallback
                containerClassname={styles.contentFallbackContainer}
              />
            ) : (
              <ul className={styles.coursesList}>
                {handleFilterCourses()?.map((course) => (
                  <CourseItem course={course} key={course.id} />
                ))}
              </ul>
            )}
          </div>
        </div>
      </IonContent>
      {showContentFallback && (
        <Auth containerClassname={styles.authContainer} />
      )}
    </IonPage>
  );
};

export default CategoryDetailPage;
