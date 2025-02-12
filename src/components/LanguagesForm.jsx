import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TrashIcon, PlusIcon } from '@heroicons/react/24/solid';
import { addLanguage, updateLanguage, removeLanguage } from '../features/resumeSlice';

const LanguagesForm = () => {
  const languages = useSelector((state) => state.resume.languages);
  const dispatch = useDispatch();

  const [newLanguage, setNewLanguage] = useState({ title: '', level: '' });
  const [error, setError] = useState('');
  const [notification, setNotification] = useState('');

  const handleAddLanguage = () => {
    if (!newLanguage.title.trim() || !newLanguage.level.trim()) {
      setError("Veuillez remplir les deux champs avant d'ajouter une langue.");
      return;
    }

    dispatch(addLanguage(newLanguage));
    setNewLanguage({ title: '', level: '' });
    setError('');
    setNotification('Langue ajoutée avec succès !');
    setTimeout(() => setNotification(''), 3000);
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

      {error && <div className="bg-red-100 text-red-700 p-4 mb-4 rounded-lg shadow-md">{error}</div>}
      {notification && <div className="bg-green-100 text-green-700 p-4 mb-4 rounded-lg shadow-md">{notification}</div>}

      <div className="space-y-6">
        {languages.map((language, index) => (
          <div key={index} className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <input
              type="text"
              value={language.title}
              onChange={(e) => handleUpdateLanguage(index, 'title', e.target.value)}
              placeholder="Langue (ex: Anglais)"
              className="w-full border border-gray-300 p-2 rounded-lg shadow-md"
            />
            <input
              type="text"
              value={language.level}
              onChange={(e) => handleUpdateLanguage(index, 'level', e.target.value)}
              placeholder="Niveau (ex: Courant)"
              className="w-full border border-gray-300 p-2 rounded-lg shadow-md"
            />
            <button onClick={() => handleRemoveLanguage(index)} className="bg-red-500 text-white p-2 rounded-lg">
              <TrashIcon className="h-5 w-5" />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-6">
        <input
          type="text"
          value={newLanguage.title}
          onChange={(e) => setNewLanguage({ ...newLanguage, title: e.target.value })}
          placeholder="Langue (ex: Français)"
          className="w-full border border-gray-300 p-2 rounded-lg shadow-md"
        />
        <input
          type="text"
          value={newLanguage.level}
          onChange={(e) => setNewLanguage({ ...newLanguage, level: e.target.value })}
          placeholder="Niveau (ex: Débutant)"
          className="w-full border border-gray-300 p-2 rounded-lg shadow-md"
        />
        <button onClick={handleAddLanguage} className="bg-blue-500 text-white p-2 rounded-lg">
          <PlusIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default LanguagesForm;