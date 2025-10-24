import { FC, useEffect, useState } from "react";
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  useIonRouter,
  useIonViewWillEnter,
} from "@ionic/react";
import { useLocation } from "react-router";
import { instance } from "../../http/instance";
import {
  CategoryType,
  CourseType,
  LessonType,
} from "../../context/CoursesContext";
import backIcon from "../../assets/icons/header/back.svg";

import Searchbar from "./Searchbar/Searchbar";
import Spinner from "../../components/Spinner/Spinner";
import SearchResults from "./SearchResults";
import styles from "./Search.module.scss";

export type ResultType = "categories" | "courses" | "lessons";

export type Results = {
  categories: CategoryType[];
  courses: CourseType[];
  lessons: LessonType[];
};

const Search: FC = () => {
  const location = useLocation();
  const router = useIonRouter();
  const searchParams = new URLSearchParams(location.search);
  const q = searchParams.get("q") || "";

  const [query, setQuery] = useState<string>(q);
  const [results, setResults] = useState<Results>();
  const [isLoading, setIsLoading] = useState(false);

  const handleQueryChange = (e: Event) => {
    const target = e.target as HTMLIonSearchbarElement;
    const value = target.value!.toLowerCase();
    setQuery(value);
  };
  console.log(query);

  useEffect(() => {
    const fetchResults = async () => {
      setIsLoading(true);
      try {
        const { data } = await instance.get(`/user/search?query=${query}`);
        setResults(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (query) {
      router.push(`?q=${query}`);
      fetchResults();
    }
  }, [query]);

  useIonViewWillEnter(() => {
    console.log(q);
    setQuery(q);
  }, [q]);

  return (
    <IonPage className="primaryPage">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start" className={styles.toolbarButtons}>
            <IonBackButton
              text=""
              icon={backIcon}
              className={styles.backBtn}
              defaultHref="/"
            />
          </IonButtons>
          <Searchbar onChange={handleQueryChange} value={q} />
        </IonToolbar>
      </IonHeader>
      <IonContent className={`custom-content-wrapper ${styles.searchContent}`}>
        {isLoading ? (
          <Spinner className={styles.spinner} />
        ) : (
          <SearchResults results={results} />
        )}
      </IonContent>
    </IonPage>
  );
};

export default Search;
