export const debounce = (
  func: (...args: any[]) => void,
  delay: number,
  immediate = false
) => {
  let timer: ReturnType<typeof setTimeout> | null = null;

  return function (...args: any[]) {
    const callNow = immediate && !timer;
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      timer = null;
      if (!immediate) func(...args);
    }, delay);

    if (callNow) func(...args);
  };
};
