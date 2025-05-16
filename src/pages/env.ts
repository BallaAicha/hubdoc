export const auth = {
  ENV_CLIENT_ID: 'XXXXXX', // Use the same client ID from authConfig
  ENV_CLIENT_SECRET: 'XXXXXx', // Use the same client secret from authConfig
  ENV_AUTHORIZATION_ENDPOINT: 'https://sgconnect-hom.fr.world.socgen/sgconnect/json/authenticate', // Updated based on error message
  ENV_TOKENEND_POINT: 'https://sgconnect-hom.fr.world.socgen/sgconnect/json/accessToken', // Updated based on error message
  ENV_REDIRECT_URI: 'http://localhost:3000/callback', // Use the same callback URL from authConfig
  ENV_SCOPE: 'openid offline_access', // Use the same scope from authConfig
};
