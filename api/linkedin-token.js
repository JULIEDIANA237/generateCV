export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: "Méthode non autorisée" });
    }
  
    const { code } = req.body;
    if (!code) {
      return res.status(400).json({ error: "Code manquant" });
    }
  
    const clientId = process.env.VITE_LINKEDIN_CLIENT_ID;
    const clientSecret = process.env.LINKEDIN_CLIENT_SECRET;
    const redirectUri = process.env.VITE_REDIRECT_URI;
  
    const tokenUrl = "https://www.linkedin.com/oauth/v2/accessToken";
    const params = new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
      client_id: clientId,
      client_secret: clientSecret,
    });
  
    try {
      const response = await fetch(tokenUrl, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params,
      });
  
      const data = await response.json();
      if (!data.access_token) {
        return res.status(400).json({ error: "Échec de l'authentification" });
      }
  
      return res.status(200).json({ access_token: data.access_token });
    } catch (error) {
      return res.status(500).json({ error: "Erreur serveur", details: error });
    }
  }
  