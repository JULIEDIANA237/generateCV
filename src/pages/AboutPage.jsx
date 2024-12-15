import React from 'react';

const AboutPage = () => {
  return (
    <div className="p-6 sm:p-8 lg:p-10">
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6">
        À propos de Resume Builder
      </h1>
      <p className="text-lg sm:text-xl text-justify mb-6">
        Resume Builder est une application conçue pour vous aider à créer des CV professionnels de manière simple et efficace. Avec une interface conviviale, vous pouvez sélectionner un modèle, personnaliser vos informations et télécharger votre CV en quelques clics.
      </p>
      <h2 className="text-2xl sm:text-3xl font-bold mb-4">Fonctionnalités principales :</h2>
      <ul className="list-disc list-inside space-y-3 text-lg sm:text-xl">
        <li>Choisissez parmi plusieurs modèles professionnels.</li>
        <li>Personnalisez facilement vos informations.</li>
        <li>Générez votre CV en PDF ou imprimez-le directement.</li>
        <li>Interface intuitive adaptée à tous les utilisateurs.</li>
      </ul>
      <p className="mt-6 text-lg sm:text-xl">
        Resume Builder vise à simplifier la création de CV pour aider les utilisateurs à se concentrer sur ce qui compte le plus : présenter leurs compétences et expériences de manière professionnelle.
      </p>
    </div>
  );
};

export default AboutPage;
