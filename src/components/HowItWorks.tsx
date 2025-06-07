//import React from 'react';
import { QrCode, Smartphone, Gift } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const HowItWorks = () => {

  const { t } = useTranslation();

  const steps = [
    {
      icon: <QrCode size={48} className="text-blue-600" />,
      title: t('howItWorks.steps.scan.title', "Scannez le QR code"),
      description: t('howItWorks.steps.scan.description', "Scannez simplement le QR code présent sur la boîte de votre meuble.")
    },
    {
      icon: <Smartphone size={48} className="text-blue-600" />,
      title: t('howItWorks.steps.follow.title', "Suivez le guide 3D"),
      description: t('howItWorks.steps.follow.description', "Suivez chaque étape de montage en 3D interactive sur votre smartphone.")
    },
    {
      icon: <Gift size={48} className="text-blue-600" />,
      title: t('howItWorks.steps.review.title', "Donnez votre avis"),
      description: t('howItWorks.steps.review.description', "Partagez votre expérience en 2 minutes et tentez de gagner une carte cadeau de 50€.")
    }
  ];

  return (
    <section id="how-it-works" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('howItWorks.title', 'Comment ça marche ?')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t(
              'howItWorks.subtitle',
              'Une expérience simple et intuitive pour vous aider à monter vos meubles sans stress.'
            )}
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
              
              
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="relative mx-auto max-w-4xl overflow-hidden rounded-xl shadow-lg">
            <div className="aspect-video bg-gray-200 flex items-center justify-center">
              <div className="text-center">
                <p className="text-gray-600 mb-4">{t('howItWorks.demoLabel', 'Vidéo de démonstration')}</p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-300">
                  {t('howItWorks.demoButton', 'Voir la démo')}
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