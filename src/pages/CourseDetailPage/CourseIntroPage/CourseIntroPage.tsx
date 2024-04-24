import { IonBackButton, IonContent, IonHeader, IonIcon } from "@ionic/react";
import { useParams } from "react-router";
import { useCourses } from "../../../context/CoursesContext";
import { serverName } from "../../../http/server";
import { useUser } from "../../../context/UserContext";
import back from "../../../assets/icons/header/back.svg";
import file from "../../../assets/icons/file.svg";
import laptop from "../../../assets/icons/laptop.svg";
import clock from "../../../assets/icons/clock.svg";
import schollOnline from "../../../assets/icons/introPage/school-online.svg";
import clockBig from "../../../assets/icons/introPage/clock.svg";
import certificate from "../../../assets/icons/introPage/certificate.svg";
import basket from "../../../assets/icons/tabs/basket.svg";
import devices from "../../../assets/images/devices.png";
import CourseItem from "../../../components/CourseItem/CourseItem";
import CardPrice from "../../../components/CardPrice/CardPrice";
import DoubleScrollLayout from "../../../components/DoubleScrollLayout/DoubleScrollLayout";
import CourseNavPanel from "../../../components/CourseNavPanel/CourseNavPanel";
import styles from "./CourseIntroPage.module.scss";

const CourseIntroPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const courses = useCourses()?.courses;
  const course = courses?.find(({ id }) => id === +courseId);
  const category = useCourses()?.categories.find(
    ({ id }) => id === course?.category_id
  );
  const isCoursePurchased = useUser()?.user.courses.find(
    (userCourse) => userCourse.course_id === +courseId
  );

  return (
    <>
      <IonHeader className={styles.header} mode="ios">
        <IonBackButton
          defaultHref="/courses"
          text={""}
          icon={back}
          className={styles.bakcBtn}
        />
      </IonHeader>
      <IonContent>
        <DoubleScrollLayout
          posterSrc={`${serverName}/${course?.image_path}`}
          topLabel={`Category: ${category?.title}`}
        >
          <div className={`${styles.contentHeader} ${styles.contentBlock}`}>
            <div className={`${styles.titleWrapper} ${styles.titlePrimary}`}>
              <span className={styles.title}>{course?.title}</span>
            </div>
            <IonIcon src={file} className={styles.headerIcon} />
          </div>
          <div className={styles.contentBlock}>
            <p className={styles.infoText}>{course?.intro_text}</p>
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
              <ul>
                <li>
                  Understanding essential economic principles and concepts;
                </li>
                <li>
                  Analyzing the production and consumption of goods and
                  services;
                </li>
                <li>Evaluation of international business strategies.</li>
              </ul>
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
            <p className={styles.infoText}>{course?.about_text}</p>
            <p className={styles.infoText}>
              Understand important principles like price elasticity and the law
              of supply and demand. This course also includes the different
              economic systems around the globe, the essential business cycle
              phases, the country analysis tool, and international business
              strategies. You will also receive a short case study of the
              European Union (EU) and the World Trade Organization (WTO) that
              summarizes the key takeaways of this course.
            </p>
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
          <div className={styles.otherCourses}>
            <span className={styles.otherCoursesTitle}>
              Students also bought
            </span>
            <ul className={styles.coursesList}>
              {courses
                ?.filter(({ id }) => id !== course?.id)
                .map((course) => (
                  <CourseItem course={course} key={course.id} />
                ))}
            </ul>
          </div>
        </DoubleScrollLayout>
        <div className={styles.bottomBar}>
          {isCoursePurchased ? (
            <CourseNavPanel />
          ) : (
            <>
              <div className={styles.priceWrapper}>
                <CardPrice price={course?.price} variant="primary" />
              </div>
              <button className={styles.buyCourseBtn}>
                <span>Buy</span>
                <IonIcon className={styles.buyIcon} src={basket} />
              </button>
            </>
          )}
        </div>
      </IonContent>
    </>
  );
};

export default CourseIntroPage;
