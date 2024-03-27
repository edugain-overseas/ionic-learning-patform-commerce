import {
  IonContent,
  IonModal,
  IonPage,
  IonSegment,
  IonSegmentButton,
  SegmentChangeEventDetail,
  useIonViewWillEnter,
  useIonViewWillLeave,
} from "@ionic/react";
import React, { useRef, useState } from "react";
import { useParams } from "react-router";
import { categories, courses } from "../../constants";
import categoryContrastIcon from "../../assets/icons/category-contrast.svg";
import Header from "../../components/Header/Header";
import styles from "./CategoryDetailPage.module.scss";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import CourseItem from "../../components/CourseItem/CourseItem";

const progress = 25;

const CategoryDetailPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>("All");
  const [minBreakpoint, setMinbreakpoints] = useState(0);
  const [maxBreakpoint, setMaxbreakpoints] = useState(0);
  const category = categories.find(({ id }) => id === +categoryId);
  const topContentRef = useRef<HTMLDivElement>(null);
  const [showDetail, setShowDetail] = useState(true);

  useIonViewWillLeave(() => setIsOpenModal(false));

  useIonViewWillEnter(() => {
    const topContent = topContentRef?.current;

    if (topContent) {
      const topContentHeight = topContent.clientHeight;
      const pageHeight = document.body.clientHeight;
      console.log(topContentHeight, pageHeight);
      const minBreakpoint = (pageHeight - topContentHeight - 61) / pageHeight;
      const maxBreakpoint =
        (pageHeight - topContentHeight + 100 - 61) / pageHeight;
      setMinbreakpoints(minBreakpoint);
      setMaxbreakpoints(maxBreakpoint);
      setIsOpenModal(true);
    }
  });

  const handleBreackpointsChange = (e: any) => {
    const { breakpoint } = e.detail;
    if (breakpoint === maxBreakpoint) setShowDetail(false);
    else setShowDetail(true);
  };

  const onSegmentChange = (event: CustomEvent<SegmentChangeEventDetail>) => {
    const { value } = event.detail;
    if (value !== undefined) {
      setFilter(`${value}`);
    }
  };

  return (
    <IonPage className={styles.papeWrapper}>
      <Header
        title="My Courses"
        secondary={true}
        left={["back"]}
        right={["notification", "list-style"]}
      />
      <IonContent>
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
      </IonContent>
      {minBreakpoint !== 0 && maxBreakpoint !== 0 && (
        <IonModal
          className={styles.modal}
          isOpen={isOpenModal}
          initialBreakpoint={minBreakpoint}
          breakpoints={[minBreakpoint, maxBreakpoint]}
          showBackdrop={false}
          keyboardClose={false}
          backdropDismiss={false}
          backdropBreakpoint={1}
          // canDismiss={false}
          onIonBreakpointDidChange={handleBreackpointsChange}
        >
          <IonContent className={styles.modalContentWrapper} scrollY={true}>
            <div className={styles.background}>
              <div className={styles.modalHeader}>
                <div>{filter}</div>
                <div>
                  <span>Purchased:</span> 3 / 4
                </div>
              </div>
              <ul className={styles.coursesList}>
                {courses.map((course) => (
                  <CourseItem course={course} key={course.id} />
                ))}
                {courses.map((course) => (
                  <CourseItem course={course} key={course.id} />
                ))}
                {courses.map((course) => (
                  <CourseItem course={course} key={course.id} />
                ))}
                {courses.map((course) => (
                  <CourseItem course={course} key={course.id} />
                ))}
                {courses.map((course) => (
                  <CourseItem course={course} key={course.id} />
                ))}
                {courses.map((course) => (
                  <CourseItem course={course} key={course.id} />
                ))}
              </ul>
            </div>
          </IonContent>
        </IonModal>
      )}
    </IonPage>
  );
};

export default CategoryDetailPage;
