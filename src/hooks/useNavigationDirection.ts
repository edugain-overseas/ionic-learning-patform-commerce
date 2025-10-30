import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";

export const useNavigationDirection = () => {
  const location = useLocation();
  const [direction, setDirection] = useState<"left" | "right">("right");
  const previousPath = useRef<string>("");

  useEffect(() => {
    const tabOrder = ["/home", "/courses", "/my-profile", "/basket"];
    const prevIndex = tabOrder.indexOf(previousPath.current);
    const newIndex = tabOrder.indexOf(location.pathname);

    if (prevIndex !== -1 && newIndex !== -1) {
      setDirection(newIndex > prevIndex ? "right" : "left");
    }

    previousPath.current = location.pathname;
  }, [location]);

  return direction;
};
