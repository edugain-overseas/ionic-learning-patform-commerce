import React, { createContext, useContext, useState } from "react";
import { AppleProductType, GoogleProductType } from "../utils/IAP";

interface BillingContextProps {
  IAPProducts: AppleProductType[] | GoogleProductType[];
  setIAPProducts: React.Dispatch<
    React.SetStateAction<AppleProductType[] | GoogleProductType[]>
  >;
  isIAPLoading: boolean;
  setIsIAPLoading: (loading: boolean) => void;
}

const BillingContext = createContext<BillingContextProps | undefined>(
  undefined,
);

export const BillingProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [IAPProducts, setIAPProducts] = useState<
    AppleProductType[] | GoogleProductType[]
  >([]);
  const [isIAPLoading, setIsIAPLoading] = useState(true);

  return (
    <BillingContext.Provider
      value={{ IAPProducts, setIAPProducts, isIAPLoading, setIsIAPLoading }}
    >
      {children}
    </BillingContext.Provider>
  );
};

export const useBilling = () => {
  const context = useContext(BillingContext);
  if (!context)
    throw new Error(
      "useBilling мусить використовуватись всередині BillingProvider",
    );
  return context;
};
