import React from 'react';

const TemplateCard = ({ image, onClick }) => {
  return (
    <div className="relative group border rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105">
      {/* Image responsive avec object-contain pour afficher l'image entière et agrandir la taille */}
      <img 
        src={image} 
        alt="Template" 
        className="w-full h-64 md:h-80 lg:h-96 object-contain"
      />
      {/* Overlay avec texte */}
      <button
        onClick={onClick}
        className="absolute inset-0 bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 flex justify-center items-center text-lg font-semibold transition-opacity"
      >
        Utiliser le modèle
      </button>
    </div>
  );
};

export default TemplateCard;
