import { useRef, useState } from "react";
import { IonTabsCustomEvent } from "@ionic/core";

export const useNavigationDirection = () => {
  const [direction, setDirection] = useState<"left" | "right">("right");
  const prevTabRef = useRef("home");

  const tabOrder = ["home", "courses", "my-profile", "basket"];

  console.log(direction);

  const handleTabsWillChange = (
    event: IonTabsCustomEvent<{
      tab: string;
    }>
  ) => {
    const tabIndex = tabOrder.indexOf(event.detail.tab);
    const prevIndex = tabOrder.indexOf(prevTabRef.current);

    if (prevIndex !== -1 && tabIndex !== -1) {
      console.log(prevIndex, tabIndex);

      if (tabIndex > prevIndex) setDirection("right");
      else if (tabIndex < prevIndex) setDirection("left");
    } else {
      setDirection("right");
    }

    return tabIndex;
  };

  return { direction, handleTabsWillChange } as const;
};
