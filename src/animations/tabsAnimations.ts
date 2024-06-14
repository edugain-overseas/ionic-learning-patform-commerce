import { Animation, createAnimation } from "@ionic/react";

const slideTabFromRight = (baseEl: Element): Animation => {
  return createAnimation()
    .addElement(baseEl)
    .fromTo("transform", "translateX(100%)", "translateX(0)")
    .easing("ease")
    .duration(150);
};

const slideTabFromLeft = (baseEl: Element): Animation => {
  return createAnimation()
    .addElement(baseEl)
    .fromTo("transform", "translateX(-100%)", "translateX(0)")
    .easing("ease-in")
    .duration(150);
};

export const tabsAnimations = {
  right: slideTabFromRight,
  left: slideTabFromLeft,
};
