import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";
import { useEffect } from "react";

export const useGoogleAuthInit = () => {
  useEffect(() => {
    GoogleAuth.initialize({
      clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      scopes: ["email", "profile"],
    });
  }, []);
};
