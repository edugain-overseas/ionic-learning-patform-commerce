import { IonIcon, useIonRouter } from "@ionic/react";
import { FC, useState } from "react";
import search from "../../assets/icons/header/search.svg";
import InsetBtn from "../InsetBtn/InsetBtn";
import styles from "./HomeSearch.module.scss";

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
      <div className={styles.inputWrapper}>
        <input
          type="text"
          placeholder="Search our courses..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>
      <InsetBtn
        width="40rem"
        height="40rem"
        backgroundColor="#7E8CA8"
        icon={<IonIcon src={search} className={styles.searchbarIcon} />}
        onClick={handleSearch}
      />
    </div>
  );
};

export default HomeSearch;
