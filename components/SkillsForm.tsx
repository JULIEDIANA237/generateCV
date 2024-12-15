import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { updateSkills } from '../features/resumeSlice';

const SkillsForm: React.FC = () => {
  const dispatch = useDispatch();
  const skills = useSelector((state: RootState) => state.resume.skills);

  const handleChange = (index: number, value: string) => {
    const updatedSkills = [...skills];
    updatedSkills[index].skillName = value;
    dispatch(updateSkills(updatedSkills));
  };

  const addSkill = () => {
    dispatch(updateSkills([...skills, { skillName: '' }]));
  };

  const removeSkill = (index: number) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    dispatch(updateSkills(updatedSkills));
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Compétences clés</h2>
      {skills.map((skill, index) => (
        <div key={index} className="mb-4">
          <input
            type="text"
            value={skill.skillName}
            onChange={(e) => handleChange(index, e.target.value)}
            className="w-full border rounded p-2"
          />
          <button
            type="button"
            onClick={() => removeSkill(index)}
            className="text-red-500 mt-2"
          >
            Supprimer cette compétence
          </button>
        </div>
      ))}
      <button type="button" onClick={addSkill} className="mt-4 text-blue-500">
        Ajouter une compétence
      </button>
    </div>
  );
};

export default SkillsForm;
