# API 1 - Authentification

## Description
Cette API permet d'authentifier un utilisateur à l'aide de son email et mot de passe.

**Endpoint:** `POST /api/auth/login`

## Exemple de requête

```json
{
  "email": "user@example.com",
  "password": "supersecretpassword"
}
```

## Exemple de réponse

```json
{
  "token": "jwt-token",
  "expires_in": 3600
}
```

## Notes
- Assurez-vous d'inclure le token dans les appels futurs via l'en-tête Authorization.