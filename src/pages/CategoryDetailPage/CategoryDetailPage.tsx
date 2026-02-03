import {
  IonContent,
  IonPage,
  IonSegment,
  IonSegmentButton,
  ScrollDetail,
  SegmentChangeEventDetail,
  useIonRouter,
  useIonViewDidEnter,
  useIonViewDidLeave,
  useIonViewWillEnter,
} from "@ionic/react";
import React, { useMemo, useRef, useState } from "react";
import { useParams } from "react-router";
import { useCourses } from "../../context/CoursesContext";
import { useUser } from "../../context/UserContext";
import { useFilter } from "../../hooks/useCategoryDetailPageFilter";
import { remToPx } from "../../utils/pxToRem";
import { changeStausBarTheme } from "../../hooks/useStatusBar";
import categoryContrastIcon from "../../assets/icons/category-contrast.svg";
import Header from "../../components/Header/Header";
import CourseItem from "../../components/CourseItem/CourseItem";
import PageRefresher from "../../components/PageRefresher/PageRefresher";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import Auth from "../../components/Auth/Auth";
import styles from "./CategoryDetailPage.module.scss";

const MAX_SCROLL_VALUE = 91;
const MY_STUDY_MAX_SCROLL_VALUE = 162;

const CategoryDetailPage: React.FC = () => {
  const contentRef = useRef<HTMLIonContentElement>(null);
  const topContentRef = useRef<HTMLDivElement>(null);
  const bottomInnerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLSpanElement>(null);
  const router = useIonRouter();
  const [isScrolling, setIsScrolling] = useState(false);
  const accessToken = useUser()?.user.accessToken;

  const tab = router.routeInfo.tab;
  const isMyStudyTab = tab === "my study";

  useIonViewWillEnter(() => {
    changeStausBarTheme("Dark");
  });
  useIonViewDidLeave(() => {
    changeStausBarTheme("Light");
  });

  const { categoryId } = useParams<{ categoryId: string }>();

  const coursesInterface = useCourses();

  const category = coursesInterface?.categories.find(
    ({ id }) => id === +categoryId
  );

  const courses = coursesInterface?.courses.filter(
    (course) => course.category_id === +categoryId
  );

  const userCourses = useUser()?.user.courses;

  const { filter, setFilter } = useFilter();

  const handleProgress = useMemo(() => {
    let coursesIds: number[] = [];
    courses?.forEach((course) => coursesIds.push(course.id));

    const purchasedCoursesData = courses?.filter((course) => course.bought);

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

  const toggleHeaderTitleVisibility = (visible: Boolean) => {
    if (visible) {
      headerRef.current?.classList.add(styles.headerVisible);
      return;
    }
    headerRef.current?.classList.remove(styles.headerVisible);
  };

  const handleScroll = (e: CustomEvent<ScrollDetail>) => {
    setIsScrolling(true);
    const hideCoef =
      e.detail.scrollTop /
      remToPx(isMyStudyTab ? MY_STUDY_MAX_SCROLL_VALUE : MAX_SCROLL_VALUE);
    topContentRef.current?.style.setProperty(
      "--hide-coefficient",
      `${hideCoef}`
    );

    toggleHeaderTitleVisibility(hideCoef > 0.4);
  };

  const handleScrollEnd = async () => {
    setIsScrolling(false);
    const scrollEl = await contentRef.current?.getScrollElement();
    const currentScroll = scrollEl?.scrollTop;

    if (!currentScroll && currentScroll !== 0) {
      return;
    }

    if (
      (remToPx(isMyStudyTab ? MY_STUDY_MAX_SCROLL_VALUE : MAX_SCROLL_VALUE) -
        currentScroll) /
        remToPx(isMyStudyTab ? MY_STUDY_MAX_SCROLL_VALUE : MAX_SCROLL_VALUE) >
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
    courses?.forEach(
      (course) => course.bought && userCoursesIds.push(course.id)
    );

    switch (filter) {
      case "All courses":
        return courses;
      case "In process":
        return courses?.filter((course) => userCoursesIds.includes(course.id));
      case "Available":
        return courses?.filter((course) => !userCoursesIds.includes(course.id));
      default:
        return [];
    }
  };

  const onRefresh = coursesInterface?.getAllCourses;

  const headerProps = {
    title: (
      <span ref={headerRef} className={styles.headerTitle}>
        {category?.title}
      </span>
    ),
    secondary: true,
    left: [{ name: "back" }, { name: "list-style" }],
    right: [{ name: "notification" }, { name: "user" }],
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
        {onRefresh && (
          <PageRefresher
            onRefresh={onRefresh}
            containerClassname={styles.refresher}
          />
        )}
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
            {isMyStudyTab && (
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
            )}
          </div>
          {isMyStudyTab && (
            <IonSegment
              value={filter}
              className={styles.segment}
              mode="ios"
              onIonChange={onSegmentChange}
            >
              <IonSegmentButton
                className={styles.segmentBtn}
                value="In process"
              >
                <span>In process</span>
              </IonSegmentButton>
              <IonSegmentButton className={styles.segmentBtn} value="Available">
                <span>Available</span>
              </IonSegmentButton>
              <IonSegmentButton
                className={styles.segmentBtn}
                value="All courses"
              >
                <span>All courses</span>
              </IonSegmentButton>
            </IonSegment>
          )}
        </div>
        <div
          className={`${styles.bottomOuter} ${styles.background}`}
          style={{
            paddingBottom: `calc(var(--tabbar-offset) + ${
              accessToken ? 0 : "65rem"
            })`,
          }}
        >
          <div className={styles.controllerWrapper}>
            <button className={styles.controller}></button>
          </div>
          <div className={styles.bottomInner} ref={bottomInnerRef}>
            <div className={styles.innerHeader}>
              <div>{isMyStudyTab ? filter : "Available"}</div>
              <div>
                <span>Purchased:</span>{" "}
                {`${courses?.filter((course) => course.bought).length} / ${
                  courses?.length
                }`}
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
      <Auth containerClassname={styles.authContainer} hidden={isScrolling} />
    </IonPage>
  );
};

export default CategoryDetailPage;
