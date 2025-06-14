//import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Footer = () => {

  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-400 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Link to="/" className="text-white font-bold text-xl">
              Assemble Road
            </Link>
            <p className="mt-2">
              {t('footer.slogan', 'Réinventez le montage de meubles')}
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            <Link to="/mentions-legales" className="hover:text-white transition-colors duration-300">
              {t('footer.legal', 'Mentions légales')}
            </Link>
            <Link to="/confidentialite" className="hover:text-white transition-colors duration-300">
              {t('footer.privacy', 'Confidentialité')}
            </Link>
            <Link to="/cgu" className="hover:text-white transition-colors duration-300">
              {t('footer.terms', 'CGU')}
            </Link>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p>
            &copy; {currentYear} Assemble Road. {t('footer.rights', 'Tous droits réservés.')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;