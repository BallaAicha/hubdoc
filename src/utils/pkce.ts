/**
 * Utilitaire pour générer les challenges PKCE (Proof Key for Code Exchange)
 * nécessaires pour l'authentification OAuth2 avec SgConnect
 */

// Fonction pour générer un code verifier aléatoire
function generateRandomString(length: number): string {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
  let text = '';
  
  const randomValues = new Uint8Array(length);
  window.crypto.getRandomValues(randomValues);
  
  for (let i = 0; i < length; i++) {
    text += possible.charAt(randomValues[i] % possible.length);
  }
  
  return text;
}

// Fonction pour calculer le SHA-256 hash d'une chaîne
async function sha256(plain: string): Promise<ArrayBuffer> {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return await window.crypto.subtle.digest('SHA-256', data);
}

// Fonction pour convertir un ArrayBuffer en chaîne base64url
function base64urlEncode(arrayBuffer: ArrayBuffer): string {
  const bytes = new Uint8Array(arrayBuffer);
  let base64 = '';
  
  const encodings = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  
  const byteLength = bytes.byteLength;
  const byteRemainder = byteLength % 3;
  const mainLength = byteLength - byteRemainder;
  
  let a, b, c, d;
  let chunk;
  
  // Main loop deals with bytes in chunks of 3
  for (let i = 0; i < mainLength; i = i + 3) {
    // Combine the three bytes into a single integer
    chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];
    
    // Use bitmasks to extract 6-bit segments from the triplet
    a = (chunk & 16515072) >> 18; // 16515072 = (2^6 - 1) << 18
    b = (chunk & 258048) >> 12;   // 258048   = (2^6 - 1) << 12
    c = (chunk & 4032) >> 6;      // 4032     = (2^6 - 1) << 6
    d = chunk & 63;               // 63       = 2^6 - 1
    
    // Convert the raw binary segments to the appropriate ASCII encoding
    base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d];
  }
  
  // Deal with the remaining bytes and padding
  if (byteRemainder === 1) {
    chunk = bytes[mainLength];
    
    a = (chunk & 252) >> 2; // 252 = (2^6 - 1) << 2
    
    // Set the 4 least significant bits to zero
    b = (chunk & 3) << 4; // 3 = 2^2 - 1
    
    base64 += encodings[a] + encodings[b] + '==';
  } else if (byteRemainder === 2) {
    chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1];
    
    a = (chunk & 64512) >> 10; // 64512 = (2^6 - 1) << 10
    b = (chunk & 1008) >> 4;   // 1008  = (2^6 - 1) << 4
    
    // Set the 2 least significant bits to zero
    c = (chunk & 15) << 2; // 15 = 2^4 - 1
    
    base64 += encodings[a] + encodings[b] + encodings[c] + '=';
  }
  
  // Remplacer les caractères non compatibles avec URL
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

// Interface pour le résultat du challenge PKCE
export interface PKCEChallenge {
  code_verifier: string;
  code_challenge: string;
}

// Fonction principale pour générer un challenge PKCE
export async function pkceChallenge(): Promise<PKCEChallenge> {
  // Générer un code verifier aléatoire (entre 43 et 128 caractères)
  const code_verifier = generateRandomString(64);
  
  // Calculer le code challenge en utilisant SHA-256 et base64url
  const hashed = await sha256(code_verifier);
  const code_challenge = base64urlEncode(hashed);
  
  return { code_verifier, code_challenge };
}