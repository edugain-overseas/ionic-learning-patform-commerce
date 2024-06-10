import { Capacitor } from "@capacitor/core";
import { Keyboard } from "@capacitor/keyboard";
import { pxToRem } from "../utils/pxToRem";

export const useKeyboard = () => {
  if (Capacitor.getPlatform() !== "web") {
    Keyboard.addListener("keyboardWillShow", (info) => {
      document
        .getElementById("root")
        ?.style.setProperty(
          "--keyboard-offset",
          `${pxToRem(info.keyboardHeight)}rem`
        );
    });

    Keyboard.addListener("keyboardWillHide", () => {
      document
        .getElementById("root")
        ?.style.setProperty("--keyboard-offset", "0px");
    });
  }
};
