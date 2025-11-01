import { ToastOptions, useIonToast } from "@ionic/react";
import error from "../assets/icons/toast/error.svg";
import warning from "../assets/icons/toast/warning.svg";
import success from "../assets/icons/toast/success.svg";
import guard from "../assets/icons/toast/guard.svg";
import info from "../assets/icons/info.svg";

type ToastType = "info" | "success" | "warning" | "error" | "guard";

type ToastApiConfig = ToastOptions & { type?: ToastType };

const toastIcons = {
  error,
  warning,
  success,
  guard,
  info,
};

export const useToast = () => {
  const [present] = useIonToast();

  const api = ({ type = "info", ...config }: ToastApiConfig) => {
    return present({
      cssClass: ["toast", `toast-${type}`],
      swipeGesture: "vertical",
      position: "top",
      icon: toastIcons[type],
      duration: 3000,
      ...config,
    });
  };
  return [api];
};
