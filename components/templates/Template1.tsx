 // Template1.tsx
import React from 'react';

interface Template1Props {
  personalInfo: {
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
  workEx: {
    title: string;
    orgName: string;
    startYear: string;
    endYear: string;
    jobDescription: string;
  }[];
  education: {
    Type: string;
    University: string;
    Degree: string;
    Start: string;
    End: string;
  }[];
  skills: string[]; // Assurez-vous que skills est un tableau de chaînes de caractères
}

const Template1: React.FC<Template1Props> = ({ personalInfo, workEx, education, skills }) => {
    return (
      <div className="resume-template">
        <h1>{personalInfo.firstName} {personalInfo.lastName}</h1>
        <p>Email: {personalInfo.email}</p> {/* Modifier 'Email' en 'email' */}
        <p>Mobile: {personalInfo.mobile}</p> {/* Modifier 'Mobile' en 'mobile' */}
        <p>Objective: {personalInfo.objective}</p>
  
        <h2>Experience</h2>
        <ul>
          {workEx.map((exp, index) => (
            <li key={index}>
              <strong>{exp.title}</strong> at {exp.orgName} ({exp.startYear} - {exp.endYear})
              <p>{exp.jobDescription}</p>
            </li>
          ))}
        </ul>
  
        <h2>Education</h2>
        <ul>
          {education.map((edu, index) => (
            <li key={index}>
              {edu.Degree} from {edu.University} ({edu.Start} - {edu.End})
            </li>
          ))}
        </ul>
  
        <h2>Skills</h2>
        <ul>
          {skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </div>
    );
  };
  

export default Template1;
