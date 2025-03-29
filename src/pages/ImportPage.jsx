import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

const ImportPage = () => {
  const { id: selectedTemplateId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [linkedinUrl, setLinkedinUrl] = useState("");

  const CLIENT_ID = "78ke6wzr8aa96y";
  const REDIRECT_URI = "https://generate-cv-seven.vercel.app/callback";   
  const SCOPE = "openid profile email w_member_social";

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const codeFromUrl = urlParams.get("code");
    const stateFromUrl = urlParams.get("state");
    const storedState = localStorage.getItem("linkedinOAuthState");

    if (codeFromUrl) {
      if (stateFromUrl !== storedState) {
        console.error("❌ Échec : les valeurs de `state` ne correspondent pas !");
        return;
      }

      console.log("🧹 Suppression de l'ancien code...");
      localStorage.removeItem("linkedinAuthCode");

      console.log("✅ Enregistrement du nouveau code OAuth :", codeFromUrl);
      localStorage.setItem("linkedinAuthCode", JSON.stringify({ code: codeFromUrl, timestamp: Date.now() }));

      setLoading(true);
      exchangeCodeForToken(codeFromUrl);

      //    Mise à jour de l'URL pour éviter de stocker l'ancien code
      const newUrl = window.location.origin + window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);
    }
  }, [window.location.search]);


  const exchangeCodeForToken = async (code) => {
    try {
      const response = await fetch("/api/linkedin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      if (!response.ok) throw new Error("Échec de l'obtention du token");

      const data = await response.json();
      const { access_token } = data;
      if (!access_token) throw new Error("Aucun token reçu");

      localStorage.setItem("linkedinAccessToken", access_token);
      localStorage.removeItem("linkedinAuthCode");

      fetchLinkedInProfile(access_token);
    } catch (error) {
      console.error("Erreur OAuth LinkedIn:", error);
      alert("Erreur lors de l'authentification LinkedIn.");
      setLoading(false);
    }
  };

  const fetchLinkedInProfile = async (accessToken) => {
    try {
      const profileResponse = await fetch("https://api.linkedin.com/v2/userinfo", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
  
      if (!profileResponse.ok) throw new Error("Impossible de récupérer les données LinkedIn");
  
      const userData = await profileResponse.json();
  
      // Récupérer l'URL LinkedIn enregistrée avant la connexion
      const linkedinUrl = localStorage.getItem("linkedinProfileUrl") || "";
  
      // Associer l'URL LinkedIn aux données récupérées (si besoin)
      const userDataWithUrl = { ...userData, linkedinUrl };
  
      // Stocker les données dans localStorage (sans l'afficher)
      console.log("Données LinkedIn récupérées :", userDataWithUrl);
      localStorage.setItem("linkedinData", JSON.stringify(userDataWithUrl));
  
      alert("Importation réussie !");
      navigate(selectedTemplateId ? `/details/${selectedTemplateId}` : "/");
    } catch (error) {
      console.error("Erreur API LinkedIn:", error);
      alert("Impossible de récupérer les données LinkedIn.");
    }
  };
  

  const handleImportClick = () => {
    if (!linkedinUrl.trim()) {
      alert("Veuillez entrer l'URL de votre profil LinkedIn.");
      return;
    }

    localStorage.setItem("linkedinProfileUrl", linkedinUrl);
    localStorage.setItem("selectedTemplateId", selectedTemplateId);
    localStorage.removeItem("linkedinAuthCode");
    localStorage.removeItem("linkedinAccessToken");

    const STATE = Math.random().toString(36).substring(2, 15);
    localStorage.setItem("linkedinOAuthState", STATE);

    const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
      REDIRECT_URI
    )}&state=${STATE}&scope=${encodeURIComponent(SCOPE)}`;

    window.location.href = authUrl;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      {loading ? (
        <p className="text-lg font-semibold text-blue-600">Connexion en cours... Veuillez patienter.</p>
      ) : (
        <>
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
              onClick={handleImportClick}
              className="px-6 py-3 bg-green-500 text-white rounded transition duration-200 hover:bg-green-600 text-lg"
            >
              🚀 Importer les données
            </button>
          </div>

          <p className="text-sm text-gray-600 text-center mt-4">
            Vous n'avez pas de profil LinkedIn ? {" "}
            <span
              onClick={() => navigate(`/details/${selectedTemplateId || ""}`)}
              className="text-blue-500 cursor-pointer hover:underline"
            >
              Continuez sans importer vos informations
            </span>.
          </p>
        </>
      )}
    </div>
  );
};

export default ImportPage;
