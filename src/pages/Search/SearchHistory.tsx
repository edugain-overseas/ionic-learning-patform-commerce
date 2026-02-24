import { Link } from "react-router-dom";
import { IonIcon } from "@ionic/react";
import { SearchHistoryItemType } from "../../hooks/useSearchHistory";
import arrow from "../../assets/icons/chevron.svg";
import styles from "./Search.module.scss";

const SearchHistory = ({ history }: { history: SearchHistoryItemType[] }) => {
  if (history.length === 0) return null;

  return (
    <div className={styles.searchHistoryWrapper}>
      <h4 className={styles.title}>Search history</h4>
      <ul>
        {history.map((item) => (
          <li key={item.timestamp}>
            <Link
              to={`/search?q=${encodeURIComponent(item.query)}`}
              className={styles.historyLink}
            >
              <span>{item.query}</span>
              <IonIcon src={arrow} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchHistory;
