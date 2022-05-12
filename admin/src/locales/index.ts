import de from './de.json';
import en from './en.json';
import englishMessages from 'ra-language-english';
import germanMessages from 'ra-language-german';
import { merge } from 'lodash';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import { resolveBrowserLocale } from 'react-admin';

export default polyglotI18nProvider(
  locale =>
    locale === 'de' ? merge(germanMessages, de) : merge(englishMessages, en),
  localStorage.getItem('locale') || resolveBrowserLocale(),
  { allowMissing: true, onMissingKey: key => key },
);
