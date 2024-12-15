import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { updateWorkExperience } from '../features/resumeSlice';

type WorkExperience = {
  title: string;
  orgName: string;
  startYear: string;
  endYear: string;
  jobDescription: string;
};

const WorkExperienceForm: React.FC = () => {
  const dispatch = useDispatch();
  const workExperience = useSelector((state: RootState) => state.resume.workEx);

  const handleChange = (
    index: number,
    field: keyof WorkExperience,
    value: string
  ) => {
    const updatedExperience = [...workExperience];
    updatedExperience[index] = {
      ...updatedExperience[index],
      [field]: value,
    };
    dispatch(updateWorkExperience(updatedExperience));
  };

  const handleAddExperience = () => {
    const newExperience: WorkExperience = {
      title: '',
      orgName: '',
      startYear: '',
      endYear: '',
      jobDescription: '',
    };
    dispatch(updateWorkExperience([...workExperience, newExperience]));
  };

  const handleRemoveExperience = (index: number) => {
    const updatedExperience = workExperience.filter((_, i) => i !== index);
    dispatch(updateWorkExperience(updatedExperience));
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Expérience Professionnelle</h2>
      {workExperience.map((experience, index) => (
        <div key={index} className="mb-6 border-b pb-4">
          <div className="mb-4">
            <label className="block mb-2">Titre du poste</label>
            <input
              type="text"
              value={experience.title}
              onChange={(e) => handleChange(index, 'title', e.target.value)}
              className="w-full border rounded p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Nom de l'organisation</label>
            <input
              type="text"
              value={experience.orgName}
              onChange={(e) => handleChange(index, 'orgName', e.target.value)}
              className="w-full border rounded p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Année de début</label>
            <input
              type="text"
              value={experience.startYear}
              onChange={(e) => handleChange(index, 'startYear', e.target.value)}
              className="w-full border rounded p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Année de fin</label>
            <input
              type="text"
              value={experience.endYear}
              onChange={(e) => handleChange(index, 'endYear', e.target.value)}
              className="w-full border rounded p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Description du poste</label>
            <textarea
              value={experience.jobDescription}
              onChange={(e) =>
                handleChange(index, 'jobDescription', e.target.value)
              }
              className="w-full border rounded p-2"
            ></textarea>
          </div>
          <button
            type="button"
            onClick={() => handleRemoveExperience(index)}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Supprimer l'expérience
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={handleAddExperience}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Ajouter une expérience
      </button>
    </div>
  );
};

export default WorkExperienceForm;
