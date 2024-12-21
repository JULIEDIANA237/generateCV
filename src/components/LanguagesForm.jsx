import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TrashIcon } from '@heroicons/react/24/solid';
import { PlusIcon } from '@heroicons/react/24/solid';
import { addLanguage, updateLanguage, removeLanguage } from '../features/resumeSlice';

const LanguagesForm = ({ onFormComplete, setCompletedSections, completedSections = [] }) => {
  const languages = useSelector((state) => state.resume.languages);
  const dispatch = useDispatch();

  const [newLanguage, setNewLanguage] = useState({ title: '', level: '' });
  const [error, setError] = useState('');
  const [notification, setNotification] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  // useRef to track if 'Langues' section has been added
  const hasAddedLangues = useRef(false);

  useEffect(() => {
    // Check if the form is valid (i.e., all languages have title and level)
    const isValid = languages.every((language) => language.title && language.level);
    setIsFormValid(isValid);

    // Notify parent about the form completion status
    onFormComplete(isValid);

    // If the form is valid and 'Langues' is not added yet, add it
    if (isValid && !hasAddedLangues.current) {
      if (!completedSections.includes('Langues')) {
        setCompletedSections((prev) => [...prev, 'Langues']);
        hasAddedLangues.current = true; // Mark that the section is added
      }
    } else if (!isValid && hasAddedLangues.current) {
      // If the form becomes invalid, remove 'Langues' from completedSections
      setCompletedSections((prev) => prev.filter((section) => section !== 'Langues'));
      hasAddedLangues.current = false; // Reset the ref
    }
  }, [languages, onFormComplete, setCompletedSections, completedSections]);

  const handleAddLanguage = () => {
    if (!newLanguage.title.trim() || !newLanguage.level.trim()) {
      setError("Veuillez remplir les deux champs avant d'ajouter une langue.");
      return;
    }

    dispatch(addLanguage(newLanguage));
    setNewLanguage({ title: '', level: '' });
    setError('');
    setNotification('Langue ajoutée avec succès !');
    setTimeout(() => setNotification(''), 3000); // Notification disappears after 3 seconds
  };

  const handleUpdateLanguage = (index, field, value) => {
    if (!value.trim()) {
      setError("Le champ ne peut pas être vide.");
      return;
    }

    const updatedLanguage = { ...languages[index], [field]: value };
    dispatch(updateLanguage({ index, language: updatedLanguage }));
    setError('');
  };

  const handleRemoveLanguage = (index) => {
    dispatch(removeLanguage(index));
    setNotification('Langue supprimée avec succès.');
    setTimeout(() => setNotification(''), 3000);
  };

  return (
    <div className="p-6 rounded-lg shadow-orange-lg max-w-3xl mx-auto">
  <h2 className="text-xl sm:text-3xl font-semibold mb-6 text-center text-orange-400">
    Langues
  </h2>

  {/* Display errors */}
  {error && (
    <div className="bg-red-100 text-red-700 p-4 mb-4 rounded-lg shadow-md text-[0.875rem] sm:text-[1rem]">
      {error}
    </div>
  )}

  {/* Notifications */}
  {notification && (
    <div className="bg-green-100 text-green-700 p-4 mb-4 rounded-lg shadow-md text-[0.875rem] sm:text-[1rem]">
      {notification}
    </div>
  )}

  {/* List of existing languages */}
  <div className="space-y-6">
    {languages.map((language, index) => (
      <div
        key={index}
        className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 transition-transform transform hover:scale-105 duration-300"
      >
        <div className="flex-grow">
          <label className="block text-[0.875rem] sm:text-[1rem] font-medium text-white mb-1">
            Langue
          </label>
          <input
            type="text"
            value={language.title}
            onChange={(e) => handleUpdateLanguage(index, 'title', e.target.value)}
            placeholder="Langue (ex: Anglais)"
            className="w-full border border-gray-300 p-2 sm:p-3 rounded-lg text-[0.875rem] sm:text-[1rem] focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-200 ease-in-out shadow-md"
          />
        </div>
        <div className="flex-grow">
          <label className="block text-[0.875rem] sm:text-[1rem] font-medium text-white mb-1">
            Niveau
          </label>
          <input
            type="text"
            value={language.level}
            onChange={(e) => handleUpdateLanguage(index, 'level', e.target.value)}
            placeholder="Niveau (ex: Courant)"
            className="w-full border border-gray-300 p-2 sm:p-3 rounded-lg text-[0.875rem] sm:text-[1rem] focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-200 ease-in-out shadow-md"
          />
        </div>
        <button
          onClick={() => handleRemoveLanguage(index)}
          className="inline-flex items-center justify-center bg-red-500 text-white p-2 sm:px-6 sm:py-3 rounded-lg hover:bg-red-600 transition duration-200 ease-in-out transform hover:scale-105 shadow-md"
        >
          <TrashIcon className="h-5 w-5 sm:h-6 sm:w-6 text-orange-400" />
          <span className="hidden sm:inline ml-2 text-[0.875rem] sm:text-[1rem]">Supprimer</span>
        </button>
      </div>
    ))}
  </div>

  {/* Form for adding a new language */}
  <div className="mt-6 space-y-4 sm:space-y-0 sm:flex sm:items-center sm:gap-6">
    <div className="flex-grow">
      <label className="block text-[0.875rem] sm:text-[1rem] font-medium text-white mb-1">
        Langue
      </label>
      <input
        type="text"
        value={newLanguage.title}
        onChange={(e) => setNewLanguage({ ...newLanguage, title: e.target.value })}
        placeholder="Langue (ex: Français)"
        className="w-full border border-gray-300 p-2 sm:p-3 rounded-lg text-[0.875rem] sm:text-[1rem] focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-200 ease-in-out shadow-md"
        onKeyDown={(e) => e.key === 'Enter' && handleAddLanguage()}
      />
    </div>
    <div className="flex-grow">
      <label className="block text-[0.875rem] sm:text-[1rem] font-medium text-white mb-1">
        Niveau
      </label>
      <input
        type="text"
        value={newLanguage.level}
        onChange={(e) => setNewLanguage({ ...newLanguage, level: e.target.value })}
        placeholder="Niveau (ex: Débutant)"
        className="w-full border border-gray-300 p-2 sm:p-3 rounded-lg text-[0.875rem] sm:text-[1rem] focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-200 ease-in-out shadow-md"
        onKeyDown={(e) => e.key === 'Enter' && handleAddLanguage()}
      />
    </div>
    <button
      onClick={handleAddLanguage}
      className="inline-flex items-center justify-center bg-blue-500 text-white p-2 sm:px-6 sm:py-3 rounded-lg hover:bg-blue-600 transition duration-200 ease-in-out transform hover:scale-105 shadow-md"
    >
      <PlusIcon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
      <span className="hidden sm:inline ml-2 text-[0.875rem] sm:text-[1rem]">Ajouter</span>
    </button>
  </div>
</div>

  );
};

export default LanguagesForm;
