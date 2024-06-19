import { FC, ReactNode, createContext, useContext } from "react";
import useStorage from "../hooks/useStorage";

export interface BaseItemType {
  id: number;
  confirmed: boolean;
}

interface ItemType extends BaseItemType {
  subItems: BaseItemType[];
}

type BasketContextType = {
  items: ItemType[];
  toggleItemToBasket: (id: number) => void;
  toggleConfirmItem: (id: number) => void;
  toggleSubItem: (id: number) => void;
};

const BasketContext = createContext<BasketContextType | undefined>(undefined);

export const useBasket = () => useContext(BasketContext);

export const BasketProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useStorage<ItemType[]>("basket-items", []);

  const toggleItemToBasket = (id: number) => {
    setItems((prev) => {
      if (prev.find((item) => id === item.id)) {
        return prev.filter((item) => item.id !== id);
      } else {
        return [...prev, { id, confirmed: true, subItems: [] }];
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

  const toggleSubItem = (id: number) => {
    setItems((prev) =>
      prev.map((mainItem) => {
        if (mainItem.subItems.find((subItem) => subItem.id === id)) {
          return {
            ...mainItem,
            subItems: mainItem.subItems.map((subItem) =>
              subItem.id === id ? { ...subItem, confirmed: !subItem.confirmed } : subItem
            ),
          };
        } else {
          return {
            ...mainItem,
            subItems: [...mainItem.subItems, { id, confirmed: true }],
          };
        }
      })
    );
  };

  return (
    <BasketContext.Provider
      value={{ items, toggleItemToBasket, toggleConfirmItem, toggleSubItem }}
    >
      {children}
    </BasketContext.Provider>
  );
};
