import React, { useEffect, useState } from 'react'; 
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const ImportPage = () => {
  const { id: selectedTemplateId } = useParams();
  const navigate = useNavigate();
  const { loginWithRedirect, logout, user, isAuthenticated, isLoading } = useAuth0();
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [hasImported, setHasImported] = useState(false);

  useEffect(() => {
    const storedImportStatus = localStorage.getItem('hasImported');
    if (storedImportStatus === 'true') {
      setHasImported(true);
    }
  }, []);

  const handleImport = () => {
    if (!linkedinUrl.startsWith('https://www.linkedin.com/in/')) {
      alert('Veuillez entrer une URL LinkedIn valide.');
      return;
    }
    
    // Stocker l'URL et l'état de l'importation
    localStorage.setItem('linkedinUrl', linkedinUrl);
    localStorage.setItem('hasImported', 'true');
    
    // Rediriger vers la page des détails
    navigate(`/details/${selectedTemplateId}`);
  };

  const handleSkipImport = () => {
    // Supprimer les données LinkedIn existantes
    localStorage.removeItem('linkedinUrl'); 
    localStorage.setItem('hasImported', 'true');
    
    // Rediriger vers la page des détails
    navigate(`/details/${selectedTemplateId}`);
  };
  

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
        <p className="text-lg sm:text-xl font-bold text-center">Chargement...</p>
        <div className="loader mt-4"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <h1 className="text-lg sm:text-2xl md:text-3xl font-bold mb-4 text-center">
        Importer vos informations LinkedIn
      </h1>

      <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 max-w-lg flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          placeholder="Entrez l'URL de votre profil LinkedIn"
          value={linkedinUrl}
          onChange={(e) => setLinkedinUrl(e.target.value)}
          className="p-2 border border-gray-300 rounded w-full text-sm sm:text-base"
        />
        <button
          onClick={handleImport}
          className="px-4 py-2 sm:px-6 sm:py-3 bg-blue-500 text-white rounded transition duration-200 hover:bg-blue-600 text-sm sm:text-base"
        >
          Importer
        </button>
      </div>

      <p className="text-xs sm:text-sm md:text-base text-gray-600 text-center mt-4">
        Vous n'avez pas de profil LinkedIn ?{' '}
        <span
          onClick={handleSkipImport}
          className="text-blue-500 cursor-pointer hover:underline"
        >
          Continuez sans importer vos informations
        </span>
        .
      </p>
    </div>

  );
};

export default ImportPage;
