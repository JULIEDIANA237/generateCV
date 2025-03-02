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
  const navigate = useNavigate();
  const { id: templateId } = useParams();
  const [currentSection, setCurrentSection] = useState('Informations personnelles');
  const [resumeData, setResumeData] = useState({});

  useEffect(() => {
    const storedData = localStorage.getItem("linkedinData");
    if (storedData) {
      setResumeData(JSON.parse(storedData)); // Charger les données sauvegardées
    }
  }, []);
  

  const sections = [
    'Informations personnelles',
    'Expérience professionnelle',
    'Formation académique',
    'Compétences clés',
    'Langues',
    "Centres d'intérêt",
  ];

  const handleFormUpdate = (section, data) => {
    setResumeData((prevData) => ({
      ...prevData,
      [section]: data,
    }));
  };

  const nextSection = () => {
    const currentIndex = sections.indexOf(currentSection);
    if (currentIndex < sections.length - 1) {
      setCurrentSection(sections[currentIndex + 1]);
    } else {
      navigate(`/my-resume/${templateId}`, { state: { resumeData } });
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
  {/* Sidebar avec fond et bordure */}
  <div className="md:w-1/4 w-full bg-white shadow-md border-r border-gray-200 p-6">
    <Sidebar currentSection={currentSection} onSelectSection={setCurrentSection} />
  </div>

  {/* Contenu principal */}
  <div className="flex-1 p-6 md:p-8">
    <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
      {currentSection}
    </h2>

    {/* Formulaires affichés dynamiquement */}
    <div className="bg-white shadow-lg rounded-xl p-6 md:p-8">
      {currentSection === 'Informations personnelles' && (
        <PersonalInfoForm onUpdate={(data) => handleFormUpdate('personalInfo', data)} />
      )}
      {currentSection === 'Expérience professionnelle' && (
        <WorkExperienceForm onUpdate={(data) => handleFormUpdate('workExperience', data)} />
      )}
      {currentSection === 'Formation académique' && (
        <EducationForm onUpdate={(data) => handleFormUpdate('education', data)} />
      )}
      {currentSection === 'Compétences clés' && (
        <SkillsForm onUpdate={(data) => handleFormUpdate('skills', data)} />
      )}
      {currentSection === 'Langues' && (
        <LanguagesForm onUpdate={(data) => handleFormUpdate('languages', data)} />
      )}
      {currentSection === "Centres d'intérêt" && (
        <InterestForm onUpdate={(data) => handleFormUpdate('interests', data)} />
      )}
    </div>

    {/* Navigation entre les sections */}
    <div className="flex justify-between mt-8">
      <button
        onClick={() => setCurrentSection(sections[sections.indexOf(currentSection) - 1])}
        disabled={currentSection === sections[0]}
        className="px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base text-white bg-gray-500 hover:bg-gray-600 rounded-lg shadow-md transition-all duration-200 disabled:opacity-50"
      >
        ⬅ Précédent
      </button>

      <button
        onClick={nextSection}
        className="px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base text-white bg-orange-500 hover:bg-orange-600 rounded-lg shadow-md transition-all duration-200"
      >
        {currentSection === sections[sections.length - 1] ? '👀 Prévisualiser' : 'Suivant ➡'}
      </button>
    </div>

  </div>
</div>

  );
};
export default DetailsPage;