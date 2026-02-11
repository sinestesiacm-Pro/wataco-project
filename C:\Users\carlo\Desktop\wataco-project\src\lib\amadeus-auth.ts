// This file is designated to run on the server only.
// Do not import it in client-side components.

const AMADEUS_BASE_URL = 'https://test.api.amadeus.com';

// In-memory cache for Amadeus token - this will be reset on server restart
let amadeusTokenCache = {
  token: null as string | null,
  expiresAt: 0 as number,
};

export async function getAmadeusToken(): Promise<string> {
  const now = Date.now();

  // Return cached token if it's still valid
  if (amadeusTokenCache.token && now < amadeusTokenCache.expiresAt) {
    console.log("diagnose: Amadeus token from cache.");
    return amadeusTokenCache.token;
  }

  console.log("diagnose: Requesting new Amadeus token.");
  const AMADEUS_API_KEY = process.env.NEXT_PUBLIC_AMADEUS_API_KEY;
  const AMADEUS_API_SECRET = process.env.NEXT_PUBLIC_AMADEUS_API_SECRET;

  if (!AMADEUS_API_KEY || !AMADEUS_API_SECRET) {
    throw new Error('Las credenciales de la API de Amadeus no están configuradas en el archivo .env.');
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
      console.error('diagnose: Amadeus token API error response:', errorBody);
      
      let errorMessage = `Error de API de Amadeus (${response.status})`;
      if (typeof errorBody === 'object' && errorBody !== null) {
          const apiError = errorBody as any;
          if (apiError.error === 'invalid_client') {
              errorMessage = 'Error de Autenticación: Credenciales de API inválidas.';
          } else {
              errorMessage = apiError.error_description || apiError.title || JSON.stringify(apiError);
          }
      } else if (typeof errorBody === 'string') {
          errorMessage = errorBody;
      }
      
      throw new Error(errorMessage);
    }

    const data = await response.json();
    const token = data.access_token as string;
    // Amadeus token expires in 3600 seconds. We'll refresh it a bit earlier.
    const expiresIn = (data.expires_in || 3600) - 100; // a buffer of 100 seconds
    
    amadeusTokenCache = {
      token: token,
      expiresAt: now + expiresIn * 1000,
    };
    
    console.log("diagnose: New Amadeus token received and cached.");
    return token;

  } catch (err: unknown) {
    if (err instanceof Error) {
        console.error("diagnose: Failed to get Amadeus token.", err);
        throw new Error(`Error de autenticación de Amadeus: ${err.message}`);
    }
    console.error("diagnose: An unknown error occurred while fetching Amadeus token.", err);
    throw new Error('Error de autenticación de Amadeus debido a un error desconocido.');
  }
}
