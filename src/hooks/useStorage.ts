import { Storage } from "@ionic/storage";
import { useState, useEffect, useRef, useCallback } from "react";

const newStorage = new Storage({ name: "applocaldb" });

const useStorage = <T>(key: string, defaultValue: T) => {
  const store = useRef<Storage>();
  const [value, setValue] = useState<T>(defaultValue);
  const [isStoreInit, setIsStoreInit] = useState(false);

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
      } finally {
        setIsStoreInit(true);
      }
    };
    initStore();
  }, []);

  useEffect(() => {
    const setValueToStore = async () => {
      await store.current?.set(key, value);
    };
    setValueToStore();
  }, [value]);

  const flush = useCallback(
    async (newValue: T | null) => {
      setValue(newValue as T);
      if (store.current) {
        if (newValue === null) {
          await store.current.remove(key);
        } else {
          await store.current.set(key, newValue);
        }
      }
    },
    [key]
  );

  return [value, setValue, isStoreInit, flush] as const;
};

export default useStorage;
