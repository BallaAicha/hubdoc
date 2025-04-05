// import { Document } from '../types';
// import apiClient from './api-client';
// export interface CreateDocumentData {
//     fileSize: number;
//     filePath: string;
//     name: string;
//     description: string;
//     version?: string;
//     fileType?: string;
//     folderId?: number | null;
//     parentDocumentId?: number | null;
//     tags?: string[];
//     metadata?: Record<string, string>;
// }
//
// class DocumentService {
//     async getDocumentsByFolder(folderId: number) {
//         const res = await apiClient.get<Document[]>(`/documents/folder/${folderId}`);
//         return res.data;
//     }
//
//     getDocument(id: number) {
//         return apiClient.get<Document>(`/documents/${id}`).then(res => res.data);
//     }
//
//     async getDocumentVersions(id: number) {
//         const res = await apiClient.get<Document[]>(`/documents/${id}/versions`);
//         return res.data;
//     }
//     async createDocument(document: CreateDocumentData): Promise<Document> {
//         const res = await apiClient.post<Document>('/documents', document);
//         return res.data;
//     }
//
// }
//
// export default new DocumentService();
import { Document } from '../types';
import apiClient from './api-client';

export interface CreateDocumentData {
    file: File;
    name: string;
    description: string;
    version: string;
    folderId: number | null;
    parentDocumentId?: number | null;
    status?: string;
    tags?: string[];
    metadata?: Record<string, string>;
}

class DocumentService {

    async createDocument(documentData: CreateDocumentData): Promise<Document> {
        const { file, folderId, ...otherData } = documentData;

        if (!folderId) {
            throw new Error("folderId is required");
        }

        // Création d'un FormData pour l'envoi du fichier
        const formData = new FormData();
        formData.append('file', file);
        formData.append('name', otherData.name);
        formData.append('description', otherData.description);
        formData.append('version', otherData.version);

        if (otherData.parentDocumentId) {
            formData.append('parentDocumentId', String(otherData.parentDocumentId));
        }

        if (otherData.status) {
            formData.append('status', otherData.status);
        }

        // Ajout des tags s'ils existent
        if (otherData.tags && otherData.tags.length > 0) {
            otherData.tags.forEach(tag => {
                formData.append('tags', tag);
            });
        }

        // Ajout des métadonnées s'ils existent
        if (otherData.metadata) {
            Object.entries(otherData.metadata).forEach(([key, value]) => {
                formData.append(`metadata[${key}]`, value);
            });
        }

        // Afficher les données du formulaire pour débogage
        console.log('Form data being sent:');
        for (const pair of formData.entries()) {
            console.log(`${pair[0]}: ${pair[1]}`);
        }

        const res = await apiClient.post<Document>(
            `/documents/${folderId}/upload`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        );

        return res.data;
    }
}

export default new DocumentService();