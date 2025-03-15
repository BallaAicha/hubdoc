# API 5 - Statistiques

## Description
Cette API fournit des métriques et des analyses détaillées sur l'utilisation de votre application.

**Base URL:** `/api/stats`

## Métriques générales
`GET /api/stats/overview`

### Paramètres de requête
| Paramètre | Type   | Description                    |
|-----------|--------|--------------------------------|
| from      | string | Date de début (YYYY-MM-DD)     |
| to        | string | Date de fin (YYYY-MM-DD)       |
| interval  | string | hour, day, week, month         |

### Exemple de réponse
```json
{
  "period": {
    "from": "2024-02-15",
    "to": "2024-03-15"
  },
  "metrics": {
    "total_users": 1250,
    "active_users": 890,
    "total_requests": 45678,
    "average_response_time": 125
  },
  "trends": {
    "users_growth": "+5.3%",
    "usage_growth": "+12.1%"
  }
}
```

## Métriques détaillées
`GET /api/stats/detailed`

### Exemple de réponse
```json
{
  "requests_by_endpoint": {
    "/api/users": 12345,
    "/api/items": 23456,
    "/api/files": 9876
  },
  "response_times": {
    "p50": 100,
    "p90": 250,
    "p99": 500
  },
  "error_rates": {
    "4xx": "2.3%",
    "5xx": "0.1%"
  }
}
```

## Export des données
`GET /api/stats/export`

Formats disponibles :
- CSV
- JSON
- Excel

### Paramètres
- `format`: Format d'export (csv, json, xlsx)
- `metrics`: Liste des métriques à inclure
- `from`: Date de début
- `to`: Date de fin