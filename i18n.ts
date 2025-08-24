// (root)/src/lib/i18n.ts
import { I18n } from "i18n-js";
import { getLocales } from "expo-localization";
import en from "./locales/en.json";
import it from "./locales/it.json";

export const deviceLanguage = getLocales()?.[0]?.languageCode ?? "en";

export const i18n = new I18n({
  en,
  it,
});

i18n.defaultLocale = deviceLanguage;

i18n.locale = deviceLanguage;
