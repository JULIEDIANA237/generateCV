import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ResumePreview from '../components/ResumePreview';
import { useSelector } from 'react-redux';
import html2canvas from 'html2canvas'; // Import html2canvas
import { FaArrowLeft, FaDownload } from 'react-icons/fa'; // Import des icônes

const MyResumePage = () => {
  const navigate = useNavigate();
  const resumeRef = useRef(null);
  const [isDownloaded, setIsDownloaded] = useState(false); // État pour suivre si le CV a été téléchargé
  const [isDownloading, setIsDownloading] = useState(false); // État pour indiquer que le téléchargement est en cours

  // Utilisez useSelector pour récupérer les données du store Redux
  const resume = useSelector((state) => state.resume);

  const handleDownloadImage = () => {
    if (resumeRef.current) {
      const content = resumeRef.current;

      // Affichage de l'indicateur de chargement
      setIsDownloading(true);

      // Utilisation de html2canvas pour prendre une capture du composant
      html2canvas(content).then((canvas) => {
        // Créer une URL de l'image à partir du canvas
        const imageURL = canvas.toDataURL('image/png');
        
        // Créer un lien temporaire pour télécharger l'image
        const link = document.createElement('a');
        link.href = imageURL;
        link.download = 'CV.png'; // Nom de l'image téléchargée
        link.click();

        // Mettre à jour l'état pour afficher la notification
        setIsDownloaded(true);
        setIsDownloading(false);

        // Masquer la notification après 3 secondes
        setTimeout(() => {
          setIsDownloaded(false);
        }, 3000);
      });
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 p-8 rounded-lg shadow-lg">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800">
        Aperçu de votre CV
      </h1>

      <div className="flex justify-center mb-8">
        <div className="w-full max-w-4xl">
          <ResumePreview
            ref={resumeRef}
            personalInfo={resume.personalInfo}  // Données de personalInfo depuis Redux
            experiences={resume.experiences}    // Données de experiences depuis Redux
            education={resume.education}        // Données de education depuis Redux
            skills={resume.skills.map((skill) => skill.content)}  // Modification de skills pour correspondre au format attendu
            languages={resume.languages}        // Données de languages depuis Redux
            interests={resume.interests}        // Données de interests depuis Redux
          />
        </div>
      </div>
      
      {/* Section des boutons */}
      <div className="flex flex-col sm:flex-row justify-center space-x-0 sm:space-x-4 space-y-4 sm:space-y-0">
        <button
          onClick={() => navigate('/details/1')}
          className="flex items-center justify-center px-4 py-2 sm:px-6 sm:py-3 bg-gray-300 rounded-lg text-center font-semibold hover:bg-gray-400 transition duration-200 text-sm sm:text-base"
        >
          <FaArrowLeft className="mr-2" /> Retour
        </button>
        <button
          onClick={handleDownloadImage}
          className={`flex items-center justify-center px-4 py-2 sm:px-6 sm:py-3 ${isDownloading ? 'bg-gray-400' : 'bg-blue-600'} text-white rounded-lg text-center font-semibold hover:${isDownloading ? 'bg-gray-400' : 'bg-blue-700'} transition duration-200 text-sm sm:text-base`}
          disabled={isDownloading} // Désactive le bouton pendant le téléchargement
        >
          {isDownloading ? (
            <>
              <FaDownload className="mr-2" /> Téléchargement...
            </>
          ) : (
            <>
              <FaDownload className="mr-2" /> Télécharger le CV
            </>
          )}
        </button>
      </div>

      {/* Notification de téléchargement réussi */}
      {isDownloaded && (
        <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-8 py-4 rounded-lg shadow-xl opacity-90 animate-bounce">
          <p className="text-lg font-semibold">Le CV a été téléchargé avec succès !</p>
        </div>
      )}
    </div>
  );
};

export default MyResumePage;
