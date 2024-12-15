import React from 'react';

const Sidebar = ({ currentSection, onSelectSection }) => {
  const sections = [
    'Informations personnelles',
    'Expérience professionnelle',
    'Formation académique',
    'Compétences clés',
    'Langues',
    'Centres d\'intérêt',
  ];

  return (
    <div className="bg-gray-200 p-4 w-full sm:w-1/3 lg:w-1/4 h-full sm:fixed sm:top-0 sm:left-0 sm:h-screen overflow-y-auto">
      <h2 className="text-xl font-bold mb-4 text-center">Sections</h2>
      <ul className="space-y-2">
        {sections.map((section) => (
          <li
            key={section}
            className={`p-2 cursor-pointer rounded text-center sm:text-left ${
              currentSection === section ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-300'
            }`}
            onClick={() => onSelectSection(section)}
          >
            {section}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
