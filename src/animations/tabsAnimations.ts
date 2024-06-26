import { Animation, createAnimation } from "@ionic/react";

const baseAnimation = (baseEl: Element): Animation => {
  return createAnimation().addElement(baseEl).easing("ease").duration(200);
};

const slideTabFromRight = (baseEl: Element): Animation =>
  baseAnimation(baseEl).fromTo(
    "transform",
    "translateX(100%)",
    "translateX(0)"
  );

const slideTabFromLeft = (baseEl: Element): Animation =>
  baseAnimation(baseEl).fromTo(
    "transform",
    "translateX(-100%)",
    "translateX(0)"
  );

const slideToLeft = (baseEl: Element): Animation =>
  baseAnimation(baseEl).fromTo(
    "transform",
    "translateX(0)",
    "translateX(100%)"
  );

const slideToRight = (baseEl: Element): Animation =>
  baseAnimation(baseEl).fromTo(
    "transform",
    "translateX(0)",
    "translateX(-100%)"
  );

export const tabsAnimations = {
  fromright: slideTabFromRight,
  fromleft: slideTabFromLeft,
  toleft: slideToLeft,
  toright: slideToRight,
};
