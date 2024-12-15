import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { updatePersonalInfo } from '../features/resumeSlice';

const PersonalInfoForm: React.FC = () => {
  const dispatch = useDispatch();
  const personalInfo = useSelector((state: RootState) => state.resume.personalInfo);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    dispatch(updatePersonalInfo({ ...personalInfo, [name]: value }));
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Informations personnelles</h2>
      <form className="space-y-4">
        <div>
          <label className="block mb-2">Prénom</label>
          <input
            type="text"
            name="firstName"
            value={personalInfo.firstName}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block mb-2">Nom</label>
          <input
            type="text"
            name="lastName"
            value={personalInfo.lastName}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block mb-2">Email</label>
          <input
            type="email"
            name="Email"
            value={personalInfo.Email}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block mb-2">Téléphone</label>
          <input
            type="tel"
            name="Mobile"
            value={personalInfo.Mobile}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block mb-2">Adresse ligne 1</label>
          <input
            type="text"
            name="Address1"
            value={personalInfo.Address1}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block mb-2">Adresse ligne 2</label>
          <input
            type="text"
            name="Address2"
            value={personalInfo.Address2}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block mb-2">Ville</label>
          <input
            type="text"
            name="City"
            value={personalInfo.City}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block mb-2">État</label>
          <input
            type="text"
            name="State"
            value={personalInfo.State}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block mb-2">Code postal</label>
          <input
            type="text"
            name="Pin"
            value={personalInfo.Pin}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block mb-2">Objectif</label>
          <textarea
            name="Objective"
            value={personalInfo.Objective}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>
      </form>
    </div>
  );
};

export default PersonalInfoForm;
