import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addLanguage,
  updateLanguage,
  removeLanguage,
} from '../features/resumeSlice'; // Adjust the import path based on your project structure

const LanguagesForm = () => {
  const languages = useSelector((state) => state.resume.languages);
  const dispatch = useDispatch();

  const [newLanguage, setNewLanguage] = useState({ title: '', level: '' });

  const handleAddLanguage = () => {
    if (newLanguage.title && newLanguage.level) {
      dispatch(addLanguage(newLanguage));
      setNewLanguage({ title: '', level: '' });
    }
  };

  const handleUpdateLanguage = (index, field, value) => {
    const updatedLanguage = { ...languages[index], [field]: value };
    dispatch(updateLanguage({ index, language: updatedLanguage }));
  };

  const handleRemoveLanguage = (index) => {
    dispatch(removeLanguage(index));
  };

  return (
    <div className="p-4 border rounded-lg max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Langues</h2>

      <div className="space-y-4">
        {languages.map((language, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <input
              type="text"
              value={language.title}
              onChange={(e) =>
                handleUpdateLanguage(index, 'title', e.target.value)
              }
              placeholder="Langue (ex: Anglais)"
              className="border p-2 rounded flex-grow focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              value={language.level}
              onChange={(e) =>
                handleUpdateLanguage(index, 'level', e.target.value)
              }
              placeholder="Niveau (ex: Courant)"
              className="border p-2 rounded flex-grow focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={() => handleRemoveLanguage(index)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Supprimer
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-col sm:flex-row items-center gap-4">
        <input
          type="text"
          value={newLanguage.title}
          onChange={(e) =>
            setNewLanguage({ ...newLanguage, title: e.target.value })
          }
          placeholder="Langue (ex: Français)"
          className="border p-2 rounded flex-grow focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          value={newLanguage.level}
          onChange={(e) =>
            setNewLanguage({ ...newLanguage, level: e.target.value })
          }
          placeholder="Niveau (ex: Débutant)"
          className="border p-2 rounded flex-grow focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleAddLanguage}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Ajouter
        </button>
      </div>
    </div>
  );
};

export default LanguagesForm;
