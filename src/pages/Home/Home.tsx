import { useState } from "react";
import { IonContent, IonPage } from "@ionic/react";
import { useUser } from "../../context/UserContext";
import Header from "../../components/Header/Header";
import HomeHero from "../../components/HomeHero/HomeHero";
import HomeSearch from "../../components/HomeSearch/HomeSearch";
import Auth from "../../components/Auth/Auth";
import {
  CategoryType,
  CourseType,
  useCourses,
} from "../../context/CoursesContext";
import HomeSliderSection from "../../components/HomeSliderSection/HomeSliderSection";
import CategoryItem from "../../components/CategoryItem/CategoryItem";
import CourseItem from "../../components/CourseItem/CourseItem";
import HomeStats from "../../components/HomeStats/HomeStats";
import HomeOfferInfo from "../../components/HomeOfferInfo/HomeOfferInfo";
import HomeFooter from "../../components/HomeFooter/HomeFooter";
import PageRefresher from "../../components/PageRefresher/PageRefresher";
import styles from "./Home.module.scss";

const headerProps = {
  left: [{ name: "logo" }],
  right: [
    { name: "notification" },
    { name: "search", onClick: () => {} },
    { name: "user" },
  ],
  mode: "transparent",
};

const renderCategoryCard = (category: CategoryType) => {
  return <CategoryItem category={category} />;
};
const renderCourseCard = (course: CourseType) => {
  return <CourseItem course={course} />;
};

const Categories = () => {
  const categories = useCourses()?.categories;

  if (!categories) {
    return <></>;
  }

  return (
    <HomeSliderSection
      title="Categories of Courses"
      link="/courses"
      items={categories}
      renderItem={renderCategoryCard}
    />
  );
};

const Courses = () => {
  const courses = useCourses()?.courses;

  if (!courses) {
    return <></>;
  }

  return (
    <HomeSliderSection
      title="Most popular Courses"
      link="/courses"
      items={courses}
      renderItem={renderCourseCard}
    />
  );
};

const Home: React.FC = () => {
  const isAuthShown = !useUser()?.user.accessToken;

  return (
    <IonPage className={`${styles.page} primaryPage`} id="home">
      <Header {...headerProps} />
      <div className={styles.contentWrapper}>
        <IonContent
          fullscreen
          className={styles.homeContent}
          scrollEvents={true}
          onIonScrollStart={(e) => e.target.classList.add(styles.isScrolling)}
          onIonScrollEnd={(e) => e.target.classList.remove(styles.isScrolling)}
          style={{ ["--padding-bottom"]: isAuthShown ? "64rem" : "0" }}
        >
          <PageRefresher />

          <div className={styles.hero}>
            <div className={styles.titleWrapper}>
              <span className={styles.mainTitle}>Online learning</span>
              <span className={styles.secondaryWrapper}>
                is <span className={styles.pointRed}>now</span> in Your
              </span>
              <span className={styles.secondaryWrapper}>
                Hands
                <span className={styles.symbol}></span>
              </span>
            </div>
            <div className={styles.benefits}>
              <HomeHero />
            </div>
            <div className={styles.benefitsText}>
              <span>
                You will acquire the skills necessary to achieve success in
                today's business world.
              </span>
            </div>
            <HomeSearch />
          </div>
          <Categories />
          <Courses />
          <HomeStats />
          <HomeOfferInfo />
          <HomeFooter />
        </IonContent>
      </div>
      <Auth containerClassname={styles.homeAuth} />
    </IonPage>
  );
};

export default Home;
