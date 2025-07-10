import { Animation, createAnimation } from "@ionic/react";

export const pulseOne = (baseEl: HTMLElement): Animation =>
  createAnimation()
    .addElement(baseEl)
    .duration(300)
    .easing("ease")
    .keyframes([
      { offset: 0, transform: "scale(1)", opacity: "1" },
      { offset: 0.5, transform: "scale(0.95)", opacity: "0.9" },
      { offset: 1, transform: "scale(1)", opacity: "1" },
    ]);

export const flyTo = (
  baseEl: HTMLElement,
  toX: number,
  toY: number
): Animation =>
  createAnimation()
    .addElement(baseEl)
    .duration(800)
    .easing("ease-in-out")
    .keyframes([
      { offset: 0, transform: "translate(0, 0) scale(1)", opacity: "1" },
      {
        offset: 0.2,
        transform: `translate(${0}px, ${-toY / 10}px) scale(0.8)`,
        opacity: "1",
      },
      {
        offset: 1,
        transform: `translate(${toX}px, ${toY}px) scale(0.3)`,
        opacity: "0.2",
      },
    ]);
