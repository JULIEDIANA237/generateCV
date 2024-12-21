// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import DetailsPage from './pages/DetailsPage';
import AboutPage from './pages/AboutPage';
import MyResumePage from './pages/MyResumePage';
import CVPage from "./pages/CVPage";

const App = () => {
  return (
    <Router>
       
      <Routes>
      <Route path="/" element={<AboutPage />} />
        <Route path="/modele" element={<HomePage />} />
        
        <Route path="/my-resume" element={<MyResumePage />} />
        <Route path="/details/:id" element={<DetailsPage />} />
        <Route path="/cv" element={<CVPage />} />
      </Routes>
    </Router>
  );
};

export default App;
