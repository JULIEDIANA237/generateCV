import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PersonalInfo {
  selectedTemplate: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  pin: string;
  objective: string;
}

interface WorkExperience {
  title: string;
  orgName: string;
  startYear: string;
  endYear: string;
  jobDescription: string;
}

interface Education {
  Type: string;
  University: string;
  Degree: string;
  Start: string;
  End: string;
}

interface Skill {
  skillName: string;
}

interface ResumeState {
  personalInfo: PersonalInfo ;
  workEx: WorkExperience[];
  education: Education[];
  skills: Skill[];
  selectedTemplate: string;
  imageFile: File | null;
  errorMessages: Record<string, string>;
  showErrorMessages: boolean;
}

const initialState: ResumeState = {
  personalInfo:  
    { 
      selectedTemplate: 'Template1',
      firstName: '',
      lastName: '',
      email: '',
      mobile: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      pin: '',
      objective: '',
    },
  
  workEx: [
    {
      title: '',
      orgName: '',
      startYear: '',
      endYear: '',
      jobDescription: '',
    },
  ],
  education: [
    {
      Type: 'Graduation',
      University: '',
      Degree: '',
      Start: '',
      End: '',
    },
  ],
  skills: [{ skillName: '' }],
  selectedTemplate: '',
  imageFile: null,
  errorMessages: {},
  showErrorMessages: false,
};

const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    updatePersonalInfo: (state, action: PayloadAction<PersonalInfo >) => {
      state.personalInfo = action.payload;
    },
    updateWorkExperience: (state, action: PayloadAction<WorkExperience[]>) => {
      state.workEx = action.payload;
    },
    updateEducation: (state, action: PayloadAction<Education[]>) => {
      state.education = action.payload;
    },
    updateSkills: (state, action: PayloadAction<Skill[]>) => {
      state.skills = action.payload;
    },
    selectTemplate: (state, action: PayloadAction<string>) => {
      state.selectedTemplate = action.payload;
    },
    setImageFile: (state, action: PayloadAction<File | null>) => {
      state.imageFile = action.payload;
    },
    setErrorMessages: (state, action: PayloadAction<Record<string, string>>) => {
      state.errorMessages = action.payload;
    },
    toggleErrorMessages: (state, action: PayloadAction<boolean>) => {
      state.showErrorMessages = action.payload;
    },
  },
});

export const {
  updatePersonalInfo,
  updateWorkExperience,
  updateEducation,
  updateSkills,
  selectTemplate,
  setImageFile,
  setErrorMessages,
  toggleErrorMessages,
} = resumeSlice.actions;

export default resumeSlice.reducer;
