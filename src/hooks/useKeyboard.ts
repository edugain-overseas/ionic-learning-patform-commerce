import { useEffect } from "react";
import { Keyboard } from "@capacitor/keyboard";
import { Capacitor } from "@capacitor/core";

export const useKeyboard = () => {
  useEffect(() => {
    if (Capacitor.getPlatform() !== "web") {
      Keyboard.addListener("keyboardWillShow", (info) => {
        document
          .getElementById("root")
          ?.style.setProperty("--keyboard-height", `${info.keyboardHeight}px`);
      });
      Keyboard.addListener("keyboardWillHide", () => {
        document
          .getElementById("root")
          ?.style.setProperty("--keyboard-height", "0px");
      });
    }

    return () => {
      if (Capacitor.getPlatform() !== "web") {
        Keyboard.removeAllListeners();
      }
    };
  }, []);
};
