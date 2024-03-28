import { IonBackButton, IonContent, IonHeader, IonPage } from "@ionic/react";
import back from "../../../assets/icons/header/back.svg";
import coursePoster from "../../../assets/images/subject_image.png";
import styles from "./CourseIntroPage.module.scss";
import { useParams } from "react-router";
import { useEffect, useRef, useState } from "react";

const CourseIntroPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const contentRef = useRef<HTMLDivElement>(null);
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    const scroller = contentRef.current;
    const handleScroll = () => {
      if (scroller && scroller.scrollTop === 132) {
        setScroll(true);
      } else setScroll(false);
    };

    scroller && scroller.addEventListener("scroll", handleScroll);

    return () => {
      scroller && scroller.removeEventListener("scroll", handleScroll);
    };
  }, [contentRef.current]);

  console.log("course id " + courseId);

  return (
    // <IonPage>
    <>
      <IonHeader className={styles.header}>
        <IonBackButton
          defaultHref="/courses"
          text={""}
          icon={back}
          className={styles.bakcBtn}
        />
      </IonHeader>
      <IonContent>
        <div className={styles.pageWrapper} ref={contentRef}>
          <img src={coursePoster} className={styles.coursePoster} />
          <div className={styles.contentBackground}>
            <div
              className={`${styles.contentInner}  ${
                scroll ? styles.scroll : ""
              }`}
            >
              <div className={styles.contenWrapper}>
                <img src={coursePoster} alt="" />
                <img src={coursePoster} alt="" />
                <img src={coursePoster} alt="" />
                <img src={coursePoster} alt="" />
                <img src={coursePoster} alt="" />
                <img src={coursePoster} alt="" />
              </div>
            </div>
          </div>
        </div>
      </IonContent>
    </>
    // </IonPage>
  );
};

export default CourseIntroPage;
