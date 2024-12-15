import React from 'react';
import TemplateCard from '../components/TemplateCard';
import { useNavigate } from 'react-router-dom';

const templates = [
  { id: 1, image: '/templates/template1.png' },
  { id: 2, image: '/templates/template2.png' },
  { id: 3, image: '/templates/template3.png' },
  { id: 4, image: '/templates/template4.png' },
];

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleUseTemplate = (id: number) => {
    navigate(`/details/${id}`);
  };

  return (
    <div>
      <h1 className="text-center text-3xl my-6 font-bold">Choisissez un modèle</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4">
        {templates.map((template) => (
          <TemplateCard
            key={template.id}
            image={template.image}
            onClick={() => handleUseTemplate(template.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
