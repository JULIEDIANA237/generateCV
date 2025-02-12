import React, { useState, useEffect } from 'react';
import { TrashIcon } from '@heroicons/react/24/solid';
import { PlusIcon } from '@heroicons/react/24/solid';
import { useDispatch, useSelector } from 'react-redux';
import { addEducation, updateEducation, removeEducation } from '../features/resumeSlice';

const EducationForm = ( ) => {
  const dispatch = useDispatch();
  const education = useSelector((state) => state.resume.education);
  const [notification, setNotification] = useState(null);
  const [errors, setErrors] = useState({});

  // Function to generate years from a given range
  const generateYearOptions = (startYear, endYear) => {
    const years = [];
    for (let year = startYear; year <= endYear; year++) {
      years.push(year);
    }
    return years;
  };

  // Get the current year and a past range (e.g., from 1950 to the current year)
  const currentYear = new Date().getFullYear();
  const yearOptions = generateYearOptions(1950, currentYear);

  // Validation des champs
  const validateField = (field, value, index) => {
    let error = '';
    if (!value) {
      error = 'Ce champ est requis.';
    } else if (field === 'startDate' && value > currentYear) {
      error = 'La date de début ne peut pas être dans le futur.';
    } else if (field === 'endDate' && value < education[index]?.startDate) {
      error = 'La date de fin ne peut pas précéder la date de début.';
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
      title: '',
      startDate: '',
      endDate: '',
      school: '',
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
  <h2 className="text-xl sm:text-3xl font-semibold mb-6 text-center text-orange-400">
    Formation Académique
  </h2>

  {education.map((edu, index) => (
    <div
      key={index}
      className="mb-6 border-b pb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
    >
      <div className="col-span-1">
        <label className="block mb-1 sm:mb-2 font-semibold text-[0.875rem] sm:text-[1rem] text-gray-700">
          Titre
        </label>
        <input
          type="text"
          value={edu.title}
          onChange={(e) => handleChange(index, 'title', e.target.value)}
          className={`w-full border border-gray-300 rounded-lg p-2 sm:p-3 text-[0.875rem] sm:text-[1rem] focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-300 ${
            errors[`${index}-title`] ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Ex: Licence en Informatique"
        />
        {errors[`${index}-title`] && (
          <p className="text-red-600 text-[0.75rem] mt-1 animate-shake">
            {errors[`${index}-title`]}
          </p>
        )}
      </div>
      <div className="col-span-1">
        <label className="block mb-1 sm:mb-2 font-semibold text-[0.875rem] sm:text-[1rem] text-gray-700">
          Établissement
        </label>
        <input
          type="text"
          value={edu.school}
          onChange={(e) => handleChange(index, 'school', e.target.value)}
          className={`w-full border border-gray-300 rounded-lg p-2 sm:p-3 text-[0.875rem] sm:text-[1rem] focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-300 ${
            errors[`${index}-school`] ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Ex: Université de Paris"
        />
        {errors[`${index}-school`] && (
          <p className="text-red-600 text-[0.75rem] mt-1 animate-shake">
            {errors[`${index}-school`]}
          </p>
        )}
      </div>
      <div className="col-span-1">
        <label className="block mb-1 sm:mb-2 font-semibold text-[0.875rem] sm:text-[1rem] text-gray-700">
          Date de Début
        </label>
        <select
          value={edu.startDate}
          onChange={(e) => handleChange(index, 'startDate', e.target.value)}
          className={`w-full border border-gray-300 rounded-lg p-2 sm:p-3 text-[0.875rem] sm:text-[1rem] focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-300 ${
            errors[`${index}-startDate`] ? 'border-red-500' : 'border-gray-300'
          }`}
        >
          <option value="">Sélectionner une année</option>
          {yearOptions.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        {errors[`${index}-startDate`] && (
          <p className="text-red-600 text-[0.75rem] mt-1 animate-shake">
            {errors[`${index}-startDate`]}
          </p>
        )}
      </div>
      <div className="col-span-1">
        <label className="block mb-1 sm:mb-2 font-semibold text-[0.875rem] sm:text-[1rem] text-gray-700">
          Date de Fin
        </label>
        <select
          value={edu.endDate}
          onChange={(e) => handleChange(index, 'endDate', e.target.value)}
          className={`w-full border border-gray-300 rounded-lg p-2 sm:p-3 text-[0.875rem] sm:text-[1rem] focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-300 ${
            errors[`${index}-endDate`] ? 'border-red-500' : 'border-gray-300'
          }`}
        >
          <option value="">Sélectionner une année</option>
          {yearOptions.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        {errors[`${index}-endDate`] && (
          <p className="text-red-600 text-[0.75rem] mt-1 animate-shake">
            {errors[`${index}-endDate`]}
          </p>
        )}
      </div>
      <div className="col-span-1 md:col-span-2 lg:col-span-3 text-right">
        <button
          type="button"
          onClick={() => handleRemoveEducation(index)}
          className="bg-red-500 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg hover:bg-red-600 transition duration-200 transform hover:scale-105 flex items-center justify-center"
        >
          <TrashIcon className="h-5 w-5 sm:h-6 sm:w-6" />
          <span className="hidden sm:inline ml-2">Supprimer</span>
        </button>
      </div>
    </div>
  ))}

  <div className="text-center">
    <button
      type="button"
      onClick={handleAddEducation}
      className="bg-blue-600 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
    >
      <PlusIcon className="h-5 w-5 sm:h-6 sm:w-6" />
      <span className="hidden sm:inline ml-2">Ajouter</span>
    </button>
  </div>
</div>

  );
};

export default EducationForm;
