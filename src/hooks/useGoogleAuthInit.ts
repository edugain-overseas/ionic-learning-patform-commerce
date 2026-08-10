import { SocialLogin } from "@capgo/capacitor-social-login";
import { useEffect } from "react";

export const useGoogleAuthInit = () => {
  useEffect(() => {
    const initializeGoogleAuth = async () => {
      try {
        await SocialLogin.initialize({
          google: {
            webClientId: import.meta.env.VITE_GOOGLE_CLIENT_ID, // Use Web Client ID for all platforms
            iOSClientId: import.meta.env.VITE_GOOGLE_IOS_CLIENT_ID, // for iOS
            iOSServerClientId: import.meta.env.VITE_GOOGLE_SERVER_CLIENT_ID, // for server-side operations
            mode: "online",
          },
        });
      } catch (error) {
        console.error("Google Auth Initialization error:", error);
      }
    };
    initializeGoogleAuth();
  }, []);
};
