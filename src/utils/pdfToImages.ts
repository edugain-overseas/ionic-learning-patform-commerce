import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/legacy/build/pdf.worker.min.mjs?url";
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

export const pdfToImages = async (pdfUrl: string): Promise<string[]> => {
  // Download PDF
  const pdf = await pdfjsLib.getDocument(pdfUrl).promise;

  const images: string[] = [];

  // loop through all pages
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);

    // quality boost
    const viewport = page.getViewport({ scale: 2 });

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d")!;

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    // Render in Canvas
    await page.render({
      canvasContext: context,
      viewport: viewport,
    }).promise;

    // Get image from canvas
    const imgData = canvas.toDataURL("image/jpeg", 0.92);

    images.push(imgData);
  }

  return images;
};
