import { useEffect } from "react";
import { Stripe } from "@capacitor-community/stripe";

export const useSetupStripe = () => {
  useEffect(() => {
    const setupStripe = async () => {
      await Stripe.initialize({
        publishableKey:
          "pk_test_51MYZV4GntgRu6DcSDjcJ60uSiOtfujweuadV94aF7eOFCxW4JEGZks5Siyh6aSJ6pT2KjZSQ0RN1Ngwopgcw4fLr00E5eJVuD9",
      });
    };

    setupStripe();
  }, []);
};
