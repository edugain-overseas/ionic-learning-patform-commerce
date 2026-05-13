import { useEffect } from "react";
import { Keyboard, KeyboardResize } from "@capacitor/keyboard";
import { Capacitor } from "@capacitor/core";

export const useKeyboard = () => {
  useEffect(() => {
    if (Capacitor.getPlatform() === "android") {
      Keyboard.addListener("keyboardWillShow", (info) => {
        console.log("KEYBOARD: " + info.keyboardHeight);

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

    if (Capacitor.getPlatform() === "ios") {
      Keyboard.setResizeMode({ mode: KeyboardResize.None });
      Keyboard.addListener("keyboardWillShow", (info) => {
        console.log("KEYBOARD: " + info.keyboardHeight);

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
