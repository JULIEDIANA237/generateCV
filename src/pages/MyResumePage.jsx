import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ResumePreview from '../components/ResumePreview';
import { FaArrowLeft, FaDownload } from 'react-icons/fa';
import html2pdf from 'html2pdf.js';

const MyResumePage = () => {
  const navigate = useNavigate();
  const resumeRef = useRef(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadPDF = () => {
    if (resumeRef.current) {
      setIsDownloading(true);

      const options = {
        margin: 0, // Marges (haut, droite, bas, gauche)
        filename: 'CV.pdf',
        image: { type: 'PNG', quality: 1 },
        html2canvas: {
          scale: 2, // Augmente la qualité du rendu
          useCORS: true, // Autorise les ressources externes
        },
      };

      // Génération du PDF
      html2pdf()
        .set(options)
        .from(resumeRef.current)
        .save()
        .then(() => {
          console.log('PDF téléchargé avec succès.');
        })
        .catch((error) => {
          console.error('Erreur lors de la génération du PDF:', error);
        })
        .finally(() => {
          setIsDownloading(false);
        });
    }
  };

  return (
    <div className="resume-page-container">
      <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6 px-4">
        Aperçu de votre CV
      </h1>

      {/* Conteneur pour le CV */}
      <div
        ref={resumeRef}
         
      >
        <ResumePreview />
      </div>

      {/* Boutons d'action */}
      <div className="actions flex flex-wrap justify-center mt-6 gap-4 px-4">
        {/* Bouton Retour */}
        <button
          onClick={() => navigate('/details/1')}
          className="flex items-center justify-center w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
        >
          <FaArrowLeft className="mr-2" />
          Retour
        </button>

        {/* Bouton Télécharger en PDF */}
        <button
          onClick={handleDownloadPDF}
          disabled={isDownloading}
          className={`flex items-center justify-center w-full sm:w-auto px-4 py-2 text-white rounded-md shadow-md transition duration-200 focus:outline-none focus:ring-2 ${
            isDownloading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-500 hover:bg-green-600 focus:ring-green-400'
          }`}
        >
          {isDownloading ? (
            'Téléchargement...'
          ) : (
            <>
              <FaDownload className="mr-2" />
              Télécharger en PDF
            </>
          )}
        </button>
      </div>

    </div>
  );
};

export default MyResumePage;
