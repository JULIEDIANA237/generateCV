import React, { forwardRef } from 'react';
import Template1 from '../components/templates/Template1';
import Template2 from '../components/templates/Template2';
import Template3 from '../components/templates/Template3';
import { useSelector } from 'react-redux';

const ResumePreview = forwardRef((props, ref) => {
  const selectedTemplate = useSelector((state) => state.resume.selectedTemplate);
  const resumeData = useSelector((state) => state.resume); // Récupérer les données du store Redux

  // Vérifiez que les données sont disponibles avant de rendre Template1
  const isDataValid =
    resumeData.personalInfo &&
    resumeData.experiences &&
    resumeData.education &&
    resumeData.skills &&
    resumeData.languages &&
    resumeData.interests;

  const renderTemplate = () => {
    if (!selectedTemplate) {
      return <p className="text-center text-gray-500">Aucun modèle sélectionné.</p>;
    }

    // Si les données ne sont pas valides, afficher un message d'erreur
    if (!isDataValid) {
      return (
        <p className="text-center text-red-500">
          Les données nécessaires pour générer le CV ne sont pas disponibles.
        </p>
      );
    }

    switch (selectedTemplate) {
      case 1: // Template1
        return <Template1 {...resumeData} />;
      case 2: // Template2
        return <Template2 {...resumeData} />;
      case 3: // Template3
        return <Template3 {...resumeData} />;
      default:
        return <p className="text-center text-gray-500">Modèle sélectionné invalide.</p>;
    }
  };

  return (
    <div
      ref={ref}
      className="max-w-4xl mx-auto p-4 sm:p-6 bg-white shadow-lg rounded-md overflow-hidden"
    >
      {renderTemplate()}
    </div>
  );
});

export default ResumePreview;
