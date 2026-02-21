import styles from "./MainSearchbar.module.scss";
import InsetBtn from "../InsetBtn/InsetBtn";
import { IonIcon } from "@ionic/react";
import search from "../../assets/icons/header/search.svg";
import {
  useMainSearchForm,
  useMainSearchValue,
} from "../../hooks/useMainSearch";
import { FormEvent } from "react";

const MainSearchbar = () => {
  const { value, setValue, suggestions } = useMainSearchForm();
  const { handleSearch } = useMainSearchValue();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Submit ",value);
    
    handleSearch(value);
  };

  console.log(suggestions);

  return (
    <form className={styles.searchForm} onSubmit={handleSubmit}>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          placeholder="Search our courses..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <InsetBtn
        width="40rem"
        height="40rem"
        backgroundColor="#7E8CA8"
        icon={<IonIcon src={search} className={styles.searchbarIcon} />}
        type="submit"
      />
    </form>
  );
};

export default MainSearchbar;
