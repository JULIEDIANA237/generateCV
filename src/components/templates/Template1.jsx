import React, { useRef } from 'react';

const Template1 = ({ personalInfo, experiences, education, skills, languages, interests }) => {
  const cvRef = useRef(null);

  const storedImage = localStorage.getItem('profileImage');

  if (!personalInfo || !experiences || !education || !skills || !languages || !interests) {
    return <p>Les données du CV sont incomplètes.</p>;
  }

  return (
    <div  >
      <div className="p-8 border-4 border-blue-500 rounded-lg" ref={cvRef}>
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center mb-6">
          <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-blue-500 mb-4 md:mb-0">
            <img
              src={storedImage || personalInfo.image || "src/assets/test.PNG"}
              alt="Profil"
              className="w-full h-full object-cover"
            />
          </div>  

          <div className="ml-4 text-center md:text-left">
            <h1 className="text-3xl sm:text-xl font-semibold text-gray-800">{personalInfo.firstName} {personalInfo.lastName}</h1>
            <p className="text-lg sm:text-xl text-gray-600">{personalInfo.title}</p>
            <p className="text-sm sm:text-base text-gray-600">{personalInfo.email} | {personalInfo.phone}</p>
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
          <h2 className="text-2xl   font-bold text-blue-500 mb-4">Expériences</h2>
          {experiences.length > 0 ? (
            experiences.map((experience, index) => (
              <div key={index} className="mb-4">
                <div className="flex flex-col sm:flex-row justify-between mb-2">
                  <div className="text-gray-800 font-bold text-lg  ">{experience.title}</div>
                  <div className="text-gray-600 text-sm  ">{experience.startDate} - {experience.endDate}</div>
                </div>
                <p className="text-gray-600 text-sm  ">{experience.company}</p>
                <p className="text-gray-600 text-sm  ">{experience.jobDescription}</p>
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
          <h2 className="text-2xl sm:text-3xl font-bold text-blue-500 mb-4">Formation</h2>
          {education.length > 0 ? (
            education.map((edu, index) => (
              <div key={index} className="mb-4">
                <div className="flex flex-col sm:flex-row justify-between mb-2">
                  <div className="text-gray-800 font-bold text-lg sm:text-xl">{edu.title}</div>
                  <div className="text-gray-600 text-sm sm:text-base">{edu.startDate} - {edu.endDate}</div>
                </div>
                <p className="text-gray-600 text-sm sm:text-base">{edu.school}</p>
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
          <h2 className="text-2xl sm:text-3xl font-bold text-blue-500 mb-4">Compétences</h2>
          {skills.length > 0 ? (
            skills.map((skill, index) => (
              <div key={index} className="flex flex-col sm:flex-row justify-between mb-4">
                <div className="text-gray-800 font-bold text-lg sm:text-xl">{skill.title}</div>
                <div className="text-gray-600 text-sm sm:text-base">{skill.content}</div>
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
          <h2 className="text-2xl sm:text-3xl font-bold text-blue-500 mb-4">Langues</h2>
          {languages && languages.length > 0 ? (
            languages.map((language, index) => (
              <div key={index} className="flex flex-col sm:flex-row justify-between mb-4">
                <div className="text-gray-800 font-bold text-lg sm:text-xl">{language.title}</div>
                <div className="text-gray-600 text-sm sm:text-base">{language.level}</div>
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
          <h2 className="text-2xl sm:text-3xl font-bold text-blue-500 mb-4">Centres d'intérêt</h2>
          {interests && interests.length > 0 ? (
            <ul className="list-disc list-inside text-gray-600">
              {interests.map((interest, index) => (
                <li key={index} className="text-sm sm:text-base">{interest.title}</li>
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