import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authConfig, CODE_VERIFIER_KEY, STATE_KEY } from '../utils/env';

export function Callback() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Récupérer les paramètres de l'URL
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const state = urlParams.get('state');
        const error = urlParams.get('error');

        // Vérifier s'il y a une erreur dans la réponse
        if (error) {
          throw new Error(`Erreur d'authentification: ${error}`);
        }

        // Vérifier si le code et l'état sont présents
        if (!code || !state) {
          throw new Error('Paramètres manquants dans la réponse');
        }

        // Récupérer le code_verifier et l'état stockés
        const storedState = sessionStorage.getItem(STATE_KEY);
        const codeVerifier = sessionStorage.getItem(CODE_VERIFIER_KEY);

        // Vérifier si l'état correspond
        if (state !== storedState) {
          throw new Error('État invalide, possible attaque CSRF');
        }

        // Vérifier si le code_verifier est présent
        if (!codeVerifier) {
          throw new Error('Code verifier manquant');
        }

        // Échanger le code d'autorisation contre un token d'accès
        const tokenResponse = await fetch(authConfig.tokenEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            grant_type: 'authorization_code',
            client_id: authConfig.clientId,
            client_secret: authConfig.clientSecret,
            code_verifier: codeVerifier,
            code: code,
            redirect_uri: authConfig.callbackUrl,
          }),
        });

        // Vérifier si la réponse est OK
        if (!tokenResponse.ok) {
          const errorData = await tokenResponse.json();
          throw new Error(`Erreur lors de l'échange du code: ${errorData.error}`);
        }

        // Extraire les données du token
        const tokenData = await tokenResponse.json();
        const { access_token, refresh_token, id_token } = tokenData;

        // Stocker les tokens dans le localStorage
        localStorage.setItem('access_token', access_token);
        if (refresh_token) {
          localStorage.setItem('refresh_token', refresh_token);
        }

        // Récupérer les informations de l'utilisateur à partir du id_token (JWT)
        if (id_token) {
          try {
            // Décoder le JWT (id_token)
            const base64Url = id_token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(
              atob(base64)
                .split('')
                .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
            );

            const userInfo = JSON.parse(jsonPayload);
            localStorage.setItem('user_info', JSON.stringify(userInfo));
          } catch (e) {
            console.error('Erreur lors du décodage du id_token:', e);
          }
        }

        // Nettoyer le sessionStorage
        sessionStorage.removeItem(CODE_VERIFIER_KEY);
        sessionStorage.removeItem(STATE_KEY);

        // Rediriger vers la page d'accueil
        navigate('/');
      } catch (error) {
        console.error('Erreur lors du traitement du callback:', error);
        setError(error instanceof Error ? error.message : 'Erreur inconnue');
      }
    };

    handleCallback();
  }, [navigate]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Erreur d'authentification</h2>
          <p className="text-gray-700 mb-4">{error}</p>
          <button
            onClick={() => navigate('/login')}
            className="w-full py-2 px-4 bg-[#e9041e] text-white rounded-md hover:bg-red-700 transition"
          >
            Retour à la page de connexion
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#e9041e] mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-700">Authentification en cours...</h2>
        <p className="text-gray-500 mt-2">Veuillez patienter pendant que nous finalisons votre connexion.</p>
      </div>
    </div>
  );
}