import React from 'react';
import bgImage from '../assets/bgleft1.png';
import { StarIcon } from '@heroicons/react/24/solid';

const Resume1 = ({ personalInfo, experiences, education, skills, languages, interests }) => {
  const SkillStars = ({ level }) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <StarIcon
            key={i}
            className={`h-3 w-3 sm:h-4 sm:w-4 ${i < level ? 'text-yellow-400' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
  }; 

  return (
    <div className="flex flex-row justify-center h-screen">
      {/* Colonne de gauche */}
      <div
        className="flex flex-col p-2 max-w-[200px] flex-[0.35] h-full bg-center bg-no-repeat bg-cover"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        {/* Section supérieure : Nom et photo */}
        <div className="flex flex-col justify-center items-center flex-[1.5]">
          <div className="flex-[0.1] w-full">
            <p className="text-white font-bold text-center">{personalInfo.lastName} {personalInfo.firstName} </p>
          </div>
          <div
            className="w-[150px] h-[150px] rounded-full bg-white mt-2 aspect-square bg-cover"
            style={{ backgroundImage: `url(${personalInfo.image || ''})` }}
          ></div>
        </div>

        {/* Informations Personnelles */}
        <div className="mt-2 flex-1 flex flex-col justify-center items-center">
          <div className="w-full border-b border-[#c0c0c0] mb-1">
            <p className="text-[#31b0b8] text-sm">Informations Personnelles</p>
          </div>
          <div className="w-full overflow-hidden flex flex-col">
          <p className="text-[0.6rem] break-words">{personalInfo.title}</p>
            <p className="text-[0.6rem] break-words">{personalInfo.email}</p>
            <p className="text-[0.6rem] break-words">{personalInfo.address}</p>
            <p className="text-[0.6rem] break-words">{personalInfo.phone}</p>
          </div>
        </div>

        {/* Compétences */}
        <div className="mt-2 flex-1 flex flex-col justify-center items-center">
          <div className="w-full border-b border-[#c0c0c0] mb-1">
            <p className="text-[#31b0b8] text-sm">Compétences</p>
          </div>
          <div className="w-full overflow-hidden flex flex-col">
            {skills.map((skill, index) => (
              <div key={index} className="flex items-center justify-between text-[0.6rem] break-words">
                <p>{skill.title}</p>
                <SkillStars level={skill.level} />
              </div>
            ))}
          </div>
        </div> 

        {/* Centres d'intérêt */}
        <div className="mt-2 flex-1 flex flex-col justify-center items-center">
          <div className="w-full border-b border-[#c0c0c0] mb-1">
            <p className="text-[#31b0b8] text-sm">Centres d'intérêt</p>
          </div>
          <div className="w-full overflow-hidden flex flex-col">
            {interests.map((interest, index) => (
              <p key={index} className="text-[0.6rem] break-words">{interest.title}</p>
            ))}
          </div>
        </div>
      </div>

      {/* Colonne de droite */}
      <div className="flex flex-col p-2 max-w-[500px] flex-[0.65] h-full">
        {/* Profil */}
        <div className="mt-2">
          <div className="w-full border-b border-[#c0c0c0] mb-1">
            <p className="text-[#31b0b8] text-sm">Profil</p>
          </div>
          <div className="w-full overflow-hidden flex flex-col">
            <p className="text-[0.6rem] break-words">{personalInfo.description}</p>
          </div>
        </div>

        {/* Expérience professionnelle */}
          <div className="mt-2 flex-1">
            <div className="w-full border-b border-[#c0c0c0] mb-1">
              <p className="text-[#31b0b8] text-sm">Expérience professionnelle</p>
            </div>
            <div className="w-full overflow-hidden flex flex-col space-y-2">
              {experiences.map((job, index) => (
                <div key={index} className="text-[0.6rem] break-words">
                  <p className="font-bold">{job.position} - {job.company} ({job.startDate} - {job.endDate})</p>
                  <ul className="ml-4 list-disc">
                    {job.tasks.map((task, taskIndex) => (
                      <li key={taskIndex}>{task}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>


        {/* Formation */}
        <div className="mt-2 flex-[0.5]">
          <div className="w-full border-b border-[#c0c0c0] mb-1">
            <p className="text-[#31b0b8] text-sm">Formation</p>
          </div>
          <div className="w-full overflow-hidden flex flex-col">
            {education.map((edu, index) => (
              <div key={index} className="flex">
                {/* Colonne des dates */}
                <div className="w-1/3 text-[0.6rem] text-gray-500">{edu.startDate} / {edu.endDate}</div>
                {/* Colonne diplôme + institution */}
                <div className="w-2/3 text-[0.6rem] break-words">
                  <p className="font-bold">{edu.degree}</p>
                  <p>{edu.institution}</p>
                </div>
              </div>
            ))}
          </div>
        </div>



        {/* Langues */}
        <div className="mt-2 flex-[0.5]">
          <div className="w-full border-b border-[#c0c0c0] mb-1">
            <p className="text-[#31b0b8] text-sm">Langues</p>
          </div>
          <div className="w-full overflow-hidden flex flex-col">
            {languages.map((language, index) => (
              <div key={index} className="flex justify-between text-[0.6rem] break-words">
                <p className="text-left">{language.title}</p>
                <p className="text-right font-semibold">{language.level}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Resume1;
