export const minutesToSeconds = (minutes: number) => {
  return minutes * 60;
};

export const secondsToMinutes = (seconds: number) => {
  return Math.ceil(seconds / 60);
};

export const hoursFloatToHoursAndMinutes = (decimal?: number) => {
  if (!decimal) return { hours: 0, minutes: 0 };

  const hours = Math.floor(decimal);
  const minutes = Math.round((decimal - hours) * 60);

  return { hours, minutes };
};
