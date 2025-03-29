/*import React, { useEffect, useState, useRef } from 'react';
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
  const resumeRef = useRef(null);

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

    try {
      const canvas = await html2canvas(resumeRef.current, { scale: 2 });
      const data = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: "a4",
      });

      const imgProperties = pdf.getImageProperties(data);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

      pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("resume.pdf");
    } catch (error) {
      console.error("Erreur lors de la génération du PDF :", error);
    }

    setIsLoading(false);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      
       
      <div ref={resumeRef} id="resume-preview" >
        {resumeData ? <ResumePreview data={resumeData} /> : <p className="text-center text-gray-500">Chargement...</p>}
      </div>

       
      <div className="flex justify-center gap-4 mt-6">
         
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base text-white bg-gray-500 hover:bg-gray-600 rounded-lg shadow-md transition-all duration-200"
        >
          <FaArrowLeft /> Retour
        </button>

         
        <button
          onClick={downloadAsPDF}
          disabled={isLoading}
          className={`flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base text-white rounded-lg shadow-md transition-all duration-200 ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
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

export default MyResumePage;*/

import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ResumePreview from '../components/ResumePreview';
import { FaArrowLeft, FaDownload } from 'react-icons/fa';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';


const MyResumePage = () => {
  const navigate = useNavigate();
  const resumeData = useSelector((state) => state.resume); // Récupération depuis Redux
  const resumeRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!resumeData.personalInfo) {
      navigate('/'); // Redirection si pas de données
    }
  }, [resumeData, navigate]);

  const downloadAsPDF = async () => {
    if (!resumeRef.current) return;
    setIsLoading(true);

    try {
      const canvas = await html2canvas(resumeRef.current, { scale: 2 });
      const data = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: "a4",
      });

      const imgProperties = pdf.getImageProperties(data);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

      pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("resume.pdf");
    } catch (error) {
      console.error("Erreur lors de la génération du PDF :", error);
    }

    setIsLoading(false);
  };

  return (
    <div className="flex flex-col items-center mx-auto py-8 px-4">
      {/* Résumé à exporter en PDF */}
      <div ref={resumeRef} id="resume-preview" className="w-full max-w-4xl">
        <ResumePreview />
      </div>
  
      {/* Boutons */}
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
          className={`flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base text-white rounded-lg shadow-md transition-all duration-200 ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
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

