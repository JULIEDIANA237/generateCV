import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { updateEducation } from '../features/resumeSlice';

type Education = {
  Type: string;
  University: string;
  Degree: string;
  Start: string;
  End: string;
};

const EducationForm: React.FC = () => {
  const dispatch = useDispatch();
  const education = useSelector((state: RootState) => state.resume.education);

  const handleChange = (
    index: number,
    field: keyof Education,
    value: string
  ) => {
    const updatedEducation = [...education];
    updatedEducation[index] = {
      ...updatedEducation[index],
      [field]: value,
    };
    dispatch(updateEducation(updatedEducation));
  };

  const handleAddEducation = () => {
    const newEducation: Education = {
      Type: '',
      University: '',
      Degree: '',
      Start: '',
      End: '',
    };
    dispatch(updateEducation([...education, newEducation]));
  };

  const handleRemoveEducation = (index: number) => {
    const updatedEducation = education.filter((_, i) => i !== index);
    dispatch(updateEducation(updatedEducation));
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Formation Académique</h2>
      {education.map((edu, index) => (
        <div key={index} className="mb-6 border-b pb-4">
          <div className="mb-4">
            <label className="block mb-2">Type</label>
            <input
              type="text"
              value={edu.Type}
              onChange={(e) => handleChange(index, 'Type', e.target.value)}
              className="w-full border rounded p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Université</label>
            <input
              type="text"
              value={edu.University}
              onChange={(e) => handleChange(index, 'University', e.target.value)}
              className="w-full border rounded p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Diplôme</label>
            <input
              type="text"
              value={edu.Degree}
              onChange={(e) => handleChange(index, 'Degree', e.target.value)}
              className="w-full border rounded p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Début</label>
            <input
              type="text"
              value={edu.Start}
              onChange={(e) => handleChange(index, 'Start', e.target.value)}
              className="w-full border rounded p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Fin</label>
            <input
              type="text"
              value={edu.End}
              onChange={(e) => handleChange(index, 'End', e.target.value)}
              className="w-full border rounded p-2"
            />
          </div>
          <button
            type="button"
            onClick={() => handleRemoveEducation(index)}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Supprimer la formation
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={handleAddEducation}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Ajouter une formation
      </button>
    </div>
  );
};

export default EducationForm;
