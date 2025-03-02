import React from "react";

const Resume2 = ({ personalInfo, experiences, education, skills, languages, interests }) => {
  return (
    <div className="flex flex-col justify-center items-center h-screen mx-auto py-8 px-4 max-w-[700px]">
      {/* En-tête */}
      <div>
        <h1 className="text-center font-bold text-2xl">{personalInfo.lastName} {personalInfo.firstName}</h1>
      </div>

      {/* Informations Personnelles */}
      <div className="border border-[#589d89] mt-2 flex flex-col w-full">
        <div className="w-full bg-[#1a795e] py-1">
          <p className="text-white ml-2 text-sm">Informations Personnelles</p>
        </div>
        <div className="flex">
          <div className="flex-1 p-2">
            <p className="text-[0.8rem] font-bold">Adresse e-mail</p>
            <p className="text-[0.8rem] font-bold">Numéro de téléphone</p>
            <p className="text-[0.8rem] font-bold">Adresse</p>
          </div>
          <div className="flex-1 p-2">
            <p className="text-[0.8rem]">{personalInfo?.email}</p>
            <p className="text-[0.8rem]">{personalInfo?.phone}</p>
            <p className="text-[0.8rem]">{personalInfo?.address}</p>
          </div>
        </div>
      </div>

      {/* Profil */}
      <div className="border border-[#589d89] mt-2 flex flex-col w-full">
        <div className="w-full bg-[#1a795e] py-1">
          <p className="text-white ml-2 text-sm">Profil</p>
        </div>
        <div className="p-2">
          <p className="text-[0.8rem]">{personalInfo?.description}</p>
        </div>
      </div>

      {/* Expérience Professionnelle */}
      <div className="border border-[#589d89] mt-2 flex flex-col w-full">
  <div className="w-full bg-[#1a795e] py-1">
    <p className="text-white ml-2 text-sm">Expérience Professionnelle</p>
  </div>
  <div className="p-2">
    {experiences?.map((exp, index) => (
      <div key={index} className="mt-2 flex">
        {/* Colonne des dates à gauche */}
        <div className="w-1/3">
          <p className="text-[0.8rem] font-bold">{exp.startDate} / {exp.endDate}</p>
        </div>
        {/* Colonne des détails de l'expérience à droite */}
        <div className="w-2/3 flex flex-col">
          <p className="text-[0.8rem] font-bold">{exp.position}/{exp.company}</p>
          <p className="text-[0.8rem] text-[#589d89]"></p>
          <ul className="text-[0.8rem] list-disc ml-4">
            {exp.tasks?.map((task, i) => (
              <li key={i}>{task}</li>
            ))}
          </ul>
        </div>
      </div>
    ))}
  </div>
</div>



      {/* Formation */}
      <div className="border border-[#589d89] mt-2 flex flex-col w-full">
        <div className="w-full bg-[#1a795e] py-1">
          <p className="text-white ml-2 text-sm">Formation</p>
        </div>
        <div className="p-2">
          {education?.map((edu, index) => (
            <div key={index} className="mt-2 flex">
              {/* Colonne gauche pour les dates */}
              <div className="w-1/3">
                <p className="text-[0.8rem] font-bold">{edu.startDate} - {edu.endDate}</p>
              </div>
              {/* Colonne droite pour le diplôme et l'institution */}
              <div className="w-2/3 flex flex-col">
                <p className="text-[0.8rem] font-bold">{edu.degree}</p>
                <p className="text-[0.8rem] text-[#589d89]">{edu.institution}</p>
              </div>
            </div>
          ))}
        </div>
      </div>


      {/* Compétences */}
      <div className="border border-[#589d89] mt-2 flex flex-col w-full">
        <div className="w-full bg-[#1a795e] py-1">
          <p className="text-white ml-2 text-sm">Compétences</p>
        </div>
        <div className="p-2">
          <ul className="text-[0.8rem]">
            {skills?.map((skill, index) => (
              <li key={index} className="flex justify-between items-center">
                <span>{skill.title}</span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < skill.level ? "text-yellow-400" : "text-gray-400"}>
                      ★
                    </span>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>


      {/* Langues */}
<div className="border border-[#589d89] mt-2 flex flex-col w-full">
  <div className="w-full bg-[#1a795e] py-1">
    <p className="text-white ml-2 text-sm">Langues</p>
  </div>
  <div className="p-2">
    <ul className="text-[0.8rem]">
      {languages?.map((language, index) => (
        <li key={index} className="flex justify-between">
          <span>{language.title}</span>
          <span className="font-bold">{language.level}</span>
        </li>
      ))}
    </ul>
  </div>
</div>


      {/* Activités extra-professionnelles */}
      <div className="border border-[#589d89] mt-2 flex flex-col w-full">
        <div className="w-full bg-[#1a795e] py-1">
          <p className="text-white ml-2 text-sm">Activités extra-professionnelles</p>
        </div>
        <div className="p-2">
          <ul className="text-[0.8rem]">
            {interests?.map((interest, index) => (
              <li key={index}>{interest.title}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Resume2;
