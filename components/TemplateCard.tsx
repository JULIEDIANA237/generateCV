import React from 'react';

interface TemplateCardProps {
  image: string;
  onClick: () => void;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ image, onClick }) => {
  return (
    <div className="relative group border rounded shadow-lg">
      <img src={image} alt="Template" className="w-full h-48 object-cover" />
      <button
        onClick={onClick}
        className="absolute inset-0 bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 flex justify-center items-center text-lg font-semibold"
      >
        Utiliser le modèle
      </button>
    </div>
  );
};

export default TemplateCard;
