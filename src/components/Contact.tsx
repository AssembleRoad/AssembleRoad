//import React from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Contactez-nous
          </h2>
          <p className="text-xl text-gray-600">
            Vous avez des questions ou souhaitez mettre en place un pilote gratuit ? 
            Nous sommes là pour vous aider.
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 bg-gradient-to-br from-blue-600 to-green-600 p-6 md:p-10 text-white">
              <h3 className="text-2xl font-bold mb-6">Informations de contact</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <Mail className="mr-4 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Email</p>
                    <a 
                      href="mailto:assembleroad@gmail.com" 
                      className="hover:underline"
                    >
                      assembleroad@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="mr-4 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Adresse</p>
                    <p>Mons, Belgique</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="mr-4 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Téléphone</p>
                    <p>+32 497 82 85 56</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2 p-6 md:p-10">
              <a 
                href="mailto:assembleroad@gmail.com"
                className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg text-center transition-colors duration-300 mb-4"
              >
                Envoyer un email
              </a>
              
              <p className="text-gray-600 text-center">
                Nous vous répondrons dans les plus brefs délais.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;