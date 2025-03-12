import { FC, ReactNode, createContext, useContext } from "react";
import useStorage from "../hooks/useStorage";
import { useCourses } from "./CoursesContext";
import { groupByKey } from "../utils/groupByKey";
import { useUser } from "./UserContext";

export interface ItemType {
  id: number;
  confirmed: boolean;
  categoryId: number;
}

type BasketContextType = {
  items: ItemType[];
  toggleItemToBasket: (id: number) => void;
  toggleConfirmItem: (id: number) => void;
  checkout: () => { subTotal: number; discount: number; total: number };
  clearBasket: () => void;
};

const BasketContext = createContext<BasketContextType | undefined>(undefined);

export const useBasket = () => useContext(BasketContext);

export const BasketProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useStorage<ItemType[]>("basket-items", []);
  const coursesInterface = useCourses();
  const userInterface = useUser();
  const courses = coursesInterface?.courses;
  const categories = coursesInterface?.categories;

  const toggleItemToBasket = (id: number) => {
    setItems((prev) => {
      if (prev.find((item) => id === item.id)) {
        return prev.filter((item) => item.id !== id);
      } else {
        const categoryId = courses?.find(
          (course) => course.id === id
        )?.category_id;

        if (categoryId) {
          return [
            {
              id,
              confirmed: true,
              categoryId: categoryId,
              subItems: [],
            },
            ...prev,
          ];
        } else {
          return prev;
        }
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

  const clearBasket = () => setItems([]);

  const calcDiscount = () => {
    let discount = 0;
    const confirmedItems = items.filter((item) => item.confirmed);

    const groupedItemsByCategoryId = groupByKey(confirmedItems, "categoryId");

    const userCourses = userInterface!.user?.courses.map((course) => ({
      id: course.course_id,
    }));

    Array.from(groupedItemsByCategoryId, ([categoryId, items]) => {
      const categoryDiscount = categories?.find(
        (category) => category.id === categoryId
      )?.discount;
      const categoryCourses = courses?.filter(
        (course) => course.category_id === categoryId
      );
      const isDiscountShouldBeUsed = categoryCourses?.every((course) =>
        [...items, ...userCourses].find((item) => item?.id === course.id)
      );

      if (isDiscountShouldBeUsed && categoryCourses && categoryDiscount) {
        const categoryItemsPrice = categoryCourses.reduce(
          (sumPrice, course) => {
            if (items.find(({ id }) => id === course.id)) {
              return sumPrice + course.price;
            }
            return sumPrice;
          },
          0
        );
        const categoryItemsDiscount =
          (categoryItemsPrice * categoryDiscount) / 100;
        discount += categoryItemsDiscount;
      }
    });

    return discount;
  };

  const calcSubTotal = () => {
    const total = items.reduce((total, item) => {
      if (!item.confirmed) {
        return total;
      }

      const itemPrice =
        courses?.find((course) => course.id === item.id)?.price || 0;
      return total + itemPrice;
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
        items: [
          ...items.sort((itemA, itemB) => itemA.categoryId - itemB.categoryId),
        ],
        toggleItemToBasket,
        toggleConfirmItem,
        checkout,
        clearBasket,
      }}
    >
      {children}
    </BasketContext.Provider>
  );
};
