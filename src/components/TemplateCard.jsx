import React from 'react';

const TemplateCard = ({ image, onClick }) => {
  return (
    <div className="relative group inline-block max-w-xs transition-transform transform hover:scale-105">
  {/* Image avec bordure, arrondi et taille réduite */}
  <img 
    src={image} 
    alt="Template" 
    className="w-full border-2 border-gray-300 shadow-md h-auto block"
  />

  {/* Overlay centré avec texte adapté */}
  <button
    onClick={onClick}
    className="absolute inset-0 bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 flex justify-center items-center text-base font-semibold transition-opacity rounded-lg"
  >
    <span className="border border-white bg-green-700 px-3 py-1 rounded-md">
      Utiliser ce modèle
    </span>
  </button>
</div>


  );
};

export default TemplateCard;
