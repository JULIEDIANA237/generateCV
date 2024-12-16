import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addSkill, updateSkill, removeSkill } from '../features/resumeSlice';

const SkillsForm = ({ onFormComplete, setCompletedSections, completedSections = [] }) => {
  const dispatch = useDispatch();
  const skills = useSelector((state) => state.resume.skills) || [];
  const [isFormValid, setIsFormValid] = useState(false);
  
  // Ref pour suivre si la section "Compétences clés" a été modifiée
  const sectionCompletedRef = useRef(false);

  useEffect(() => {
    const isValid = skills.every((skill) => skill.title && skill.content);
    setIsFormValid(isValid);
    onFormComplete(isValid);

    if (isValid && !sectionCompletedRef.current) {
      setCompletedSections((prev) => [...prev, 'Compétences clés']);
      sectionCompletedRef.current = true;
    } else if (!isValid && sectionCompletedRef.current) {
      setCompletedSections((prev) => prev.filter((section) => section !== 'Compétences clés'));
      sectionCompletedRef.current = false;
    }
  }, [skills, onFormComplete, setCompletedSections]);

  const handleChange = (index, field, value) => {
    dispatch(updateSkill({ index, skill: { ...skills[index], [field]: value } }));
  };

  const addNewSkill = () => {
    dispatch(addSkill({ title: '', content: '' }));
  };

  const removeExistingSkill = (index) => {
    dispatch(removeSkill(index));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500 rounded-lg shadow-xl">
      <h2 className="text-3xl font-semibold text-white text-center mb-6">Compétences clés</h2>

      {/* Afficher un message d'erreur si le formulaire est incomplet */}
      {!isFormValid && (
        <div className="text-red-500 mb-6 text-center">
          <p className="font-medium">Veuillez remplir chaque compétence avec un titre et une description avant de continuer.</p>
        </div>
      )}

      {skills.map((skill, index) => (
        <div key={index} className="mb-6 p-6 border rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
          {/* Champ de titre */}
          <div className="mb-4">
            <label htmlFor={`title-${index}`} className="block text-lg font-medium text-gray-800 mb-2">
              Titre de la compétence
            </label>
            <input
              type="text"
              id={`title-${index}`}
              value={skill.title || ''}
              onChange={(e) => handleChange(index, 'title', e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-4 text-gray-800 focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
              placeholder="Ex: ReactJS"
            />
          </div>

          {/* Champ de contenu */}
          <div>
            <label htmlFor={`content-${index}`} className="block text-lg font-medium text-gray-800 mb-2">
              Détails
            </label>
            <textarea
              id={`content-${index}`}
              value={skill.content || ''}
              onChange={(e) => handleChange(index, 'content', e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-4 text-gray-800 focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
              placeholder="Ex: ReactJS, Next.js"
            />
          </div>

          {/* Bouton pour supprimer */}
          <div className="mt-4 text-right">
            <button
              type="button"
              onClick={() => removeExistingSkill(index)}
              className="text-red-500 hover:text-red-700 font-medium focus:outline-none transition duration-300 ease-in-out"
            >
              Supprimer cette compétence
            </button>
          </div>
        </div>
      ))}

      {/* Button pour ajouter une nouvelle compétence */}
      <div className="text-center">
        <button
          type="button"
          onClick={addNewSkill}
          className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 focus:outline-none transition duration-300 ease-in-out transform hover:scale-105"
        >
          Ajouter une compétence
        </button>
      </div>
    </div>
  );
};

export default SkillsForm;
