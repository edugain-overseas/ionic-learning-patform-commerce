import { Storage } from "@ionic/storage";
import { useState, useEffect, useRef } from "react";

const newStorage = new Storage({ name: "applocaldb" });

const useStorage = <T>(key: string, defaultValue: T) => {
  const store = useRef<Storage>();
  const [value, setValue] = useState<T>(defaultValue);
  console.log(value);
  

  useEffect(() => {
    const getStoredValue = async () => {
      const value = await store.current?.get(key);
      return value ? value : defaultValue;
    };

    const initStore = async () => {
      try {
        const newStore = await newStorage.create();
        store.current = newStore;
        const storedValue = await getStoredValue();
        setValue(storedValue);
      } catch (error) {
        console.log(error);
      }
    };
    initStore();
  }, []);

  useEffect(() => {
    const setValueToStoreStore = async () => {
      await store.current?.set(key, value);
    };
    setValueToStoreStore();
  }, [value]);

  return [value, setValue] as const;
};

export default useStorage;
