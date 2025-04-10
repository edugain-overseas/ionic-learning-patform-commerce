export const minutesToSeconds = (minutes: number) => {
  return minutes * 60;
};

export const secondsToMinutes = (seconds: number) => {
  return Math.ceil(seconds / 60);
};
