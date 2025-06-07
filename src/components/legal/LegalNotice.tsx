import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const LegalNotice = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8">
          <ArrowLeft className="mr-2" size={20} />
          {t('legalNotice.back', "Retour à l'accueil")}
        </Link>
        
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold mb-8">{t('legalNotice.title', 'Mentions légales')}</h1>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">{t('legalNotice.sections.editor.title', 'Éditeur du site')}</h2>
            <p>{t('legalNotice.sections.editor.name', 'Assemble Road')}</p>
            <p>{t(
                'legalNotice.sections.editor.representative',
                'Représentant : Anthony Moulin, Cédric Delaite'
              )}</p>
            <p>{t(
                'legalNotice.sections.editor.contact',
                'Contact : assembleroad@gmail.com'
              )}</p>
            <p>{t(
                'legalNotice.sections.editor.address',
                'Adresse : Belgique'
              )}</p>
            <p>{t(
                'legalNotice.sections.editor.companyNumber',
                "Numéro d'entreprise : En cours de création"
              )}</p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4">{t('legalNotice.sections.hosting.title', 'Hébergement')}</h2>
            <p>{t(
                'legalNotice.sections.hosting.text',
                'Ce site est hébergé par GitHub Pages (github.com)'
              )}</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default LegalNotice;