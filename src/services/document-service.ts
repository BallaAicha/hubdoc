import { Document } from '../types';
import apiClient from './api-client';

class DocumentService {
    getDocumentsByFolder(folderId: number) {
        return apiClient.get<Document[]>(`/documents/folder/${folderId}`).then(res => res.data);
    }

    getDocument(id: number) {
        return apiClient.get<Document>(`/documents/${id}`).then(res => res.data);
    }

    getDocumentVersions(id: number) {
        return apiClient.get<Document[]>(`/documents/${id}/versions`).then(res => res.data);
    }
}

export default new DocumentService();