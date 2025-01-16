import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const ImportPage = () => {
  // Récupération des paramètres de l'URL
  const { id: selectedTemplateId } = useParams();
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Chargement des données LinkedIn...');

  useEffect(() => {
    // Vérifie si le callback OAuth a des paramètres `code` et `state` dans l'URL
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');

    if (code && state) {
      setIsAuthenticating(true); // Indique que nous traitons le callback
      setLoadingMessage('Authentification en cours...');
      handleOAuthCallback(code, state);
    }
  }, []);

  const handleOAuthCallback = async (code, state) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/linkedin/callback?code=${code}&state=${state}`
      );
  
      const { redirectUrl, userData } = response.data;
  
      if (userData) {
        // Sauvegarde des données utilisateur dans localStorage
        localStorage.setItem('userData', JSON.stringify(userData));
      }
  
      if (redirectUrl) {
        navigate(redirectUrl); // Redirection vers la page détails
      } else {
        alert("Redirection impossible.");
        navigate(`/details/${selectedTemplateId}`);
      }
    } catch (error) {
      console.error('Erreur lors du traitement du callback OAuth :', error);
      alert('Erreur lors de l’authentification LinkedIn. Veuillez réessayer.');
      navigate(`/details/${selectedTemplateId}`);
    }
  };
  
  const handleImport = async () => {
    if (!linkedinUrl || !linkedinUrl.startsWith('https://www.linkedin.com/in/')) {
      alert('Veuillez entrer une URL LinkedIn valide.');
      return;
    }

    if (!selectedTemplateId) {
      alert('Aucun modèle sélectionné.');
      return;
    }

    try {
      // Demande au backend de générer l'URL d'autorisation
      const response = await axios.post(`${BASE_URL}/api/linkedin/import`, {
        linkedinUrl,
        templateId: selectedTemplateId,
      });

      const { authorizationUrl } = response.data;

      if (authorizationUrl) {
        window.location.href = authorizationUrl; // Redirige vers LinkedIn
      } else {
        alert("Impossible de démarrer l'importation.");
      }
    } catch (error) {
      console.error('Erreur lors de l’importation :', error);
      alert('Erreur inattendue. Veuillez réessayer.');
    }
  };

  const handleContinueWithoutImport = () => {
    navigate(`/details/${selectedTemplateId}`);
  };

  return isAuthenticating ? (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <p className="text-lg sm:text-xl font-bold text-center">{loadingMessage}</p>
      <div className="loader mt-4"></div> {/* Spinner pour le chargement */}
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 text-center">
        Importer vos informations LinkedIn
      </h1>
      <input
        type="text"
        placeholder="Entrez l'URL de votre profil LinkedIn"
        value={linkedinUrl}
        onChange={(e) => setLinkedinUrl(e.target.value)}
        className="p-2 border border-gray-300 rounded mb-4 w-full sm:w-2/3 max-w-lg"
      />
      <button
        onClick={handleImport}
        className="px-4 py-2 bg-blue-500 text-white rounded mb-4 w-full sm:w-auto sm:px-6 sm:py-3 text-center transition duration-200 hover:bg-blue-600"
      >
        Importer
      </button>
      <p className="text-sm sm:text-base text-gray-600 text-center">
        Vous n'avez pas de profil LinkedIn ?{' '}
        <span
          onClick={handleContinueWithoutImport}
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
