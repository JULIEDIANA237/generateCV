import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

/**
 * Génère une chaîne aléatoire.
 * @param {number} length Longueur de la chaîne
 * @returns {string} Chaîne aléatoire
 */
function generateRandomString(length) {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
  let result = '';
  const randomValues = new Uint8Array(length);
  window.crypto.getRandomValues(randomValues);
  for (let i = 0; i < length; i++) {
    result += charset[randomValues[i] % charset.length];
  }
  return result;
}

/**
 * Génère le code challenge à partir du code verifier en utilisant SHA-256
 * puis une conversion en Base64 URL-safe.
 * @param {string} codeVerifier
 * @returns {Promise<string>} Code challenge
 */
async function generateCodeChallenge(codeVerifier) {
  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const digest = await window.crypto.subtle.digest('SHA-256', data);
  const base64Digest = btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
  return base64Digest;
}

const ImportPage = () => {
  // Récupère l'identifiant du template depuis l'URL
  const { id: selectedTemplateId } = useParams();
  const navigate = useNavigate();

  // Récupère le client ID et l'URL de redirection depuis les variables d'environnement.
  // Le client ID n'est pas sensible.
  const clientId = import.meta.env.VITE_LINKEDIN_CLIENT_ID; // ex: "YOUR_CLIENT_ID"
  // L'URL de redirection doit être identique à celle configurée dans l'application LinkedIn
  const redirectUri =
    import.meta.env.VITE_REDIRECT_URI || window.location.origin + '/import';
  // Les scopes demandés (ajustez-les selon vos besoins)
  const scope = 'openid profile email w_member_social';

  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Chargement des données LinkedIn...');

  useEffect(() => {
    // Vérification si l'URL contient des paramètres de callback OAuth (code et state)
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');

    if (code && state) {
      // Supprime les paramètres sensibles de l'URL
      window.history.replaceState({}, document.title, window.location.pathname);
      setIsAuthenticating(true);
      setLoadingMessage('Authentification en cours...');
      handleOAuthCallback(code, state);
    }
  }, []);

  /**
   * Échange le code d'autorisation contre un token d'accès en utilisant PKCE.
   * Il vérifie également le paramètre state stocké lors de la demande d'autorisation.
   *
   * @param {string} code Le code d'autorisation renvoyé par LinkedIn
   * @param {string} stateFromUrl Le state renvoyé dans l'URL
   */
  const handleOAuthCallback = async (code, stateFromUrl) => {
    // Récupère le state et le code verifier stockés dans le localStorage
    const storedState = localStorage.getItem('pkce_state');
    const storedCodeVerifier = localStorage.getItem('pkce_code_verifier');
  
    if (!storedState || storedState !== stateFromUrl) {
      alert('État de validation invalide. Veuillez réessayer.');
      navigate(`/details/${selectedTemplateId}`);
      return;
    }
  
    const payload = {
      code,
      codeVerifier: storedCodeVerifier,
      redirectUri, // Doit correspondre à celle configurée dans votre application LinkedIn
      clientId,    // Votre client ID
    };
  
    try {
      const tokenResponse = await axios.post('/api/linkedin-token', payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const { access_token } = tokenResponse.data;
  
      if (access_token) {
        // Récupération des données du profil de base
        const profileResponse = await axios.get('https://api.linkedin.com/v2/userinfo', {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });
  
        // Récupération de l'adresse email
        const emailResponse = await axios.get(
          'https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))',
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );
  
        // Combinez les données reçues
        const rawResumeData = {
          profile: profileResponse.data,
          email: emailResponse.data,
        };
  
        // Sauvegarde des données utilisateur dans le localStorage (ou dans un state global)
        localStorage.setItem('rawResumeData', JSON.stringify(rawResumeData));
  
        // Nettoyage des données PKCE stockées
        localStorage.removeItem('pkce_state');
        localStorage.removeItem('pkce_code_verifier');
  
        // Redirige vers la page de détails avec le template sélectionné
        navigate(`/details/${selectedTemplateId}`);
      } else {
        alert("Échec de l'authentification LinkedIn.");
        navigate(`/details/${selectedTemplateId}`);
      }
    } catch (error) {
      console.error("Erreur lors de l'échange du code pour le token :", error);
      alert("Erreur lors de l’authentification LinkedIn. Veuillez réessayer.");
      navigate(`/details/${selectedTemplateId}`);
    }
  };
  

  /**
   * Démarre le processus d'authentification :
   * - Vérifie que l'URL saisie est bien une URL LinkedIn valide
   * - Génère le state, le codeVerifier et le codeChallenge pour PKCE
   * - Construit l'URL d'autorisation et redirige l'utilisateur vers LinkedIn
   */
  const handleImport = async () => {
    if (!linkedinUrl || !linkedinUrl.startsWith('https://www.linkedin.com/in/')) {
      alert('Veuillez entrer une URL LinkedIn valide.');
      return;
    }

    if (!selectedTemplateId) {
      alert('Aucun modèle sélectionné.');
      return;
    }

    // Génération d'un state et d'un code verifier pour PKCE
    const state = generateRandomString(16);
    const codeVerifier = generateRandomString(64);
    const codeChallenge = await generateCodeChallenge(codeVerifier);

    // Stocke le state et le codeVerifier pour vérifier lors du callback
    localStorage.setItem('pkce_state', state);
    localStorage.setItem('pkce_code_verifier', codeVerifier);

    // Construit l'URL d'autorisation LinkedIn avec les paramètres PKCE
    const authorizationUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&state=${state}&scope=${encodeURIComponent(scope)}&code_challenge=${codeChallenge}&code_challenge_method=S256`;

    // Redirige l'utilisateur vers LinkedIn pour l'autorisation
    window.location.href = authorizationUrl;
  };

  const handleContinueWithoutImport = () => {
    navigate(`/details/${selectedTemplateId}`);
  };

  return isAuthenticating ? (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <p className="text-lg sm:text-xl font-bold text-center">{loadingMessage}</p>
      <div className="loader mt-4"></div> {/* Spinner de chargement */}
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