import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const LanguageSelector = () => {
  const { i18n, t } = useTranslation();

  const languages = [
    { code: 'fr', name: 'Français' },
    { code: 'nl', name: 'Nederlands' },
    { code: 'en', name: 'English' }
  ];

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
  };

  return (
    <div className="relative inline-block">
      <div className="flex items-center gap-2">
        <Globe size={20} className="text-gray-600" />
        <select
          value={i18n.language}
          onChange={(e) => handleLanguageChange(e.target.value)}
          className="hidden 
            md:inline-flex 
            appearance-none 
            bg-transparent 
            border-none 
            text-gray-700 
            py-1 
            pl-2 
            pr-8 
            rounded 
            leading-tight 
            focus:outline-none"
          aria-label={t('languageSelector.label')}
        >
          {languages.map((language) => (
            <option key={language.code} value={language.code}>
              {language.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default LanguageSelector;