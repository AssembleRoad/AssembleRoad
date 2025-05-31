import React from 'react';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
  return (
    <section id="hero" className="py-12 md:py-16">
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
            
            <div className="space-y-4 md:space-y-0 md:space-x-4 md:flex mb-6">
              <a 
                href="#" 
                className="flex items-center justify-center w-full md:w-auto transition-opacity hover:opacity-80"
              >
                <img 
                  src="/app-store-badge.png" 
                  alt="Download on the App Store" 
                  className="h-12"
                />
              </a>
              <a 
                href="#" 
                className="flex items-center justify-center w-full md:w-auto transition-opacity hover:opacity-80"
              >
                <img 
                  src="/google-play-badge.png" 
                  alt="Get it on Google Play" 
                  className="h-12"
                />
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
                    <div className="text-center p-8">
                      <div className="w-32 h-32 mx-auto bg-blue-100 rounded-xl mb-4 flex items-center justify-center">
                        <span className="text-blue-600 text-lg">Vue 3D interactive</span>
                      </div>
                      <p className="text-gray-600">Prévisualisation de l'application</p>
                    </div>
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