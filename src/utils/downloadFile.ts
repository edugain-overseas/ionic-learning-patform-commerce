import { Capacitor } from "@capacitor/core";
import { Filesystem, Directory } from "@capacitor/filesystem";
import { shareFile } from "./shareFile";

const blobToBase64 = (blob: Blob): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onloadend = () =>
      resolve(reader.result!.toString().split(",")[1]);
    reader.readAsDataURL(blob);
  });

export const downloadFile = async (url: string, fileName: string) => {
  const platform = Capacitor.getPlatform();

  try {
    const response = await fetch(url);
    const blob = await response.blob();

    // --- WEB ---
    if (platform === "web") {
      const objectUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = objectUrl;
      a.style.display = "none";
      a.setAttribute("download", fileName);
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(objectUrl);
      return;
    }

    // --- NATIVE (iOS / Android) ---
    const base64Data = await blobToBase64(blob);

    // Save file to device storage
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Documents,
      recursive: true,
    });

    // open / share
    shareFile(savedFile.uri, fileName);
  } catch (error) {
    console.error("Download failed:", error);
  }
};
