import React from 'react';

interface SidebarProps {
  currentSection: string;
  onSelectSection: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentSection, onSelectSection }) => {
  const sections = [
    'Informations personnelles',
    'Expérience professionnelle',
    'Formation académique',
    'Compétences clés',
  ];

  return (
    <div className="w-1/4 bg-gray-200 p-4">
      <ul className="space-y-2">
        {sections.map((section) => (
          <li
            key={section}
            className={`p-2 cursor-pointer rounded ${
              currentSection === section ? 'bg-blue-500 text-white' : 'bg-white'
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
