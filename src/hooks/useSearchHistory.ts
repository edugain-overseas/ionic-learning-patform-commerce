import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { instance } from "../http/instance";
import { useLocation } from "react-router";
import useStorage from "./useStorage";

export type SearchHistoryItemType = {
  query: string;
  timestamp: string;
};

const HISTORY_MAX_LENGHT = 10;

export const useSearchHistory = () => {
  const accessToken = useUser()?.user.accessToken;

  const [localHistory, setLocalHistory] = useStorage<SearchHistoryItemType[]>(
    "search-history",
    []
  );
  const [userHistory, setUserHistory] = useState<SearchHistoryItemType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("q") || "";

  useEffect(() => {
    const updateLocalHistory = () => {
      const validQuery = query.trim().toLowerCase();
      if (!validQuery) return;

      setLocalHistory((prevLocalHistory) => {
        if (prevLocalHistory[0]?.query === validQuery) {
          return prevLocalHistory;
        }
        const filtred = prevLocalHistory.filter(
          (item) => item.query !== validQuery
        );

        const updatedLocalHistory: SearchHistoryItemType[] = [
          { query: validQuery, timestamp: new Date().toISOString() },
          ...filtred,
        ];
        return updatedLocalHistory.slice(0, HISTORY_MAX_LENGHT);
      });
    };

    if (query) updateLocalHistory();
  }, [query]);

  useEffect(() => {
    const fetchSearchHistory = async () => {
      setIsLoading(true);
      try {
        const response = await instance.get("user/search/recent");
        if (response.data) {
          setUserHistory(response.data.recent_queries);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (accessToken) {
      fetchSearchHistory();
    }
  }, [accessToken]);

  const searchHistory = accessToken ? userHistory : localHistory;

  return { searchHistory, isLoading };
};
