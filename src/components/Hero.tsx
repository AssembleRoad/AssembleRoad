import React from 'react';
import HeroPreview from './HeroPreview';

import { ArrowDown } from 'lucide-react';

const Hero = () => {
  return (
    <section id="hero" className="py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="lg:w-1/2 lg:pr-12">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900 mb-4">
              Réinventez le montage de meubles avec <span className="text-blue-600">Assemble Road</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-6">
              L'application mobile qui transforme la notice papier en tutoriel 3D interactif. 
              Fini les erreurs, le stress et les retours !
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              {/* Bouton Google Play */}
              <a
                href="#"
                className="flex items-center border border-gray-200 rounded-lg px-4 py-2 hover:bg-gray-100 transition-colors"
              >
                {/* Icône Google Play */}
                <img
                  src="play_store_2.png"
                  alt="Google Play"
                  className="h-6 w-auto mr-3"
                />
                <div className="text-left">
                  <p className="text-[10px] text-gray-500 leading-none">GET IN ON</p>
                  <p className="text-sm font-semibold text-gray-900 leading-none">Google Play</p>
                </div>
              </a>

              {/* Bouton App Store */}
              <a
                href="#"
                className="flex items-center border border-gray-200 rounded-lg px-4 py-2 hover:bg-gray-100 transition-colors"
              >
                {/* Icône App Store */}
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
                className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-300"
              >
                Découvrir comment ça marche
                <ArrowDown size={18} className="ml-2 animate-bounce" />
              </a>
            </div>
          </div>
          
          <div className="lg:w-1/2">
            <div className="relative max-w-md mx-auto">
              <div className="bg-gradient-to-br from-blue-100 to-green-100 rounded-3xl p-4 shadow-lg">
                <div className="bg-white rounded-2xl overflow-hidden shadow-md">
                  <div className="aspect-[9/16] bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
                    <HeroPreview/>
                  </div>
                </div>

              </div>
              
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-green-100 rounded-full opacity-50 z-0"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-blue-100 rounded-full opacity-50 z-0"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;