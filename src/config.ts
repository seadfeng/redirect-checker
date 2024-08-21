
const locales = ['en', 'es', 'de_DE', 'fr', 'it', 'nl', 'pl', 'pt', 'sv', 'tr', 'ru', 'zh', 'ja', "ko"] as const;
const defaultLocale = "en" as const;

export type LocaleType = typeof locales[number];

export const appConfig = {
  appDomain: "redirectchecker.org",
  appRootDomain: "redirectchecker.org",
  appName: "RedirectChecker",
  appDescription: "Redirectchecker",
  gaId: process.env.NEXT_PUBLIC_GA_ID,
  // change to your pages.dev domain: eg., https://redirectcheck.pages.dev
  // this is for i18n markdown: public/content/components
  origin: process.env.NODE_ENV === "development" ? "http://127.0.0.1:3000" : "https://redirectcheck.pages.dev",
  i18n: {
    locales,
    defaultLocale,
    labels: {
      "de_DE": "Deutsch",
      "en": "English",
      "es": "Español",
      "fr": "Français",
      "it": "Italian",
      "pt": "Português",
      "nl": "Nederlands",
      "pl": "Polski",
      "sv": "Svenska",
      "tr": "Türkçe",
      "ru": "Русский",
      "ja": "日本語",
      "zh": "中文",
      "ko": "한국어"
    } as Record<LocaleType, string>
  }
}