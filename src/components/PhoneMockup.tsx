// PhoneMockup.tsx
import React from 'react';
import HeroPreview from './HeroPreview';

const PhoneMockup: React.FC = () => {
  return (
    <div className="relative">
      {/* Cadre du téléphone */}
      <div className="w-[280px] md:w-[320px] h-[570px] md:h-[650px] bg-black rounded-[40px] p-3 shadow-xl relative overflow-hidden">
        
        {/* Encoche (frame) */}
        {/*<div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[100px] h-[30px] bg-black rounded-b-[20px] z-10" />*/}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-7 bg-black rounded-b-3xl z-20"></div>

        {/* Écran blanc arrondi sous le cadre [#1976d2]*/}
        <div className="w-full h-full bg-white rounded-[32px] overflow-hidden relative">
          {/* On place directement HeroPreview, qui contient barre de statut + contenu  absolute top-[30px] top-4 bottom-4 left-4 right-4 bg-white rounded-[30px] overflow-hidden*/}
          <HeroPreview />
        </div>
      </div>

      {/* Ombre diffuse pour l’effet de profondeur */}
      {/*<div className="absolute top-6 -right-6 w-60 h-60 bg-gray-900/10 rounded-full blur-3xl -z-10" />*/}
      <div className="absolute top-10 -right-10 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-blue-600/20 rounded-full blur-2xl -z-10"></div>
    </div>
  );
};

export default PhoneMockup;
