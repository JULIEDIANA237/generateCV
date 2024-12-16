import React, { useState } from 'react';
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
    <div className="p-6 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500 rounded-lg shadow-lg max-w-3xl mx-auto">
      <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Centres d'Intérêt</h2>

      {/* Display errors */}
      {error && (
        <div className="bg-red-100 text-red-700 p-4 mb-4 rounded-lg shadow-md">
          {error}
        </div>
      )}

      {/* Notification */}
      {notification && (
        <div className="bg-green-100 text-green-700 p-4 mb-4 rounded-lg shadow-md">
          {notification}
        </div>
      )}

      {/* Existing interests list */}
      <div className="space-y-4">
        {interests.map((interest, index) => (
          <div key={index} className="flex flex-col sm:flex-row items-center gap-6 transition-transform transform hover:scale-105 duration-300">
            <input
              type="text"
              value={interest.title}
              onChange={(e) => handleUpdateInterest(index, e.target.value)}
              placeholder="Centre d'intérêt"
              className="w-full sm:flex-grow border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 ease-in-out shadow-md"
            />
            <button
              onClick={() => handleRemoveInterest(index)}
              className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition duration-200 ease-in-out transform hover:scale-105 shadow-md"
            >
              Supprimer
            </button>
          </div>
        ))}
      </div>

      {/* Add new interest */}
      <div className="mt-6 flex flex-col sm:flex-row items-center gap-6">
        <input
          type="text"
          value={newInterest}
          onChange={(e) => setNewInterest(e.target.value)}
          placeholder="Ajouter un centre d'intérêt"
          className="w-full sm:flex-grow border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 ease-in-out shadow-md"
          onKeyDown={(e) => e.key === 'Enter' && handleAddInterest()}
        />
        <button
          onClick={handleAddInterest}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-200 ease-in-out transform hover:scale-105 shadow-md"
        >
          Ajouter
        </button>
      </div>
    </div>
  );
};

export default InterestsForm;
