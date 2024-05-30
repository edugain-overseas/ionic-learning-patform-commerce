import { Capacitor } from "@capacitor/core";
import { Keyboard } from "@capacitor/keyboard";

export const useKeyboard = () => {
  if (Capacitor.getPlatform() !== "web") {
    Keyboard.addListener("keyboardWillShow", (info) => {
      document
        .getElementById("root")
        ?.style.setProperty("--keyboard-offset", `${info.keyboardHeight}px`);
    });

    Keyboard.addListener("keyboardWillHide", () => {
      document
        .getElementById("root")
        ?.style.setProperty("--keyboard-offset", "0px");
    });
  }
};
