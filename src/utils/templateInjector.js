// utils/templateInjector.js
// Fonction pour convertir le niveau de langue en pourcentage
const getLevelPercentage = (level) => {
  switch (level) {
    case "Débutant": return 20;
    case "Intermédiaire": return 40;
    case "Avancé": return 70;
    case "Courant": return 100;
    default: return 0;
  }
};

const getStars = (level) => {
    return Array(5)
      .fill(0)
      .map((_, index) => index < level 
        ? '<i class="fas fa-star"></i>'  // Étoile pleine pour le niveau atteint
        : '<i class="far fa-star"></i>'  // Étoile vide pour le reste
      )
      .join('');
  };
  


const injectModel1 = (template, resumeData) => {
    return template
      .replace("{{profileName}}", `${resumeData.personalInfo?.lastName} ${resumeData.personalInfo?.firstName}`)
      .replace("{{profileTitle}}", resumeData.personalInfo?.title || '')
      .replace("{{profileDescription}}", resumeData.personalInfo?.description || '')
      .replace("{{profileImg}}", resumeData.personalInfo?.image || '')
      .replace("{{phone}}", resumeData.personalInfo?.phone || '')
      .replace("{{address}}", resumeData.personalInfo?.address || '')
      .replace("{{email}}", resumeData.personalInfo?.email || '')
      .replace("{{educationList}}", resumeData.education.map(edu => `
        <li>
          <h5>${edu.startDate ? new Date(edu.startDate).getFullYear() : "Non spécifié"} / ${edu.endDate ? new Date(edu.endDate).getFullYear() : "Non spécifié"}</h5>
          <h4>${edu.degree}</h4>
          <h4>${edu.institution}</h4>
        </li>
      `).join(''))
      .replace("{{experienceList}}", (resumeData.experiences || []).map(exp => `
        <div class="box">
          <div class="year_company">
            <h5>${exp.startDate} / ${exp.endDate}</h5>
            <h5>${exp.company}</h5>
          </div>
          <div class="text">
            <h4>${exp.position}</h4>
            <ul>
              ${(exp.tasks || []).map(task => `<li>• ${task}</li>`).join('')}
            </ul>
          </div>
        </div>
      `).join(''))
      .replace("{{interestsList}}", (resumeData.interests || []).map(interest => `
        <li><i class="fa fa-check"></i> ${interest.title}</li> 
      `).join(''))
      .replace("{{languagesList}}", resumeData.languages.map(lang => `
        <li>
          <span class="text">${lang.title}</span>
          <div class="percent" style="width:${getLevelPercentage(lang.level)}%;"></div> 
        </li>
      `).join(''))
      .replace("{{skillsList}}", resumeData.skills.map(skill => `
        <div class="box">
          <h4>${skill.title}</h4>
          <div class="percent">
            <div style="width:${skill.level * 20}%;"></div>
          </div>
        </div>
      `).join(''));
  };
  
  const injectModel2 = (template, resumeData) => {
    return template
    .replace("{{profileName}}", `${resumeData.personalInfo?.lastName} ${resumeData.personalInfo?.firstName}`)
    .replace("{{profileTitle}}", resumeData.personalInfo?.title || '')
    .replace("{{profileDescription}}", resumeData.personalInfo?.description || '')
    .replace("{{profileImg}}", resumeData.personalInfo?.image || '')
    .replace("{{phone}}", resumeData.personalInfo?.phone || '')
    .replace("{{address}}", resumeData.personalInfo?.address || '')
    .replace("{{email}}", resumeData.personalInfo?.email || '')
      .replace("{{experienceList}}", resumeData.experiences.map(exp => `
        <h3 class="title">${exp.company}</h3>
        <p><strong>Poste:</strong> ${exp.position}</p>
        <p><strong>Durée:</strong> ${exp.startDate} / ${exp.endDate}</p>
        <ul>
          ${exp.tasks.map(task => `<li>${task}</li>`).join('')}
        </ul>
      `).join(''))
      .replace("{{educationList}}", (resumeData.education || []).map(edu => `
        <h3>${edu.degree}</h3>
        <p>${edu.institution}, ${edu.startDate ? new Date(edu.startDate).getFullYear() : "Non spécifié"} / ${edu.endDate ? new Date(edu.endDate).getFullYear() : "Non spécifié"}</p> <br>
      `).join(''))
      .replace("{{interestsList}}", (resumeData.interests || []).map(interest => `
        <li>${interest.title}</li>
      `).join(''))
      .replace("{{languagesList}}", (resumeData.languages || []).map(lang => `
        <li class="skill-item">${lang.title}
          <span class="stars">
          ${getStars(lang.level)}
          </span>
        </li>
      `).join(''))
      .replace("{{skillsList}}", resumeData.skills.map(skill => `
        <li class="skill-item">${skill.title}
          <span class="stars">
            ${getStars(skill.level)}
          </span>
        </li>
      `).join(''));;
  };

  
  const injectModel3 = (template, resumeData) => {
    return template
    .replace("{{profileName}}", `${resumeData.personalInfo?.lastName} ${resumeData.personalInfo?.firstName}`)
    .replace("{{profileTitle}}", resumeData.personalInfo?.title || '')
    .replace("{{profileDescription}}", resumeData.personalInfo?.description || '')
    .replace("{{profileImg}}", resumeData.personalInfo?.image || '')
    .replace("{{phone}}", resumeData.personalInfo?.phone || '')
    .replace("{{address}}", resumeData.personalInfo?.address || '')
    .replace("{{email}}", resumeData.personalInfo?.email || '')
    .replace("{{educationList}}", resumeData.education.map(edu => `
      <li>
        <h5>${edu.startDate ? new Date(edu.startDate).getFullYear() : "Non spécifié"} / ${edu.endDate ? new Date(edu.endDate).getFullYear() : "Non spécifié"}</h5>
        <h4>${edu.degree}</h4>
        <h4>${edu.institution}</h4>
      </li>
    `).join(''))
    .replace("{{experienceList}}", (resumeData.experiences || []).map(exp => `
      <div class="box">
        <div class="year_company">
          <h5>${exp.startDate} / ${exp.endDate}</h5>
          <h5>${exp.company}</h5>
        </div>
        <div class="text">
          <h4>${exp.position}</h4>
          <ul>
            ${(exp.tasks || []).map(task => `<li>• ${task}</li>`).join('')}
          </ul>
        </div>
      </div>
    `).join(''))
    .replace("{{interestsList}}", (resumeData.interests || []).map(interest => `
      <li><i class="fa fa-check"></i> ${interest.title}</li> 
    `).join(''))
    .replace("{{languagesList}}", resumeData.languages.map(lang => `
      <li>
        <span class="text">${lang.title}</span>
        <div class="percent" style="width:${getLevelPercentage(lang.level)}%;"></div> 
      </li>
    `).join(''))
    .replace("{{skillsList}}", resumeData.skills.map(skill => `
      <div class="box">
        <h4>${skill.title}</h4>
        <div class="percent">
          <div style="width:${skill.level * 20}%;"></div>
        </div>
      </div>
    `).join(''));
  };
  
  const injectDefaultModel = (template, resumeData) => {
    return template
      .replace("{{profileName}}", `${resumeData.personalInfo?.lastName} ${resumeData.personalInfo?.firstName}`)
      .replace("{{profileTitle}}", resumeData.personalInfo?.title || '')
      .replace("{{profileDescription}}", resumeData.personalInfo?.description || '')
      .replace("{{profileImg}}", resumeData.personalInfo?.image || '')
      .replace("{{phone}}", resumeData.personalInfo?.phone || '')
      .replace("{{address}}", resumeData.personalInfo?.address || '')
      .replace("{{email}}", resumeData.personalInfo?.email || '')
      .replace("{{skillsList}}", resumeData.skills.map(skill => `
        <div>${skill.title} - Niveau: ${skill.level}</div>
      `).join(''));
  };
  
  // 🔹 Export des fonctions
  export { injectModel1, injectModel2, injectModel3, injectDefaultModel };
   