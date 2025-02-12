import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePersonalInfo } from '../features/resumeSlice';
import { useAuth0 } from '@auth0/auth0-react';

const PersonalInfoForm = ({ userData,     }) => {
  const { user, isAuthenticated } = useAuth0();
  const dispatch = useDispatch();
  const personalInfo = useSelector((state) => state.resume.personalInfo);
  const [previewImage, setPreviewImage] = useState(localStorage.getItem('profileImage') || null);

  useEffect(() => {
    if (isAuthenticated && user) {
      console.log('Données Auth0:', user);
      
      const initialData = {
        firstName: user.given_name || personalInfo.firstName || '',
        lastName: user.family_name || personalInfo.lastName || '',
        email: user.email || personalInfo.email || '',
        image: user.picture || personalInfo.image || '',
        phone: personalInfo.phone || '',
        title: personalInfo.title || '',
        description: personalInfo.description || '',
      };

      dispatch(updatePersonalInfo(initialData));

      if (user.picture) {
        setPreviewImage(user.picture);
      }
    }
  }, [isAuthenticated, user, dispatch]);

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
        setPreviewImage(base64Image);
        localStorage.setItem('profileImage', base64Image);
        dispatch(updatePersonalInfo({ ...personalInfo, image: base64Image }));
      };
      reader.readAsDataURL(file);
    }
  };

   
  return (
    <div className="p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-xl sm:text-3xl font-semibold mb-6 text-center text-orange-400">
        Informations personnelles
      </h2>

      <form className="space-y-6 sm:space-y-8">
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
        </div>
      </form>
    </div>
  );
};

export default PersonalInfoForm;
