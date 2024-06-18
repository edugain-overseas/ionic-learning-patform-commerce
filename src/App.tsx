import { useState } from "react";
import { IonApp, setupIonicReact } from "@ionic/react";
import { CoursesProvider } from "./context/CoursesContext";
import { UserProvider } from "./context/UserContext";
import { ListStyleProvider } from "./context/ListStyleContext";
import { useStatusBar } from "./hooks/useStatusBar";
import { useKeyboard } from "./hooks/useKeyboard";
import { useDynamicFontSize } from "./hooks/useDynamicFontSize";
import Router from "./components/Router";
import SplashScreen from "./pages/SplashScreen/SplashScreen";

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
import { BasketProvider } from "./context/BasketContext";

setupIonicReact();

const App: React.FC = () => {
  const [splashScreen, setSplashScreen] = useState(true);
  useDynamicFontSize();
  useStatusBar();
  useKeyboard();

  return (
    <IonApp className="App">
      <UserProvider>
        <CoursesProvider>
          <BasketProvider>
            <ListStyleProvider>
              {splashScreen ? (
                <SplashScreen onAnimationEnd={() => setSplashScreen(false)} />
              ) : (
                <Router />
              )}
            </ListStyleProvider>
          </BasketProvider>
        </CoursesProvider>
      </UserProvider>
    </IonApp>
  );
};

export default App;
