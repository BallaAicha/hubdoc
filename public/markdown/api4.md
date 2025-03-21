# 🔐 API d'Authentification

**Méthode:** `POST`  
**Endpoint:** `/api/auth/login`  
**Version:** `v1.0`

## 📋 Aperçu

Cette API permet d'authentifier un utilisateur et récupérer un token JWT pour les requêtes ultérieures.

> ℹ️ **Info:** Le token reçu doit être inclus dans tous les appels API suivants.

## 📥 Requête

### En-têtes requis

| Nom           | Valeur         | Description                 |
|---------------|----------------|-----------------------------|
| Content-Type  | application/json | Format des données envoyées |

### Corps de la requête

```json
{
  "email": "user@example.com",
  "password": "supersecretpassword"
}
```

### Paramètres

| Paramètre | Type   | Requis | Description                     |
|-----------|--------|--------|---------------------------------|
| email     | string | Oui    | Adresse email de l'utilisateur  |
| password  | string | Oui    | Mot de passe de l'utilisateur   |

## 📤 Réponse

### Réponse positive (200 OK)

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expires_in": 3600
}
```

### Paramètres de réponse

| Paramètre  | Type    | Description                                   |
|------------|---------|-----------------------------------------------|
| token      | string  | Token JWT à utiliser pour les requêtes futures |
| expires_in | integer | Durée de validité du token en secondes        |

## ⚠️ Erreurs possibles

| Code | Message                   | Description                                |
|------|---------------------------|--------------------------------------------|
| 400  | Invalid credentials       | Email ou mot de passe incorrect            |
| 429  | Too many attempts         | Trop de tentatives de connexion échouées   |
| 500  | Internal server error     | Erreur interne du serveur                  |

## 📚 Exemples d'utilisation

### Exemple avec cURL

```bash
curl -X POST https://api.example.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "supersecretpassword"}'
```

### Exemple avec JavaScript (fetch)

```javascript
const response = await fetch('https://api.example.com/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'supersecretpassword'
  })
});

const data = await response.json();
console.log(data.token); // Utilisez ce token pour les futures requêtes
```

## 🔗 Prochaines étapes

* [Récupération du profil utilisateur](/api/users/profile)
* [Modification du mot de passe](/api/users/change-password)
* [Déconnexion](/api/auth/logout)

---

> 📝 **Note de sécurité:**
> - Assurez-vous de toujours transmettre les identifiants via HTTPS.
> - Pour toute requête authentifiée ultérieure, ajoutez l'en-tête:
    >   ```
    >   Authorization: Bearer {votre-token}
    >   ```