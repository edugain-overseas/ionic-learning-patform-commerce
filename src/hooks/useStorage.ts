// import { Storage } from "@ionic/storage";
// import { useState, useEffect, useRef, useCallback } from "react";

// const newStorage = new Storage({ name: "applocaldb" });

// const useStorage = <T>(key: string, defaultValue: T) => {
//   const store = useRef<Storage>();
//   const [value, setValue] = useState<T>(defaultValue);
//   const [isStoreInit, setIsStoreInit] = useState(false);

//   useEffect(() => {
//     const getStoredValue = async () => {
//       const value = await store.current?.get(key);
//       return value ? value : defaultValue;
//     };

//     const initStore = async () => {
//       try {
//         const newStore = await newStorage.create();
//         store.current = newStore;
//         const storedValue = await getStoredValue();
//         setValue(storedValue);
//       } catch (error) {
//         console.log(error);
//       } finally {
//         setIsStoreInit(true);
//       }
//     };
//     initStore();
//   }, []);

//   useEffect(() => {
//     const setValueToStore = async () => {
//       await store.current?.set(key, value);
//     };
//     setValueToStore();
//   }, [value]);

//   const flush = useCallback(
//     async (newValue: T | null) => {
//       setValue(newValue as T);
//       if (store.current) {
//         if (newValue === null) {
//           await store.current.remove(key);
//         } else {
//           await store.current.set(key, newValue);
//         }
//       }
//     },
//     [key]
//   );

//   return [value, setValue, isStoreInit, flush] as const;
// };

// export default useStorage;

import { Storage } from "@ionic/storage";
import { useCallback, useEffect, useRef, useState } from "react";

const storage = new Storage({ name: "applocaldb" });

let storagePromise: Promise<Storage> | null = null;
const getStorage = () => (storagePromise ??= storage.create());

const useStorage = <T>(key: string, defaultValue: T) => {
  const [value, setValue] = useState<T>(defaultValue);
  const [isStoreInit, setIsStoreInit] = useState(false);
  const initRef = useRef(false); 

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const store = await getStorage();
        const stored = await store.get(key);
        if (!cancelled && stored !== null && stored !== undefined) {
          setValue(stored);
        }
      } catch (error) {
        console.log(error);
      } finally {
        if (!cancelled) {
          initRef.current = true;
          setIsStoreInit(true);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [key]);

  useEffect(() => {
    if (!initRef.current) return;

    (async () => {
      try {
        const store = await getStorage();
        if (value === null || value === undefined) {
          await store.remove(key);
        } else {
          await store.set(key, value);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [value, key]);

  const flush = useCallback(
    async (newValue: T | null) => {
      setValue(newValue as T);
      try {
        const store = await getStorage();
        if (newValue === null || newValue === undefined) {
          await store.remove(key);
        } else {
          await store.set(key, newValue);
        }
      } catch (error) {
        console.log(error);
      }
    },
    [key],
  );

  return [value, setValue, isStoreInit, flush] as const;
};

export default useStorage;
