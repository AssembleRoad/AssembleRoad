//import React from 'react';
import { CheckCircle, TrendingUp, ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const ForBusinesses = () => {

  const { t } = useTranslation();

  const benefits = [
    {
      icon: <CheckCircle size={24} className="text-green-600" />,
      text: t('forBusinesses.benefits.satisfaction','Plus de satisfaction client, moins de retours SAV'),
    },
    {
      icon: <TrendingUp size={24} className="text-green-600" />,
      text: t('forBusinesses.benefits.marketing',"Un outil marketing innovant pour votre marque"),
    },
    {
      icon: <ShieldCheck size={24} className="text-green-600" />,
      text: t('forBusinesses.benefits.analysis','Analyse détaillée des retours clients pendant 4 semaines'),
    }
  ];

  return (
    <section id="for-businesses" className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-8 md:p-12 shadow-md">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {t(
                'forBusinesses.title',
                'Vous êtes un fabricant ou distributeur de meubles ?'
              )}
            </h2>
            <p className="text-xl text-gray-700 mb-8">
              {t(
                'forBusinesses.description',
                'Nous proposons de modéliser gratuitement 2 de vos références (1 simple et 1 complexe), fournissons des stickers QR à coller sur les boîtes, et analysons les retours clients pendant 4 semaines.'
              )}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start p-4 bg-white rounded-lg shadow-sm">
                <div className="flex-shrink-0 mr-4">
                  {benefit.icon}
                </div>
                <p className="text-gray-700">{benefit.text}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <a 
              href="#contact" 
              className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            >
              {t(
                'forBusinesses.cta',
                'Contactez-nous pour un pilote gratuit'
              )}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForBusinesses;