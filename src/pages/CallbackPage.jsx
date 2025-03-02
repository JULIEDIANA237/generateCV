import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CallbackPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("🚀 Vérification du code OAuth après redirection...");
    console.log("🌍 URL actuelle :", window.location.href);

    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const state = params.get("state");
    const selectedTemplateId = localStorage.getItem("selectedTemplateId");

    if (code) {
      console.log("✅ Code OAuth détecté :", code);
      console.log("🔐 State reçu :", state);

      // 🧹 Supprimer l'ancien code et enregistrer le nouveau
      localStorage.removeItem("linkedinAuthCode");
      localStorage.setItem("linkedinAuthCode", code);

      // 🔄 Échanger le code contre un token
      exchangeCodeForToken(code, selectedTemplateId, navigate);
    } else {
      console.error("❌ Aucun code détecté, vérifiez l'URL et la configuration LinkedIn.");
      navigate("/");
    }
  }, [navigate]);

  return <p className="text-lg text-center">Traitement de l'authentification... Veuillez patienter.</p>;
};

const exchangeCodeForToken = async (code, selectedTemplateId, navigate) => {
  try {
    console.log("🔄 Envoi de la requête POST à /api/linkedin avec le code :", code);
    console.log("🛠️ Code OAuth reçu dans le frontend :", code);


    const response = await fetch("/api/linkedin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });

    console.log("📡 Réponse HTTP:", response.status);

    if (!response.ok) {
      throw new Error("❌ Échec de l'obtention du token");
    }

    const data = await response.json();
    console.log("✅ Token reçu :", data);

    const { access_token } = data;
    if (!access_token) throw new Error("⚠️ Aucun token reçu");

    // 🔄 Remplace l'ancien token par le nouveau
    localStorage.removeItem("linkedinAccessToken");
    localStorage.setItem("linkedinAccessToken", access_token);

    // 📡 Récupérer les données LinkedIn
    fetchLinkedInProfile(access_token, selectedTemplateId, navigate);
  } catch (error) {
    console.error("❌ Erreur OAuth LinkedIn:", error);
    alert("Erreur lors de l'authentification LinkedIn.");
    navigate("/");
  }
};

const fetchLinkedInProfile = async (accessToken, selectedTemplateId, navigate) => {
  try {
    console.log("📡 Appel API backend pour récupérer le profil LinkedIn...");

    const response = await fetch("/api/linkedin-profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ accessToken }),
    });

    console.log("📡 Réponse HTTP Backend:", response.status);

    if (!response.ok) {
      throw new Error("❌ Impossible de récupérer les données LinkedIn");
    }

    const userData = await response.json();
    console.log("✅ Données LinkedIn récupérées :", userData);

    localStorage.setItem("linkedinData", JSON.stringify(userData));

    navigate(selectedTemplateId ? `/details/${selectedTemplateId}` : "/");
  } catch (error) {
    console.error("❌ Erreur API Backend:", error);
    alert("Impossible de récupérer les données LinkedIn.");
    navigate("/");
  }
};

export default CallbackPage;
