import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import PersonalInfoForm from '../components/PersonalInfoForm';
import WorkExperienceForm from '../components/WorkExperienceForm'; // À créer
import EducationForm from '../components/EducationForm'; // À créer
import SkillsForm from '../components/SkillsForm'; // À créer

const DetailsPage: React.FC = () => {
  const [currentSection, setCurrentSection] = useState('Informations personnelles');

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
      default:
        return null;
    }
  };

  return (
    <div className="flex">
      <Sidebar currentSection={currentSection} onSelectSection={setCurrentSection} />
      <div className="w-3/4 p-4">
        {renderSection()}
        <div className="flex justify-between mt-4">
          <button
            disabled={currentSection === 'Informations personnelles'}
            onClick={() =>
              setCurrentSection((prev) => {
                const sections = [
                  'Informations personnelles',
                  'Expérience professionnelle',
                  'Formation académique',
                  'Compétences clés',
                ];
                return sections[sections.indexOf(prev) - 1];
              })
            }
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Précédent
          </button>
          <button
            disabled={currentSection === 'Compétences clés'}
            onClick={() =>
              setCurrentSection((prev) => {
                const sections = [
                  'Informations personnelles',
                  'Expérience professionnelle',
                  'Formation académique',
                  'Compétences clés',
                ];
                return sections[sections.indexOf(prev) + 1];
              })
            }
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Suivant
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
