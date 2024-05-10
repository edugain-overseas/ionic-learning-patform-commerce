import { IonApp, setupIonicReact } from "@ionic/react";
import Router from "./components/Router";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Custom styles */
import "./App.scss";

/* Theme variables */
import "./theme/variables.css";

import { CoursesProvider } from "./context/CoursesContext";
import { UserProvider } from "./context/UserContext";
import { ListStyleProvider } from "./context/ListStyleContext";
import { StatusBar, Style } from "@capacitor/status-bar";
import { useEffect } from "react";
import { Capacitor } from "@capacitor/core";

// Call this function to set the status bar style and color
const setStatusBarStyleAndColor = async () => {
  if (Capacitor.isPluginAvailable("StatusBar")) {
    await StatusBar.setStyle({ style: Style.Dark }); // Set status bar text to light
    await StatusBar.setBackgroundColor({ color: "#00000000" }); // Set status bar background color to transparent
  }
};

// Call this function to set the status bar to overlay the web view
const setStatusBarOverlay = async () => {
  if (Capacitor.isPluginAvailable("StatusBar")) {
    await StatusBar.setOverlaysWebView({ overlay: true });
  }
};

setupIonicReact();

const App: React.FC = () => {
  useEffect(() => {
    setStatusBarOverlay();
    setStatusBarStyleAndColor();
  }, []);

  return (
    <IonApp className="App">
      <UserProvider>
        <CoursesProvider>
          <ListStyleProvider>
            <Router />
          </ListStyleProvider>
        </CoursesProvider>
      </UserProvider>
    </IonApp>
  );
};

export default App;
