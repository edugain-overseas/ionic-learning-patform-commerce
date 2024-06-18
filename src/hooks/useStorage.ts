import { Storage } from "@ionic/storage";
import { useState, useEffect, useRef } from "react";

const newStorage = new Storage({ name: "applocaldb" });

const useStorage = <T>(key: string, defaultValue: T) => {
  const store = useRef<Storage>();
  const [value, setValue] = useState<T>(defaultValue);

  useEffect(() => {
    const getStoredValue = async () => {
      const value = await store.current?.get(key);
      return value ? value : defaultValue;
    };

    const initStore = async () => {
      const newStore = await newStorage.create();
      store.current = newStore;
      const storedValue = await getStoredValue();
      setValue(storedValue);
    };
    initStore();
  }, []);

  useEffect(() => {
    const setStore = async () => {
      if (store.current) {
        await store.current.set(key, value);
      }
    };
    setStore();
  }, [value]);

  return [value, setValue] as const;
};

export default useStorage;
