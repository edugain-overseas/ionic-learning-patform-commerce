import { Storage } from "@ionic/storage";
import { useState, useEffect } from "react";

const store = new Storage();

const useStorage = (key: string, defaultValue: any) => {
  const [value, setValue] = useState<any>(defaultValue);

  useEffect(() => {
    const getStoredValue = async () => {
      await store.create();
      let currentValue;
      try {
        currentValue = await store.get(key);
      } catch (error) {
        currentValue = defaultValue;
      }
      setValue(currentValue);
    };
    getStoredValue();
  }, [key, defaultValue]);

  useEffect(() => {
    const setStore = async () => {
      await store.set(key, value);
    };
    setStore();
  }, [value, key]);

  return [value, setValue] as const;
};

export default useStorage;
