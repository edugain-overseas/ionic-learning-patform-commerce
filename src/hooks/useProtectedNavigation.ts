import { useIonRouter } from "@ionic/react";
import { useToast } from "./useToast";

export const useProtectedNavigation = () => {
  const router = useIonRouter();
  const [present] = useToast();

  return (isAllowed: boolean, path: string, message = "Access denied") => {
    if (!isAllowed) {
      present({
        type: "warning",
        message,
        duration: 2500,
      });
      return;
    }

    router.push(path, "forward");
  };
};
