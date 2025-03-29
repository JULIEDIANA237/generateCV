/*import React, { useState, useEffect, useMemo, Suspense } from 'react';
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

export default ResumePreview;*/

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { injectModel1, injectModel2, injectModel3, injectDefaultModel } from '../utils/templateInjector';

const ResumePreview = () => {
  const { id } = useParams(); // ID du modèle choisi
  const resumeData = useSelector((state) => state.resume);
  const [templateHtml, setTemplateHtml] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      const templatePath = `/template/model${id}/model${id}.html`;
      const cssPath = `/template/model${id}/style.css`;

      fetch(templatePath)
        .then((response) => {
          if (!response.ok) throw new Error("Impossible de charger le template HTML.");
          return response.text();
        })
        .then((html) => {
          console.log("✅ HTML chargé :", html);
          setTemplateHtml(html);

          // 🔹 Charger dynamiquement le CSS
          const link = document.createElement("link");
          link.rel = "stylesheet";
          link.href = cssPath;
          link.type = "text/css";
          document.head.appendChild(link);
        })
        .catch(() => setError("Impossible de charger le template."));
    }
  }, [id]);

  useEffect(() => {
    if (templateHtml) {
      let filledTemplate = templateHtml;

      // 🔹 Injection des données selon le modèle choisi
      switch (id) {
        case "1":
          filledTemplate = injectModel1(filledTemplate, resumeData);
          break;
        case "2":
          filledTemplate = injectModel2(filledTemplate, resumeData);
          break;
        case "3":
          filledTemplate = injectModel3(filledTemplate, resumeData);
          break;
        default:
          filledTemplate = injectDefaultModel(filledTemplate, resumeData);
          break;
      }
      console.log("🔄 Template injecté :", filledTemplate);
      setTemplateHtml(filledTemplate);
    }
  }, [templateHtml, resumeData, id]);

  if (error) return <p className="text-center text-red-500 font-bold">{error}</p>;
  if (!templateHtml) return <p className="text-center">Chargement du template...</p>;
  console.log("🖥️ HTML final affiché :", templateHtml);

  return (
    <div className="resume-container">
      <div dangerouslySetInnerHTML={{ __html: templateHtml }} />
    </div>
  );
};

export default ResumePreview;
