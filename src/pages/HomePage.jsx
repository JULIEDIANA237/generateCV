import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick'; // Pour le carrousel
import TemplateCard from '../components/TemplateCard';
import { selectTemplate } from '../features/resumeSlice'; // Importez votre action
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const templates = [
  { id: 1, image: '/templates/template1.png' },
  { id: 2, image: '/templates/template2.png' },
  { id: 3, image: '/templates/template3.png' },
];

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUseTemplate = (id) => {
    dispatch(selectTemplate(id)); // Mettez à jour l'état du modèle sélectionné
   // navigate(`/details/${id}`);
      navigate(`/import/${id}`);
  };

  // Configuration du slider pour mobile
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 min-h-screen p-6">
      {/* Titre principal */}
      <h1 className="text-center text-3xl sm:text-5xl font-bold text-gray-800 mb-8">
        Choisissez un modèle
      </h1>

      {/* Slider pour mobile */}
      <div className="block sm:hidden">
        <Slider {...sliderSettings}>
          {templates.map((template) => (
            <div
              key={template.id}
              className="transition-all transform hover:scale-105 hover:shadow-2xl rounded-lg overflow-hidden cursor-pointer"
              onClick={() => handleUseTemplate(template.id)}
            >
              <TemplateCard image={template.image} />
            </div>
          ))}
        </Slider>
      </div>

      {/* Grille pour les écrans plus grands */}
      <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div
            key={template.id}
            className="transition-all transform hover:scale-105   overflow-hidden cursor-pointer"
            onClick={() => handleUseTemplate(template.id)}
          >
            <TemplateCard image={template.image} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
