import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { en, fr, nl } from './translations';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      fr: { translation: fr },
      nl: { translation: nl }
    },
    fallbackLng: 'en',
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    },
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;

/*<div className="text-center p-8">
                      <div className="w-32 h-32 mx-auto bg-blue-100 rounded-xl mb-4 flex items-center justify-center">
                        <span className="text-blue-600 text-lg">Vue 3D interactive</span>
                      </div>
                      <p className="text-gray-600">Prévisualisation de l'application</p>
                    </div>*/