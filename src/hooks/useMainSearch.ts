import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { instance } from "../http/instance";
import {
  CategoryType,
  CourseType,
  InstructionType,
} from "../context/CoursesContext";
import useDebounceValue from "./useDebounce";

export type SuggestionType = {
  value: string;
  type: string;
};

export type Results = {
  categories: CategoryType[];
  courses: CourseType[];
  instructions: InstructionType[];
};

const SUGGESTIONS_CACHE = new Map();

export const useMainSearchForm = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("q") || "";

  const [value, setValue] = useState<string>(query);
  const [suggestions, setSuggestions] = useState<SuggestionType[]>([]);
  const debouncedValue = useDebounceValue(value, 300);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const response = await instance.get<Record<string, string[]>>(
          `/user/search/suggestion?query=${debouncedValue}`
        );

        if (response.data) {
          const suggestionsArray: SuggestionType[] = [];

          Object.entries(response.data).forEach(([key, arrayOfValues]) =>
            arrayOfValues.forEach((value) =>
              suggestionsArray.push({ type: key, value })
            )
          );
          SUGGESTIONS_CACHE.set(debouncedValue, suggestionsArray);
          setSuggestions(suggestionsArray);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (!value.trim()) return;

    if (SUGGESTIONS_CACHE.has(debouncedValue)) {
      setSuggestions(SUGGESTIONS_CACHE.get(debouncedValue));
      return;
    }

    fetchSuggestions();
  }, [debouncedValue]);

  useEffect(() => {
    const validQuery = query.trim().toLowerCase();
    if (validQuery && validQuery !== value) setValue(validQuery);
  }, [query]);

  return { value, setValue, suggestions };
};

export const useMainSearchValue = () => {
  const [results, setResults] = useState<Results | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("q") || "";

  useEffect(() => {
    const fetchResults = async () => {
      setIsLoading(true);
      try {
        const { data } = await instance.get(`/user/search?query=${query}`);
        setResults(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (query) {
      fetchResults();
    } else {
      setResults(null);
    }
  }, [query]);

  return { isLoading, query, results };
};
