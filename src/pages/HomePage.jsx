import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import TemplateCard from '../components/TemplateCard';
import { selectTemplate } from '../features/resumeSlice'; // Importez votre action

const templates = [
  { id: 1, image: '/templates/template1.png' },
  { id: 2, image: '/templates/template2.png' },
  { id: 3, image: '/templates/template3.png' },
];

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUseTemplate = (id) => {
    // Mettez à jour l'état du modèle sélectionné
    dispatch(selectTemplate(id));
    navigate(`/details/${id}`);
  };

  return (
    <div className="bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 min-h-screen p-6">
      <h1 className="text-center text-4xl sm:text-5xl font-bold text-gray-800 mb-8">
        Choisissez un modèle
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div
            key={template.id}
            className="transition-all transform hover:scale-105 hover:shadow-2xl rounded-lg overflow-hidden cursor-pointer"
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
