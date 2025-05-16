import { ReactNode } from 'react';

// Configuration pour l'authentification OAuth2 avec SgConnect
export const authConfig = {
  clientId: 'XXXXXX', // Remplacer par le vrai Client ID
  clientSecret: 'XXXXXx', // Remplacer par le vrai Client Secret
  authorizeEndpoint: 'https://sgconnect-hom.fr.world.socgen/sgconnect/json/authenticate',
  tokenEndpoint: 'https://sgconnect-hom.fr.world.socgen/sgconnect/json/accessToken',
  callbackUrl: 'http://localhost:3000/callback',
  scope: 'openid offline_access',
};

// Clé pour stocker le code verifier dans le sessionStorage
export const CODE_VERIFIER_KEY = 'sg-connect-code-verifier';
export const STATE_KEY = 'sg-connect-state';

// Interface pour l'utilisateur authentifié
export interface UserInfo {
  sub: string;                // Identifiant utilisateur
  mail?: string;              // Email de l'utilisateur
  givenname?: string;         // Prénom
  sn?: string;                // Nom de famille
  sgjob?: string;             // Poste/fonction
  c?: string;                 // Pays
  sgservicename?: string;     // Service/département
  sgigg?: string;             // Identifiant interne
  name?: string;              // Nom complet (peut être construit à partir de givenname et sn)
  email?: string;             // Alias pour mail
  [key: string]: string | number | boolean | undefined; // Pour les propriétés supplémentaires retournées par SgConnect
}

// Interface pour le contexte d'authentification
export interface AuthContextType {
  isAuthenticated: boolean;
  user: UserInfo | null;
  login: () => void;
  logout: () => void;
}

// Contexte d'authentification par défaut
export const defaultAuthContext: AuthContextType = {
  isAuthenticated: false,
  user: null,
  login: () => {},
  logout: () => {},
};

// Type pour les props du provider d'authentification
export interface AuthProviderProps {
  children: ReactNode;
}
