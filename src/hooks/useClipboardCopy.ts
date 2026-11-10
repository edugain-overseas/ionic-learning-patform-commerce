import { useCallback } from "react";
import { Capacitor } from "@capacitor/core";
import { Clipboard } from "@capacitor/clipboard";
import { useToast } from "./useToast";

type CopyOptions = {
  successMessage?: string;
  errorMessage?: string;
  duration?: number;
};

const writeToClipboard = async (text: string) => {
  if (Capacitor.isNativePlatform()) {
    await Clipboard.write({ string: text });
    return;
  }

  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  const ok = document.execCommand("copy");
  document.body.removeChild(textarea);
  if (!ok) throw new Error("Copy command failed");
};

export const useClipboardCopy = (defaults: CopyOptions = {}) => {
  const [toast] = useToast();

  const copy = useCallback(
    async (text: string, options: CopyOptions = {}): Promise<boolean> => {
      const {
        successMessage = "Copied to clipboard",
        errorMessage = "Failed to copy",
        duration = 5000,
      } = { ...defaults, ...options };

      try {
        await writeToClipboard(text);
        toast({ type: "success", message: successMessage, duration });
        return true;
      } catch (err) {
        console.error("Copy failed:", err);
        toast({ type: "error", message: errorMessage, duration });
        return false;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [toast, defaults.successMessage, defaults.errorMessage, defaults.duration],
  );

  return [copy] as const;
};
