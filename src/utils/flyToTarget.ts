import { flyTo } from "../animations/cardAnimations";

const flyToTarget = (sourceEl: HTMLElement, targetElement: HTMLElement) => {
  const sourceRect = sourceEl.getBoundingClientRect();

  const taretRectRect = targetElement.getBoundingClientRect();

  const clone = sourceEl.cloneNode(true) as HTMLElement;
  clone.style.position = "fixed";
  clone.style.left = `${sourceRect.left}px`;
  clone.style.top = `${sourceRect.top}px`;
  clone.style.width = `${sourceRect.width}px`;
  clone.style.height = `${sourceRect.height}px`;
  // clone.style.borderRadius = `50%`;
  clone.style.border = `1rem solid var(--ion-color-light)`;
  clone.style.zIndex = "9999";
  clone.style.pointerEvents = "none";
  document.body.appendChild(clone);

  const deltaX = taretRectRect.left - sourceRect.left;
  const deltaY = taretRectRect.top - sourceRect.top;

  sourceEl.style.setProperty("opacity", "0");
  return flyTo(clone, deltaX, deltaY).onFinish(() => {
    sourceEl.style.setProperty("opacity", "1");
    clone.remove();
  });
};

export const flyToBasket = (sourceEl: HTMLElement) => {
  const basketIcon = document.getElementById("tabbar-basket-icon");

  if (!basketIcon) return;

  return flyToTarget(sourceEl, basketIcon);
};
