import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addExperience, updateExperience, removeExperience } from '../features/resumeSlice';

const WorkExperienceForm = ({ onFormComplete, setCompletedSections }) => {
  const dispatch = useDispatch();
  const experiences = useSelector((state) => state.resume.experiences) || [];
  const [errors, setErrors] = useState({});
  
  const completedSectionsRef = useRef([]);

  // Validate fields with custom logic
  const validateField = (field, value, index) => {
    let error = '';
    if (!value) {
      error = 'Ce champ est requis.';
    } else if (field === 'startDate' && value > new Date().getFullYear()) {
      error = 'La date de début ne peut pas être dans le futur.';
    } else if (field === 'endDate' && value < experiences[index]?.startDate) {
      error = 'La date de fin ne peut pas précéder la date de début.';
    }
    return error;
  };

  // Handle field changes
  const handleChange = (index, field, value) => {
    const updatedExperience = { ...experiences[index], [field]: value };
    dispatch(updateExperience({ index, experience: updatedExperience }));
  };

  // Add a new experience
  const handleAddExperience = () => {
    const newExperience = {
      title: '',
      startDate: '',
      endDate: '',
      company: '',
      jobDescription: '',
    };
    dispatch(addExperience(newExperience));
  };

  // Remove an experience
  const handleRemoveExperience = (index) => {
    dispatch(removeExperience(index));
  };

  // Check if the section is complete
  useEffect(() => {
    const allFieldsFilled = experiences.every((exp) =>
      exp.title && exp.company && exp.startDate && exp.endDate && exp.jobDescription
    );

    onFormComplete(allFieldsFilled);

    if (allFieldsFilled) {
      if (!completedSectionsRef.current.includes('Expérience professionnelle')) {
        completedSectionsRef.current.push('Expérience professionnelle');
        setCompletedSections([...completedSectionsRef.current]);
      }
    }
  }, [experiences, onFormComplete, setCompletedSections]);

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500 rounded-xl shadow-lg">
      <h2 className="text-3xl font-semibold text-white  text-center mb-8">Expérience Professionnelle</h2>
      
      {experiences.map((experience, index) => (
        <div key={index} className="mb-8 p-6 from-indigo-400 via-purple-400 to-pink-500 rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block mb-2 font-semibold text-gray-700">Titre du poste</label>
              <input
                type="text"
                value={experience.title}
                onChange={(e) => handleChange(index, 'title', e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                placeholder="Ex: Développeur Web"
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold text-gray-700">Nom de l'organisation</label>
              <input
                type="text"
                value={experience.company}
                onChange={(e) => handleChange(index, 'company', e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                placeholder="Ex: ABC Corp"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block mb-2 font-semibold text-gray-700">Date de début (Année)</label>
              <input
                type="number"
                value={experience.startDate}
                onChange={(e) => handleChange(index, 'startDate', e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                min="1900"
                max={new Date().getFullYear()}
                placeholder="Ex: 2020"
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold text-gray-700">Date de fin (Année)</label>
              <input
                type="number"
                value={experience.endDate}
                onChange={(e) => handleChange(index, 'endDate', e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                min="1900"
                max={new Date().getFullYear()}
                placeholder="Ex: 2022"
              />
            </div>
          </div>
          <div className="mb-6">
            <label className="block mb-2 font-semibold text-gray-700">Description du poste</label>
            <textarea
              value={experience.jobDescription}
              onChange={(e) => handleChange(index, 'jobDescription', e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              rows="4"
              placeholder="Décrivez votre rôle et responsabilités"
            ></textarea>
          </div>
          <button
            type="button"
            onClick={() => handleRemoveExperience(index)}
            className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-600 transition duration-300"
          >
            Supprimer l'expérience
          </button>
        </div>
      ))}

      <div className="text-center">
        <button
          type="button"
          onClick={handleAddExperience}
          className="bg-blue-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-600 transition duration-300 transform hover:scale-105"
        >
          Ajouter une expérience
        </button>
      </div>
    </div>
  );
};

export default WorkExperienceForm;
