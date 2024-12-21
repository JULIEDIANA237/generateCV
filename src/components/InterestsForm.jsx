import React, { useState } from 'react';
import { TrashIcon } from '@heroicons/react/24/solid';
import { PlusIcon } from '@heroicons/react/24/solid';
import { useSelector, useDispatch } from 'react-redux';
import {
  addInterest,
  updateInterest,
  removeInterest,
} from '../features/resumeSlice'; // Adjust the import path

const InterestsForm = () => {
  const interests = useSelector((state) => state.resume.interests);
  const dispatch = useDispatch();

  const [newInterest, setNewInterest] = useState('');
  const [error, setError] = useState('');
  const [notification, setNotification] = useState('');

  const handleAddInterest = () => {
    if (newInterest.trim() === '') {
      setError("Le centre d'intérêt ne peut pas être vide.");
      return;
    }

    dispatch(addInterest({ title: newInterest.trim() }));
    setNewInterest('');
    setError('');
    setNotification("Centre d'intérêt ajouté avec succès !");
    setTimeout(() => setNotification(''), 3000); // Notification disappears after 3 seconds
  };

  const handleUpdateInterest = (index, value) => {
    if (value.trim() === '') {
      setError("Le centre d'intérêt ne peut pas être vide.");
      return;
    }

    dispatch(updateInterest({ index, interest: { title: value } }));
    setError('');
  };

  const handleRemoveInterest = (index) => {
    dispatch(removeInterest(index));
    setNotification("Centre d'intérêt supprimé avec succès.");
    setTimeout(() => setNotification(''), 3000);
  };

  return (
    <div className="p-6 rounded-lg shadow-orange-lg max-w-3xl mx-auto">
  <h2 className="text-xl sm:text-3xl font-semibold mb-6 text-center text-orange-400">
    Centres d'Intérêt
  </h2>

  {/* Display errors */}
  {error && (
    <div className="bg-red-100 text-red-700 p-4 mb-4 rounded-lg shadow-md text-[0.875rem] sm:text-[1rem]">
      {error}
    </div>
  )}

  {/* Notification */}
  {notification && (
    <div className="bg-green-100 text-green-700 p-4 mb-4 rounded-lg shadow-md text-[0.875rem] sm:text-[1rem]">
      {notification}
    </div>
  )}

  {/* Existing interests list */}
  <div className="space-y-4">
    {interests.map((interest, index) => (
      <div
        key={index}
        className="flex items-center gap-4 sm:gap-6 transition-transform transform hover:scale-105 duration-300"
      >
        <input
          type="text"
          value={interest.title}
          onChange={(e) => handleUpdateInterest(index, e.target.value)}
          placeholder="Centre d'intérêt"
          className="flex-grow border border-gray-300 p-2 sm:p-3 rounded-lg text-[0.875rem] sm:text-[1rem] focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-200 ease-in-out shadow-md"
        />
        <button
          onClick={() => handleRemoveInterest(index)}
          className="bg-red-500 text-white p-2 sm:px-6 sm:py-3 rounded-lg hover:bg-red-600 transition duration-200 ease-in-out transform hover:scale-105 shadow-md flex items-center justify-center"
        >
          <TrashIcon className="h-5 w-5 sm:h-6 sm:w-6 text-orange-400" />
          <span className="hidden sm:inline ml-2 text-[0.875rem] sm:text-[1rem]">
            Supprimer
          </span>
        </button>
      </div>
    ))}
  </div>

  {/* Add new interest */}
  <div className="mt-6 flex items-center gap-4 sm:gap-6">
    <input
      type="text"
      value={newInterest}
      onChange={(e) => setNewInterest(e.target.value)}
      placeholder="Ajouter un centre d'intérêt"
      className="flex-grow border border-gray-300 p-2 sm:p-3 rounded-lg text-[0.875rem] sm:text-[1rem] focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-200 ease-in-out shadow-md"
      onKeyDown={(e) => e.key === 'Enter' && handleAddInterest()}
    />
    <button
      onClick={handleAddInterest}
      className="bg-blue-500 text-white p-2 sm:px-6 sm:py-3 rounded-lg hover:bg-blue-600 transition duration-200 ease-in-out transform hover:scale-105 shadow-md flex items-center justify-center"
    >
      <PlusIcon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
      <span className="hidden sm:inline ml-2 text-[0.875rem] sm:text-[1rem]">
        Ajouter
      </span>
    </button>
  </div>
</div>

  );
};

export default InterestsForm;
