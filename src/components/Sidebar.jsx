import React, { useState } from 'react';
import { FaUser, FaBriefcase, FaGraduationCap, FaTools, FaLanguage, FaHeart } from 'react-icons/fa';
import { useSwipeable } from 'react-swipeable';

const Sidebar = ({ currentSection, onSelectSection }) => {
  const sections = [
    { label: 'Informations personnelles', icon: <FaUser /> },
    { label: 'Expérience professionnelle', icon: <FaBriefcase /> },
    { label: 'Formation académique', icon: <FaGraduationCap /> },
    { label: 'Compétences clés', icon: <FaTools /> },
    { label: 'Langues', icon: <FaLanguage /> },
    { label: 'Centres d\'intérêt', icon: <FaHeart /> },
  ];

  const [isCollapsed, setIsCollapsed] = useState(false);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => setIsCollapsed(true),
    onSwipedRight: () => setIsCollapsed(false),
  });

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  return (
    <div
      {...swipeHandlers}
      className={`relative bg-gray-200 p-4 h-full sm:fixed sm:top-0 sm:left-0 sm:h-screen overflow-y-auto transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-full sm:w-1/3 lg:w-1/4'
      }`}
    >
      <button
        className="sm:hidden mb-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        onClick={toggleSidebar}
      >
        {isCollapsed ? '▶️' : '◀️'}
      </button>

      {!isCollapsed && (
        <h2 className="text-xl font-bold text-center mb-4">Sections</h2>
      )}

      <ul className="space-y-2">
        {sections.map(({ label, icon }) => (
          <li
            key={label}
            className={`p-2 cursor-pointer rounded flex items-center justify-between ${
              currentSection === label
                ? 'bg-blue-500 text-white'
                : 'bg-white hover:bg-gray-300'
            }`}
            onClick={() => onSelectSection(label)}
          >
            <div className="flex items-center gap-2">
              {icon}
              {!isCollapsed && <span>{label}</span>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
