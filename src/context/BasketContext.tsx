import { FC, ReactNode, createContext, useContext } from "react";
import useStorage from "../hooks/useStorage";

type ItemType = {
  id: number;
  confirmed: boolean;
};

type BasketContextType = {
  items: ItemType[];
  toggleItemToBasket: (id: number) => void;
  toggleConfirmItem: (id: number) => void;
};

const BasketContext = createContext<BasketContextType | undefined>(undefined);

export const useBasket = () => useContext(BasketContext);

export const BasketProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [items, setItems] = useStorage<ItemType[]>('basket-items', []);

  const toggleItemToBasket = (id: number) => {
    setItems((prev) => {
      if (prev.find((item) => id === item.id)) {
        return prev.filter((item) => item.id !== id);
      } else {
        return [...prev, { id, confirmed: true }];
      } 
    });
  };

  const toggleConfirmItem = (id: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, confirmed: !item.confirmed } : item
      )
    );
  };

  return (
    <BasketContext.Provider
      value={{ items, toggleItemToBasket, toggleConfirmItem }}
    >
      {children}
    </BasketContext.Provider>
  );
};
