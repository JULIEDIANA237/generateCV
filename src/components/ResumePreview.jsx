import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectTemplate } from '../features/resumeSlice'; // Importez l'action pour mettre à jour le Redux store

const ResumePreview = () => {
  const { id } = useParams(); // Récupère l'ID du template dans l'URL
  const dispatch = useDispatch();

  const selectedTemplate = useSelector((state) => state.resume.selectedTemplate);
  const rawResumeData = useSelector((state) => state.resume);

  const [templateHtml, setTemplateHtml] = useState('');
  const [templateCss, setTemplateCss] = useState('');

  // Étape 1 : Synchroniser l'ID de l'URL avec Redux
  useEffect(() => {
    if (id && id !== selectedTemplate) {
      console.log(`Synchronisation de l'ID de l'URL (${id}) avec Redux.`);
      dispatch(selectTemplate(id)); // Met à jour Redux avec l'ID de l'URL
    }
  }, [id, selectedTemplate, dispatch]);

  // Étape 2 : Formatter les données du store Redux
  const resumeData = useMemo(() => {
    const linkedInImage = rawResumeData.personalInfo.image || null;
    const localImage = localStorage.getItem('profileImage');
  
    // Si une image LinkedIn est présente, elle écrase l'image stockée
    if (linkedInImage && linkedInImage !== localImage) {
      localStorage.setItem('profileImage', linkedInImage);
    }
  
    return {
      ...rawResumeData,
      personalInfo: {
        ...rawResumeData.personalInfo,
        image: linkedInImage || localImage || null,
      },
    };
  }, [rawResumeData]);
  

  // Étape 3 : Charger les fichiers HTML et CSS du template
  useEffect(() => {
    if (selectedTemplate) {
      console.log(`Chargement du template ${selectedTemplate}...`);

      // Charger le HTML du template
      fetch(`/template/template${selectedTemplate}/template${selectedTemplate}.html`)
        .then((response) => response.text())
        .then((html) => {
          console.log('HTML du template chargé avec succès.');

          let populatedHtml = html
            .replace('{{firstName}}', resumeData.personalInfo.firstName || '')
            .replace('{{lastName}}', resumeData.personalInfo.lastName || '')
            .replace('{{title}}', resumeData.personalInfo.title || '')
            .replace('{{email}}', resumeData.personalInfo.email || '')
            .replace('{{phone}}', resumeData.personalInfo.phone || '')
            .replace('{{description}}', resumeData.personalInfo.description || '')
            .replace('{{image}}', resumeData.personalInfo.image || '');

          populatedHtml = populatedHtml.replace(
            '{{experiences}}',
            resumeData.experiences
              .map(
                (exp) => `
                <div class="experience-item">
                  <h4>${exp.title || ''}</h4>
                  <p>${exp.company || ''} (${exp.startDate || ''} - ${exp.endDate || ''})</p>
                  <p>${exp.jobDescription || ''}</p>
                </div>`
              )
              .join('') || '<p>No experiences added.</p>'
          );

          populatedHtml = populatedHtml.replace(
            '{{education}}',
            resumeData.education
              .map(
                (edu) => `
                <div class="education-item">
                  <h4>${edu.title || ''}</h4>
                  <p>${edu.school || ''} (${edu.startDate || ''} - ${edu.endDate || ''})</p>
                </div>`
              )
              .join('') || '<p>No education history added.</p>'
          );

          populatedHtml = populatedHtml.replace(
            '{{skills}}',
            resumeData.skills
              .map(
                (skill) => `
                <li>
                  <span>${skill.title || ''}</span>
                  <div class="skill-level">
                    ${[...Array(5)]
                      .map((_, index) =>
                        index < (skill.level || 0)
                          ? '<span class="dot filled"></span>'
                          : '<span class="dot"></span>'
                      )
                      .join('')}
                  </div>
                </li>`
              )
              .join('') || '<p>No skills added.</p>'
          );

          populatedHtml = populatedHtml.replace(
            '{{languages}}',
            resumeData.languages
              .map((lang) => `<li>${lang.title || ''} - ${lang.level || ''}</li>`)
              .join('') || '<p>No languages added.</p>'
          );

          populatedHtml = populatedHtml.replace(
            '{{interests}}',
            resumeData.interests
              .map((interest) => `<li>${interest.title || ''}</li>`)
              .join('') || '<p>No interests added.</p>'
          );

          setTemplateHtml(populatedHtml);
        })
        .catch((error) => console.error('Erreur lors du chargement du HTML du template:', error));

      // Charger le CSS du template
      fetch(`/template/template${selectedTemplate}/template${selectedTemplate}.css`)
        .then((response) => response.text())
        .then((css) => {
          console.log('CSS du template chargé avec succès.');
          setTemplateCss(css);
        })
        .catch((error) => console.error('Erreur lors du chargement du CSS du template:', error));
    } else {
      console.log('Aucun template sélectionné.');
    }
  }, [selectedTemplate, resumeData]);

  // Étape 4 : Afficher les états de chargement
  if (!selectedTemplate) {
    return <p className="text-center">No template selected.</p>;
  }

  if (!templateHtml) {
    return <p className="text-center">Loading template...</p>;
  }

  // Étape 5 : Affichage du template
  return (
    <div className="resume-preview">
      {/* Injecter les styles dynamiquement */}
      <style>{templateCss}</style>

      {/* Injecter le contenu HTML */}
      <div dangerouslySetInnerHTML={{ __html: templateHtml }} />
    </div>
  );
};

export default ResumePreview;
