import { FC } from "react";
import { ResultType, Results } from "./Search";
import SearchReslutSection from "./SearchReslutSection";
import styles from "./Search.module.scss";

type SearchResultsProps = {
  results?: Results;
  query?: string;
};

const SearchResults: FC<SearchResultsProps> = ({ results, query }) => {
  if (!results) {
    return null;
  }

  const resultsLength = (Object.keys(results) as ResultType[]).reduce(
    (length, key) => (length += results[key].length),
    0
  );

  console.log(resultsLength);

  const isAnyResults = resultsLength !== 0;

  return (
    <>
      {isAnyResults ? (
        <>
          <div className={styles.resultsDiscription}>
            <p className={styles.title}>Search results for: {query}</p>
            <p className={styles.subtitle}>{resultsLength} matches found</p>
          </div>
          {(Object.keys(results) as ResultType[]).map(
            (key) =>
              results[key].length !== 0 && (
                <SearchReslutSection data={results[key]} type={key} key={key} />
              )
          )}
        </>
      ) : (
        <p className={styles.noResults}>No results!</p>
      )}
      ;
    </>
  );
};

export default SearchResults;
