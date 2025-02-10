// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
 
import HomePage from './pages/HomePage';
import DetailsPage from './pages/DetailsPage';
import AboutPage from './pages/AboutPage';
import MyResumePage from './pages/MyResumePage';
import ImportPage  from './pages/ImportPage';
 
 

const App = () => {
  return (
    <Router>
       
      <Routes>
      <Route path="/" element={<AboutPage />} />
        <Route path="/modele" element={<HomePage />} />
        <Route path="/import/:id" element={<ImportPage />} />
        <Route path="/import" element={<ImportPage />} />
        
        <Route path="/my-resume/:id" element={<MyResumePage />} />
         
        <Route path="/details/:id" element={<DetailsPage />} />
         
      </Routes>
    </Router>
  );
};

export default App;
