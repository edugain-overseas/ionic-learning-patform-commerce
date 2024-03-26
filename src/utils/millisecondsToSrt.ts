export const convertMillisecondsToHoursAndMinutes = (milliseconds: number) => {
  const totalMinutes = milliseconds / (1000 * 60);

  const hours = Math.floor(totalMinutes / 60);
  const minutes = Math.floor(totalMinutes % 60);

  return { hours, minutes };
};
