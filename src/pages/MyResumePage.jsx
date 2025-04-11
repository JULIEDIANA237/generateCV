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
      resumeRef.current.classList.add("print-mode");
      window.scrollTo(0, 0);
      await new Promise((resolve) => setTimeout(resolve, 300));
  
      const canvas = await html2canvas(resumeRef.current, {
        scale: 2,
        useCORS: true,
        windowWidth: 794,
        windowHeight: resumeRef.current.scrollHeight,
        backgroundColor: "#ffffff", // assure un fond blanc
        scrollY: -window.scrollY,   // évite les décalages de scroll
        removeContainer: true,      // nettoie les nodes temporaires
      });
  
      const imgData = canvas.toDataURL("image/jpeg", 0.8);
  
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });
  
      // Dimensions A4
      const pageWidth = 210;
      const pageHeight = 297;
  
      const imgProps = {
        width: pageWidth,
        height: (canvas.height * pageWidth) / canvas.width,
      };
  
      let position = 0;
  
      while (position < imgProps.height) {
        const pageCanvas = document.createElement("canvas");
        const ctx = pageCanvas.getContext("2d");
        if (!ctx) throw new Error("Impossible de récupérer le contexte 2D du canvas.");
      
        const pageHeightPx = (canvas.width * pageHeight) / pageWidth;
      
        pageCanvas.width = canvas.width;
        pageCanvas.height = pageHeightPx;
      
        ctx.drawImage(
          canvas,
          0,
          (position * canvas.height) / imgProps.height,
          canvas.width,
          pageHeightPx,
          0,
          0,
          canvas.width,
          pageHeightPx
        );
      
        const pageImgData = pageCanvas.toDataURL("image/jpeg", 0.8);
        if (position !== 0) pdf.addPage();
        pdf.addImage(pageImgData, "JPEG", 0, 0, pageWidth, pageHeight);
      
        position += pageHeight;
      }
      
  
      const fullName = document.getElementById("full-name")?.textContent?.trim() || "resume";
      pdf.save(`${fullName.replace(/\s+/g, "_").toLowerCase()}.pdf`);

    } catch (error) {
      console.error("Erreur PDF avec pagination :", error);
    } finally {
      resumeRef.current.classList.remove("print-mode");
      setIsLoading(false);
    }
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

