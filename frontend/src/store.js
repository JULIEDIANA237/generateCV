import { configureStore } from '@reduxjs/toolkit';
import resumeReducer from './features/resumeSlice';

export const store = configureStore({
  reducer: {
    resume: resumeReducer,
  },
});

// Vous n'avez pas besoin de définir explicitement `RootState` et `AppDispatch` en JavaScript, 
// car ces types sont spécifiques à TypeScript.
