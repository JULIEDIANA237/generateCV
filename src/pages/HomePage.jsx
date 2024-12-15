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
    <div>
      <h1 className="text-center text-3xl my-6 font-bold">Choisissez un modèle</h1>
      {/* Grid responsive pour 3 templates par ligne */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
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
