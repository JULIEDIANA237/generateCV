import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePersonalInfo,updateProfileImage } from '../features/resumeSlice';
 
const PersonalInfoForm = () => {
   
  const dispatch = useDispatch();
  const personalInfo = useSelector((state) => state.resume.personalInfo);
  const [previewImage, setPreviewImage] = useState(localStorage.getItem('profileImage') || null);

  useEffect(() => {
    setPreviewImage(personalInfo.image || localStorage.getItem('profileImage') || null);
  }, [personalInfo.image]);

   

  const convertImageToBase64 = async (imageUrl) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
  
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error("Erreur de conversion de l'image en Base64 :", error);
      return imageUrl; // Retourne l'URL d'origine si la conversion échoue
    }
  };

  useEffect(() => {
    const linkedinData = JSON.parse(localStorage.getItem("linkedinData"));
  
    if (linkedinData) {
      dispatch(updatePersonalInfo({
        firstName: linkedinData.given_name || "",
        lastName: linkedinData.family_name || "",
        email: linkedinData.email || "",
        image: linkedinData.picture || "",
        //title: linkedinData.sub || "",
      }));
    }
  }, [dispatch]);
  

  useEffect(() => {
    const updateProfileImage = async () => {
      if (personalInfo.image && personalInfo.image.startsWith('http')) {
        console.log("Conversion de l'image LinkedIn en Base64...");
        const base64Image = await convertImageToBase64(personalInfo.image);
        dispatch(updatePersonalInfo({ ...personalInfo, image: base64Image }));
      }
    };
  
    updateProfileImage();
  }, [personalInfo.image, dispatch]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updatePersonalInfo({ ...personalInfo, [name]: value }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result;
        
        // Mise à jour de l'image dans localStorage
        localStorage.setItem('profileImage', imageUrl); 
        
        // Mise à jour de Redux
        dispatch(updateProfileImage(imageUrl)); 
        
        // Met à jour l'aperçu immédiatement
        setPreviewImage(imageUrl);  
      };
      reader.readAsDataURL(file);
    }
  };

  
  
  

  return (
    <div className="p-6 w-full max-w-4xl mx-auto">
  <form className="space-y-6 sm:space-y-8">
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
      <div className="w-16 h-16 sm:w-28 sm:h-28 rounded-full overflow-hidden bg-gray-200">
        {previewImage ? (
          <img src={previewImage} alt="Profil" className="w-full h-full object-cover" />
        ) : (
          <span className="text-xs sm:text-sm text-gray-600 flex items-center justify-center h-full">
            Aucune image
          </span>
        )}
      </div>
      <div className="w-full sm:w-auto">
        <label className="block mb-1 sm:mb-2 text-sm sm:text-lg font-medium text-black">
          Photo de profil
        </label>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full sm:w-auto border border-gray-300 rounded-lg p-2 sm:p-3 text-sm sm:text-base text-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-200 ease-in-out shadow-md"
        />
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
      {[
        { label: "Nom", name: "lastName", placeholder: "Entrez votre prénom" },
        { label: "Prénom", name: "firstName", placeholder: "Entrez votre nom" },
        { label: "Email", name: "email", placeholder: "Entrez votre email", type: "email" },
        { label: "Titre", name: "title", placeholder: "Entrez votre titre (ex. Développeur)" },
        { label: "Téléphone", name: "phone", placeholder: "Entrez votre numéro de téléphone", type: "tel" },
        { label: "Adresse", name: "address", placeholder: "Entrez votre adresse" },
      ].map((field) => (
        <div key={field.name} className="w-full">
          <label className="block mb-1 sm:mb-2 text-sm sm:text-lg font-medium text-black">
            {field.label}
          </label>
          <input
            type={field.type || "text"}
            name={field.name}
            value={personalInfo[field.name] || ""}
            onChange={handleChange}
            placeholder={field.placeholder}
            className="w-full min-w-0 border border-gray-300 rounded-lg p-2 sm:p-3 text-sm sm:text-base text-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-200 ease-in-out shadow-md"
          />
        </div>
      ))}
    </div>

    <div>
      <label className="block mb-1 sm:mb-2 text-sm sm:text-lg font-medium text-black">
        Description
      </label>
      <textarea
        name="description"
        value={personalInfo.description || ""}
        onChange={handleChange}
        placeholder="Décrivez-vous en quelques lignes..."
        rows="4"
        className="w-full border border-gray-300 rounded-lg p-2 sm:p-3 text-sm sm:text-base text-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-200 ease-in-out shadow-md"
      />
    </div>
  </form>
</div>


  );
};

export default PersonalInfoForm;
