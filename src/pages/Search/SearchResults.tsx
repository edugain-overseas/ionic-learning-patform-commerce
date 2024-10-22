import { FC } from "react";
import { ResultType, Results } from "./Search";
import SearchReslutSection from "./SearchReslutSection";
import styles from "./Search.module.scss";

type SearchResultsProps = {
  results: Results | undefined;
};

const SearchResults: FC<SearchResultsProps> = ({ results }) => {
  if (!results) {
    return null;
  }

  const isAnyResults = (Object.keys(results) as ResultType[]).some(
    (key) => results[key].length !== 0
  );

  return (
    <>
      {isAnyResults ? (
        (Object.keys(results) as ResultType[]).map(
          (key) =>
            results[key].length !== 0 && (
              <SearchReslutSection data={results[key]} type={key} key={key} />
            )
        )
      ) : (
        <p className={styles.noResults}>No results!</p>
      )}
      ;
    </>
  );
};

export default SearchResults;
