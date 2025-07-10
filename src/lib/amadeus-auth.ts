// This file is designated to run on the server only.
// Do not import it in client-side components.

const AMADEUS_API_KEY = process.env.AMADEUS_API_KEY;
const AMADEUS_API_SECRET = process.env.AMADEUS_API_SECRET;
const AMADEUS_BASE_URL = 'https://test.api.amadeus.com';

// In-memory cache for Amadeus token - this will be reset on server restart
let amadeusTokenCache = {
  token: null as string | null,
  expiresAt: 0 as number,
};

export async function getAmadeusToken(): Promise<string> {
  const now = Date.now();

  // Return cached token if it's still valid (with a 100-second buffer)
  if (amadeusTokenCache.token && now < amadeusTokenCache.expiresAt) {
    return amadeusTokenCache.token;
  }

  if (!AMADEUS_API_KEY || !AMADEUS_API_SECRET) {
    throw new Error('Las credenciales de la API de Amadeus no están configuradas. Por favor, añádelas a tu archivo .env.');
  }

  const tokenUrl = `${AMADEUS_BASE_URL}/v1/security/oauth2/token`;
  const params = new URLSearchParams();
  params.append('grant_type', 'client_credentials');
  params.append('client_id', AMADEUS_API_KEY);
  params.append('client_secret', AMADEUS_API_SECRET);

  try {
    const response = await fetch(tokenUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params,
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => response.text());
      console.error('Failed to get Amadeus token', errorBody);
      const errorMessage = (errorBody as any)?.error_description || (errorBody as any)?.errors?.[0]?.detail || response.statusText;
      throw new Error(`Error de token de Amadeus: ${errorMessage}`);
    }

    const data = await response.json();
    const token = data.access_token as string;
    // Amadeus token expires in 3600 seconds. We'll refresh it a bit earlier.
    const expiresIn = (data.expires_in || 3600) - 100; // a buffer of 100 seconds
    
    amadeusTokenCache = {
      token: token,
      expiresAt: now + expiresIn * 1000,
    };

    return token;
  } catch (err) {
    console.error(err);
    if (err instanceof Error) {
        throw new Error(`No se pudo obtener el token de la API. Razón: ${err.message}`);
    }
    throw new Error('No se pudo obtener el token de la API debido a un error desconocido.');
  }
}
