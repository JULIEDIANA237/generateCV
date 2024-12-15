import React from 'react';

// Template2 now accepts data via props
const Template2 = ({ personalInfo, experiences, education, skills, languages, interests }) => {
   // Récupérer l'image depuis localStorage ou utiliser une image par défaut
   const storedImage = localStorage.getItem('profileImage');
    // Vérifier que les données nécessaires sont disponibles
  if (!personalInfo || !experiences || !education || !skills || !languages || !interests) {
    return <p>Les données du CV sont incomplètes.</p>;
  }
  return (
    <div className="max-w-4xl mx-auto mt-8 px-4">
      {/* CV Content */}
      <div className="p-6 bg-white border-4 border-blue-500 rounded-lg shadow-xl">
        {/* Header Section */}
        <div className="text-center mb-6">
          <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-blue-400 shadow-md">
            <img
              src={storedImage || personalInfo.image || "src/assets/test.PNG"} // Fallback to a default image if no profile image is provided
              alt="Profil"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-4xl font-bold text-blue-600 mt-4">
            {personalInfo.firstName} {personalInfo.lastName}
          </h1>
          <p className="text-gray-700">{personalInfo.title}</p>
          <p className="text-gray-700">{personalInfo.email} | {personalInfo.phone}</p>
        </div>

        {/* Divider */}
        <hr className="border-blue-300 mb-6" />

        {/* Description Section */}
        <div className="text-center mb-6">
          <p className="text-gray-600">{personalInfo.description}</p>
        </div>

        {/* Divider */}
        <hr className="border-blue-300 mb-6" />

        {/* Experience Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-blue-500 text-center mb-4">Expériences</h2>
          {experiences.length > 0 ? (
            experiences.map((experience, index) => (
              <div key={index} className="bg-gray-100 p-4 rounded shadow-sm mb-4">
                <h3 className="text-lg font-bold text-gray-800">{experience.title}</h3>
                <p className="text-sm text-gray-600">{experience.startDate} - {experience.endDate}</p>
                <p className="text-gray-700 mt-2">{experience.company}</p>
                <p className="text-gray-700 mt-2">{experience.jobDescription}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">Aucune expérience à afficher.</p>
          )}
        </div>

        {/* Divider */}
        <hr className="border-blue-300 mb-6" />

        {/* Education Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-blue-500 text-center mb-4">Formation</h2>
          {education.length > 0 ? (
            education.map((edu, index) => (
              <div key={index} className="bg-gray-100 p-4 rounded shadow-sm mb-4">
                <h3 className="text-lg font-bold text-gray-800">{edu.title}</h3>
                <p className="text-sm text-gray-600">{edu.startDate} - {edu.endDate}</p>
                <p className="text-gray-700 mt-2">{edu.school}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">Aucune formation à afficher.</p>
          )}
        </div>

        {/* Divider */}
        <hr className="border-blue-300 mb-6" />

        {/* Skills Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-blue-500 text-center mb-4">Compétences</h2>
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

        {/* Divider */}
        <hr className="border-blue-300 mb-6" />

        {/* Languages Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-blue-500 text-center mb-4">Langues</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {languages.length > 0 ? (
              languages.map((language, index) => (
                <div key={index} className="bg-gray-100 p-4 rounded shadow-sm">
                  <h3 className="font-bold text-gray-800">{language.title}</h3>
                  <p className="text-gray-700">{language.level}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-600">Aucune langue à afficher.</p>
            )}
          </div>
        </div>

        {/* Divider */}
        <hr className="border-blue-300 mb-6" />

        {/* Interests Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-blue-500 text-center mb-4">Centres d'intérêt</h2>
          {interests.length > 0 ? (
            <ul className="list-disc list-inside text-gray-700">
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

export default Template2;
