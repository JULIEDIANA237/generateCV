import React, { useRef } from 'react';
import html2canvas from 'html2canvas';

// Template3 now accepts data via props
const Template3 = ({
  personalInfo,
  experiences,
  education,
  skills,
  languages,
  interests,
}) => {
  const cvRef = useRef(null);

  // Récupérer l'image depuis localStorage ou utiliser une image par défaut
  const storedImage = localStorage.getItem('profileImage');
   // Vérifier que les données nécessaires sont disponibles
   if (!personalInfo || !experiences || !education || !skills || !languages || !interests) {
    return <p>Les données du CV sont incomplètes.</p>;
  }

  return (
    <div className="max-w-5xl mx-auto mt-8 px-4">
      {/* CV Content */}
      <div
        className="p-6 bg-white border-4 border-pink-500 rounded-lg shadow-xl grid grid-cols-1 md:grid-cols-3 gap-6"
        ref={cvRef}
      >
        {/* Left Column */}
        <div className="col-span-1 md:col-span-2 bg-pink-50">
          {/* Header Section */}
          <div className="text-left mb-6">
            <h1 className="text-4xl font-bold text-pink-600">
              {personalInfo.firstName} {personalInfo.lastName}
            </h1>
            <p className="text-gray-700 text-lg">{personalInfo.title}</p>
          </div>

          {/* Experiences */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-pink-500 mb-4">Expériences</h2>
            <div className="space-y-4">
              {experiences.length > 0 ? (
                experiences.map((experience, index) => (
                  <div key={index} className="bg-gray-100 p-4 rounded shadow-sm">
                    <h3 className="text-lg font-bold text-gray-800">{experience.title}</h3>
                    <p className="text-sm text-gray-600">{experience.startDate} - {experience.endDate}</p>
                    <p className="text-gray-700 mt-2">{experience.company} - {experience.jobDescription}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">Aucune expérience à afficher.</p>
              )}
            </div>
          </div>

          {/* Formation */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-pink-500 mb-4">Formation</h2>
            <div className="space-y-4">
              {education.length > 0 ? (
                education.map((edu, index) => (
                  <div key={index} className="bg-gray-100 p-4 rounded shadow-sm">
                    <h3 className="text-lg font-bold text-gray-800">{edu.title}</h3>
                    <p className="text-sm text-gray-600">{edu.startDate} - {edu.endDate}</p>
                    <p className="text-gray-700 mt-2">{edu.school}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">Aucune formation à afficher.</p>
              )}
            </div>
          </div>

          {/* Skills */}
          <div>
            <h2 className="text-3xl font-bold text-pink-500 mb-4">Compétences</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.length > 0 ? (
                skills.map((skill, index) => (
                  <div key={index} className="bg-gray-100 p-4 rounded shadow-sm">
                    <h3 className="font-bold text-gray-800">{skill.title}</h3>
                    <p className="text-gray-700">{skill.content}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">Aucune compétence à afficher.</p>
              )}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="bg-pink-100 p-4 rounded shadow-md">
          {/* Profile Picture */}
          <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-pink-400 shadow-md mb-4">
            <img
              src={storedImage || personalInfo.image || "src/assets/test.PNG"}
              alt="Profil"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Contact Info */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-pink-500">Contact</h3>
            <p className="text-gray-700 mt-2">{personalInfo.email}</p>
            <p className="text-gray-700">{personalInfo.phone}</p>
          </div>

          {/* Languages */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-pink-500">Langues</h3>
            {languages.length > 0 ? (
              languages.map((language, index) => (
                <div key={index} className="text-gray-700">
                  <p>{language.title}: {language.level}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-600">Aucune langue à afficher.</p>
            )}
          </div>

          {/* Interests */}
          <div>
            <h3 className="text-xl font-bold text-pink-500">Centres d'intérêt</h3>
            {interests.length > 0 ? (
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
    </div>
  );
};

export default Template3;
