// import { Stripe } from "@capacitor-community/stripe";
import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "io.ieucourses.app",
  appName: "FEU courses",
  webDir: "dist",
  server: {
    androidScheme: "https",
    iosScheme: "https",
  },
  ios: {
    scrollEnabled: false,
  },
  plugins: {
    SplashScreen: {
      launchAutoHide: false,
      iosSplashWebviewFullScreen: true,
      androidScaleType: "CENTER_CROP",
      backgroundColor: "#5F1314",
    },
    Stripe: {
      publishableKey:
        "pk_test_51MYZV4GntgRu6DcSDjcJ60uSiOtfujweuadV94aF7eOFCxW4JEGZks5Siyh6aSJ6pT2KjZSQ0RN1Ngwopgcw4fLr00E5eJVuD9",
    },
  },
};

export default config;
