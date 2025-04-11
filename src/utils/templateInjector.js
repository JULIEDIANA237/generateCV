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

const getLevelPercentageSkill = (level) => {
  // Par exemple, si le niveau est sur 5, on renvoie le pourcentage correspondant
  return level * 20;
};

function formatDateRange(start, end) {
  const months = [
    "janv.", "févr.", "mars", "avr.", "mai", "juin",
    "juil.", "août", "sept.", "oct.", "nov.", "déc."
  ];

  function parseDate(dateStr) {
    if (!dateStr || dateStr.toLowerCase() === "ce jour") {
      return "ce jour";
    }
    const date = new Date(dateStr);
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${month} ${year}`;
  }

  return `de ${parseDate(start)} à ${parseDate(end)}`;
}



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
      <p><strong>${edu.degree}</strong><br>
        <a href="#">${edu.institution}</a> <span class="date">${formatDateRange(edu.startDate, edu.endDate)}</span></p>
      `).join(''))
    .replace("{{experienceList}}", (resumeData.experiences || []).map(exp => `
      <div class="job">
          <h3>${exp.position}<span class="date">${formatDateRange(exp.startDate, exp.endDate)}</span></h3>
          <p><a href="#">${exp.company}</a></p>
          <ul>
        ${(exp.tasks || []).map(task => `<li style="margin-left: 30px;">• ${task}</li>`).join('')}
        </ul>
      </div>
      `).join(''))
    .replace("{{interestsList}}", (resumeData.interests || []).map(interest => `
      <ul><li>${interest.title}</li></ul>
      `).join(''))
      .replace("{{languagesList}}", resumeData.languages.map(lang => `
        <div class="language-item">
          <span>${lang.title}</span>
          <span class="dots">
            ${Array(5).fill(0).map((_, i) => `
                <span class="dot ${i < getLevelPercentage(lang.level) / 20 ? "full" : ""}"></span>
              `).join('')}
          </span>
        </div>
      `).join(''))
      
    .replace("{{skillsList}}", resumeData.skills.map(skill => `
      <div class="skill-item">
          <span>${skill.title}</span>
          <span class="dots">
            ${Array(5).fill(0).map((_, i) => `
              <span class="dot ${i < skill.level ? "full" : ""}"></span>
            `).join('')}
          </span>
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
        <div class="job-header">
            <p class="date">${formatDateRange(exp.startDate, exp.endDate)}</p>
            <div class="job-details">
                <p class="job-title"><strong>${exp.position}</strong></p>
                <p class="job-company">${exp.company}</p>
                <ul class="job-tasks">
                ${exp.tasks.map(task => `<li>• ${task}</li>`).join('')}
              </ul>
            </div>
        </div> 
      `).join(''))
      .replace("{{educationList}}", (resumeData.education || []).map(edu => `
        <div class="job-header">
        <p class="date">${formatDateRange(edu.startDate, edu.endDate)}</p>
        <div class="job-details">
            <p class="job-title"><strong>${edu.degree}</strong></p>
            <p class="job-company">${edu.institution}</p>
        </div>
      </div> 
      `).join(''))
      .replace("{{interestsList}}", (resumeData.interests || []).map(interest => `
        <ul class="interet-list">
          <li>
             
             ${interest.title} 
          </li>
        </ul>
      `).join(''))
      .replace("{{languagesList}}", (resumeData.languages || []).map(lang => `
        <li>
              <span class="language-name">${lang.title}</span>
              <span class="language-level">${lang.level}</span>
        </li>
      `).join(''))
      .replace("{{skillsList}}", resumeData.skills.map(skill => `
        <li>
              <span class="quality-name">${skill.title}</span>
              <div class="progress-bar">
                  <div class="progress-fill" style="width:${skill.level * 20}%;"></div>
              </div>
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
      <div class="entry">
          <strong>${edu.degree}</strong>
          <span class="date">${formatDateRange(edu.startDate, edu.endDate)}</span><br>
          ${edu.institution}
      </div>
    `).join(''))
    .replace("{{experienceList}}", (resumeData.experiences || []).map(exp => `
      <div class="entry">
          <strong>${exp.position}</strong>
          <span class="date">${formatDateRange(exp.startDate, exp.endDate)}</span><br>
          ${exp.company}
          <ul class="tasks">
             ${(exp.tasks || []).map(task => `<li style="margin-left: -20px;">• ${task}</li>`).join('')}
          </ul>
      </div>
    `).join(''))
    .replace("{{interestsList}}", (resumeData.interests || []).map(interest => `
      <ul class="list">
          <li>${interest.title}</li>
      </ul>
    `).join(''))
    .replace("{{languagesList}}", resumeData.languages.map(lang => `
      <ul class="skills">
          <li>${lang.title} <div class="bar full" style="width:${getLevelPercentage(lang.level)}%;"></div></li>
      </ul>
    `).join(''))
    .replace("{{skillsList}}", resumeData.skills.map(skill => `
      <ul class="skills">
          <li>${skill.title} <div class="bar full" style="width:${skill.level * 20}%;"></div></li>
      </ul> 
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
   