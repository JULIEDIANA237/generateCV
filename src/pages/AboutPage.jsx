import React from 'react';
import { FaCheckCircle } from 'react-icons/fa'; // Utilisation d'icônes pour les points de liste

const AboutPage = () => {
  return (
    <div className="bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 p-6 sm:p-8 lg:p-10 rounded-lg shadow-lg">
      <h1 className="text-4xl sm:text-5xl font-bold text-center mb-6 text-gray-800">
        À propos de <span className="text-indigo-600">Resume Builder</span>
      </h1>
      <p className="text-lg sm:text-xl text-justify mb-6 text-gray-700 leading-relaxed">
        <span className="font-semibold text-indigo-600">Resume Builder</span> est une application conçue pour vous aider à créer des CV professionnels de manière simple et efficace. 
        Avec une interface conviviale, vous pouvez sélectionner un modèle, personnaliser vos informations et télécharger votre CV en quelques clics.
      </p>
      
      <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-800">
        Fonctionnalités principales :
      </h2>
      
      <ul className="list-disc list-inside space-y-4 text-lg sm:text-xl text-gray-700">
        <li className="flex items-center">
          <FaCheckCircle className="text-green-500 mr-3" />
          Choisissez parmi plusieurs modèles professionnels.
        </li>
        <li className="flex items-center">
          <FaCheckCircle className="text-green-500 mr-3" />
          Personnalisez facilement vos informations.
        </li>
        <li className="flex items-center">
          <FaCheckCircle className="text-green-500 mr-3" />
          Générez votre CV en PDF ou imprimez-le directement.
        </li>
        <li className="flex items-center">
          <FaCheckCircle className="text-green-500 mr-3" />
          Interface intuitive adaptée à tous les utilisateurs.
        </li>
      </ul>

      <p className="mt-6 text-lg sm:text-xl text-gray-700 leading-relaxed">
        <span className="font-semibold text-indigo-600">Resume Builder</span> vise à simplifier la création de CV pour aider les utilisateurs à se concentrer sur ce qui compte le plus : 
        présenter leurs compétences et expériences de manière professionnelle.
      </p>
    </div>
  );
};

export default AboutPage;
