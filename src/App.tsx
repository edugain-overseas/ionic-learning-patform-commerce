import { IonApp, setupIonicReact } from "@ionic/react";
import { CapacitorStripeProvider } from "@capacitor-community/stripe/dist/esm/react/provider";
import { CoursesProvider } from "./context/CoursesContext";
import { UserProvider } from "./context/UserContext";
import { ListStyleProvider } from "./context/ListStyleContext";
import { useStatusBar } from "./hooks/useStatusBar";
import { useKeyboard } from "./hooks/useKeyboard";
import { useDynamicFontSize } from "./hooks/useDynamicFontSize";
import { BasketProvider } from "./context/BasketContext";
import { useAxios } from "./hooks/useAxios";
import { useGoogleAuthInit } from "./hooks/useGoogleAuthInit";
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
import { AuthUIProvider } from "./context/AuthUIContext";

setupIonicReact();

const App: React.FC = () => {
  useDynamicFontSize();
  useStatusBar();
  useKeyboard();
  useAxios();
  useGoogleAuthInit();

  return (
    <CapacitorStripeProvider publishableKey="pk_test_51MYZV4GntgRu6DcSDjcJ60uSiOtfujweuadV94aF7eOFCxW4JEGZks5Siyh6aSJ6pT2KjZSQ0RN1Ngwopgcw4fLr00E5eJVuD9">
      <IonApp className="App">
        <UserProvider>
          <CoursesProvider>
            <BasketProvider>
              <ListStyleProvider>
                <AuthUIProvider>
                  <Router />
                </AuthUIProvider>
              </ListStyleProvider>
            </BasketProvider>
          </CoursesProvider>
        </UserProvider>
      </IonApp>
    </CapacitorStripeProvider>
  );
};

export default App;
