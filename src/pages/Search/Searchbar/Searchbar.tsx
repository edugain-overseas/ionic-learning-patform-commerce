import { FC } from "react";
import { IonSearchbar } from "@ionic/react";
import searchIcon from "../../../assets/icons/header/search.svg";
import "./Searchbar.css";

type SearchbarProps = {
  onChange: (e: Event) => void;
  value: string;
};

const Searchbar: FC<SearchbarProps> = ({ onChange, value }) => {
  return (
    <IonSearchbar
      debounce={500}
      onIonChange={onChange}
      className="custom-searchbar"
      enterkeyhint="search"
      inputmode="search"
      spellcheck={true}
      searchIcon={searchIcon}
      value={value}
    />
  );
};

export default Searchbar;
