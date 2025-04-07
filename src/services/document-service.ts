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
    // async downloadOrViewDocument(documentId: number, download: boolean = true): Promise<string> {
    //     try {
    //         const response = await apiClient.get<Blob>(
    //             `/documents/${documentId}/download?download=${download}`,
    //             {
    //                 responseType: 'blob',
    //                 headers: {
    //                     'X-EntityId': 'BF',
    //                     'accept': 'application/hal+json'
    //                 }
    //             }
    //         );
    //
    //         // Créer une URL Blob pour le fichier
    //         const blob = new Blob([response.data]);
    //         const url = window.URL.createObjectURL(blob);
    //
    //         if (download) {
    //             // Pour télécharger, créer un lien et cliquer dessus
    //             const a = document.createElement('a');
    //             a.href = url;
    //             // Récupérer le nom du fichier depuis l'en-tête de la réponse si disponible
    //             const contentDisposition = response.headers['content-disposition'];
    //             let filename = 'document';
    //
    //             if (contentDisposition) {
    //                 const filenameMatch = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
    //                 if (filenameMatch && filenameMatch[1]) {
    //                     filename = filenameMatch[1].replace(/['"]/g, '');
    //                 }
    //             }
    //
    //             a.download = filename;
    //             a.click();
    //             window.URL.revokeObjectURL(url);
    //             return '';
    //         } else {
    //             // Pour visualiser, retourner l'URL
    //             return url;
    //         }
    //     } catch (error) {
    //         console.error('Erreur lors du téléchargement/visualisation du document:', error);
    //         throw error;
    //     }
    // }

    async downloadOrViewDocument(documentId: number, download: boolean = true): Promise<string> {
        try {
            const response = await apiClient.get<Blob>(
                `/documents/${documentId}/download?download=${download}`,
                {
                    responseType: 'blob',
                    headers: {
                        'X-EntityId': 'BF',
                        'accept': download ? 'application/hal+json' : 'application/pdf' // Spécifier PDF pour la visualisation
                    }
                }
            );

            // Créer une URL Blob pour le fichier avec le bon type MIME
            let contentType = 'application/octet-stream'; // Type par défaut

            // Essayer de déterminer le type de contenu à partir des en-têtes de réponse
            const contentTypeHeader = response.headers['content-type'];
            if (contentTypeHeader) {
                contentType = contentTypeHeader;
            } else {
                // Si le type n'est pas fourni, essayer de le déduire du nom de fichier
                const contentDisposition = response.headers['content-disposition'];
                if (contentDisposition && contentDisposition.includes('.pdf')) {
                    contentType = 'application/pdf';
                }
            }

            const blob = new Blob([response.data], { type: contentType });
            const url = window.URL.createObjectURL(blob);

            if (download) {
                // Pour télécharger, créer un lien et cliquer dessus
                const a = document.createElement('a');
                a.href = url;
                // Récupérer le nom du fichier depuis l'en-tête de la réponse si disponible
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
                // Pour visualiser, retourner l'URL
                return url;
            }
        } catch (error) {
            console.error('Erreur lors du téléchargement/visualisation du document:', error);
            throw error;
        }
    }

}

export default new DocumentService();