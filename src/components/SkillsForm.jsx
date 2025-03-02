import React from 'react';
import { TrashIcon, PlusIcon, MinusIcon } from '@heroicons/react/24/solid';
import { useDispatch, useSelector } from 'react-redux';
import { addSkill, updateSkill, removeSkill } from '../features/resumeSlice';

const SkillsForm = () => {
  const dispatch = useDispatch();
  const skills = useSelector((state) => state.resume.skills) || [];

  const handleChange = (index, field, value) => {
    dispatch(updateSkill({ index, skill: { ...skills[index], [field]: value } }));
  };

  const addNewSkill = () => {
    dispatch(addSkill({ title: '', level: 0 }));
  };

  const removeExistingSkill = (index) => {
    dispatch(removeSkill(index));
  };

  const adjustSkillLevel = (index, adjustment) => {
    const newLevel = Math.max(0, Math.min(5, skills[index].level + adjustment));
    dispatch(updateSkill({ index, skill: { ...skills[index], level: newLevel } }));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto rounded-lg shadow-orange-lg">
 

      {skills.map((skill, index) => (
        <div
          key={index}
          className="mb-6 p-4 sm:p-6 border rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out"
        >
          <div className="mb-4">
            <label
              htmlFor={`title-${index}`}
              className="block text-[0.875rem] sm:text-[1rem] font-medium text-gray-800 mb-2"
            >
              Titre de la compétence
            </label>
            <input
              type="text"
              id={`title-${index}`}
              value={skill.title || ''}
              onChange={(e) => handleChange(index, 'title', e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 sm:p-4 text-[0.875rem] sm:text-[1rem] text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-300 ease-in-out"
              placeholder="Ex: ReactJS"
            />
          </div>

          <div className="mb-4">
            <label className="block text-[0.875rem] sm:text-[1rem] font-medium text-gray-800 mb-2">
              Niveau de compétence (0 à 5)
            </label>
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => adjustSkillLevel(index, -1)}
                className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600 focus:outline-none transition duration-300 ease-in-out"
              >
                <MinusIcon className="h-5 w-5" />
              </button>
              <span className="mx-4 text-[1rem] sm:text-[1.25rem] font-bold">{skill.level}</span>
              <button
                type="button"
                onClick={() => adjustSkillLevel(index, 1)}
                className="p-2 rounded-full bg-green-500 text-white hover:bg-green-600 focus:outline-none transition duration-300 ease-in-out"
              >
                <PlusIcon className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="mt-4 text-right">
            <button
              type="button"
              onClick={() => removeExistingSkill(index)}
              className="inline-flex items-center justify-center text-red-500 hover:text-red-700 focus:outline-none transition duration-300 ease-in-out"
            >
              <TrashIcon className="h-5 w-5 sm:h-6 sm:w-6 text-orange-400" />
              <span className="hidden sm:inline ml-2 text-[0.875rem] sm:text-[1rem] font-medium">
                Supprimer cette compétence
              </span>
            </button>
          </div>
        </div>
      ))}

      <div className="text-center">
        <button
          type="button"
          onClick={addNewSkill}
          className="mt-6 px-4 py-2 sm:px-6 sm:py-3 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 focus:outline-none transition duration-300 ease-in-out transform hover:scale-105 inline-flex items-center justify-center"
        >
          <PlusIcon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
          <span className="hidden sm:inline ml-2 text-[0.875rem] sm:text-[1rem] font-medium">
            Ajouter une compétence
          </span>
        </button>
      </div>
    </div>
  );
};

export default SkillsForm;
