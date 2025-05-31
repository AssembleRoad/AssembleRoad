import React from 'react';
import { QrCode, Smartphone, Gift } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: <QrCode size={48} className="text-blue-600" />,
      title: "Scannez le QR code",
      description: "Scannez simplement le QR code présent sur la boîte de votre meuble."
    },
    {
      icon: <Smartphone size={48} className="text-blue-600" />,
      title: "Suivez le guide 3D",
      description: "Suivez chaque étape de montage en 3D interactive sur votre smartphone."
    },
    {
      icon: <Gift size={48} className="text-blue-600" />,
      title: "Donnez votre avis",
      description: "Partagez votre expérience en 2 minutes et tentez de gagner une carte cadeau de 50€."
    }
  ];

  return (
    <section id="how-it-works" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Comment ça marche ?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Une expérience simple et intuitive pour vous aider à monter vos meubles sans stress.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow duration-300 text-center"
            >
              <div className="mb-6 flex justify-center">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                {step.title}
              </h3>
              <p className="text-gray-600">
                {step.description}
              </p>
              
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600">→</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="relative mx-auto max-w-4xl overflow-hidden rounded-xl shadow-lg">
            <div className="aspect-video bg-gray-200 flex items-center justify-center">
              <div className="text-center">
                <p className="text-gray-600 mb-4">Vidéo de démonstration</p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-300">
                  Voir la démo
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;