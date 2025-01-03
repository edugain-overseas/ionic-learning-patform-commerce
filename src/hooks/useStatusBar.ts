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
        document
          .getElementById("root")
          ?.style.setProperty("--ion-safe-area-top", "20px");
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

// bottom status bar color #A50000//
