import countries from "i18n-iso-countries";
import en from "i18n-iso-countries/langs/en.json";

countries.registerLocale(en);

export type Country = {
  code?: string;
  name: string;
};

export const getCountries = (): Country[] =>
  Object.entries(countries.getNames("en", { select: "official" })).map(
    ([code, name]) => ({ code: countries.toAlpha3(code), name })
  );

export const getCountryByCode = (code: string): string | undefined =>
  countries.getName(code, "en", { select: "official" });
