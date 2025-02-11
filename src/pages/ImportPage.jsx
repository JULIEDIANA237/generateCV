import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const CLIENT_ID = import.meta.env.VITE_LINKEDIN_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI || window.location.origin + '/import';
const SCOPE = 'openid profile email w_member_social';

const ImportPage = () => {
  const { id: selectedTemplateId } = useParams();
  const navigate = useNavigate();
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Chargement des données LinkedIn...');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      setIsAuthenticating(true);
      setLoadingMessage('Authentification en cours...');
      fetchAccessToken(code);
    }
  }, []);

  const fetchAccessToken = async (code) => {
    try {
      const response = await fetch('/api/linkedin-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();
      if (data.access_token) {
        fetchLinkedInData(data.access_token);
      } else {
        throw new Error("Impossible d'obtenir le token.");
      }
    } catch (error) {
      console.error('Erreur OAuth LinkedIn:', error);
      alert("Échec de l'authentification LinkedIn.");
      navigate(`/details/${selectedTemplateId}`);
    }
  };

  const fetchLinkedInData = async (token) => {
    try {
      const profileResponse = await fetch('https://api.linkedin.com/v2/userinfo', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const profile = await profileResponse.json();

      const emailResponse = await fetch(
        'https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))',
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const emailData = await emailResponse.json();
      
      const rawResumeData = { profile, email: emailData };
      localStorage.setItem('rawResumeData', JSON.stringify(rawResumeData));

      // ✅ Suppression du code de l'URL pour éviter les boucles
      window.history.replaceState({}, document.title, window.location.pathname);
      
      // ✅ Rediriger vers la page des détails
      navigate(`/details/${selectedTemplateId}`);
    } catch (error) {
      console.error('Erreur lors de la récupération des données LinkedIn:', error);
      alert("Échec de l'authentification LinkedIn.");
      navigate(`/details/${selectedTemplateId}`);
    }
  };

  const handleImport = () => {
    if (!linkedinUrl.startsWith('https://www.linkedin.com/in/')) {
      alert('Veuillez entrer une URL LinkedIn valide.');
      return;
    }
    if (!selectedTemplateId) {
      alert('Aucun modèle sélectionné.');
      return;
    }

    const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${SCOPE}`;
    window.location.href = authUrl;
  };

  const handleContinueWithoutImport = () => {
    navigate(`/details/${selectedTemplateId}`);
  };

  return isAuthenticating ? (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <p className="text-lg sm:text-xl font-bold text-center">{loadingMessage}</p>
      <div className="loader mt-4"></div>
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
