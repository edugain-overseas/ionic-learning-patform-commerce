import { Animation, createAnimation } from "@ionic/react";

export const menuEnterPageAnimation = (baseEl: HTMLElement): Animation =>
  createAnimation()
    .addElement(baseEl)
    // .fromTo("left", "0", "7.5%")
    .fromTo("scale", "1", "0.68")
    .easing("ease")
    .duration(250);

export const menuLeavePageAnimation = (baseEl: HTMLElement): Animation =>
  menuEnterPageAnimation(baseEl).direction("reverse");
