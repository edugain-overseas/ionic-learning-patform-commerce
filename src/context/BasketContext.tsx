import { FC, ReactNode, createContext, useContext } from "react";
import useStorage from "../hooks/useStorage";
import { useCourses } from "./CoursesContext";

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
  checkout: () => { subTotal: number; discount: number; total: number };
};

const BasketContext = createContext<BasketContextType | undefined>(undefined);

export const useBasket = () => useContext(BasketContext);

export const BasketProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useStorage<ItemType[]>("basket-items", []);
  const coursesInterface = useCourses();
  const courses = coursesInterface?.courses;
  const categories = coursesInterface?.categories;

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
              subItem.id === id
                ? { ...subItem, confirmed: !subItem.confirmed }
                : subItem
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

  const calcDiscount = () => {
    const confirmedItems = items.filter((item) => {
      if (!item.confirmed) {
        return false;
      }
      if (!item.subItems.every((subitem) => subitem.confirmed)) {
        return false;
      }
      return true;
    });
    const discount = confirmedItems.reduce((totalDiscount, item) => {
      const categoryId = courses?.find(
        (course) => course.id === item.id
      )?.category_id;

      const targetCategoryDiscount = categories?.find(
        (category) => category.id === categoryId
      )?.discount;

      if (!targetCategoryDiscount) return totalDiscount;

      const targetCourses = courses?.filter(
        (course) => course.category_id === categoryId
      );

      const itemCoursesIds = [
        item.id,
        ...item.subItems.map((subItem) => subItem.id),
      ];

      const isDiscount = targetCourses?.every((course) =>
        itemCoursesIds.includes(course.id)
      );

      if (!isDiscount) {
        return totalDiscount;
      }
      return totalDiscount + targetCategoryDiscount;
    }, 0);

    return discount;
  };

  const calcSubTotal = () => {
    const total = items.reduce((total, item) => {
      const subItems = item.subItems.filter(
        (subItem) => subItem.confirmed === true
      );
      const SubItemsTotalPrice = subItems.reduce((sum, { id }) => {
        const price = courses?.find((course) => course.id === id)?.price;
        return price ? sum + price : sum;
      }, 0);

      const itemPrice = courses?.find(
        (course) => course.id === item.id && item.confirmed
      )?.price;

      const sum = itemPrice
        ? itemPrice + SubItemsTotalPrice
        : SubItemsTotalPrice;

      return total + sum;
    }, 0);
    return total;
  };

  const checkout = () => {
    const subTotal = calcSubTotal();
    const discount = calcDiscount();
    const total = subTotal - discount;
    return { subTotal, discount, total };
  };

  return (
    <BasketContext.Provider
      value={{
        items,
        toggleItemToBasket,
        toggleConfirmItem,
        toggleSubItem,
        checkout,
      }}
    >
      {children}
    </BasketContext.Provider>
  );
};
