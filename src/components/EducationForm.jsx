import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addEducation, updateEducation, removeEducation } from '../features/resumeSlice';

const EducationForm = () => {
  const dispatch = useDispatch();
  const education = useSelector((state) => state.resume.education);

  const handleChange = (index, field, value) => {
    dispatch(
      updateEducation({
        index,
        education: { ...education[index], [field]: value },
      })
    );
  };

  const handleAddEducation = () => {
    const newEducation = {
      title: '', // Title of the degree or course
      startDate: '', // Start date of the course
      endDate: '', // End date of the course
      school: '', // Name of the school or university
    };
    dispatch(addEducation(newEducation));
  };

  const handleRemoveEducation = (index) => {
    dispatch(removeEducation(index));
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Formation Académique</h2>
      {education.map((edu, index) => (
        <div
          key={index}
          className="mb-6 border-b pb-6 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:gap-8"
        >
          <div className="col-span-1">
            <label className="block mb-2 font-medium">Titre</label>
            <input
              type="text"
              value={edu.title}
              onChange={(e) => handleChange(index, 'title', e.target.value)}
              className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Ex: Licence en Informatique"
            />
          </div>
          <div className="col-span-1">
            <label className="block mb-2 font-medium">Établissement</label>
            <input
              type="text"
              value={edu.school}
              onChange={(e) => handleChange(index, 'school', e.target.value)}
              className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Ex: Université de Paris"
            />
          </div>
          <div className="col-span-1">
            <label className="block mb-2 font-medium">Date de Début</label>
            <input
              type="date"
              value={edu.startDate}
              onChange={(e) => handleChange(index, 'startDate', e.target.value)}
              className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="col-span-1">
            <label className="block mb-2 font-medium">Date de Fin</label>
            <input
              type="date"
              value={edu.endDate}
              onChange={(e) => handleChange(index, 'endDate', e.target.value)}
              className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="col-span-1 md:col-span-2 text-right">
            <button
              type="button"
              onClick={() => handleRemoveEducation(index)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Supprimer la formation
            </button>
          </div>
        </div>
      ))}
      <div className="text-center">
        <button
          type="button"
          onClick={handleAddEducation}
          className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600"
        >
          Ajouter une formation
        </button>
      </div>
    </div>
  );
};

export default EducationForm;
