import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ResumePreview from '../components/ResumePreview';
import { useSelector } from 'react-redux';
import jsPDF from 'jspdf';
import { RootState } from '../store';

const MyResumePage: React.FC = () => {
  const navigate = useNavigate();
  const resumeRef = useRef<HTMLDivElement>(null);

  // Utilisez useSelector pour récupérer les données du store Redux
  const resume = useSelector((state: RootState) => state.resume);

  const handleDownloadPDF = () => {
    if (resumeRef.current) {
      const content = resumeRef.current;

      const doc = new jsPDF();
      doc.html(content, {
        callback: function (doc) {
          doc.save('CV.pdf');
        },
        margin: [10, 10, 10, 10],
        autoPaging: true,
      });
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Aperçu de votre CV</h1>
      <div className="flex justify-center mb-4">
        <ResumePreview
          ref={resumeRef}
          personalInfo={resume.personalInfo}  // Données de personalInfo depuis Redux
          workEx={resume.workEx}               // Données de workEx depuis Redux
          education={resume.education}         // Données de education depuis Redux
          skills={resume.skills.map((skill) => skill.skillName)}  // Transformation de skills en tableau de strings
        />
      </div>
      <div className="flex justify-center space-x-4">
        <button
          onClick={() => navigate('/details/1')}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Retour
        </button>
        <button
          onClick={handleDownloadPDF}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Télécharger le CV en PDF
        </button>
      </div>
    </div>
  );
};

export default MyResumePage;
