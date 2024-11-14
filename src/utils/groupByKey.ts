export const groupByKey = <T, K extends keyof T>(
  items: T[] | undefined,
  key: K
): Map<T[K], T[]> => {
  return (items || []).reduce((result, item) => {
    const keyValue = item[key];
    if (!result.has(keyValue)) {
      result.set(keyValue, []);
    }
    result.get(keyValue)?.push(item);
    return result;
  }, new Map<T[K], T[]>());
};
