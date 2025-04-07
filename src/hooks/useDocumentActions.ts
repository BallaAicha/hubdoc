
import { useState } from 'react';
import documentService from '../services/document-service';

export function useDocumentActions() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [viewUrl, setViewUrl] = useState<string | null>(null);

    const downloadDocument = async (documentId: number) => {
        setIsLoading(true);
        setError(null);

        try {
            await documentService.downloadOrViewDocument(documentId, true);
        } catch (err) {
            setError("Erreur lors du téléchargement du document");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const viewDocument = async (documentId: number) => {
        setIsLoading(true);
        setError(null);
        setViewUrl(null);

        try {
            const url = await documentService.downloadOrViewDocument(documentId, false);
            setViewUrl(url);
            // Ouvrir dans un nouvel onglet
            window.open(url, '_blank');
        } catch (err) {
            setError("Erreur lors de la visualisation du document");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        downloadDocument,
        viewDocument,
        isLoading,
        error,
        viewUrl
    };
}