import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  personalInfo: {
    image: localStorage.getItem('profileImage') || null, // For profile picture
    firstName: '',
    lastName: '',
    title: '',
    email: '',
    phone: '',
    description: '',
  },
  experiences: [], // Array of experience objects: { title, startDate, endDate, company, jobDescription }
  education: [], // Array of education objects: { title, startDate, endDate, school }
  skills: [], // Array of skill objects: { title, content }
  languages: [
    { title: "Anglais", level: "Courant" }, // Exemple de données par défaut
    { title: "Français", level: "Natif" },
  ],
  interests: [
    { title: "Voyage" },  // Exemple de données par défaut
    { title: "Lecture" },
  ], // Array of interest objects: { title }
  selectedTemplate: null, // Ajout du modèle sélectionné
};

const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    updatePersonalInfo: (state, action) => {
      state.personalInfo = { ...state.personalInfo, ...action.payload };
    },
    addExperience: (state, action) => {
      state.experiences.push(action.payload);
    },
    updateExperience: (state, action) => {
      const { index, experience } = action.payload;
      state.experiences[index] = experience;
    },
    removeExperience: (state, action) => {
      state.experiences.splice(action.payload, 1);
    },
    addEducation: (state, action) => {
      state.education.push(action.payload);
    },
    updateEducation: (state, action) => {
      const { index, education } = action.payload;
      state.education[index] = education;
    },
    removeEducation: (state, action) => {
      state.education.splice(action.payload, 1);
    },
    addSkill: (state, action) => {
      state.skills.push(action.payload);
    },
    updateSkill: (state, action) => {
      const { index, skill } = action.payload;
      state.skills[index] = skill;
    },
    removeSkill: (state, action) => {
      state.skills.splice(action.payload, 1);
    },
    addLanguage: (state, action) => {
      state.languages.push(action.payload);
    },
    updateLanguage: (state, action) => {
      const { index, language } = action.payload;
      state.languages[index] = language;
    },
    removeLanguage: (state, action) => {
      state.languages.splice(action.payload, 1);
    },
    addInterest: (state, action) => {
      state.interests.push(action.payload);
    },
    updateInterest: (state, action) => {
      const { index, interest } = action.payload;
      state.interests[index] = interest;
    },
    removeInterest: (state, action) => {
      state.interests.splice(action.payload, 1);
    },
    // Ajoutez une action pour sélectionner le modèle
    selectTemplate: (state, action) => {
      state.selectedTemplate = action.payload;
    },
  },
});

export const {
  updatePersonalInfo,
  addExperience,
  updateExperience,
  removeExperience,
  addEducation,
  updateEducation,
  removeEducation,
  addSkill,
  updateSkill,
  removeSkill,
  addLanguage,
  updateLanguage,
  removeLanguage,
  addInterest,
  updateInterest,
  removeInterest,
  selectTemplate, 
} = resumeSlice.actions;

export default resumeSlice.reducer;
