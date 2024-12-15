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

  const handleAddInterest = () => {
    if (newInterest) {
      dispatch(addInterest({ title: newInterest }));
      setNewInterest('');
    }
  };

  const handleUpdateInterest = (index, value) => {
    dispatch(updateInterest({ index, interest: { title: value } }));
  };

  const handleRemoveInterest = (index) => {
    dispatch(removeInterest(index));
  };

  return (
    <div className="p-4 border rounded-lg max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Centres d'Intérêt</h2>

      <div className="space-y-4">
        {interests.map((interest, index) => (
          <div key={index} className="flex flex-col sm:flex-row items-center gap-4">
            <input
              type="text"
              value={interest.title}
              onChange={(e) => handleUpdateInterest(index, e.target.value)}
              placeholder="Centre d'intérêt"
              className="w-full sm:flex-grow border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={() => handleRemoveInterest(index)}
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
          value={newInterest}
          onChange={(e) => setNewInterest(e.target.value)}
          placeholder="Ajouter un centre d'intérêt"
          className="w-full sm:flex-grow border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleAddInterest}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Ajouter
        </button>
      </div>
    </div>
  );
};

export default InterestsForm;
