import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Privacy = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8">
          <ArrowLeft className="mr-2" size={20} />
          {t('privacy.back', "Retour à l'accueil")}
        </Link>
        
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold mb-8">{t('privacy.title', 'Politique de confidentialité')}</h1>
          
          <section className="prose prose-lg">
            <p className="mb-4">
              {t(
                'privacy.paragraphs.p1',
                "Ce site ne collecte aucune donnée personnelle à votre insu."
              )}
            </p>
            
            <p className="mb-4">
              {t(
                'privacy.paragraphs.p2',
                "Si vous contactez Assemble Road par e-mail, votre adresse ne sera utilisée que pour répondre à votre demande et ne sera jamais cédée à des tiers."
              )}
            </p>
            
            <p className="mb-4">
              {t(
                'privacy.paragraphs.p3',
                "Aucune donnée n'est utilisée à des fins commerciales sans votre accord."
              )}
            </p>
            
            <p>
              {t(
                'privacy.paragraphs.p4',
                "Pour toute question ou demande de modification/suppression, contactez "
              )} <a href="mailto:assembleroad@gmail.com" className="text-blue-600 hover:text-blue-800">
                assembleroad@gmail.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;