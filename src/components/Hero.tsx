import React from 'react';
import PhoneMockup from './PhoneMockup';
import { ArrowDown } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="py-16 md:py-28 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Texte et boutons */}
          <div className="lg:w-1/2 lg:pr-12 z-10">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900 mb-4">
              Réinventez le montage de meubles avec <span className="text-blue-600">Assemble Road</span>
            </h1>
            
            <p className="text-lg text-gray-600 mb-6">
              L'application mobile qui transforme la notice papier en tutoriel 3D interactif.
              Fini les erreurs, le stress et les retours !
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              {/* Bouton Google Play */}
              <a
                href="#"
                className="flex items-center border border-gray-200 rounded-lg px-4 py-2 hover:bg-gray-100 transition-colors bg-white shadow-sm"
              >
                <img
                  src="play_store_2.png"
                  alt="Google Play"
                  className="h-6 w-auto mr-3"
                />
                <div className="text-left">
                  <p className="text-[10px] text-gray-500 leading-none">GET IT ON</p>
                  <p className="text-sm font-semibold text-gray-900 leading-none">Google Play</p>
                </div>
              </a>

              {/* Bouton App Store */}
              <a
                href="#"
                className="flex items-center border border-gray-200 rounded-lg px-4 py-2 hover:bg-gray-100 transition-colors bg-white shadow-sm"
              >
                <img
                  src="app_store_2.png"
                  alt="App Store"
                  className="h-6 w-auto mr-3"
                />
                <div className="text-left">
                  <p className="text-[10px] text-gray-500 leading-none">Download on the</p>
                  <p className="text-sm font-semibold text-gray-900 leading-none">App Store</p>
                </div>
              </a>
            </div>

            <div>
              <a 
                href="#how-it-works" 
                className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-300 font-medium"
              >
                Découvrir comment ça marche
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
