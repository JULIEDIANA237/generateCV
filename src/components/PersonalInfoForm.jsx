import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePersonalInfo } from '../features/resumeSlice';

const PersonalInfoForm = ({ onFormComplete, setCompletedSections, completedSections }) => {
  const dispatch = useDispatch();
  const personalInfo = useSelector((state) => state.resume.personalInfo);
  const [previewImage, setPreviewImage] = useState(localStorage.getItem('profileImage') || null);

  // Vérification et initialisation de completedSections
  useEffect(() => {
    if (!Array.isArray(completedSections)) {
      setCompletedSections([]); // Initialisation si completedSections n'est pas un tableau
    }
  }, [completedSections, setCompletedSections]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updatePersonalInfo({ ...personalInfo, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result;
        setPreviewImage(base64Image); // Prévisualisation immédiate
        localStorage.setItem('profileImage', base64Image);
        dispatch(updatePersonalInfo({ ...personalInfo, image: base64Image }));
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const allFieldsFilled = personalInfo.firstName && personalInfo.lastName && personalInfo.title && personalInfo.email && personalInfo.phone && personalInfo.description;
    onFormComplete(allFieldsFilled); // Appeler la fonction de rappel avec true ou false

    // Vérifier si completedSections est un tableau valide
    if (Array.isArray(completedSections) && allFieldsFilled && !completedSections.includes('Informations personnelles')) {
      setCompletedSections([...completedSections, 'Informations personnelles']);
    }
  }, [personalInfo, completedSections, setCompletedSections, onFormComplete]);

  return (
    <div className="p-6 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-3xl font-semibold mb-6 text-center text-white">Informations personnelles</h2>

      <form className="space-y-8">
        {/* Upload d'image avec prévisualisation */}
        <div className="flex items-center justify-center gap-6">
          <div className="w-28 h-28 rounded-full overflow-hidden bg-gray-200">
            {previewImage ? (
              <img src={previewImage} alt="Profil" className="w-full h-full object-cover" />
            ) : (
              <span className="text-gray-600 flex items-center justify-center h-full">Aucune image</span>
            )}
          </div>
          <div>
            <label className="block mb-2 text-lg font-medium text-white">Photo de profil</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border border-gray-300 rounded-lg p-3 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 ease-in-out shadow-md"
            />
          </div>
        </div>

        {/* Grille pour les champs de texte */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 text-lg font-medium text-white">Prénom</label>
            <input
              type="text"
              name="firstName"
              value={personalInfo.firstName || ''}
              onChange={handleChange}
              placeholder="Entrez votre prénom"
              className="w-full border border-gray-300 rounded-lg p-3 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 ease-in-out shadow-md"
            />
          </div>
          <div>
            <label className="block mb-2 text-lg font-medium text-white">Nom</label>
            <input
              type="text"
              name="lastName"
              value={personalInfo.lastName || ''}
              onChange={handleChange}
              placeholder="Entrez votre nom"
              className="w-full border border-gray-300 rounded-lg p-3 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 ease-in-out shadow-md"
            />
          </div>
          <div>
            <label className="block mb-2 text-lg font-medium text-white">Titre</label>
            <input
              type="text"
              name="title"
              value={personalInfo.title || ''}
              onChange={handleChange}
              placeholder="Entrez votre titre (ex. Développeur)"
              className="w-full border border-gray-300 rounded-lg p-3 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 ease-in-out shadow-md"
            />
          </div>
          <div>
            <label className="block mb-2 text-lg font-medium text-white">Email</label>
            <input
              type="email"
              name="email"
              value={personalInfo.email || ''}
              onChange={handleChange}
              placeholder="Entrez votre email"
              className="w-full border border-gray-300 rounded-lg p-3 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 ease-in-out shadow-md"
            />
          </div>
          <div>
            <label className="block mb-2 text-lg font-medium text-white">Téléphone</label>
            <input
              type="tel"
              name="phone"
              value={personalInfo.phone || ''}
              onChange={handleChange}
              placeholder="Entrez votre numéro de téléphone"
              className="w-full border border-gray-300 rounded-lg p-3 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 ease-in-out shadow-md"
            />
          </div>
          <div>
            <label className="block mb-2 text-lg font-medium text-white">Description</label>
            <textarea
              name="description"
              value={personalInfo.description || ''}
              onChange={handleChange}
              placeholder="Parlez de vous"
              className="w-full border border-gray-300 rounded-lg p-3 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 ease-in-out shadow-md"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default PersonalInfoForm;
