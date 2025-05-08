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

        // Afficher les tokens dans la console pour le débogage
        console.log('=== INFORMATIONS DE TOKEN ===');
        console.log('Access Token:', access_token);
        console.log('Refresh Token:', refresh_token);
        console.log('ID Token:', id_token);
        console.log('Données complètes du token:', tokenData);
        console.log('=============================');

        // Stocker les tokens dans le localStorage
        localStorage.setItem('access_token', access_token);
        if (refresh_token) {
          localStorage.setItem('refresh_token', refresh_token);
        }

        // Fonction pour décoder un JWT token
        const decodeJwtToken = (token: string) => {
          try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(
              atob(base64)
                .split('')
                .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
            );
            return JSON.parse(jsonPayload);
          } catch (e) {
            console.error('Erreur lors du décodage du token:', e);
            return null;
          }
        };

        // Récupérer les informations de l'utilisateur à partir du token JWT
        try {
          // Essayer d'abord avec id_token, puis avec access_token si id_token n'est pas disponible
          const tokenToUse = id_token || access_token;

          if (tokenToUse) {
            // Décoder le token
            const decodedToken = decodeJwtToken(tokenToUse);

            if (decodedToken) {
              console.log('Decoded Token Payload:', decodedToken);

              // Extraire les informations utiles de l'utilisateur
              const userInfo = {
                sub: decodedToken.sub || '',
                mail: decodedToken.mail || '',
                email: decodedToken.mail || '', // Alias pour mail
                givenname: decodedToken.givenname || '',
                sn: decodedToken.sn || '',
                name: `${decodedToken.givenname || ''} ${decodedToken.sn || ''}`.trim(),
                sgjob: decodedToken.sgjob || '',
                c: decodedToken.c || '',
                sgservicename: decodedToken.sgservicename || '',
                sgigg: decodedToken.sgigg || '',
              };

              console.log('Extracted User Info:', userInfo);
              localStorage.setItem('user_info', JSON.stringify(userInfo));
            } else {
              console.error('Impossible de décoder le token');
            }
          } else {
            console.error('Aucun token disponible pour extraire les informations utilisateur');
          }
        } catch (e) {
          console.error('Erreur lors de l\'extraction des informations utilisateur:', e);
        }

        // Nettoyer le sessionStorage
        sessionStorage.removeItem(CODE_VERIFIER_KEY);
        sessionStorage.removeItem(STATE_KEY);

        // Rediriger vers la page d'accueil
        navigate('/home');
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
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
          <p className="text-blue-700 text-sm">
            <strong>Info:</strong> Les informations du token sont affichées dans la console du navigateur.
            Appuyez sur F12 ou clic droit → Inspecter → Console pour les voir.
          </p>
        </div>
      </div>
    </div>
  );
}
