import { Stripe } from "@capacitor-community/stripe";
// import { StatusBar } from "@capacitor/status-bar";
import { CapacitorConfig } from "@capacitor/cli";
// import { KeyboardResize, KeyboardStyle } from '@capacitor/keyboard';

const config: CapacitorConfig = {
  appId: "io.ieucourses.app",
  appName: "FEU courses",
  webDir: "dist",
  server: {
    androidScheme: "https",
  },
  ios: {
    scrollEnabled: false,
  },
  plugins: {
    Keyboard: {
      // resizeOnFullScreen: true,
    },
    SplashScreen: {
      launchShowDuration: 3000,
      backgroundColor: "#760000",
      androidScaleType: "CENTER_CROP",
    },
    GoogleAuth: {
      scopes: ["profile", "email"],
      serverClientId:
        "492800368725-r5392545k9sp6tuh7c1fmmtlmvedng0s.apps.googleusercontent.com",
      forceCodeForRefreshToken: true,
      androidClientId:
        "492800368725-3p2f2g0k1raf7tk4mq9aov0t9skv9f1h.apps.googleusercontent.com",
      iosClientId:
        "492800368725-utr5ri2q9negtjsrjgpu8kl005833al2.apps.googleusercontent.com",
    },
    Stripe: {
      publishableKey:
        "pk_test_51MYZV4GntgRu6DcSDjcJ60uSiOtfujweuadV94aF7eOFCxW4JEGZks5Siyh6aSJ6pT2KjZSQ0RN1Ngwopgcw4fLr00E5eJVuD9",
    },
  },
};

export default config;
