import {
  GestureDetail,
  IonContent,
  IonPage,
  IonSegment,
  IonSegmentButton,
  SegmentChangeEventDetail,
  createGesture,
  useIonViewDidEnter,
  useIonViewWillEnter,
} from "@ionic/react";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { useCourses } from "../../context/CoursesContext";
import categoryContrastIcon from "../../assets/icons/category-contrast.svg";
import Header from "../../components/Header/Header";
import styles from "./CategoryDetailPage.module.scss";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import CourseItem from "../../components/CourseItem/CourseItem";

const progress = 25;

const CategoryDetailPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const category = useCourses()?.categories.find(
    ({ id }) => id === +categoryId
  );

  const courses = useCourses()?.courses.filter(
    (course) => course.category_id === +categoryId
  );

  const topContentRef = useRef<HTMLDivElement>(null);
  const bottomSheet = useRef<HTMLDivElement>(null);
  const bottomSheetController = useRef<HTMLButtonElement>(null);

  const [filter, setFilter] = useState<string>("All");
  const [currentHeight, setCurrentHeight] = useState(0);
  const [showDetail, setShowDetail] = useState(true);

  useIonViewWillEnter(() => {
    const parentElementHeight =
      bottomSheet.current?.parentElement?.clientHeight;
    if (parentElementHeight && topContentRef.current?.clientHeight) {
      setCurrentHeight(
        Math.max(
          parentElementHeight - topContentRef.current?.clientHeight + 61,
          bottomSheet.current.clientHeight
        )
      );
    }
  });

  useEffect(() => {
    if (bottomSheetController.current && bottomSheet.current?.clientHeight) {
      const target = bottomSheetController.current;
      const parentElementHeight =
        bottomSheet.current?.parentElement?.clientHeight;

      if (topContentRef.current?.clientHeight && parentElementHeight) {
        const maxHeight = parentElementHeight + 61 - 56;
        const minHeight = parentElementHeight + 61 - 152;

        const gesture = createGesture({
          el: target,
          direction: "y",
          onMove: (detail) => onMove(detail),
          gestureName: "bottomSheet",
          onEnd: () => onEnd(maxHeight, minHeight),
        });

        gesture.enable();
      }
    }
  }, [bottomSheetController.current, bottomSheet.current?.clientHeight]);

  const onMove = (detail: GestureDetail) => {
    if (bottomSheet.current && currentHeight) {
      bottomSheet.current.style.transition = "none";
      bottomSheet.current.style.height = `${currentHeight - detail.deltaY}px`;
    }
  };

  const onEnd = (maxHeight: number, minHeight: number) => {
    const parentElementHeight =
      bottomSheet.current?.parentElement?.clientHeight;

    if (
      bottomSheet.current?.clientHeight &&
      topContentRef.current?.clientHeight &&
      parentElementHeight
    ) {
      const resultHeight =
        bottomSheet.current.clientHeight < maxHeight ? minHeight : maxHeight;
      bottomSheet.current.style.height = `${resultHeight}px`;

      if (maxHeight === resultHeight) {
        setShowDetail(false);
        setCurrentHeight(maxHeight);
      } else {
        setShowDetail(true);
        setCurrentHeight(minHeight);
      }
      bottomSheet.current.style.transition = "height 0.2s ease-out";
      setCurrentHeight(resultHeight);
    }
  };

  const onSegmentChange = (event: CustomEvent<SegmentChangeEventDetail>) => {
    const { value } = event.detail;
    if (value !== undefined) {
      setFilter(`${value}`);
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
      <IonContent scrollY={false} fullscreen className={styles.contentWrapper}>
        <div className={styles.topContentWrapper} ref={topContentRef}>
          {showDetail && (
            <>
              <div className={styles.pageTitle}>
                <div className={styles.categoryImage}>
                  <img src={categoryContrastIcon} />
                </div>
                <div className={styles.categoryTitle}>
                  <h3>{category?.title}</h3>
                  <p>
                    (Complete all 4 courses to receive a <b>MBA Certificate</b>)
                  </p>
                </div>
              </div>
              <div className={styles.progressWrapper}>
                <span className={styles.progressValue}>
                  Progress: {progress} / 100%
                </span>
                <ProgressBar
                  value={progress}
                  disabled={false}
                  height={10}
                  showValue={false}
                />
              </div>
            </>
          )}
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
          ref={bottomSheet}
          style={{
            height: `${currentHeight}px`,
            minHeight: `calc(100% -  208px)`,
          }}
        >
          <div className={styles.controllerWrapper}>
            <button
              ref={bottomSheetController}
              className={styles.controller}
            ></button>
          </div>
          <div className={styles.bottomInner}>
            <div className={styles.innerHeader}>
              <div>{filter}</div>
              <div>
                <span>Purchased:</span> 3 / 4
              </div>
            </div>
            <ul className={styles.coursesList}>
              {courses?.map((course) => (
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
