import React from "react";
import styles from "./MainSearchbar.module.scss";
import { SuggestionType } from "../../hooks/useMainSearch";

const SuggestionsList = ({
  suggestions,
}: {
  suggestions: SuggestionType[];
}) => {
  return (
    <ul className={styles.suggestionsList}>
      {suggestions.map((suggestion, index) => (
        <li key={index}>
          <h5>{suggestion.value}</h5>
          <span>{suggestion.type}</span>
        </li>
      ))}
    </ul>
  );
};

export default SuggestionsList;
