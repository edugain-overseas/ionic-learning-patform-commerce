import { FC } from "react";
import { IonContent, IonPage } from "@ionic/react";
import {
  CategoryType,
  CourseType,
  InstructionType,
  useCourses,
} from "../../context/CoursesContext";
import { useSearchHistory } from "../../hooks/useSearchHistory";
import { useMainSearchValue } from "../../hooks/useMainSearch";
import Spinner from "../../components/Spinner/Spinner";
import SearchResults from "./SearchResults";
import Header from "../../components/Header/Header";
import MainSearchbar from "../../components/MainSearchbar/MainSearchbar";
import HomeSlider from "../../components/HomeSlider/HomeSlider";
import CategoryItem from "../../components/CategoryItem/CategoryItem";
import CourseItem from "../../components/CourseItem/CourseItem";
import SearchHistory from "./SearchHistory";
import styles from "./Search.module.scss";

export type ResultType = "categories" | "courses" | "instructions";

export type Results = {
  categories: CategoryType[];
  courses: CourseType[];
  instructions: InstructionType[];
};

const headerProps = {
  title: "Search",
  left: [
    {
      name: "back",
    },
  ],
};

const Search: FC = () => {
  const { isLoading, query, results } = useMainSearchValue();
  const { searchHistory, isLoading: isHistoryLoading } = useSearchHistory();

  const categories = useCourses()?.categories;
  const courses = useCourses()?.courses;

  return (
    <IonPage className="primaryPage">
      <Header {...headerProps} />
      <IonContent className={`custom-content-wrapper ${styles.searchContent}`}>
        <div className={styles.searchbarWrapper}>
          <MainSearchbar />
        </div>

        {results ? (
          isLoading ? (
            <Spinner className={styles.spinner} />
          ) : (
            <SearchResults results={results} query={query} />
          )
        ) : (
          <>
            {isHistoryLoading ? (
              <Spinner className={styles.spinner} />
            ) : (
              <SearchHistory history={searchHistory} />
            )}
            {categories && (
              <div className={styles.popularCategories}>
                <p className={styles.title}>
                  Most frequently searched in categories
                </p>
                <HomeSlider
                  items={categories}
                  renderItem={(item: CategoryType) => (
                    <CategoryItem category={item} />
                  )}
                />
              </div>
            )}
            {courses && (
              <div className={styles.popularCourses}>
                <p className={styles.title}>Most frequently searched courses</p>
                <HomeSlider
                  items={courses}
                  renderItem={(item: CourseType) => (
                    <CourseItem course={item} />
                  )}
                />
              </div>
            )}
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Search;
