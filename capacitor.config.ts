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
  },
};

export default config;
