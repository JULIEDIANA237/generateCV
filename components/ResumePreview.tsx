import { forwardRef } from 'react';
import Template1 from '../components/templates/Template1';  // Assurez-vous que Template1 existe

interface ResumePreviewProps {
  personalInfo: {
    selectedTemplate: string;  // Cette propriété doit être utilisée pour choisir le template
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    pin: string;
    objective: string;
  };
  workEx: any[];  // Assurez-vous de définir le bon type pour 'workEx'
  education: any[];  // Idem pour 'education'
  skills: string[];
}

const ResumePreview = forwardRef<HTMLDivElement, ResumePreviewProps>((props, ref) => {
  const { personalInfo, workEx, education, skills } = props;

  const renderTemplate = () => {
    switch (personalInfo.selectedTemplate) {
      case 'Template1':
        return (
          <Template1
            personalInfo={personalInfo}
            workEx={workEx}
            education={education}
            skills={skills}
          />
        );
      default:
        return <p>Aucun modèle sélectionné.</p>;
    }
  };

  return <div ref={ref}>{renderTemplate()}</div>;
});

export default ResumePreview;
