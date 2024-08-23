
const locales = ['en', 'es', 'de_DE', 'fr', 'it', 'nl', 'pl', 'pt', 'sv', 'tr', 'ru', 'zh', 'ja', "ko"] as const;
const defaultLocale = "en" as const;

export type LocaleType = typeof locales[number];

export const appConfig = {
  appDomain: "redirectchecker.org",
  appRootDomain: "redirectchecker.org",
  appName: "RedirectChecker",
  appDescription: "Redirectchecker",
  gaId: process.env.NEXT_PUBLIC_GA_ID || "G-47B80TJTLX",
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