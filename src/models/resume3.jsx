import React from "react";

const Resume3 = ({ personalInfo, experiences, education, skills, languages, interests }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen mx-auto py-8 px-4 max-w-[700px]">
      {/* En-tête */}
      <div className="flex w-full">
        {/* Colonne gauche (photo) */}
        <div className="w-1/3 p-2 bg-[#282831] flex justify-center items-end">
          <div className="flex-1 -mr-2 h-full border-t-[8px] border-b-[8px] border-l-[8px] border-r-0 border-white bg-[#19909e] flex justify-center p-2">
            <div
              className="w-[100px] h-[100px] rounded-full bg-white aspect-square bg-cover"
              style={{ backgroundImage: `url(${personalInfo?.image || ''})` }}
            ></div>
          </div>
        </div>
        {/* Colonne droite (informations) */}
        <div className="w-2/3 p-2">
          <div className="flex-1 h-full border-t-[8px] border-r-[8px] border-b-[8px] border-l-0 border-white bg-[#19909e] -ml-2 p-2">
            <h1 className="text-[1.5rem] font-bold text-white">{personalInfo.lastName} {personalInfo.firstName}</h1> 
            <p className="text-[0.6rem] text-white break-words">{personalInfo?.email}</p>
            <p className="text-[0.6rem] text-white break-words">{personalInfo?.phone}</p>
            <p className="text-[0.6rem] text-white break-words">{personalInfo?.address}</p>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="flex w-full mt-4">
        {/* Colonne gauche */}
        <div className="w-1/3 bg-[#282831] p-2 flex flex-col">
          {/* Compétences */}
          <div className="mt-2 flex-1 flex flex-col items-center justify-center">
            <p className="text-[0.6rem] text-[#b2c1c3] tracking-[1.3px]">Compétences</p>
            <ul className="text-[0.6rem] text-white">
            {skills?.map((skill, index) => (
              <li key={index} className="flex flex-col   mb-2 w-full">
                <span className="mr-11">{skill.title}</span>
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

          {/* Langues */}
          <div className="mt-2 flex-1 flex flex-col items-center justify-center    w-full">
            <p className="text-[0.6rem] text-[#b2c1c3] tracking-[1.3px] mr-10">Langues</p>
            <ul className="text-[0.6rem] text-white  w-full ">
              {languages?.map((language, index) => {
                // Convertir le niveau en pourcentage
                const levelMap = {
                  "Débutant": 25,
                  "Intermédiaire": 50,
                  "Avancé": 75,
                  "Courant": 100
                };
                const progress = levelMap[language.level] || 0; // Valeur par défaut à 0 si non trouvée

                return (
                  <li key={index} className="flex flex-col items-center text-center mb-2 w-full">
                    <span className="font-bold mr-14">{language.title}</span>
                    <div className="w-3/5 bg-gray-700 rounded-full h-2 mt-1 ml-7">
                      <div 
                        className="bg-[#19909e] h-2 rounded-full "
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    
                  </li>
                );
              })}
            </ul>
          </div>

          
          {/* Centres d'intérêt */}
          <div className="mt-2 flex-1 flex flex-col items-center  justify-center w-full">
            <p className="text-[0.6rem] text-[#b2c1c3] tracking-[1.3px]  ">Centres d'intérêt</p>
            <ul className="text-[0.6rem] text-white w-full flex flex-col ml-28 items-start gap-1 mt-1">
              {interests?.map((interest, index) => (
                <li key={index} className="flex items-center gap-2">
                  {/* Petit rectangle bleu comme puce */}
                  <span className="w-2 h-2 bg-[#19909e] rounded-sm inline-block"></span>
                  <span className="break-words">{interest.title}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Colonne droite */}
        <div className="w-2/3 p-2 flex flex-col">
          {/* Profil */}
          <div className="flex-1">
            <div className="mt-2 flex flex-col items-center justify-center">
              <div className="w-full bg-[#19909e] py-1 mb-1">
                <p className="text-white ml-2 text-sm">Profil</p>
              </div>
              <p className="text-[0.6rem] break-words">{personalInfo?.description}</p>
            </div>
          </div>

          {/* Formation */}
          <div className="flex-1 mt-2">
            <div className="w-full bg-[#19909e] py-1 mb-1">
              <p className="text-white ml-2 text-sm">Formation</p>
            </div>
            <ul className="text-[0.6rem] break-words">
              {education?.map((edu, index) => (
                <li key={index}>
                  <p className="font-bold">{edu.degree}</p>
                  <p className="text-[#589d89]">{edu.institution}</p>
                  <p>{edu.startDate} - {edu.endDate}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Expérience Professionnelle */}
          <div className="flex-1 mt-2">
            <div className="w-full bg-[#19909e] py-1 mb-1">
              <p className="text-white ml-2 text-sm">Expérience Professionnelle</p>
            </div>
            <ul className="text-[0.6rem] break-words">
              {experiences?.map((exp, index) => (
                <li key={index}>
                  <p className="font-bold">{exp.position}</p>
                  <p className="text-[#589d89]">{exp.company}</p>
                  <p>{exp.startDate} - {exp.endDate}</p>
                  <ul className="ml-4 list-disc">
                    {exp.tasks?.map((task, idx) => (
                      <li key={idx}>{task }</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume3;
