import { useEffect, useRef } from "react";

export const useObserver = <T extends HTMLElement>(
  isEnabled: boolean,
  callback: IntersectionObserverCallback,
  options: IntersectionObserverInit
) => {
  const targetRef = useRef<T | null>(null);

  useEffect(() => {
    if (!isEnabled) return;

    const observer = new IntersectionObserver(callback, options);
    const target = targetRef.current;

    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) {
        observer.unobserve(target);
      }
      observer.disconnect();
    };
  }, [isEnabled, callback, options]);

  return targetRef;
};
