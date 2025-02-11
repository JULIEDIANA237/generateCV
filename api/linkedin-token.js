// api/linkedin-token.js
import axios from 'axios';

export default async function handler(req, res) {
  // Autorise uniquement la méthode POST
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { code, codeVerifier, redirectUri, clientId } = req.body;
    if (!code || !codeVerifier || !redirectUri || !clientId) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    // Prépare les paramètres pour l'échange du code contre un token
    const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('code', code);
    params.append('redirect_uri', redirectUri);
    params.append('client_id', clientId);

    // Ajoutez le client secret s'il est nécessaire (à stocker en variable d'environnement)
    if (process.env.LINKEDIN_CLIENT_SECRET) {
      params.append('client_secret', process.env.LINKEDIN_CLIENT_SECRET);
    }

    params.append('code_verifier', codeVerifier);

    // Effectue l'appel vers l'API LinkedIn
    const tokenResponse = await axios.post(
      'https://www.linkedin.com/oauth/v2/accessToken',
      params.toString(), // Les données doivent être encodées en URL
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    return res.status(200).json(tokenResponse.data);
  } catch (error) {
    console.error('Erreur dans la fonction serverless :', error.response?.data || error.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}