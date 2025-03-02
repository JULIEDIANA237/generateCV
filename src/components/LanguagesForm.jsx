import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TrashIcon, PlusIcon } from '@heroicons/react/24/solid';
import { addLanguage, updateLanguage, removeLanguage } from '../features/resumeSlice';

const LanguageList = ({ languages, onUpdate, onRemove }) => {
  return (
    <div className="space-y-4">
      {languages.map((language, index) => (
        <div key={index} className="flex flex-col sm:flex-row items-center gap-4">
          <input
            type="text"
            value={language.title}
            onChange={(e) => onUpdate(index, 'title', e.target.value)}
            placeholder="Langue (ex: Anglais)"
            className="w-full border border-gray-300 p-2 rounded-lg"
          />
          <select
            value={language.level}
            onChange={(e) => onUpdate(index, 'level', e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-lg"
          >
            <option value="">Sélectionner un niveau</option>
            <option value="Débutant">Débutant</option>
            <option value="Intermédiaire">Intermédiaire</option>
            <option value="Avancé">Avancé</option>
            <option value="Courant">Courant</option>
          </select>
          <button
            onClick={() => onRemove(index)}
            className="bg-red-500 text-white p-2 rounded-lg relative group"
          >
            <TrashIcon className="h-5 w-5" />
            <span className="absolute bottom-full mb-1 hidden group-hover:block bg-black text-white text-xs rounded px-2 py-1">
              Supprimer
            </span>
          </button>
        </div>
      ))}
    </div>
  );
};

const LanguageForm = ({ onAdd }) => {
  const [newLanguage, setNewLanguage] = useState({ title: '', level: '' });
  const [error, setError] = useState('');

  const handleAdd = () => {
    if (!newLanguage.title.trim() || !newLanguage.level.trim()) {
      setError("Veuillez remplir tous les champs avant d'ajouter une langue.");
      return;
    }

    onAdd(newLanguage);
    setNewLanguage({ title: '', level: '' });
    setError('');
  };

  return (
    <div className="mt-6 flex flex-col gap-4">
      {error && <div className="bg-red-100 text-red-700 p-2 rounded-lg">{error}</div>}
      <input
        type="text"
        value={newLanguage.title}
        onChange={(e) => setNewLanguage({ ...newLanguage, title: e.target.value })}
        placeholder="Langue (ex: Français)"
        className="w-full border border-gray-300 p-2 rounded-lg"
      />
      <select
        value={newLanguage.level}
        onChange={(e) => setNewLanguage({ ...newLanguage, level: e.target.value })}
        className="w-full border border-gray-300 p-2 rounded-lg"
      >
        <option value="">Sélectionner un niveau</option>
        <option value="Débutant">Débutant</option>
        <option value="Intermédiaire">Intermédiaire</option>
        <option value="Avancé">Avancé</option>
        <option value="Courant">Courant</option>
      </select>
      <button
        onClick={handleAdd}
        className="bg-blue-500 text-white p-2 rounded-lg relative group"
      >
        <PlusIcon className="h-5 w-5" />
        <span className="absolute bottom-full mb-1 hidden group-hover:block bg-black text-white text-xs rounded px-2 py-1">
          Ajouter
        </span>
      </button>
    </div>
  );
};

const LanguagesForm = () => {
  const languages = useSelector((state) => state.resume.languages);
  const dispatch = useDispatch();

  const [notification, setNotification] = useState('');

  const handleAddLanguage = (language) => {
    dispatch(addLanguage(language));
    setNotification('Langue ajoutée avec succès !');
    setTimeout(() => setNotification(''), 3000);
  };

  const handleUpdateLanguage = (index, field, value) => {
    const updatedLanguage = { ...languages[index], [field]: value };
    dispatch(updateLanguage({ index, language: updatedLanguage }));
  };

  const handleRemoveLanguage = (index) => {
    dispatch(removeLanguage(index));
    setNotification('Langue supprimée avec succès.');
    setTimeout(() => setNotification(''), 3000);
  };

  return (
    <div className="p-6 rounded-lg shadow-lg max-w-3xl mx-auto bg-white">
       
      {notification && <div className="bg-green-100 text-green-700 p-2 mb-4 rounded-lg">{notification}</div>}
      
      {/* Liste des langues */}
      <LanguageList languages={languages} onUpdate={handleUpdateLanguage} onRemove={handleRemoveLanguage} />

      {/* Formulaire d'ajout */}
      <LanguageForm onAdd={handleAddLanguage} />
    </div>
  );
};

export default LanguagesForm;
