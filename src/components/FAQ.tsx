import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const FAQ = () => {

  const { t } = useTranslation();

  const [openIndex, setOpenIndex] = useState(0);

   const faqItems = [
    { qKey: 'faq.questions.cost.q',   aKey: 'faq.questions.cost.a' },
    { qKey: 'faq.questions.internet.q', aKey: 'faq.questions.internet.a' },
    { qKey: 'faq.questions.duration.q', aKey: 'faq.questions.duration.a' },
    { qKey: 'faq.questions.models.q',   aKey: 'faq.questions.models.a' },
  ];

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section id="faq" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            {t('faq.title', 'Questions fréquentes')}
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
                  <span className="text-lg font-medium text-gray-900">{t(item.qKey, '…')}</span>
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
                  <p className="text-gray-700">{t(item.aKey, '…')}</p>
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