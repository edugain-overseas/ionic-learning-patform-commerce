export const throttle = (func: Function, limit: number) => {
  let lastCall = 0;
  return (...args: any[]) => {
    const now = new Date().getTime();
    if (now - lastCall >= limit) {
      lastCall = now;
      return func(...args);
    }
  };
};
