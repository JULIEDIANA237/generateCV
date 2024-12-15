import React, { useRef } from 'react';

// Template1 now accepts data via props
const Template1 = ({ personalInfo, experiences, education, skills, languages, interests }) => {
  const cvRef = useRef(null);
  // Récupérer l'image depuis localStorage ou utiliser une image par défaut
  const storedImage = localStorage.getItem('profileImage');
  // Vérifier que les données nécessaires sont disponibles
  if (!personalInfo || !experiences || !education || !skills || !languages || !interests) {
    return <p>Les données du CV sont incomplètes.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 p-4">
      {/* CV Content */}
      <div className="p-6 border-4 border-blue-500 rounded-lg" ref={cvRef}>
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center mb-6">
          <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-blue-500 mb-4 md:mb-0">
            <img
              src={storedImage || personalInfo.image || "src/assets/test.PNG"} // Fallback to a default image if no profile image is provided
              alt="Profil"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="ml-4 text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-800">
              {personalInfo.firstName} {personalInfo.lastName}
            </h1>
            <p className="text-gray-600">{personalInfo.title}</p>
            <p className="text-gray-600">{personalInfo.email} | {personalInfo.phone}</p>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-blue-500 mb-6" />

        {/* Description Section */}
        <div className="mb-6">
          <p className="text-gray-700">{personalInfo.description}</p>
        </div>

        {/* Divider */}
        <hr className="border-blue-500 mb-6" />

        {/* Experience Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-blue-500 mb-4">Expériences</h2>
          {experiences.length > 0 ? (
            experiences.map((experience, index) => (
              <div key={index} className="mb-4">
                <div className="flex flex-col md:flex-row justify-between mb-2">
                  <div className="text-gray-800 font-bold">{experience.title}</div>
                  <div className="text-gray-600">{experience.startDate} - {experience.endDate}</div>
                </div>
                <p className="text-gray-600">{experience.company}</p>
                <p className="text-gray-600">{experience.jobDescription}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">Aucune expérience à afficher.</p>
          )}
        </div>

        {/* Divider */}
        <hr className="border-blue-500 mb-6" />

        {/* Education Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-blue-500 mb-4">Formation</h2>
          {education.length > 0 ? (
            education.map((edu, index) => (
              <div key={index} className="mb-4">
                <div className="flex flex-col md:flex-row justify-between mb-2">
                  <div className="text-gray-800 font-bold">{edu.title}</div>
                  <div className="text-gray-600">{edu.startDate} - {edu.endDate}</div>
                </div>
                <p className="text-gray-600">{edu.school}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">Aucune formation à afficher.</p>
          )}
        </div>

        {/* Divider */}
        <hr className="border-blue-500 mb-6" />

        {/* Skills Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-blue-500 mb-4">Compétences</h2>
          {skills.length > 0 ? (
            skills.map((skill, index) => (
              <div key={index} className="flex flex-col md:flex-row justify-between mb-4">
                <div className="text-gray-800 font-bold">{skill.title}</div>
                <div className="text-gray-600">{skill.content}</div>
              </div>
            ))
          ) : (
            <p className="text-gray-600">Aucune compétence à afficher.</p>
          )}
        </div>

        {/* Divider */}
        <hr className="border-blue-500 mb-6" />

        {/* Languages Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-blue-500 mb-4">Langues</h2>
          {languages && languages.length > 0 ? (
            languages.map((language, index) => (
              <div key={index} className="flex flex-col md:flex-row justify-between mb-4">
                <div className="text-gray-800 font-bold">{language.title}</div>
                <div className="text-gray-600">{language.level}</div>
              </div>
            ))
          ) : (
            <p className="text-gray-600">Aucune langue à afficher.</p>
          )}
        </div>

        {/* Divider */}
        <hr className="border-blue-500 mb-6" />

        {/* Interests Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-blue-500 mb-4">Centres d'intérêt</h2>
          {interests && interests.length > 0 ? (
            <ul className="list-disc list-inside text-gray-600">
              {interests.map((interest, index) => (
                <li key={index}>{interest.title}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">Aucun centre d'intérêt à afficher.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Template1;
