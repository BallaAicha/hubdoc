export const auth = {
  ENV_CLIENT_ID: 'XXXXXX', // Use the same client ID from authConfig
  ENV_CLIENT_SECRET: 'XXXXXx', // Use the same client secret from authConfig
  ENV_AUTHORIZATION_ENDPOINT: 'https://xxxxxxx/oauth2/authorize', // Use the same authorize endpoint from authConfig
  ENV_TOKENEND_POINT: 'https://xxxxx/oauth2/token', // Use the same token endpoint from authConfig
  ENV_REDIRECT_URI: 'http://localhost:3000/callback', // Use the same callback URL from authConfig
  ENV_SCOPE: 'openid offline_access', // Use the same scope from authConfig
};