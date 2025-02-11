// api/linkedin-token.js
import axios from 'axios';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST');
      return res.status(405).json({ error: 'Method Not Allowed' });
    }
  
    try {
      const { code, codeVerifier, redirectUri, clientId } = req.body;
      console.log("Paramètres reçus:", { code, codeVerifier, redirectUri, clientId });
      
      if (!code || !codeVerifier || !redirectUri || !clientId) {
        return res.status(400).json({ error: 'Missing required parameters' });
      }
  
      const params = new URLSearchParams();
      params.append('grant_type', 'authorization_code');
      params.append('code', code);
      params.append('redirect_uri', redirectUri);
      params.append('client_id', clientId);
  
      if (process.env.LINKEDIN_CLIENT_SECRET) {
        params.append('client_secret', process.env.LINKEDIN_CLIENT_SECRET);
      } else {
        console.error("Client secret manquant dans les variables d'environnement");
      }
  
      params.append('code_verifier', codeVerifier);
  
      const tokenResponse = await axios.post(
        'https://www.linkedin.com/oauth/v2/accessToken',
        params.toString(),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );
  
      console.log("Réponse de LinkedIn:", tokenResponse.data);
      return res.status(200).json(tokenResponse.data);
    } catch (error) {
      console.error('Erreur dans la fonction serverless :', error.response?.data || error.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  