import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { pkceChallenge } from '../utils/pkce';
import { 
  AuthContextType, 
  AuthProviderProps, 
  UserInfo, 
  defaultAuthContext, 
  authConfig, 
  CODE_VERIFIER_KEY, 
  STATE_KEY 
} from '../utils/env';

// Création du contexte d'authentification
export const AuthContext = createContext<AuthContextType>(defaultAuthContext);

// Hook personnalisé pour utiliser le contexte d'authentification
export const useAuth = () => useContext(AuthContext);

// Provider du contexte d'authentification
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<UserInfo | null>(null);
  const navigate = useNavigate();

  // Vérifier si l'utilisateur est déjà authentifié au chargement
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('access_token');
      const userInfo = localStorage.getItem('user_info');

      if (token && userInfo) {
        setIsAuthenticated(true);
        setUser(JSON.parse(userInfo));
      }
    };

    checkAuth();
  }, []);

  // Fonction pour initier le processus de connexion
  const login = async () => {
    try {
      // Générer le challenge PKCE qui permet de sécuriser le flux d'autorisation
      const cr = await pkceChallenge();

      // Générer un état aléatoire pour la sécurité pour éviter les attaques CSRF
      const state = Array.from(window.crypto.getRandomValues(new Uint8Array(16)))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');

      // Stocker le code_verifier et l'état dans le sessionStorage, cee code_verifier
      sessionStorage.setItem(CODE_VERIFIER_KEY, cr.code_verifier);
      sessionStorage.setItem(STATE_KEY, state);

      // Construire l'URL d'autorisation
      const authUrl = new URL(authConfig.authorizeEndpoint);

      // Ajouter les paramètres à l'URL
      authUrl.searchParams.append('client_id', authConfig.clientId);
      authUrl.searchParams.append('redirect_uri', authConfig.callbackUrl);
      authUrl.searchParams.append('response_type', 'code');
      authUrl.searchParams.append('scope', authConfig.scope);
      authUrl.searchParams.append('state', state);
      authUrl.searchParams.append('code_challenge', cr.code_challenge);
      authUrl.searchParams.append('code_challenge_method', 'S256');
      authUrl.searchParams.append('authIndexType', 'service');
      authUrl.searchParams.append('authIndexValue', 'L2');
      authUrl.searchParams.append('goto', `${window.location.origin}/callback`);

      // Rediriger vers la page d'autorisation
      window.location.href = authUrl.toString();
    } catch (error) {
      console.error('Erreur lors de l\'initialisation de l\'authentification:', error);
    }
  };

  // Fonction pour se déconnecter
  const logout = () => {
    // Supprimer les informations d'authentification du localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_info');

    // Mettre à jour l'état
    setIsAuthenticated(false);
    setUser(null);

    // Rediriger vers la page de connexion
    navigate('/login');
  };

  // Valeur du contexte
  const value: AuthContextType = {
    isAuthenticated,
    user,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
