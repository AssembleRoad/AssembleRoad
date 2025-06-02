import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { name: t('upbar.title_1'), href: '#hero' },
    { name: t('upbar.title_2'), href: '#how-it-works' },
    { name: t('upbar.title_3'), href: '#for-businesses' },
    { name: t('upbar.title_4'), href: '#faq' },
    { name: t('upbar.title_5'), href: '#contact' }
  ];

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <a href="#" className="text-blue-600 font-bold text-xl flex items-center">
              <span className="ml-2">Assemble Road</span>
            </a>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link, index) => (
              <a 
                key={index}
                href={link.href}
                className="text-gray-700 hover:text-blue-600 transition-colors duration-300"
              >
                {link.name}
              </a>
            ))}
            <LanguageSelector />
          </div>

          <div className="md:hidden flex items-center gap-4">
            <LanguageSelector />
            <button 
              onClick={toggleMenu}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden absolute left-0 right-0 bg-white shadow-md mt-2 py-2 px-4">
            {navLinks.map((link, index) => (
              <a 
                key={index}
                href={link.href}
                className="block py-2 text-gray-700 hover:text-blue-600 transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;