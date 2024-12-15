import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addExperience, updateExperience, removeExperience } from '../features/resumeSlice';

const WorkExperienceForm = () => {
  const dispatch = useDispatch();
  const experiences = useSelector((state) => state.resume.experiences) || []; // Assure que `experiences` est toujours un tableau

  const handleChange = (index, field, value) => {
    const updatedExperience = { ...experiences[index], [field]: value };
    dispatch(updateExperience({ index, experience: updatedExperience })); 
  };

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

  const handleRemoveExperience = (index) => {
    dispatch(removeExperience(index)); 
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Expérience Professionnelle</h2>
      {experiences.map((experience, index) => (
        <div key={index} className="mb-6 border rounded-lg p-4 bg-gray-50 shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-2 font-semibold">Titre du poste</label>
              <input
                type="text"
                value={experience.title}
                onChange={(e) => handleChange(index, 'title', e.target.value)}
                className="w-full border rounded p-2"
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold">Nom de l'organisation</label>
              <input
                type="text"
                value={experience.company}
                onChange={(e) => handleChange(index, 'company', e.target.value)}
                className="w-full border rounded p-2"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-2 font-semibold">Date de début</label>
              <input
                type="date"
                value={experience.startDate}
                onChange={(e) => handleChange(index, 'startDate', e.target.value)}
                className="w-full border rounded p-2"
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold">Date de fin</label>
              <input
                type="date"
                value={experience.endDate}
                onChange={(e) => handleChange(index, 'endDate', e.target.value)}
                className="w-full border rounded p-2"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Description du poste</label>
            <textarea
              value={experience.jobDescription}
              onChange={(e) => handleChange(index, 'jobDescription', e.target.value)}
              className="w-full border rounded p-2"
              rows="4"
            ></textarea>
          </div>
          <button
            type="button"
            onClick={() => handleRemoveExperience(index)}
            className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600"
          >
            Supprimer l'expérience
          </button>
        </div>
      ))}
      <div className="text-center">
        <button
          type="button"
          onClick={handleAddExperience}
          className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
        >
          Ajouter une expérience
        </button>
      </div>
    </div>
  );
};

export default WorkExperienceForm;
