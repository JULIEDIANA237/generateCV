import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Sidebar from '../components/Sidebar';
import PersonalInfoForm from '../components/PersonalInfoForm';
import WorkExperienceForm from '../components/WorkExperienceForm';
import EducationForm from '../components/EducationForm';
import SkillsForm from '../components/SkillsForm';
import LanguagesForm from '../components/LanguagesForm';
import InterestForm from '../components/InterestsForm';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const DetailsPage = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();
  const { id: templateId } = useParams();
  const [currentSection, setCurrentSection] = useState('Informations personnelles');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const sections = [
    'Informations personnelles',
    'Expérience professionnelle',
    'Formation académique',
    'Compétences clés',
    'Langues',
    'Centres d\'intérêt',
  ];

  useEffect(() => {
    const savedSection = localStorage.getItem('currentSection');
    if (savedSection) setCurrentSection(savedSection);
  }, []);

  useEffect(() => {
    localStorage.setItem('currentSection', currentSection);
  }, [currentSection]);

  const handleSectionChange = (newSection) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSection(newSection);
      setIsTransitioning(false);
    }, 300);
  };

  const nextSection = () => {
    const currentIndex = sections.indexOf(currentSection);
    if (currentIndex < sections.length - 1) {
      handleSectionChange(sections[currentIndex + 1]);
    } else {
      navigate(`/my-resume/${templateId}`);
    }
  };

  const previousSection = () => {
    const currentIndex = sections.indexOf(currentSection);
    if (currentIndex > 0) {
      handleSectionChange(sections[currentIndex - 1]);
    }
  };

  const renderSection = () => {
    switch (currentSection) {
      case 'Informations personnelles':
        return <PersonalInfoForm userData={isAuthenticated ? user : null} />;
      case 'Expérience professionnelle':
        return <WorkExperienceForm />;
      case 'Formation académique':
        return <EducationForm />;
      case 'Compétences clés':
        return <SkillsForm />;
      case 'Langues':
        return <LanguagesForm />;
      case "Centres d'intérêt":
        return <InterestForm />;
      default:
        return null;
    }
  };

  if (isLoading) {
    return <p className="text-center text-xl font-bold">Chargement des données...</p>;
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar */}
      <div className="md:w-1/4 w-full bg-white shadow-xl p-6">
        <Sidebar currentSection={currentSection} onSelectSection={handleSectionChange} />
      </div>

      {/* Contenu principal */}
      <div className="md:w-3/4 w-full p-8">
         

        <div className={`transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
          {renderSection()}
        </div>

        {/* Boutons de navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
          <button
            disabled={currentSection === sections[0]}
            onClick={previousSection}
            className={`flex items-center justify-center w-full sm:w-auto px-4 py-2 bg-gray-200 rounded-lg shadow-md hover:bg-gray-400 focus:outline-none ${
              currentSection === sections[0] && 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <FaArrowLeft className="mr-2" />
            Précédent
          </button>

          <button
            onClick={nextSection}
            className="flex items-center justify-center w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none"
          >
            {sections.indexOf(currentSection) === sections.length - 1 ? 'Prévisualiser le CV' : 'Suivant'}
            <FaArrowRight className="ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
