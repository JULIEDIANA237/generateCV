import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addEducation, updateEducation, removeEducation } from '../features/resumeSlice';

const EducationForm = ({ onFormComplete, setCompletedSections, completedSections = [] }) => {
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

  // Vérifier la complétude de la section
  useEffect(() => {
    const allFieldsFilled = education.every(
      (edu) =>
        edu.title &&
        edu.school &&
        edu.startDate &&
        edu.endDate &&
        !Object.values(errors).some((error) => error)
    );

    // Mettre à jour l'état de la complétude pour la section "Formation académique"
    onFormComplete(allFieldsFilled);

    if (allFieldsFilled && !completedSections.includes('Formation académique')) {
      setCompletedSections((prevCompletedSections) => {
        if (!prevCompletedSections.includes('Formation académique')) {
          return [...prevCompletedSections, 'Formation académique'];
        }
        return prevCompletedSections;
      });
    }
  }, [education, errors, onFormComplete, setCompletedSections]);

  return (
    <div className="p-6 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500 rounded-lg shadow-xl transition-all duration-300 ease-in-out">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Formation Académique</h2>

      {education.map((edu, index) => (
        <div key={index} className="mb-6 border-b pb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="col-span-1">
            <label className="block mb-2 font-semibold text-gray-700">Titre</label>
            <input
              type="text"
              value={edu.title}
              onChange={(e) => handleChange(index, 'title', e.target.value)}
              className={`w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ${errors[`${index}-title`] ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Ex: Licence en Informatique"
            />
            {errors[`${index}-title`] && (
              <p className="text-red-600 text-sm mt-1 animate-shake">{errors[`${index}-title`]}</p>
            )}
          </div>
          <div className="col-span-1">
            <label className="block mb-2 font-semibold text-gray-700">Établissement</label>
            <input
              type="text"
              value={edu.school}
              onChange={(e) => handleChange(index, 'school', e.target.value)}
              className={`w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ${errors[`${index}-school`] ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Ex: Université de Paris"
            />
            {errors[`${index}-school`] && (
              <p className="text-red-600 text-sm mt-1 animate-shake">{errors[`${index}-school`]}</p>
            )}
          </div>
          <div className="col-span-1">
            <label className="block mb-2 font-semibold text-gray-700">Date de Début</label>
            <select
              value={edu.startDate}
              onChange={(e) => handleChange(index, 'startDate', e.target.value)}
              className={`w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ${errors[`${index}-startDate`] ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="">Sélectionner une année</option>
              {yearOptions.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            {errors[`${index}-startDate`] && (
              <p className="text-red-600 text-sm mt-1 animate-shake">{errors[`${index}-startDate`]}</p>
            )}
          </div>
          <div className="col-span-1">
            <label className="block mb-2 font-semibold text-gray-700">Date de Fin</label>
            <select
              value={edu.endDate}
              onChange={(e) => handleChange(index, 'endDate', e.target.value)}
              className={`w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ${errors[`${index}-endDate`] ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="">Sélectionner une année</option>
              {yearOptions.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            {errors[`${index}-endDate`] && (
              <p className="text-red-600 text-sm mt-1 animate-shake">{errors[`${index}-endDate`]}</p>
            )}
          </div>
          <div className="col-span-1 md:col-span-2 text-right">
            <button
              type="button"
              onClick={() => handleRemoveEducation(index)}
              className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-transform duration-200 transform hover:scale-105"
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
          className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
        >
          Ajouter une formation
        </button>
      </div>

      {/* Aperçu */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Aperçu des Formations</h3>
        {education.map((edu, index) => (
          <div key={index} className="p-4 border rounded-lg shadow-md bg-white mb-4">
            <h4 className="text-xl font-semibold text-gray-800">{edu.title || 'Titre manquant'}</h4>
            <p className="text-gray-600">{edu.school || 'Établissement manquant'}</p>
            <p className="text-gray-500">
              {edu.startDate || 'Date de début'} - {edu.endDate || 'Date de fin'}
            </p>
          </div>
        ))}
      </div>

      {/* Notification */}
      {notification && (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg opacity-90 transition-all duration-300 transform bounce-in-right">
          {notification}
        </div>
      )}
    </div>
  );
};

export default EducationForm;
