import React, { useState } from 'react';
import { TrashIcon, PlusIcon } from '@heroicons/react/24/solid';
import { useDispatch, useSelector } from 'react-redux';
import { addEducation, updateEducation, removeEducation } from '../features/resumeSlice';

const EducationForm = () => {
  const dispatch = useDispatch();
  const education = useSelector((state) => state.resume.education);
  const [notification, setNotification] = useState(null);
  const [errors, setErrors] = useState({});

  // Validation des champs
  const validateField = (field, value, index) => {
    let error = '';
    if (!value) {
      error = 'Ce champ est requis.';
    }
    return error;
  };

  // Gérer les changements dans les champs
  const handleChange = (index, field, value) => {
    const error = validateField(field, value, index);
    setErrors((prev) => ({ ...prev, [`${index}-${field}`]: error }));
    dispatch(
      updateEducation({
        index,
        education: { ...education[index], [field]: value },
      })
    );
  };

  // Ajouter une nouvelle formation
  const handleAddEducation = () => {
    const newEducation = {
      degree: '',
      institution: '',
      startDate: '',
      endDate: ''
    };
    dispatch(addEducation(newEducation));
    setNotification('Nouvelle formation ajoutée avec succès !');
    setTimeout(() => setNotification(null), 3000);
  };

  // Supprimer une formation
  const handleRemoveEducation = (index) => {
    dispatch(removeEducation(index));
    setNotification('Formation supprimée avec succès.');
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="p-6 rounded-lg shadow-orange-lg transition-all duration-300 ease-in-out">
      {education.map((edu, index) => (
        <div
          key={index}
          className="mb-6 border-b pb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          <div className="col-span-1">
            <label className="block mb-1 font-semibold text-gray-700">Diplôme</label>
            <input
              type="text"
              value={edu.degree}
              onChange={(e) => handleChange(index, 'degree', e.target.value)}
              className={`w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-300 ${errors[`${index}-degree`] ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Ex: Licence en Informatique"
            />
          </div>
          <div className="col-span-1">
            <label className="block mb-1 font-semibold text-gray-700">Établissement</label>
            <input
              type="text"
              value={edu.institution}
              onChange={(e) => handleChange(index, 'institution', e.target.value)}
              className={`w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-300 ${errors[`${index}-institution`] ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Ex: Université de Paris"
            />
          </div>
          <div className="col-span-1">
            <label className="block mb-1 font-semibold text-gray-700">Date de Début</label>
            <input
              type="date"
              value={edu.startDate}
              onChange={(e) => handleChange(index, 'startDate', e.target.value)}
              className={`w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-300 ${errors[`${index}-startDate`] ? 'border-red-500' : 'border-gray-300'}`}
            />
          </div>
          <div className="col-span-1">
            <label className="block mb-1 font-semibold text-gray-700">Date de Fin</label>
            <input
              type="date"
              value={edu.endDate}
              onChange={(e) => handleChange(index, 'endDate', e.target.value)}
              className={`w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-300 ${errors[`${index}-endDate`] ? 'border-red-500' : 'border-gray-300'}`}
            />
          </div>
          <div className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-end">
            <button
              type="button"
              onClick={() => handleRemoveEducation(index)}
              className="bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 transition duration-200 relative group"
            >
              <TrashIcon className="h-5 w-5" />
              <span className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 text-xs bg-gray-700 text-white px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                Supprimer
              </span>
            </button>
          </div>
        </div>
      ))}
      <div className="text-center">
        <button
          type="button"
          onClick={handleAddEducation}
          className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-all duration-300 relative group"
        >
          <PlusIcon className="h-5 w-5" />
          <span className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 text-xs bg-gray-700 text-white px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
            Ajouter
          </span>
        </button>
      </div>
    </div>
  );
};

export default EducationForm;
