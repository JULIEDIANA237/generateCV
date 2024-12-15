import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ResumePreview from '../components/ResumePreview';
import { useSelector } from 'react-redux';
import html2canvas from 'html2canvas'; // Import html2canvas

const MyResumePage = () => {
  const navigate = useNavigate();
  const resumeRef = useRef(null);

  // Utilisez useSelector pour récupérer les données du store Redux
  const resume = useSelector((state) => state.resume);

  const handleDownloadImage = () => {
    if (resumeRef.current) {
      const content = resumeRef.current;

      // Utilisation de html2canvas pour prendre une capture du composant
      html2canvas(content).then((canvas) => {
        // Créer une URL de l'image à partir du canvas
        const imageURL = canvas.toDataURL('image/png');
        
        // Créer un lien temporaire pour télécharger l'image
        const link = document.createElement('a');
        link.href = imageURL;
        link.download = 'CV.png'; // Nom de l'image téléchargée
        link.click();
      });
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Aperçu de votre CV</h1>
      <div className="flex justify-center mb-4">
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
      <div className="flex flex-col sm:flex-row justify-center space-x-0 sm:space-x-4 space-y-4 sm:space-y-0">
        <button
          onClick={() => navigate('/details/1')}
          className="px-6 py-2 bg-gray-300 rounded text-center"
        >
          Retour
        </button>
        <button
          onClick={handleDownloadImage}
          className="px-6 py-2 bg-blue-500 text-white rounded text-center"
        >
          Télécharger le CV  
        </button>
      </div>
    </div>
  );
};

export default MyResumePage;
