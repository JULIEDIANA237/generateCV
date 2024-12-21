import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import PersonalInfoForm from '../components/PersonalInfoForm';
import WorkExperienceForm from '../components/WorkExperienceForm';
import EducationForm from '../components/EducationForm';
import SkillsForm from '../components/SkillsForm';
import LanguagesForm from '../components/LanguagesForm';
import InterestForm from '../components/InterestsForm';
import { FaArrowLeft, FaArrowRight, FaBars } from 'react-icons/fa';

const DetailsPage = () => {
  const [currentSection, setCurrentSection] = useState('Informations personnelles');
  const [completedSections, setCompletedSections] = useState([]);
  const [notification, setNotification] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const navigate = useNavigate();

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
    if (savedSection) {
      setCurrentSection(savedSection);
    }
    const savedCompletedSections = JSON.parse(localStorage.getItem('completedSections')) || [];
    setCompletedSections(savedCompletedSections);
  }, []);

  useEffect(() => {
    localStorage.setItem('currentSection', currentSection);
    localStorage.setItem('completedSections', JSON.stringify(completedSections));
  }, [currentSection, completedSections]);

  const handleSectionChange = (newSection) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSection(newSection);
      setIsTransitioning(false);
    }, 300);
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000); // Hide notification after 3 seconds
  };

  const nextSection = () => {
    if (currentSection !== "Centres d'intérêt" && !completedSections.includes(currentSection)) {
      showNotification(`Veuillez remplir la section "${currentSection}" avant de passer à la suivante.`, 'error');
      return;
    }

    const currentIndex = sections.indexOf(currentSection);
    if (currentIndex < sections.length - 1) {
      handleSectionChange(sections[currentIndex + 1]);
    } else {
      navigate('/my-resume');
    }
  };

  const previousSection = () => {
    const currentIndex = sections.indexOf(currentSection);
    if (currentIndex > 0) {
      handleSectionChange(sections[currentIndex - 1]);
    }
  };

  const areAllSectionsComplete = () => sections.every((section) => completedSections.includes(section));

  const renderSection = () => {
    switch (currentSection) {
      case 'Informations personnelles':
        return (
          <PersonalInfoForm
            onFormComplete={(isComplete) => {
              if (isComplete && !completedSections.includes('Informations personnelles')) {
                setCompletedSections((prev) => [...prev, 'Informations personnelles']);
              }
            }}
            setCompletedSections={setCompletedSections}
          />
        );
      case 'Expérience professionnelle':
        return (
          <WorkExperienceForm
            onFormComplete={(isComplete) => {
              if (isComplete && !completedSections.includes('Expérience professionnelle')) {
                setCompletedSections((prev) => [...prev, 'Expérience professionnelle']);
              }
            }}
            setCompletedSections={setCompletedSections}
          />
        );
      case 'Formation académique':
        return (
          <EducationForm
            onFormComplete={(isComplete) => {
              if (isComplete && !completedSections.includes('Formation académique')) {
                setCompletedSections((prev) => [...prev, 'Formation académique']);
              }
            }}
            setCompletedSections={setCompletedSections}
          />
        );
      case 'Compétences clés':
        return (
          <SkillsForm
            onFormComplete={(isComplete) => {
              if (isComplete && !completedSections.includes('Compétences clés')) {
                setCompletedSections((prev) => [...prev, 'Compétences clés']);
              }
            }}
            setCompletedSections={setCompletedSections}
          />
        );
      case 'Langues':
        return (
          <LanguagesForm
            onFormComplete={(isComplete) => {
              if (isComplete && !completedSections.includes('Langues')) {
                setCompletedSections((prev) => [...prev, 'Langues']);
              }
            }}
            setCompletedSections={setCompletedSections}
          />
        );
      case "Centres d'intérêt":
        return <InterestForm />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col md:flex-row   min-h-screen">
      {/* Notifications */}
      {notification && (
        <div
          className={`fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 text-white ${notification.type === 'success' ? 'bg-green-500' : notification.type === 'error' ? 'bg-red-500' : 'bg-blue-500'}`}
        >
          {notification.message}
        </div>
      )}

      {/* Sidebar */}
      <div className="md:w-1/4 w-full bg-white shadow-xl p-6">
        <Sidebar
          currentSection={currentSection}
          onSelectSection={setCurrentSection}
          completedSections={completedSections}
        />
      </div>

      {/* Main Content */}
      <div className="md:w-3/4 w-full p-8">
        <div
          className={`transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
        >
          {renderSection()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6 flex-col sm:flex-row space-y-4 sm:space-y-0">
  <button
    disabled={currentSection === sections[0]}
    onClick={previousSection}
    className={`flex items-center justify-center px-4 py-2 sm:px-6 sm:py-3 rounded-lg shadow-md w-full sm:w-auto mb-2 sm:mb-0 
      ${currentSection === sections[0] ? 'bg-gray-300 text-gray-500' : 'bg-gray-200 hover:bg-gray-400'}`}
  >
    <FaArrowLeft className="mr-2 h-4 w-4 sm:h-5 sm:w-5" /> {/* Taille des icônes réduite sur mobile */}
    <span className="text-sm sm:text-base">Précédent</span> {/* Texte réduit sur mobile */}
  </button>

  <button
    onClick={nextSection}
    disabled={currentSection !== "Centres d'intérêt" && !completedSections.includes(currentSection)}
    className="flex items-center justify-center px-4 py-2 sm:px-6 sm:py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 disabled:bg-gray-300 disabled:text-gray-500 w-full sm:w-auto"
  >
    <span className="text-sm sm:text-base">
      {currentSection === "Centres d'intérêt" ? 'Prévisualiser le CV' : 'Suivant'}
    </span>
    <FaArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" /> {/* Taille des icônes réduite sur mobile */}
  </button>
</div>

      </div>
    </div>
  );
};

export default DetailsPage;
