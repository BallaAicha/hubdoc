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
    async createDocument(document: CreateDocumentData): Promise<Document> {
        const res = await apiClient.post<Document>('/documents', document);
        return res.data;
    }

}

export default new DocumentService();