import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
    <div className="p-6 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500 rounded-lg shadow-lg max-w-3xl mx-auto">
      <h2 className="text-3xl font-semibold mb-6 text-center text-white">Langues</h2>

      {/* Display errors */}
      {error && (
        <div className="bg-red-100 text-red-700 p-4 mb-4 rounded-lg shadow-md">
          {error}
        </div>
      )}

      {/* Notifications */}
      {notification && (
        <div className="bg-green-100 text-green-700 p-4 mb-4 rounded-lg shadow-md">
          {notification}
        </div>
      )}

      {/* List of existing languages */}
      <div className="space-y-6">
        {languages.map((language, index) => (
          <div key={index} className="flex flex-col sm:flex-row items-center gap-6 transition-transform transform hover:scale-105 duration-300">
            <div className="flex-grow">
              <label className="block text-lg font-medium text-white mb-1">Langue</label>
              <input
                type="text"
                value={language.title}
                onChange={(e) => handleUpdateLanguage(index, 'title', e.target.value)}
                placeholder="Langue (ex: Anglais)"
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 ease-in-out shadow-md"
              />
            </div>
            <div className="flex-grow">
              <label className="block text-lg font-medium text-white mb-1">Niveau</label>
              <input
                type="text"
                value={language.level}
                onChange={(e) => handleUpdateLanguage(index, 'level', e.target.value)}
                placeholder="Niveau (ex: Courant)"
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 ease-in-out shadow-md"
              />
            </div>
            <button
              onClick={() => handleRemoveLanguage(index)}
              className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition duration-200 ease-in-out transform hover:scale-105 shadow-md"
            >
              Supprimer
            </button>
          </div>
        ))}
      </div>

      {/* Form for adding a new language */}
      <div className="mt-6 space-y-4 sm:space-y-0 sm:flex sm:items-center sm:gap-6">
        <div className="flex-grow">
          <label className="block text-lg font-medium text-white mb-1">Langue</label>
          <input
            type="text"
            value={newLanguage.title}
            onChange={(e) => setNewLanguage({ ...newLanguage, title: e.target.value })}
            placeholder="Langue (ex: Français)"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 ease-in-out shadow-md"
            onKeyDown={(e) => e.key === 'Enter' && handleAddLanguage()}
          />
        </div>
        <div className="flex-grow">
          <label className="block text-lg font-medium text-white mb-1">Niveau</label>
          <input
            type="text"
            value={newLanguage.level}
            onChange={(e) => setNewLanguage({ ...newLanguage, level: e.target.value })}
            placeholder="Niveau (ex: Débutant)"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 ease-in-out shadow-md"
            onKeyDown={(e) => e.key === 'Enter' && handleAddLanguage()}
          />
        </div>
        <button
          onClick={handleAddLanguage}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-200 ease-in-out transform hover:scale-105 shadow-md"
        >
          Ajouter
        </button>
      </div>
    </div>
  );
};

export default LanguagesForm;
