import { useEffect } from "react";
import { Keyboard } from "@capacitor/keyboard";

export const useKeyboard = () => {
  useEffect(() => {
    Keyboard.addListener("keyboardWillShow", (info) => {
      document
        .getElementById("root")
        ?.style.setProperty("--keyboard-height", `${info.keyboardHeight}px`);
      // alert(
      //   `${document
      //     .getElementById("root")
      //     ?.style.getPropertyValue("--keyboard-offset")}`
      // );
    });
    Keyboard.addListener("keyboardWillHide", () => {
      document
        .getElementById("root")
        ?.style.setProperty("--keyboard-height", "0px");
    });

    return () => {
      Keyboard.removeAllListeners();
    };
  }, []);
};
