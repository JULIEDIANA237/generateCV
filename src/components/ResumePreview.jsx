import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectTemplate } from '../features/resumeSlice';

const ResumePreview = () => {
  const { id } = useParams(); // ID du template dans l'URL
  const dispatch = useDispatch();
  const selectedTemplate = useSelector((state) => state.resume.selectedTemplate);
  const resumeData = useSelector((state) => state.resume);
  const [TemplateComponent, setTemplateComponent] = useState(null);
  const [error, setError] = useState(null);

  console.log("Données du CV récupérées depuis Redux :", resumeData);

  // Synchronisation de l'ID de l'URL avec Redux
  useEffect(() => {
    if (id && id !== selectedTemplate) {
      console.log(`Mise à jour du template sélectionné avec l'ID: ${id}`);
      dispatch(selectTemplate(id));
    }
  }, [id, selectedTemplate, dispatch]);
  

  // Formatage des données du CV
  const formattedResumeData = useMemo(() => {
    return {
      ...resumeData,
      personalInfo: {
        ...resumeData.personalInfo,
        image: resumeData.personalInfo.image, // Toujours prendre l'image de Redux
      },
    };
  }, [resumeData]);
  

  // Chargement dynamique du template
  useEffect(() => {
    if (selectedTemplate) {
      console.log(`Chargement du template resume${selectedTemplate}.jsx...`);
      import(`../models/resume${selectedTemplate}.jsx`)
        .then((module) => {
          console.log('Template chargé avec succès.');
          setTemplateComponent(() => module.default);
        })
        .catch((err) => {
          console.error("Erreur lors du chargement du template :", err);
          setError("Impossible de charger le template. Veuillez vérifier l'ID.");
        });
    }
  }, [selectedTemplate]);

  // Gestion des erreurs
  if (error) {
    return <p className="text-center text-red-500 font-bold">{error}</p>;
  }

  if (!selectedTemplate) {
    return <p className="text-center">Aucun template sélectionné.</p>;
  }

  if (!TemplateComponent) {
    return <p className="text-center">Chargement du template...</p>;
  }

  return (
    <Suspense fallback={<p className="text-center">Chargement du template...</p>}>
      <TemplateComponent {...formattedResumeData} />


    </Suspense>
  );
};

export default ResumePreview;
