import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ResumePreview from '../components/ResumePreview';
import { FaArrowLeft, FaDownload } from 'react-icons/fa';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const MyResumePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [resumeData, setResumeData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const resumeRef = useRef();

  useEffect(() => {
    if (location.state?.resumeData) {
      setResumeData(location.state.resumeData);
    } else {
      navigate('/');
    }
  }, [location, navigate]);

  const downloadAsPDF = async () => {
    if (!resumeRef.current) return;
    setIsLoading(true);
  
    const canvas = await html2canvas(resumeRef.current, {
      scale: 2, // Augmente la qualité du rendu
      useCORS: true // Pour éviter les problèmes avec les images
    });
  
    const imgData = canvas.toDataURL('image/png');
  
    const pdf = new jsPDF('p', 'mm', 'a4');
  
    const pdfWidth = pdf.internal.pageSize.getWidth(); // Largeur de la page A4
    const pdfHeight = pdf.internal.pageSize.getHeight(); // Hauteur de la page A4
  
    const imgWidth = pdfWidth; // Remplir toute la largeur du PDF
    const imgHeight = (canvas.height * imgWidth) / canvas.width; // Garder les proportions
  
    let y = 0;
  
    while (y < imgHeight) {
      pdf.addImage(imgData, 'PNG', 0, -y, imgWidth, imgHeight);
      
      y += pdfHeight; // Passer à la section suivante
      if (y < imgHeight) {
        pdf.addPage();
      }
    }
  
    pdf.save('Mon_CV.pdf');
    setIsLoading(false);
  };
  

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">
        Aperçu de votre CV
      </h1>

      <div ref={resumeRef} id="resume-preview" className="bg-white p-6   max-w-3xl mx-auto ">
        {resumeData ? <ResumePreview data={resumeData} /> : <p className="text-center text-gray-500">Chargement...</p>}
      </div>

      <div className="flex justify-center gap-4 mt-6">
        {/* Bouton Retour */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base text-white bg-gray-500 hover:bg-gray-600 rounded-lg shadow-md transition-all duration-200"
        >
          <FaArrowLeft /> Retour
        </button>

        {/* Bouton Télécharger PDF */}
        <button
          onClick={downloadAsPDF}
          disabled={isLoading}
          className={`flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base text-white rounded-lg shadow-md transition-all duration-200 ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600'}`}
        >
          {isLoading ? (
            <>
              <FaDownload className="animate-spin" /> Génération en cours...
            </>
          ) : (
            <>
              <FaDownload /> Télécharger PDF
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default MyResumePage;
