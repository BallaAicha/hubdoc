# API 2 - Récupération des données

## Description
Cette API permet de récupérer les données de votre application de manière efficace et sécurisée.

**Base URL:** `/api/data`

## Endpoints

### Récupérer tous les éléments
`GET /api/data/items`

#### Paramètres de requête
| Paramètre | Type    | Description                    |
|-----------|---------|--------------------------------|
| page      | number  | Numéro de la page (défaut: 1)  |
| limit     | number  | Éléments par page (défaut: 10) |
| sort      | string  | Champ de tri                   |

#### Exemple de réponse
```json
{
  "items": [
    {
      "id": "123",
      "name": "Example Item",
      "created_at": "2024-03-15T10:30:00Z"
    }
  ],
  "total": 100,
  "page": 1,
  "pages": 10
}
```

### Récupérer un élément spécifique
`GET /api/data/items/:id`

#### Exemple de réponse
```json
{
  "id": "123",
  "name": "Example Item",
  "description": "Detailed description",
  "created_at": "2024-03-15T10:30:00Z",
  "updated_at": "2024-03-15T10:30:00Z"
}
```

## Gestion des erreurs
| Code | Description                    |
|------|--------------------------------|
| 400  | Requête invalide              |
| 401  | Non authentifié               |
| 403  | Non autorisé                  |
| 404  | Ressource non trouvée         |
| 429  | Trop de requêtes              |
| 500  | Erreur serveur                |