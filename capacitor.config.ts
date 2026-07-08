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
