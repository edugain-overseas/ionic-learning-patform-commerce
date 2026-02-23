import { FormEvent, useRef } from "react";
import InsetBtn from "../InsetBtn/InsetBtn";
import { IonIcon } from "@ionic/react";
import search from "../../assets/icons/header/search.svg";
import cross from "../../assets/icons/cross.svg";
import {
  useMainSearchForm,
  useMainSearchValue,
} from "../../hooks/useMainSearch";
import styles from "./MainSearchbar.module.scss";

const MainSearchbar = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { value, setValue, suggestions } = useMainSearchForm();
  const { handleSearch } = useMainSearchValue();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Submit ", value);

    handleSearch(value);
  };

  console.log(suggestions);

  return (
    <form className={styles.searchForm} onSubmit={handleSubmit}>
      <div className={styles.inputWrapper}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Search our courses..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        {value !== "" && (
          <button
            type="button"
            className={styles.clearBtn}
            onClick={() => {
              setValue("");
              inputRef.current?.focus();
            }}
          >
            <IonIcon src={cross} />
          </button>
        )}
      </div>
      <InsetBtn
        width="40rem"
        height="40rem"
        backgroundColor={!value ? "#7E8CA8" : "#001c54"}
        icon={<IonIcon src={search} className={styles.searchbarIcon} />}
        type="submit"
        disabled={!value}
      />
    </form>
  );
};

export default MainSearchbar;
