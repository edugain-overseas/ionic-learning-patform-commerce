import { Stripe } from '@capacitor-community/stripe';
// import { StatusBar } from "@capacitor/status-bar";
import { CapacitorConfig } from "@capacitor/cli";
// import { KeyboardResize, KeyboardStyle } from '@capacitor/keyboard';

const config: CapacitorConfig = {
  appId: "io.ieucourses.app",
  appName: "IEU courses",
  webDir: "dist",
  server: {
    androidScheme: "https",
  },
  plugins: {
    // SplashScreen: {
    //   launchShowDuration: 1000,
    //   launchAutoHide: true,
    //   launchFadeOutDuration: 0,
    //   backgroundColor: "#ffffff",
    //   androidSplashResourceName: "splash",
    //   androidScaleType: "FIT_CENTER",
    //   showSpinner: false,
    //   androidSpinnerStyle: "large",
    //   iosSpinnerStyle: "large",
    //   spinnerColor: "#7E8CA8",
    //   splashFullScreen: true,
    //   splashImmersive: true,
    //   layoutName: "launch_screen",
    //   useDialog: true,
    // },
    Keyboard: {
      // resize: KeyboardResize.Body,
      // style: KeyboardStyle.Dark,
      // resizeOnFullScreen: true,
    },
    GoogleAuth: {
      scopes: ["profile", "email"],
      serverClientId:
        "492800368725-r5392545k9sp6tuh7c1fmmtlmvedng0s.apps.googleusercontent.com",
      forceCodeForRefreshToken: true,
      androidClientId:
        "492800368725-3p2f2g0k1raf7tk4mq9aov0t9skv9f1h.apps.googleusercontent.com",
    },
  },
};

export default config;
