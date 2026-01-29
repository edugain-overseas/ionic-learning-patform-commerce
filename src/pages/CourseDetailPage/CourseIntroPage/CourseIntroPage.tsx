import { useState } from "react";
import { IonContent, IonIcon } from "@ionic/react";
import { useParams } from "react-router";
import { motion } from "motion/react";
import { useCourses } from "../../../context/CoursesContext";
import { serverName } from "../../../http/server";
import { useUser } from "../../../context/UserContext";
import { useBasket } from "../../../context/BasketContext";
import { clamp } from "../../../utils/clamp";
import laptop from "../../../assets/icons/laptop.svg";
import clock from "../../../assets/icons/clock.svg";
import schollOnline from "../../../assets/icons/introPage/school-online.svg";
import clockBig from "../../../assets/icons/introPage/clock.svg";
import certificate from "../../../assets/icons/introPage/certificate.svg";
import basket from "../../../assets/icons/nav/basket.svg";
import remove from "../../../assets/icons/delete.svg";
import devices from "../../../assets/images/devices.png";
import IntoHeader from "./IntroHeader";
import StickyScrollLayout from "../../../components/StickyScrollLayout/StickyScrollLayout";
import CourseItem from "../../../components/CourseItem/CourseItem";
import CardPrice from "../../../components/CardPrice/CardPrice";
import CourseNavPanel from "../../../components/CourseNavPanel/CourseNavPanel";
import EqualSpaceContainer from "../../../components/EqualSpaceContainer/EqualSpaceContainer";
import CommonButton from "../../../components/CommonButton/CommonButton";
import styles from "./CourseIntroPage.module.scss";
import BuyCourseBtn from "../../../components/BuyCourseBtn/BuyCourseBtn";
import PageRefresher from "../../../components/PageRefresher/PageRefresher";

const threshold = 0.75;

const CourseIntroPage: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const { courseId } = useParams<{ courseId: string }>();
  const courses = useCourses()?.courses;
  const course = courses?.find(({ id }) => id === +courseId);
  const isCoursePurchased = useUser()?.user.courses?.find(
    (userCourse) => userCourse.course_id === +courseId
  );

  const basketInterface = useBasket();

  // const isCourseInBasket = basketInterface?.items.find(
  //   (item) => item.id === +courseId
  // );

  const coursesToPropose = courses?.filter(
    (courseItem) => courseItem.id !== +courseId && !courseItem.bought
  );

  const navPanelProgress = clamp(
    0,
    (scrollProgress - threshold) / (1 - threshold),
    1
  );

  return (
    <>
      <IntoHeader title={course?.title} scrollProgress={scrollProgress} />
      <IonContent scrollY={false} className={styles.content}>
        <PageRefresher />
        <motion.div
          className={styles.courseIntroNavWrapper}
          style={{
            opacity: navPanelProgress,
            transform: `translateY(${100 * navPanelProgress - 100}%)`,
          }}
        >
          <CourseNavPanel />
        </motion.div>
        <StickyScrollLayout
          posterSrc={`${serverName}/${course?.image_path}`}
          topLabel="Intro"
          onProgressChange={(value) => setScrollProgress(value)}
        >
          <div className={styles.contentInnerWrapper}>
            <div className={`${styles.contentHeader} ${styles.contentBlock}`}>
              <div className={`${styles.titleWrapper} ${styles.titlePrimary}`}>
                <span className={styles.title}>{course?.title}</span>
              </div>
            </div>
            <div className={styles.contentBlock}>
              <p
                className={styles.infoText}
                dangerouslySetInnerHTML={{
                  __html: course?.intro_text ? course.intro_text : "",
                }}
              ></p>
              <ul className={styles.coursePropsList}>
                <li>
                  <div className={styles.left}>
                    <IonIcon src={laptop} className={styles.propIcon} />
                    <div className={styles.propName}>Type:</div>
                  </div>
                  <div className={styles.right}>
                    <div className={styles.propValue}>{course?.c_type}</div>
                  </div>
                </li>
                <li>
                  <div className={styles.left}>
                    <IonIcon src={clock} className={styles.propIcon} />
                    <div className={styles.propName}>Duration:</div>
                  </div>
                  <div className={styles.right}>
                    <div className={styles.propValue}>{course?.c_duration}</div>
                  </div>
                </li>
                <li>
                  <div className={styles.left}>
                    <IonIcon src={clock} className={styles.propIcon} />
                    <div className={styles.propName}>Award:</div>
                  </div>
                  <div className={styles.right}>
                    <div className={styles.propValue}>{course?.c_award}</div>
                  </div>
                </li>
                <li>
                  <div className={styles.left}>
                    <IonIcon src={clock} className={styles.propIcon} />
                    <div className={styles.propName}>Language:</div>
                  </div>
                  <div className={styles.right}>
                    <div className={styles.propValue}>{course?.c_language}</div>
                  </div>
                </li>
                <li>
                  <div className={styles.left}>
                    <IonIcon src={clock} className={styles.propIcon} />
                    <div className={styles.propName}>Level:</div>
                  </div>
                  <div className={styles.right}>
                    <div className={styles.propValue}>{course?.c_level}</div>
                  </div>
                </li>
                <li>
                  <div className={styles.left}>
                    <IonIcon src={clock} className={styles.propIcon} />
                    <div className={styles.propName}>Access:</div>
                  </div>
                  <div className={styles.right}>
                    <div className={styles.propValue}>{course?.c_access}</div>
                  </div>
                </li>
              </ul>
              <div className={styles.courseSkills}>
                <span className={styles.listTitle}>Skills you will learn:</span>
                <div
                  dangerouslySetInnerHTML={{
                    __html: course?.skills_text ? course?.skills_text : "",
                  }}
                ></div>
              </div>
              <p className={styles.primaryInfo}>
                This course is part of the <u>Mini-MBA</u> and{" "}
                <u>Global Governance</u> programs.
              </p>
            </div>
            <div className={styles.contentBlock}>
              <div className={`${styles.titleWrapper} ${styles.titleMargin}`}>
                <span className={styles.title}>About this course</span>
              </div>
              <p
                className={styles.infoText}
                dangerouslySetInnerHTML={{
                  __html: course?.about_text ? course?.about_text : "",
                }}
              ></p>
              <ul className={styles.benefitsList}>
                <li>
                  <IonIcon src={schollOnline} className={styles.icon} />
                  <span className={styles.primary}>100% Online</span>
                  <span className={styles.secondary}>
                    Click through engaging and award winning course content.
                  </span>
                </li>
                <li>
                  <IonIcon src={clockBig} className={styles.icon} />
                  <span className={styles.primary}>100% self-paced</span>
                  <span className={styles.secondary}>
                    Immediate start: study when, where, and how fast you want.
                  </span>
                </li>
                <li>
                  <IonIcon src={certificate} className={styles.icon} />
                  <span className={styles.primary}>Get your certificate</span>
                  <span className={styles.secondary}>
                    Download your personal certificate upon completion of this
                    course.
                  </span>
                </li>
              </ul>
              <img src={devices} alt="devices" className={styles.devicesImg} />
            </div>
            {!!coursesToPropose?.length && (
              <div className={styles.otherCourses}>
                <span className={styles.otherCoursesTitle}>
                  Students also bought
                </span>
                <ul className={styles.coursesList}>
                  {coursesToPropose.map((course) => (
                    <CourseItem course={course} key={course.id} />
                  ))}
                </ul>
              </div>
            )}
          </div>
        </StickyScrollLayout>
        {!isCoursePurchased && (
          <div className={styles.bottomBar}>
            <CardPrice />
            <BuyCourseBtn courseId={Number(courseId)} />
          </div>
        )}
      </IonContent>
    </>
  );
};

export default CourseIntroPage;
