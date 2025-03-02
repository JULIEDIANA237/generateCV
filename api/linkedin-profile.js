export default async function handler(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*"); // Autoriser toutes les origines
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  
    if (req.method === "OPTIONS") {
      return res.status(200).end();
    }
  
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Méthode non autorisée" });
    }
  
    try {
      const { accessToken } = req.body;
  
      if (!accessToken) {
        return res.status(400).json({ error: "Token d'accès manquant" });
      }
  
      console.log("📡 Requête vers l'API LinkedIn pour récupérer le profil...");
  
      const profileResponse = await fetch("https://api.linkedin.com/v2/userinfo", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
  
      if (!profileResponse.ok) {
        throw new Error("❌ Échec de récupération des données LinkedIn");
      }
  
      const userData = await profileResponse.json();
      console.log("✅ Données LinkedIn récupérées :", userData);
  
      return res.status(200).json(userData);
    } catch (error) {
      console.error("❌ Erreur API LinkedIn:", error);
      return res.status(500).json({ error: "Erreur serveur", details: error.message });
    }
  }
  