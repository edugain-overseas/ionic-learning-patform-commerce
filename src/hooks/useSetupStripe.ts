import { useEffect } from "react";
import { Stripe } from "@capacitor-community/stripe";

export const useSetupStripe = () => {
  useEffect(() => {
    const setupStripe = async () => {
      await Stripe.initialize({
        publishableKey: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY_DEV,
      });
    };

    setupStripe();
  }, []);
};
