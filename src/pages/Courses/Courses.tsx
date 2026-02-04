import { IonContent, IonIcon, IonPage } from "@ionic/react";
import React, { useState } from "react";
import { coursesFilter } from "../../constants/nav";
import { useCourses } from "../../context/CoursesContext";
import { useUser } from "../../context/UserContext";
import EmptyMaterialsIcon from "../../assets/icons/empty-materials.svg";
import { StyleReactProps } from "@ionic/react/dist/types/components/react-component-lib/interfaces";
import Header from "../../components/Header/Header";
import CategoryItem from "../../components/CategoryItem/CategoryItem";
import SegmentNavPanel from "../../components/SegmentNavPanel/SegmentNavPanel";
import PageRefresher from "../../components/PageRefresher/PageRefresher";
import Auth from "../../components/Auth/Auth";
import styles from "./Courses.module.scss";

const Empty = ({ style }: StyleReactProps) => (
  <div className={styles.empty} style={style}>
    <IonIcon src={EmptyMaterialsIcon} />
    <span className={styles.emptyMessage}>
      There are currently no materials available for you.{" "}
    </span>
  </div>
);

const Courses: React.FC = () => {
  const coursesInterface = useCourses();
  const categories = coursesInterface?.categories;
  const courses = coursesInterface?.courses;
  const [filter, setFilter] = useState<string>(coursesFilter[0].value);
  const [isScrolling, setIsScrolling] = useState(false);

  const handleFilterCategory = () => {
    const availableCourses = courses?.filter((course) => !course.bought);
    if (availableCourses?.length === 0) {
      return null;
    }

    let categoriesIds: number[] = [];

    switch (filter) {
      case "all": {
        availableCourses?.forEach((course) => {
          if (!categoriesIds.includes(course.category_id)) {
            categoriesIds.push(course.category_id);
          }
        });

        return categories?.filter((category) =>
          categoriesIds.includes(category.id)
        );
      }
      case "short courses":
        availableCourses?.forEach((course) => {
          if (
            course.type === "short" &&
            !categoriesIds.includes(course.category_id)
          ) {
            categoriesIds.push(course.category_id);
          }
        });
        return categories?.filter((category) =>
          categoriesIds.includes(category.id)
        );
      case "long courses": {
        availableCourses?.forEach((course) => {
          if (
            course.type === "long" &&
            !categoriesIds.includes(course.category_id)
          ) {
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
    title: "Categories",
    left: [{ name: "back" }, { name: "search", onClick: () => {} }],
    right: [{ name: "notification" }, { name: "user" }],
  };

  const onRefresh = coursesInterface?.getAllCategories;

  const isAuthShown = !useUser()?.user.accessToken;

  const filtredCategories = handleFilterCategory();

  return (
    <IonPage id="courses" className="primaryPage">
      <Header {...headerProps} />
      {filtredCategories !== null ? (
        <IonContent
          className={`custom-content-wrapper ${styles.content} ${
            isAuthShown ? styles.withAuthPanel : ""
          }`}
          scrollEvents={true}
          onIonScrollStart={() => setIsScrolling(true)}
          onIonScrollEnd={() => setIsScrolling(false)}
        >
          <div style={{ marginBottom: "12rem" }}>
            <SegmentNavPanel
              value={filter}
              setValue={setFilter}
              items={coursesFilter}
            />
          </div>
          {onRefresh && <PageRefresher onRefresh={onRefresh} />}
          {filtredCategories?.length === 0 ? (
            // <IonContent scrollY={false}>
            //   </IonContent>
            <Empty
              style={{
                paddingBottom: isAuthShown ? "65rem" : "0px",
              }}
            />
          ) : (
            <ul className={styles.categoriesList}>
              {filtredCategories?.map((category) => (
                <CategoryItem category={category} key={category.id} />
              ))}
            </ul>
          )}
        </IonContent>
      ) : (
        <IonContent scrollY={false}>
          <Empty
            style={{
              paddingBottom: `calc(var(--tabbar-offset) + ${
                isAuthShown ? "65rem" : "0px"
              })`,
            }}
          />
        </IonContent>
      )}
      <Auth hidden={isScrolling} />
    </IonPage>
  );
};

export default Courses;
