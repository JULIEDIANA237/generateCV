import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePersonalInfo } from '../features/resumeSlice';

const PersonalInfoForm = ({ userData, onFormComplete }) => {
  const dispatch = useDispatch();
  const personalInfo = useSelector((state) => state.resume.personalInfo);
  const [previewImage, setPreviewImage] = useState(localStorage.getItem('profileImage') || null);

  // Synchronisation des données initiales transmises via userData
  useEffect(() => {
    if (userData) {
      console.log('Données transmises à PersonalInfoForm:', userData);
  
      const initialData = {
        firstName: userData.firstName || '',
        lastName: userData.lastName || '',
        email: userData.email || '',
        image: userData.profilePicture || '',
        phone: userData.phone || '',
        title: userData.title || '',
        description: userData.description || '',
      };
  
      dispatch(updatePersonalInfo(initialData)); // Met à jour les données une seule fois
  
      if (userData.profilePicture) {
        setPreviewImage(userData.profilePicture); // Met à jour l'aperçu de l'image
      }
    }
  }, [userData, dispatch]); // Supprime `personalInfo` du tableau des dépendances
  

  // Gestion des modifications des champs
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updatePersonalInfo({ ...personalInfo, [name]: value }));
  };

  // Gestion de l'importation de l'image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result;
        setPreviewImage(base64Image);
        localStorage.setItem('profileImage', base64Image);
        dispatch(updatePersonalInfo({ ...personalInfo, image: base64Image }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Validation de complétion du formulaire
  useEffect(() => {
    const allFieldsFilled =
      personalInfo.firstName &&
      personalInfo.lastName &&
      personalInfo.title &&
      personalInfo.email &&
      personalInfo.phone &&
      personalInfo.description;

    onFormComplete(allFieldsFilled);
  }, [personalInfo, onFormComplete]);

  return (
    <div className="p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-xl sm:text-3xl font-semibold mb-6 text-center text-orange-400">
        Informations personnelles
      </h2>

      <form className="space-y-6 sm:space-y-8">
        {/* Prévisualisation de l'image */}
        <div className="flex items-center justify-center gap-4 sm:gap-6">
          <div className="w-16 h-16 sm:w-28 sm:h-28 rounded-full overflow-hidden bg-gray-200">
            {previewImage ? (
              <img src={previewImage} alt="Profil" className="w-full h-full object-cover" />
            ) : (
              <span className="text-xs sm:text-sm text-gray-600 flex items-center justify-center h-full">
                Aucune image
              </span>
            )}
          </div>
          <div>
            <label className="block mb-1 sm:mb-2 text-sm sm:text-lg font-medium text-black">
              Photo de profil
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border border-gray-300 rounded-lg p-2 sm:p-3 text-sm sm:text-base text-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-200 ease-in-out shadow-md"
            />
          </div>
        </div>

        {/* Champs de texte */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="block mb-1 sm:mb-2 text-sm sm:text-lg font-medium text-black">
              Prénom
            </label>
            <input
              type="text"
              name="firstName"
              value={personalInfo.firstName || ''}
              onChange={handleChange}
              placeholder="Entrez votre prénom"
              className="w-full border border-gray-300 rounded-lg p-2 sm:p-3 text-sm sm:text-base text-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-200 ease-in-out shadow-md"
            />
          </div>
          <div>
            <label className="block mb-1 sm:mb-2 text-sm sm:text-lg font-medium text-black">
              Nom
            </label>
            <input
              type="text"
              name="lastName"
              value={personalInfo.lastName || ''}
              onChange={handleChange}
              placeholder="Entrez votre nom"
              className="w-full border border-gray-300 rounded-lg p-2 sm:p-3 text-sm sm:text-base text-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-200 ease-in-out shadow-md"
            />
          </div>
          <div>
            <label className="block mb-1 sm:mb-2 text-sm sm:text-lg font-medium text-black">
              Titre
            </label>
            <input
              type="text"
              name="title"
              value={personalInfo.title || ''}
              onChange={handleChange}
              placeholder="Entrez votre titre (ex. Développeur)"
              className="w-full border border-gray-300 rounded-lg p-2 sm:p-3 text-sm sm:text-base text-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-200 ease-in-out shadow-md"
            />
          </div>
          <div>
            <label className="block mb-1 sm:mb-2 text-sm sm:text-lg font-medium text-black">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={personalInfo.email || ''}
              onChange={handleChange}
              placeholder="Entrez votre email"
              className="w-full border border-gray-300 rounded-lg p-2 sm:p-3 text-sm sm:text-base text-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-200 ease-in-out shadow-md"
            />
          </div>
          <div>
            <label className="block mb-1 sm:mb-2 text-sm sm:text-lg font-medium text-black">
              Téléphone
            </label>
            <input
              type="tel"
              name="phone"
              value={personalInfo.phone || ''}
              onChange={handleChange}
              placeholder="Entrez votre numéro de téléphone"
              className="w-full border border-gray-300 rounded-lg p-2 sm:p-3 text-sm sm:text-base text-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-200 ease-in-out shadow-md"
            />
          </div>
          <div>
            <label className="block mb-1 sm:mb-2 text-sm sm:text-lg font-medium text-black">
              Description
            </label>
            <textarea
              name="description"
              value={personalInfo.description || ''}
              onChange={handleChange}
              placeholder="Parlez de vous"
              className="w-full border border-gray-300 rounded-lg p-2 sm:p-3 text-sm sm:text-base text-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-200 ease-in-out shadow-md"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default PersonalInfoForm;
