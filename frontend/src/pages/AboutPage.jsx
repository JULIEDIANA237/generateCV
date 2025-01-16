import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 lg:p-10">
  {/* Header Section */}
  <div className="text-center mb-8">
    <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-800 mb-3">
      Bienvenue sur <span className="text-indigo-600">Resume Builder</span>
    </h1>
    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
      Transformez vos compétences et expériences en un CV professionnel 
      <br className="hidden sm:block" />
      en quelques clics. Simple, rapide et efficace !
    </p>
  </div>

  {/* Features Section */}
  <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-lg max-w-4xl">
    <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center text-gray-800">
      Pourquoi choisir <span className="text-indigo-600">Resume Builder</span> ?
    </h2>
    <ul className="space-y-4 text-base sm:text-lg text-gray-700">
      <li className="flex items-start">
        <FaCheckCircle className="text-green-500 mr-3 mt-1" />
        <span>Des modèles modernes et élégants pour un impact immédiat.</span>
      </li>
      <li className="flex items-start">
        <FaCheckCircle className="text-green-500 mr-3 mt-1" />
        <span>Personnalisation simple et intuitive de vos informations.</span>
      </li>
      <li className="flex items-start">
        <FaCheckCircle className="text-green-500 mr-3 mt-1" />
        <span>Exportation facile en PDF, prête pour l'impression ou l'envoi.</span>
      </li>
      <li className="flex items-start">
        <FaCheckCircle className="text-green-500 mr-3 mt-1" />
        <span>Un guide étape par étape pour un CV impeccable.</span>
      </li>
    </ul>
  </div>

  {/* Call-to-Action Section */}
  <div className="mt-8 text-center">
    <p className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
      Prêt à donner un coup de pouce à votre carrière ?
    </p>
    <button
      onClick={() => navigate('/modele')}
      className="px-5 py-2 text-sm sm:px-7 sm:py-3 sm:text-base font-bold text-white bg-indigo-600 rounded-lg shadow-lg hover:bg-indigo-700 transition duration-300"
    >
      Créez votre CV maintenant
    </button>
  </div>
</div>

  );
};

export default AboutPage;
