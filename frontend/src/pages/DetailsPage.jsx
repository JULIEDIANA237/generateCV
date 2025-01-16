import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import PersonalInfoForm from '../components/PersonalInfoForm';
import WorkExperienceForm from '../components/WorkExperienceForm';
import EducationForm from '../components/EducationForm';
import SkillsForm from '../components/SkillsForm';
import LanguagesForm from '../components/LanguagesForm';
import InterestForm from '../components/InterestsForm';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const DetailsPage = () => {
  const [currentSection, setCurrentSection] = useState('Informations personnelles');
  const [completedSections, setCompletedSections] = useState([]);
  const [notification, setNotification] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [userData, setUserData] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { id: templateId } = useParams();
   // Récupérer le sessionId depuis l'URL
   const queryParams = new URLSearchParams(location.search);
   const sessionId = queryParams.get('sessionId');

  const sections = [
    'Informations personnelles',
    'Expérience professionnelle',
    'Formation académique',
    'Compétences clés',
    'Langues',
    'Centres d\'intérêt',
  ];

  useEffect(() => {
    console.log('Session ID:', sessionId);
    if (sessionId) {
      fetch(`http://localhost:5000/api/user-data/${sessionId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => setUserData(data))
      .catch((error) => {
        console.error('Error fetching user data:', error);
        setNotification({ message: 'Impossible de charger les données utilisateur.', type: 'error' });
      });

    }
  }, [sessionId]);
  

  useEffect(() => {
    console.log('Initialisation des données de la page');

    const savedSection = localStorage.getItem('currentSection');
    if (savedSection) {
      console.log(`Section sauvegardée trouvée : ${savedSection}`);
      setCurrentSection(savedSection);
    }

    const savedCompletedSections = JSON.parse(localStorage.getItem('completedSections')) || [];
    setCompletedSections(savedCompletedSections);

     
  }, []);

  useEffect(() => {
    console.log('Mise à jour des données dans localStorage :');
    console.log(`Section actuelle : ${currentSection}`);
    console.log('Sections complétées :', completedSections);

    localStorage.setItem('currentSection', currentSection);
    localStorage.setItem('completedSections', JSON.stringify(completedSections));
  }, [currentSection, completedSections]);

  const handleSectionChange = (newSection) => {
    console.log(`Changement de section : ${currentSection} -> ${newSection}`);
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSection(newSection);
      setIsTransitioning(false);
    }, 300);
  };

  const showNotification = (message, type) => {
    console.log(`[Notification - ${type.toUpperCase()}] : ${message}`);
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const nextSection = () => {
    const currentIndex = sections.indexOf(currentSection);
  
    if (currentIndex < sections.length - 1) {
      handleSectionChange(sections[currentIndex + 1]);
    } else {
      console.log('Navigation vers la prévisualisation du CV');
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
        {console.log('Données personnelles transmises à PersonalInfoForm :', userData)}
        return (
          <PersonalInfoForm
            userData={userData}
            onFormComplete={(isComplete) => {
              if (isComplete && !completedSections.includes('Informations personnelles')) {
                setCompletedSections((prev) => [...prev, 'Informations personnelles']);
              }
            }}
          />
        );
      case 'Expérience professionnelle':
        console.log('Affichage de la section : Expérience professionnelle');
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
        console.log('Affichage de la section : Formation académique');
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
        console.log('Affichage de la section : Compétences clés');
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
        console.log('Affichage de la section : Langues');
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
        console.log('Affichage de la section : Centres d’intérêt');
        return (
          <InterestForm
             
          />

        );
      default:
        console.warn('Section inconnue :', currentSection);
        return null;
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {notification && (
        <div
          className={`fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 text-white ${
            notification.type === 'success' ? 'bg-green-500' : notification.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
          }`}
        >
          {notification.message}
        </div>
      )}

      <div className="md:w-1/4 w-full bg-white shadow-xl p-6">
        <Sidebar
          currentSection={currentSection}
          onSelectSection={(section) => handleSectionChange(section)}
          completedSections={completedSections}
        />
      </div>

      <div className="md:w-3/4 w-full p-8">
        <div
          className={`transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
        >
          {renderSection()}
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
          {/* Bouton Précédent */}
          <button
            disabled={currentSection === sections[0]}
            onClick={previousSection}
            className={`flex items-center justify-center w-full sm:w-auto px-4 py-2 bg-gray-200 rounded-lg shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-200 ease-in-out ${
              currentSection === sections[0] && 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <FaArrowLeft className="mr-2" />
            Précédent
          </button>

          {/* Bouton Suivant */}
          <button
            onClick={nextSection}
            className="flex items-center justify-center w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
          >
            {sections.indexOf(currentSection) === sections.length - 1
              ? 'Prévisualiser le CV'
              : 'Suivant'}
            <FaArrowRight className="ml-2" />
          </button>
        </div>

      </div>
    </div>
  );
};

export default DetailsPage;
