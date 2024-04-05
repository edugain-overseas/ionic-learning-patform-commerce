import { emailRegex } from "../constants/regExps";

export const validatePassword = (value: string) => {
  return value.length > 7;
};

export const validateEmail = (value: string) => {
  return emailRegex.test(value);
};

export const validateText = (value: string) => {
  return value.length > 0;
};

export const validateCode = (value: string) => {
  return value.length === 6;
};
