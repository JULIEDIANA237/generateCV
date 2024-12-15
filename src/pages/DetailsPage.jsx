import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import du hook useNavigate
import Sidebar from '../components/Sidebar';
import PersonalInfoForm from '../components/PersonalInfoForm';
import WorkExperienceForm from '../components/WorkExperienceForm';
import EducationForm from '../components/EducationForm';
import SkillsForm from '../components/SkillsForm';
import LanguagesForm from '../components/LanguagesForm';
import InterestForm from '../components/InterestsForm';

const DetailsPage = () => {
  const [currentSection, setCurrentSection] = useState('Informations personnelles');
  const navigate = useNavigate(); // Hook pour naviguer entre les pages

  const sections = [
    'Informations personnelles',
    'Expérience professionnelle',
    'Formation académique',
    'Compétences clés',
    'Langues',
    'Centres d\'intérêt',
  ];

  const renderSection = () => {
    switch (currentSection) {
      case 'Informations personnelles':
        return <PersonalInfoForm />;
      case 'Expérience professionnelle':
        return <WorkExperienceForm />;
      case 'Formation académique':
        return <EducationForm />;
      case 'Compétences clés':
        return <SkillsForm />;
      case 'Langues':
        return <LanguagesForm />;
      case 'Centres d\'intérêt':
        return <InterestForm />;
      default:
        return null;
    }
  };

  const nextSection = () => {
    const currentIndex = sections.indexOf(currentSection);
    if (currentIndex < sections.length - 1) {
      setCurrentSection(sections[currentIndex + 1]);
    } else {
      navigate('/my-resume'); // Rediriger vers la page de prévisualisation
    }
  };

  const previousSection = () => {
    const currentIndex = sections.indexOf(currentSection);
    if (currentIndex > 0) {
      setCurrentSection(sections[currentIndex - 1]);
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="md:w-1/4 w-full bg-gray-100 md:block hidden">
        <Sidebar currentSection={currentSection} onSelectSection={setCurrentSection} />
      </div>

      {/* Main Content */}
      <div className="md:w-3/4 w-full p-4">
        {renderSection()}

        {/* Navigation buttons */}
        <div className="flex justify-between mt-4 flex-col sm:flex-row">
          <button
            disabled={currentSection === sections[0]}
            onClick={previousSection}
            className="px-4 py-2 bg-gray-300 rounded mb-2 sm:mb-0 sm:mr-2"
          >
            Précédent
          </button>
          <button
            onClick={nextSection}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            {currentSection === sections[sections.length - 1] ? 'Prévisualiser le CV' : 'Suivant'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
