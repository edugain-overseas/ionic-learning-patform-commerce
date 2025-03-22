import { Capacitor } from "@capacitor/core";
import { Filesystem, Directory } from "@capacitor/filesystem";
import { shareFile } from "./shareFile";

export const downloadFile = async (url: string, fileName: string) => {
  const platform = Capacitor.getPlatform();
  try {
    const response = await fetch(url);
    const blob = await response.blob();

    if (platform === "web") {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.style.display = "none";
      a.setAttribute("download", fileName);
      document.body.appendChild(a);
      a.click();
      a.remove();
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = async () => {
      const base64Data = reader.result?.toString().split(",")[1];

      if (!base64Data) {
        console.error("Failed to convert file to Base64.");
        return;
      }

      // Save file to device storage
      const savedFile = await Filesystem.writeFile({
        path: fileName,
        data: base64Data,
        directory: Directory.Documents,
        recursive: true,
      });

      console.log("File saved successfully:", fileName);

      shareFile(savedFile.uri, fileName);
    };
  } catch (error) {
    console.error("Download failed:", error);
    alert(JSON.stringify(error));
  }
};
