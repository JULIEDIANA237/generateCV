import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addSkill, updateSkill, removeSkill } from '../features/resumeSlice';

const SkillsForm = () => {
  const dispatch = useDispatch();
  const skills = useSelector((state) => state.resume.skills) || []; // Ensure skills is always an array

  const handleChange = (index, field, value) => {
    dispatch(updateSkill({ index, skill: { ...skills[index], [field]: value } })); // Update skill at the specified index
  };

  const addNewSkill = () => {
    dispatch(addSkill({ title: '', content: '' })); // Add a new skill with empty title and content
  };

  const removeExistingSkill = (index) => {
    dispatch(removeSkill(index)); // Remove the skill at the specified index
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center sm:text-left">Compétences clés</h2>
      {skills.map((skill, index) => (
        <div
          key={index}
          className="mb-6 p-4 border rounded-lg bg-white shadow-sm"
        >
          {/* Title input */}
          <div className="mb-4">
            <label htmlFor={`title-${index}`} className="block text-sm font-medium text-gray-700 mb-2">
              Titre de la compétence
            </label>
            <input
              type="text"
              id={`title-${index}`}
              value={skill.title || ''} // Ensure a default empty string if the title is undefined
              onChange={(e) => handleChange(index, 'title', e.target.value)} // Update title
              className="w-full border rounded-lg p-2"
              placeholder="Framework"
            />
          </div>
          
          {/* Content input */}
          <div>
            <label htmlFor={`content-${index}`} className="block text-sm font-medium text-gray-700 mb-2">
              Détails
            </label>
            <textarea
              id={`content-${index}`}
              value={skill.content || ''} // Ensure a default empty string if content is undefined
              onChange={(e) => handleChange(index, 'content', e.target.value)} // Update content
              className="w-full border rounded-lg p-2"
              placeholder="Ex: ReactJS, Next.js"
            />
          </div>
          
          {/* Remove button */}
          <button
            type="button"
            onClick={() => removeExistingSkill(index)}
            className="mt-2 text-red-500 hover:text-red-700"
          >
            Supprimer cette compétence
          </button>
        </div>
      ))}
      <div className="text-center sm:text-left">
        <button
          type="button"
          onClick={addNewSkill}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
        >
          Ajouter une compétence
        </button>
      </div>
    </div>
  );
};

export default SkillsForm;
