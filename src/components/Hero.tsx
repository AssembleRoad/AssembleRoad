import React from 'react';
import PhoneMockup from './PhoneMockup';
import { ArrowDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Hero: React.FC = () => {
  const { t } = useTranslation();

  // Fonction de redirection vers le Play Store (Android)
  const openPlayStore = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    // On essaie d’abord le deep link
    window.location.href = 'market://details?id=com.assemble.road';
    // Après 500 ms, si l’utilisateur n’a pas basculé vers l’app, on le redirige vers la page web
    setTimeout(() => {
      window.location.href = 'https://play.google.com/store'; //'https://play.google.com/store/apps/details?id=com.assemble.road';
    }, 500);
  };

  // Fonction de redirection vers l’App Store (iOS)
  const openAppStore = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    // On essaie d’abord le deep link iOS
    window.location.href = 'itms-apps://itunes.apple.com/app/id1234567890';
    // Après 500 ms, si l’utilisateur n’a pas basculé vers l’app, on le redirige vers la page web
    setTimeout(() => {
      window.location.href = 'https://www.apple.com/app-store/';//'https://apps.apple.com/fr/app/assemble-road/id1234567890';
    }, 500);
  };

  return (
    <section id="hero" className="py-16 md:py-28 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Texte et boutons */}
          <div className="lg:w-1/2 lg:pr-12 z-10">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900 mb-4">
              {t('hero.title', 'Réinventez le montage de meubles avec ')}
              <span className="text-blue-600">Assemble Road</span>
            </h1>
            
            <p className="text-lg text-gray-600 mb-6">
              { t('hero.subtitle', "L'application mobile qui transforme la notice papier en tutoriel 3D interactif. Fini les erreurs, le stress et les retours !") }
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              {/* Bouton Google Play */}
              <a
                href="#"
                onClick={openPlayStore}
                className="flex items-center border border-gray-200 rounded-lg px-4 py-2 hover:bg-gray-100 transition-colors bg-white shadow-sm"
              >
                <img
                  src="play_store_2.png"
                  alt="Google Play"
                  className="h-6 w-auto mr-3"
                />
                <div className="text-left">
                  <p className="text-[10px] text-gray-500 leading-none">{t('hero.googleplay_1', 'Disponible sur')}</p>
                  <p className="text-sm font-semibold text-gray-900 leading-none">{t('hero.googleplay_2', 'Google Play')}</p>
                </div>
              </a>

              {/* Bouton App Store */}
              <a
                href="#"
                onClick={openAppStore}
                className="flex items-center border border-gray-200 rounded-lg px-4 py-2 hover:bg-gray-100 transition-colors bg-white shadow-sm"
              >
                <img
                  src="app_store_2.png"
                  alt="App Store"
                  className="h-6 w-auto mr-3"
                />
                <div className="text-left">
                  <p className="text-[10px] text-gray-500 leading-none">{t('hero.appstore', 'Télécharger dans')}</p>
                  <p className="text-sm font-semibold text-gray-900 leading-none">{t('hero.appstore_2', "l'App Store")}</p>
                </div>
              </a>
            </div>

            <div>
              <a 
                href="#how-it-works" 
                className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-300 font-medium"
              >
                {t('hero.discoverHow', 'Découvrir comment ça marche')}
                <ArrowDown size={20} className="ml-2 animate-bounce" />
              </a>
            </div>
          </div>
          
          {/* Aperçu dans le téléphone agrandi */}
          <div className="lg:w-1/2 relative">
            <div className="mx-auto max-w-[380px] drop-shadow-xl">
              <PhoneMockup />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
