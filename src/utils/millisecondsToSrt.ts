export const convertMillisecondsToHoursAndMinutes = (milliseconds: number) => {
  const totalMinutes = milliseconds / (1000 * 60);

  const hours = Math.floor(totalMinutes / 60);
  const minutes = Math.floor(totalMinutes % 60);

  return { hours, minutes };
};

export const convertSecondsToMinutesAndSeconds = (initialSeconds: number) => {
  const minutes = Math.floor(initialSeconds / 60);
  const seconds = Math.floor(initialSeconds % 60);

  return { minutes, seconds };
};
