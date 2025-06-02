// LanguageSelector.tsx

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

interface LanguageSelectorProps {
  variant?: 'full' | 'iconOnly';
}

const LanguageSelector = ({ variant = 'full' }: LanguageSelectorProps) => {
  const { i18n, t } = useTranslation();

  const languages = [
    { code: 'fr', name: 'Français' },
    { code: 'nl', name: 'Nederlands' },
    { code: 'en', name: 'English' }
  ];

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
  };

  if (variant === 'iconOnly') {
    return (
      <div className="relative w-5 h-5"> {/* Conteneur dimensionné pour l'icône (20px) */}
        <Globe size={20} className="text-gray-600" aria-hidden="true" />
        <select
          value={i18n.language}
          onChange={(e) => handleLanguageChange(e.target.value)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          aria-label={t('languageSelector.label', 'Changer de langue')} // Fournir un fallback ou s'assurer que la clé existe
        >
          {languages.map((language) => (
            <option key={language.code} value={language.code}>
              {language.name}
            </option>
          ))}
        </select>
      </div>
    );
  }

  // Variante 'full' (comportement original)
  return (
    <div className="relative inline-block">
      <div className="flex items-center gap-2">
        <Globe size={20} className="text-gray-600" aria-hidden="true" />
        <select
          value={i18n.language}
          onChange={(e) => handleLanguageChange(e.target.value)}
          className="appearance-none bg-transparent border-none text-gray-700 py-1 pl-2 pr-8 rounded leading-tight focus:outline-none"
          aria-label={t('languageSelector.label', 'Changer de langue')} // Fournir un fallback ou s'assurer que la clé existe
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