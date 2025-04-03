import { useQuery } from '@tanstack/react-query';
import documentService from '../services/document-service';
import { Document } from '../types';
export const useDocuments = (folderId: number) => {
    return useQuery<Document[], Error>({
        queryKey: ['documents', folderId],
        queryFn: () => documentService.getDocumentsByFolder(folderId),
        staleTime: 10 * 1000,
    });
};