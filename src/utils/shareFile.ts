import { Capacitor } from "@capacitor/core";
import { Share } from "@capacitor/share";

export const shareFile = async (filePath: string, fileName?: string) => {
  try {
    if (
      Capacitor.getPlatform() === "ios" ||
      Capacitor.getPlatform() === "android"
    ) {
      await Share.share({
        url: filePath,
        title: fileName,
        dialogTitle: fileName,
      });
    } else {
      console.warn("Opening files is not supported on web.");
    }
  } catch (error) {
    console.error("Error opening file:", error);
  }
};
