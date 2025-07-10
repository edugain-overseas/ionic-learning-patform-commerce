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
  clone.style.zIndex = "9999";
  clone.style.pointerEvents = "none";
  document.body.appendChild(clone);

  const deltaX = taretRectRect.left - sourceRect.left;
  const deltaY = taretRectRect.top - sourceRect.top;

  return flyTo(clone, deltaX, deltaY).onFinish(() => clone.remove());
};

export const flyToBasket = (sourceEl: HTMLElement) => {
  const basketIcon = document.getElementById("tabbar-basket-icon");

  if (!basketIcon) return;

  return flyToTarget(sourceEl, basketIcon);
};
