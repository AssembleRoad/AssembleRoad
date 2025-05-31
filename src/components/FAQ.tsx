import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqItems = [
    {
      question: "Combien ça coûte ?",
      answer: "Le pilote sur 2 références est gratuit ! Nous vous proposons d'essayer notre solution sans aucun engagement pour vous permettre d'évaluer son impact sur votre entreprise."
    },
    {
      question: "Faut-il un accès internet ?",
      answer: "Oui, pour télécharger les modèles 3D et donner votre avis. L'application nécessite une connexion internet pour charger les modèles lors de la première utilisation, mais ensuite les modèles peuvent être sauvegardés pour une utilisation hors ligne."
    },
    {
      question: "Combien de temps dure le test ?",
      answer: "4 semaines en moyenne. Cette période nous permet de collecter suffisamment de données pour vous fournir une analyse pertinente des retours clients et de l'impact sur votre service après-vente."
    },
    {
      question: "Comment les modèles 3D sont-ils créés ?",
      answer: "Nos experts modélisent vos meubles à partir des plans techniques que vous nous fournissez. Le processus est simple et nécessite peu d'implication de votre part."
    }
  ];

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section id="faq" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Questions fréquentes
          </h2>
          
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <button
                  className="w-full text-left p-6 focus:outline-none flex justify-between items-center"
                  onClick={() => toggleQuestion(index)}
                >
                  <span className="text-lg font-medium text-gray-900">{item.question}</span>
                  {openIndex === index ? (
                    <ChevronUp className="text-blue-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="text-gray-600 flex-shrink-0" />
                  )}
                </button>
                
                <div 
                  className={`px-6 pb-6 transition-all duration-300 ${
                    openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                  }`}
                >
                  <p className="text-gray-700">{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;