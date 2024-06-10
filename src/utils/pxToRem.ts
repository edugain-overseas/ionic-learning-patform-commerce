export const pxToRem = (px: number): number => {
  const fs = Number.parseFloat(document.documentElement.style.fontSize);
  return px / fs;
};

export const remToPx = (rem: number): number => {
  const fs = Number.parseFloat(document.documentElement.style.fontSize);
  return rem * fs;
};
