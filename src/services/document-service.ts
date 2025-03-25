import { Document } from '../types';
import apiClient from './api-client';
export interface CreateDocumentData {
    fileSize: number;
    filePath: string;
    name: string;
    description: string;
    version?: string;
    fileType?: string;
    folderId?: number | null;
    parentDocumentId?: number | null;
    tags?: string[];
    metadata?: Record<string, string>;
}

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
    createDocument(document: CreateDocumentData): Promise<Document> {
        return apiClient.post<Document>('/documents', document).then(res => res.data);
    }

}

export default new DocumentService();