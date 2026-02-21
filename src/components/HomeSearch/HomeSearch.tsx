import { useIonRouter } from "@ionic/react";
import { FC, useState } from "react";
import styles from "./HomeSearch.module.scss";
import MainSearchbar from "../MainSearchbar/MainSearchbar";

const HomeSearch: FC = () => {
  const router = useIonRouter();

  const [searchValue, setSearchValue] = useState("");

  const handleSearch = () => {
    if (searchValue) {
      router.push(`/search?q=${searchValue}`, "forward", "push");
    } else {
      router.push("/search", "forward", "push");
    }
  };
  return (
    <div className={styles.searchbar}>
      <MainSearchbar />
    </div>
  );
};

export default HomeSearch;
