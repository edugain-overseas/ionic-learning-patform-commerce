import { IonContent, IonIcon, IonPage } from "@ionic/react";
import React, { useState } from "react";
import { myStudyFilter, MyStudyFilterNameType } from "../../constants/nav";
import { useCourses } from "../../context/CoursesContext";
import { useUser } from "../../context/UserContext";
import EmptyBasketIcon from "../../assets/icons/empty_basket.svg";
import Header from "../../components/Header/Header";
import CategoryItem from "../../components/CategoryItem/CategoryItem";
import SegmentNavPanel from "../../components/SegmentNavPanel/SegmentNavPanel";
import PageRefresher from "../../components/PageRefresher/PageRefresher";
import Auth from "../../components/Auth/Auth";
import styles from "./MyStudy.module.scss";

const MyStudy: React.FC = () => {
  const coursesInterface = useCourses();
  const categories = coursesInterface?.categories;
  const courses = coursesInterface?.courses;
  const [filter, setFilter] = useState<MyStudyFilterNameType>(
    myStudyFilter[0].value
  );
  const [isScrolling, setIsScrolling] = useState(false);

  const handleFilterCategory = () => {
    const purchasedCourses = courses?.filter((course) => course.bought);
    let categoriesIds: number[] = [];

    switch (filter) {
      case "in progress": {
        purchasedCourses?.forEach((course) => {
          if (course.progress === 100) return;

          if (!categoriesIds.includes(course.category_id)) {
            categoriesIds.push(course.category_id);
          }
        });

        return categories?.filter((category) =>
          categoriesIds.includes(category.id)
        );
      }
      case "completed":
        purchasedCourses?.forEach((course) => {
          if (course.progress !== 100) return;

          if (!categoriesIds.includes(course.category_id)) {
            categoriesIds.push(course.category_id);
          }
        });

        return categories?.filter((category) =>
          categoriesIds.includes(category.id)
        );
      case "all courses": {
        purchasedCourses?.forEach((course) => {
          if (!categoriesIds.includes(course.category_id)) {
            categoriesIds.push(course.category_id);
          }
        });

        return categories?.filter((category) =>
          categoriesIds.includes(category.id)
        );
      }
      default:
        break;
    }
  };

  const headerProps = {
    title: "My Study",
    left: [{ name: "back" }, { name: "search", onClick: () => {} }],
    right: [{ name: "notification" }, { name: "user" }],
  };

  const onRefresh = async () => {
    coursesInterface?.getAllCategories();
    coursesInterface?.getAllCourses();
  };

  const isUserAuthorized = useUser()?.user.accessToken;

  return (
    <IonPage id="my-study" className="primaryPage">
      <Header {...headerProps} />
      {isUserAuthorized ? (
        <IonContent
          className={`custom-content-wrapper ${styles.content} ${
            !isUserAuthorized ? styles.withAuthPanel : ""
          }`}
          scrollEvents={true}
          onIonScrollStart={() => setIsScrolling(true)}
          onIonScrollEnd={() => setIsScrolling(false)}
        >
          {onRefresh && <PageRefresher onRefresh={onRefresh} />}
          <div style={{ marginBottom: "12rem" }}>
            <SegmentNavPanel
              value={filter}
              setValue={setFilter}
              items={myStudyFilter}
            />
          </div>
          <ul className={styles.categoriesList}>
            {handleFilterCategory()?.map((category) => (
              <CategoryItem category={category} key={category.id} />
            ))}
          </ul>
        </IonContent>
      ) : (
        <IonContent scrollY={false} className="custom-content-wrapper">
          <div className={styles.empty}>
            <IonIcon src={EmptyBasketIcon} />
            <span className={styles.emptyMessage}>
              This page is available to registered users.
            </span>
          </div>
        </IonContent>
      )}
      <Auth hidden={isScrolling} />
    </IonPage>
  );
};

export default MyStudy;
