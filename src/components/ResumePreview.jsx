import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const ResumePreview = () => {
  const selectedTemplate = useSelector((state) => state.resume.selectedTemplate);
  const resumeData = useSelector((state) => ({
    ...state.resume,
    personalInfo: {
      ...state.resume.personalInfo,
      image: localStorage.getItem('profileImage') || state.resume.personalInfo.image || null,
    },
  }));
  const [templateHtml, setTemplateHtml] = useState('');
  const [templateCss, setTemplateCss] = useState('');

  useEffect(() => {
    if (selectedTemplate) {
      // Charger le HTML du template
      fetch(`/template/template${selectedTemplate}/template${selectedTemplate}.html`)
        .then((response) => response.text())
        .then((html) => {
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
        .catch((error) => console.error('Error loading the template HTML:', error));

      // Charger le CSS du template
      fetch(`/template/template${selectedTemplate}/template${selectedTemplate}.css`)
        .then((response) => response.text())
        .then((css) => setTemplateCss(css))
        .catch((error) => console.error('Error loading the template CSS:', error));
    }
  }, [selectedTemplate, resumeData]);

  if (!selectedTemplate) {
    return <p className="text-center">No template selected.</p>;
  }

  if (!templateHtml) {
    return <p className="text-center">Loading template...</p>;
  }

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
