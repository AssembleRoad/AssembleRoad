import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Terms = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8">
          <ArrowLeft className="mr-2" size={20} />
          {t('terms.back', "Retour à l'accueil")}
        </Link>
        
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold mb-8">{t('terms.title', 'Conditions Générales d\'Utilisation')}</h1>
          
          <section className="prose prose-lg">
            <p className="mb-4">
              {t(
                'terms.paragraphs.p1',
                "L'utilisation de ce site et de l'application Assemble Road est gratuite dans le cadre du test pilote."
              )}
            </p>
            
            <p className="mb-4">
              {t(
                'terms.paragraphs.p2',
                "L'utilisateur s'engage à ne pas reproduire, distribuer, modifier ou commercialiser les contenus, images, ou notices 3D sans l'accord écrit d'Assemble Road."
              )}
            </p>
            
            <p className="mb-4">
              {t(
                'terms.paragraphs.p3',
                "L'éditeur ne peut être tenu responsable en cas d'erreur ou de mauvaise utilisation du service."
              )}
            </p>
            
            <p className="mb-4">
              {t(
                'terms.paragraphs.p4',
                "Toute utilisation abusive entraînera l'exclusion du pilote."
              )}
            </p>
            
            <p className="font-semibold">
              {t(
                'terms.paragraphs.p5',
                'Copyright © Assemble Road {{year}} – Tous droits réservés.',
                { year: currentYear }
              )}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;