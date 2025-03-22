const defaultFont = "400 14px Inter, Roboto, sans-serif";

export const measureTextWidth = (text: string, font?: string) => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (!context) return 0;

  context.font = font || defaultFont;
  return context.measureText(text).width;
};
