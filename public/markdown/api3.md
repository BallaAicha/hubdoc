# API 3 - Envoi de fichier

## Description
Cette API permet l'upload sécurisé de fichiers vers notre plateforme.

**Base URL:** `/api/files`

## Upload de fichier
`POST /api/files/upload`

### Headers requis
```
Content-Type: multipart/form-data
Authorization: Bearer <votre-token>
```

### Corps de la requête
| Champ       | Type   | Description                          |
|-------------|--------|--------------------------------------|
| file        | File   | Le fichier à uploader               |
| description | string | Description optionnelle du fichier   |
| folder      | string | Dossier de destination (optionnel)   |

### Exemple avec curl
```bash
curl -X POST \
  -H "Authorization: Bearer <votre-token>" \
  -F "file=@document.pdf" \
  -F "description=Document important" \
  https://api.example.com/api/files/upload
```

### Réponse
```json
{
  "id": "file_123",
  "filename": "document.pdf",
  "size": 1024576,
  "mime_type": "application/pdf",
  "url": "https://storage.example.com/files/document.pdf",
  "created_at": "2024-03-15T10:30:00Z"
}
```

## Limitations
- Taille maximale : 100MB
- Formats acceptés : .pdf, .doc, .docx, .xls, .xlsx, .jpg, .png
- Rate limit : 100 uploads par heure

## Sécurité
- Analyse antivirus automatique
- Vérification de l'intégrité du fichier
- Chiffrement au repos