import { FormEvent, useRef } from "react";
import { IonIcon, useIonRouter } from "@ionic/react";
import { useMainSearchForm } from "../../hooks/useMainSearch";
import { useLocation } from "react-router";
import search from "../../assets/icons/header/search.svg";
import cross from "../../assets/icons/cross.svg";
import InsetBtn from "../InsetBtn/InsetBtn";
import styles from "./MainSearchbar.module.scss";

const MainSearchbar = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { value, setValue, suggestions } = useMainSearchForm();
  const router = useIonRouter();
  const location = useLocation();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validQuery = value.trim().toLowerCase();
    router.push(`/search?q=${validQuery}`);
  };

  const handleClear = () => {
    setValue("");
    inputRef.current?.focus();
    const params = new URLSearchParams(location.search);
    params.delete("q");

    const newSearch = params.toString();
    router.push(
      newSearch ? `${location.pathname}?${newSearch}` : location.pathname,
      "forward",
      "replace"
    );
  };

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
            onClick={handleClear}
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
