import { useQuery } from '@tanstack/react-query';

import DocumentService from '../services/document-service';
import { Document } from '../types';

export function useLatestDocumentVersions() {
    return useQuery<Document[]>({
        queryKey: ['latestDocumentVersions'],
        queryFn: () => DocumentService.fetchLatestDocumentVersions(),
    });
}