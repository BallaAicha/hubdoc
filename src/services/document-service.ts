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

        async getDocumentsByFolder(folderId: number) {
        const res = await apiClient.get<Document[]>(`/documents/folder/${folderId}`);
        return res.data;
    }

    getDocument(id: number) {
        return apiClient.get<Document>(`/documents/${id}`).then(res => res.data);
    }

    async getDocumentVersions(id: number) {
        const res = await apiClient.get<Document[]>(`/documents/${id}/versions`);
        return res.data;
    }
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

    /**
     * Télécharge ou visualise un document selon le paramètre download
     * @param documentId ID du document
     * @param download true pour télécharger, false pour visualiser dans le navigateur
     * @returns Une URL Blob pour accéder au document
     */


    // DocumentService.ts
    async downloadOrViewDocument(documentId: number, download: boolean = true): Promise<string> {
        try {
            if (download) {
                const response = await apiClient.get<Blob>(
                    `/documents/${documentId}/download?download=true`,
                    {
                        responseType: 'blob',
                        headers: {
                            'X-EntityId': 'BF',
                            'accept': 'application/octet-stream'
                        }
                    }
                );

                // Créer un Blob à partir des données
                const blob = new Blob([response.data]);
                const url = window.URL.createObjectURL(blob);

                // Télécharger
                const a = document.createElement('a');
                a.href = url;

                const contentDisposition = response.headers['content-disposition'];
                let filename = 'document';

                if (contentDisposition) {
                    const filenameMatch = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
                    if (filenameMatch && filenameMatch[1]) {
                        filename = filenameMatch[1].replace(/['"]/g, '');
                    }
                }

                a.download = filename;
                a.click();
                window.URL.revokeObjectURL(url);

                return '';
            } else {
                // Demander une URL directe depuis le backend
                const response = await apiClient.get<string>(
                    `/documents/${documentId}/download?download=false`,
                    {
                        responseType: 'text',
                        headers: {
                            'X-EntityId': 'BF'
                        }
                    }
                );
                // réponse directe du backend
                return response.data;
            }
        } catch (error) {
            console.error('Erreur lors du téléchargement/visualisation du document:', error);
            throw error;
        }
    }

    async fetchLatestDocumentVersions(): Promise<Document[]> {
        const response = await apiClient.get<Document[]>('/documents/latest-versions', {
            headers: {'X-EntityId': 'BF'},
        });
        return response.data;
    }



}

export default new DocumentService();