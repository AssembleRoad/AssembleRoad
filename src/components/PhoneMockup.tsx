// PhoneMockup.tsx
import React from 'react';
import HeroPreview from './HeroPreview';

const PhoneMockup: React.FC = () => {
  return (
    <div className="relative">
      {/* Cadre du téléphone */}
      <div className="w-[340px] md:w-[380px] h-[580px] md:h-[650px] bg-black rounded-[40px] relative overflow-hidden">
        
        {/* Encoche (frame) */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[100px] h-[30px] bg-black rounded-b-[20px] z-10" />

        {/* Écran blanc arrondi sous le cadre */}
        <div className="absolute top-[30px] top-4 bottom-4 left-4 right-4 bg-black rounded-[30px] overflow-hidden">
          {/* On place directement HeroPreview, qui contient barre de statut + contenu */}
          <HeroPreview />
        </div>
      </div>

      {/* Ombre diffuse pour l’effet de profondeur */}
      <div className="absolute top-6 -right-6 w-60 h-60 bg-gray-900/10 rounded-full blur-3xl -z-10" />
    </div>
  );
};

export default PhoneMockup;
