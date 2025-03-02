export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  try {
    const { code } = req.body;

    if (!code) {
      console.error("❌ Code OAuth manquant");
      return res.status(400).json({ error: "Code OAuth manquant" });
    }

    console.log("🔄 Code OAuth reçu :", code);

    const REDIRECT_URI = process.env.LINKEDIN_REDIRECT_URI?.trim();
    const CLIENT_ID = process.env.LINKEDIN_CLIENT_ID;
    const CLIENT_SECRET = process.env.LINKEDIN_CLIENT_SECRET;

    if (!REDIRECT_URI || !CLIENT_ID || !CLIENT_SECRET) {
      throw new Error("❌ Variables d'environnement LinkedIn manquantes !");
    }

    console.log("📡 Envoi de la requête à LinkedIn...");
    
    const response = await fetch("https://www.linkedin.com/oauth/v2/accessToken", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: REDIRECT_URI, // Correction ici
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
      }),
    });

    const data = await response.json();
    console.log("📡 Réponse de LinkedIn :", data);

    if (!response.ok || !data.access_token) {
      throw new Error(`Échec de l'échange du code OAuth : ${JSON.stringify(data)}`);
    }

    return res.status(200).json({ access_token: data.access_token });
  } catch (error) {
    console.error("❌ Erreur serveur:", error.message);
    return res.status(500).json({ error: "Erreur interne du serveur", details: error.message });
  }
}
