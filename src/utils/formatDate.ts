import dayjs from "dayjs";

export const getFormattedStrFromDate = (date: string, format = "YYYY.MM.DD") =>
  dayjs(date).format(format);
