# API 4 - Supprimer un élément

## Description
Cette API permet de supprimer des éléments de manière sécurisée avec possibilité de restauration.

**Base URL:** `/api/items`

## Suppression d'un élément
`DELETE /api/items/:id`

### Headers requis
```
Authorization: Bearer <votre-token>
Content-Type: application/json
```

### Paramètres optionnels
```json
{
  "permanent": false,
  "reason": "Doublon"
}
```

### Réponse
```json
{
  "id": "item_123",
  "status": "deleted",
  "deleted_at": "2024-03-15T10:30:00Z",
  "can_restore": true,
  "restore_until": "2024-04-15T10:30:00Z"
}
```

## Restauration d'un élément
`POST /api/items/:id/restore`

### Réponse
```json
{
  "id": "item_123",
  "status": "restored",
  "restored_at": "2024-03-15T10:35:00Z"
}
```

## Suppression par lot
`DELETE /api/items/batch`

### Corps de la requête
```json
{
  "ids": ["item_123", "item_456"],
  "permanent": false
}
```

## Politiques de suppression
- Suppression douce par défaut (30 jours de rétention)
- Suppression permanente sur demande explicite
- Journal d'audit des suppressions
- Restrictions basées sur les rôles