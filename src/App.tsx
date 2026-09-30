import { useEffect, useState } from "react";
import { IonApp, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { SplashScreen } from "@capacitor/splash-screen";
import { CoursesProvider } from "./context/CoursesContext";
import { UserProvider } from "./context/UserContext";
import { ListStyleProvider } from "./context/ListStyleContext";
import { useStatusBar } from "./hooks/useStatusBar";
import { useKeyboard } from "./hooks/useKeyboard";
import { useDynamicFontSize } from "./hooks/useDynamicFontSize";
import { BasketProvider } from "./context/BasketContext";
// import { useAxios } from "./hooks/useAxios";
import { useGoogleAuthInit } from "./hooks/useGoogleAuthInit";
import { AuthUIProvider } from "./context/AuthUIContext";
import { BillingProvider } from "./context/BillingContext";
import { useSetupPayment } from "./hooks/useSetupPayment";
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

setupIonicReact();

const AppContent: React.FC = () => {
  const { initPayments } = useSetupPayment();

  useEffect(() => {
    const initializeApp = async () => {
      try {
        initPayments();
      } catch (error) {
        console.error("Помилка ініціалізації додатка:", error);
      } finally {
        // await SplashScreen.hide({ fadeOutDuration: 400 });
        setTimeout(async () => {
          try {
            await SplashScreen.hide({ fadeOutDuration: 500 });
          } catch (e) {
            console.warn("Сплеш-скрін вже приховано або виникла помилка:", e);
          }
        }, 350);
      }
    };

    initializeApp();
  }, []);

  return (
    <IonReactRouter>
      <Router />
    </IonReactRouter>
  );
};

const App: React.FC = () => {
  useDynamicFontSize();
  useStatusBar();
  useKeyboard();
  useGoogleAuthInit();

  return (
    <IonApp className="App">
      <UserProvider>
        <CoursesProvider>
          <BasketProvider>
            <ListStyleProvider>
              <AuthUIProvider>
                <BillingProvider>
                  <AppContent />
                </BillingProvider>
              </AuthUIProvider>
            </ListStyleProvider>
          </BasketProvider>
        </CoursesProvider>
      </UserProvider>
    </IonApp>
  );
};

export default App;
