import { createContext, useContext, useState } from "react";

interface ListStyleContextTypes {
  listStyle: string;
  changeListStyle: () => void;
}

const ListStyleContext = createContext<ListStyleContextTypes | null>(null);

export const useListStyle = () => useContext(ListStyleContext);

export const ListStyleProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [listStyle, setListStyle] = useState("card");
  const changeListStyle = () => {
    setListStyle((prev) => (prev === "card" ? "row" : "card"));
  };
  return (
    <ListStyleContext.Provider value={{ listStyle, changeListStyle }}>
      {children}
    </ListStyleContext.Provider>
  );
};
