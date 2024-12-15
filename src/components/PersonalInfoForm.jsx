import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePersonalInfo } from '../features/resumeSlice';

const PersonalInfoForm = () => {
  const dispatch = useDispatch();

  // Sélectionner les informations personnelles depuis l'état Redux
  const personalInfo = useSelector((state) => state.resume.personalInfo);

  // Gérer les changements dans les champs de saisie
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updatePersonalInfo({ ...personalInfo, [name]: value }));
  };

  // Gérer le changement d'image (conversion en base64 et stockage dans localStorage)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result; // Contient l'image en base64
        // Sauvegarder l'image dans le localStorage
        localStorage.setItem('profileImage', base64Image);
        // Mettre à jour l'état Redux avec l'URL de l'image
        dispatch(updatePersonalInfo({ ...personalInfo, image: base64Image }));
      };
      reader.readAsDataURL(file); // Lire l'image en base64
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Informations personnelles</h2>
      <form className="space-y-6">
        {/* Upload d'image */}
        <div>
          <label className="block mb-2 font-medium">Photo de profil</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border rounded p-2"
          />
        </div>

        {/* Grille pour organiser les champs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Prénom */}
          <div>
            <label className="block mb-2 font-medium">Prénom</label>
            <input
              type="text"
              name="firstName"
              value={personalInfo.firstName || ''}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>

          {/* Nom */}
          <div>
            <label className="block mb-2 font-medium">Nom</label>
            <input
              type="text"
              name="lastName"
              value={personalInfo.lastName || ''}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Titre professionnel */}
          <div>
            <label className="block mb-2 font-medium">Titre professionnel</label>
            <input
              type="text"
              name="title"
              value={personalInfo.title || ''}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={personalInfo.email || ''}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Téléphone */}
          <div>
            <label className="block mb-2 font-medium">Téléphone</label>
            <input
              type="tel"
              name="phone"
              value={personalInfo.phone || ''}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block mb-2 font-medium">Description</label>
          <textarea
            name="description"
            value={personalInfo.description || ''}
            onChange={handleChange}
            className="w-full border rounded p-2"
            rows="4"
          />
        </div>
      </form>
    </div>
  );
};

export default PersonalInfoForm;
