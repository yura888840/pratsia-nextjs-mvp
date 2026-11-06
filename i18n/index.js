import uk from '../locales/uk.json' with { type: 'json' };
import { defaultLocale, formatLocales } from './config.js';

export { defaultLocale };
export const dictionaries = Object.freeze({ uk });
export const supportedLocales = Object.freeze(Object.keys(dictionaries));
export function resolveLocale(locale) {
  const language = String(locale || '').toLowerCase().split('-')[0];
  return Object.hasOwn(dictionaries, language) ? language : defaultLocale;
}

// Plain functions work in React, route handlers, metadata and Node tests.
// No mutable global locale: concurrent callers can use independent translators.
export function createTranslator(locale = defaultLocale, catalogs = dictionaries) {
  const messages = catalogs[locale] || catalogs[defaultLocale];
  const fallback = catalogs.uk || catalogs[defaultLocale];
  return function translate(key, values = {}) {
    const message = Object.hasOwn(messages, key) ? messages[key] : fallback?.[key];
    if (typeof message !== 'string') throw new Error(`Unknown translation token: ${key}`);
    return message.replace(/\{([a-zA-Z][a-zA-Z0-9_]*)\}/g, (placeholder, name) => {
      if (!Object.hasOwn(values, name)) throw new Error(`Missing translation parameter ${name} for ${key}`);
      return String(values[name]);
    });
  };
}
export const translate = createTranslator(defaultLocale);

// Legacy database/search values must never change when the UI locale changes.
// New persisted enums should use language-independent IDs instead.
export function catalogValue(key) {
  if (!Object.hasOwn(uk, key)) throw new Error(`Unknown catalog token: ${key}`);
  return uk[key];
}
const catalogKeys = new Map(Object.entries(uk).map(([key, value]) => [value, key]));
export function catalogLabel(value, locale = defaultLocale) {
  const key = catalogKeys.get(value);
  return key ? createTranslator(resolveLocale(locale))(key) : value;
}
export function formatNumber(value, locale = defaultLocale) {
  return new Intl.NumberFormat(formatLocales[resolveLocale(locale)] || locale).format(value);
}
export function formatDate(value, locale = defaultLocale, options) {
  return new Intl.DateTimeFormat(formatLocales[resolveLocale(locale)] || locale, options).format(new Date(value));
}
