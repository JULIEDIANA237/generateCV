import React, { useState } from 'react';
import { TrashIcon, PlusIcon } from '@heroicons/react/24/solid';
import { useDispatch, useSelector } from 'react-redux';
import { addExperience, updateExperience, removeExperience } from '../features/resumeSlice';

const WorkExperienceForm = () => {
  const dispatch = useDispatch();
  const experiences = useSelector((state) => state.resume.experiences) || [];

  const handleChange = (index, field, value) => {
    const updatedExperience = { ...experiences[index], [field]: value };
    dispatch(updateExperience({ index, experience: updatedExperience }));
  };

  const handleTaskChange = (index, taskIndex, value) => {
    const updatedTasks = [...experiences[index].tasks];
    updatedTasks[taskIndex] = value;
    handleChange(index, 'tasks', updatedTasks);
  };

  const handleAddTask = (index) => {
    const updatedTasks = [...experiences[index].tasks, ''];
    handleChange(index, 'tasks', updatedTasks);
  };

  const handleRemoveTask = (index, taskIndex) => {
    const updatedTasks = experiences[index].tasks.filter((_, i) => i !== taskIndex);
    handleChange(index, 'tasks', updatedTasks);
  };

  const handleAddExperience = () => {
    const newExperience = {
      position: '',
      company: '',
      startDate: '',
      endDate: '',
      tasks: ['']
    };
    dispatch(addExperience(newExperience));
  };

  const handleRemoveExperience = (index) => {
    dispatch(removeExperience(index));
  };

  return (
    <div className="p-6 w-full max-w-4xl mx-auto">
   

  {experiences.map((experience, index) => (
    <div key={index} className="mb-8 p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4">
        <div className="w-full">
          <label className="block mb-1 font-semibold text-gray-700 text-sm">Poste</label>
          <input
            type="text"
            value={experience.position}
            onChange={(e) => handleChange(index, 'position', e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-1.5 sm:p-2 text-sm"
            placeholder="Ex: Développeur Web"
          />
        </div>
        <div className="w-full">
          <label className="block mb-1 font-semibold text-gray-700 text-sm">Entreprise</label>
          <input
            type="text"
            value={experience.company}
            onChange={(e) => handleChange(index, 'company', e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-1.5 sm:p-2 text-sm"
            placeholder="Ex: TechCorp"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4">
        <div className="w-full">
          <label className="block mb-1 font-semibold text-gray-700 text-sm">Date de début</label>
          <input
            type="date"
            value={experience.startDate}
            onChange={(e) => handleChange(index, 'startDate', e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-1.5 sm:p-2 text-sm"
            placeholder="Ex: Janv. 2020"
          />
        </div>
        <div className="w-full flex flex-col">
          <label className="block mb-1 font-semibold text-gray-700 text-sm">
            Date de fin
          </label>
          <input
            type="date"
            value={experience.endDate !== "Présent" ? experience.endDate : ""}
            onChange={(e) => handleChange(index, "endDate", e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-1.5 sm:p-2 text-sm"
            disabled={experience.endDate === "Présent"}
          />
          <label className="flex items-center text-sm text-gray-700 mt-2">
            <input
              type="checkbox"
              checked={experience.endDate === "Présent"}
              onChange={(e) =>
                handleChange(index, "endDate", e.target.checked ? "Présent" : "")
              }
              className="mr-2"
            />
            jusqu'à présent
          </label>
        </div>

      </div>

      <div className="mb-4">
        <label className="block mb-1 font-semibold text-gray-700 text-sm">Tâches</label>
        {experience.tasks.map((task, taskIndex) => (
          <div key={taskIndex} className="flex items-center gap-2 mb-2">
            <input
              type="text"
              value={task}
              onChange={(e) => handleTaskChange(index, taskIndex, e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-1.5 sm:p-2 text-sm"
              placeholder="Ex: Développement Frontend"
            />
            <button
              type="button"
              onClick={() => handleRemoveTask(index, taskIndex)}
              className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 relative group"
            >
              <TrashIcon className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 text-xs bg-gray-700 text-white px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                Supprimer
              </span>
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => handleAddTask(index)}
          className="mt-2 bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 relative group"
        >
          <PlusIcon className="h-5 w-5" />
          <span className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 text-xs bg-gray-700 text-white px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
            Ajouter une tâche
          </span>
        </button>
      </div>

       
    </div>
  ))}

  <div className="flex gap-2 mt-4">
  <button
    type="button"
    onClick={handleAddExperience}
    className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 relative group flex items-center"
  >
    <PlusIcon className="h-5 w-5" />
    <span className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 text-xs bg-gray-700 text-white px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
      Ajouter une expérience
    </span>
  </button>

  <button
    type="button"
    onClick={() => handleRemoveExperience(index)}
    className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 relative group flex items-center"
  >
    <TrashIcon className="h-5 w-5" />
    <span className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 text-xs bg-gray-700 text-white px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
      Supprimer l'expérience
    </span>
  </button>
</div>

</div>


  );
};

export default WorkExperienceForm;
