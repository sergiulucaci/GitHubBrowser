import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    // eslint-disable-next-line global-require
    translation: require('./en.json'),
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });
