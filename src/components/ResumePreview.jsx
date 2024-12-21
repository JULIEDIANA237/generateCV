import React, { forwardRef } from 'react';
import Template1 from '../components/templates/Template1';
import Template2 from '../components/templates/Template2';
import Template3 from '../components/templates/Template3';
import { useSelector } from 'react-redux';

const ResumePreview = forwardRef((props, ref) => {
  const selectedTemplate = useSelector((state) => state.resume.selectedTemplate);
  const resumeData = useSelector((state) => state.resume); // Récupérer les données du store Redux

  // Vérifiez que les données sont disponibles
  const isDataValid =
    resumeData.personalInfo &&
    resumeData.experiences &&
    resumeData.education &&
    resumeData.skills &&
    resumeData.languages &&
    resumeData.interests;

  const renderTemplate = () => {
    if (!selectedTemplate) {
      return (
        <div className="text-center text-gray-500">
          <p>Aucun modèle sélectionné.</p>
          <p>
            <a
              href="/modele "
              className="text-blue-500 hover:underline"
            >
              Choisissez un modèle pour continuer.
            </a>
          </p>
        </div>
      );
    }

    if (!isDataValid) {
      return (
        <div className="text-center text-red-500">
          <p>Les données nécessaires pour générer le CV ne sont pas complètes.</p>
          <p>
            <a
              href="/form"
              className="text-blue-500 hover:underline"
            >
              Remplissez vos informations pour continuer.
            </a>
          </p>
        </div>
      );
    }

    switch (selectedTemplate) {
      case 1:
        return <Template1 {...resumeData} />;
      case 2:
        return <Template2 {...resumeData} />;
      case 3:
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
      {isDataValid ? (
        renderTemplate()
      ) : (
        <div className="animate-pulse text-center">
          <div className="bg-gray-200 h-6 w-1/2 mx-auto mb-4 rounded"></div>
          <div className="bg-gray-200 h-4 w-3/4 mx-auto rounded"></div>
        </div>
      )}
    </div>
  );
});

export default ResumePreview;
