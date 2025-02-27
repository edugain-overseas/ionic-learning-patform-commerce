import { Capacitor } from "@capacitor/core";
import { StatusBar, Style } from "@capacitor/status-bar";
import { useEffect } from "react";

export const useStatusBar = () => {
  // Call this function to set the status bar style and color
  const setStatusBarStyleAndColor = async () => {
    if (Capacitor.isPluginAvailable("StatusBar")) {
      await StatusBar.setStyle({ style: Style.Light });
      await StatusBar.setBackgroundColor({ color: "#00000000" }); // Set status bar background color to transparent
    }
  };

  // Call this function to set the status bar to overlay the web view
  const setStatusBarOverlay = async () => {
    if (Capacitor.isPluginAvailable("StatusBar")) {
      await StatusBar.setOverlaysWebView({ overlay: true });

      if (Capacitor.getPlatform() === "android") {
        const root = document.getElementById("root");
        if (root) {
          root.style.setProperty(
            "--ion-safe-area-top",
            // "env(safe-area-inset-top)"
            "20px"
          );
          root.style.setProperty(
            "--ion-safe-area-bottom",
            "env(safe-area-inset-bottom)"
          );
        }
      }
      if (Capacitor.getPlatform() === "ios") {
        const root = document.getElementById("root");
        if (root) {
          root.style.setProperty(
            "--ion-safe-area-top",
            "env(safe-area-inset-top)"
          );

          root.style.setProperty(
            "--ion-safe-area-bottom",
            "env(safe-area-inset-bottom)"
          );
        }
      }
    }
  };

  useEffect(() => {
    setStatusBarOverlay();
    setStatusBarStyleAndColor();
  }, []);
};

export const changeStausBarTheme = async (theme: keyof typeof Style) => {
  if (Capacitor.isPluginAvailable("StatusBar")) {
    await StatusBar.setStyle({ style: Style[theme] });
  }
};
