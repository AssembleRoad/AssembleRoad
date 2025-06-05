import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const LegalNotice = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8">
          <ArrowLeft className="mr-2" size={20} />
          Retour à l'accueil
        </Link>
        
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold mb-8">Mentions légales</h1>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Éditeur du site</h2>
            <p>Assemble Road</p>
            <p>Représentant : Anthony Moulin</p>
            <p>Contact : assembleroad@gmail.com</p>
            <p>Adresse : Belgique</p>
            <p>Numéro d'entreprise : En cours de création</p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4">Hébergement</h2>
            <p>Ce site est hébergé par GitHub Pages (github.com)</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default LegalNotice;