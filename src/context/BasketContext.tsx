import { createContext, useContext } from "react";

const BasketContext = createContext(undefined);

export const useBasket = () => useContext(BasketContext);
