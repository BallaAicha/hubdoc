


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

            // Ouvrir le PDF directement dans un nouvel onglet
            const newWindow = window.open('', '_blank');
            if (newWindow) {
                newWindow.document.write(`
                <html>
                    <head>
                        <title>Visualisation du document</title>
                        <style>
                            body, html { margin: 0; padding: 0; height: 100%; }
                            embed { width: 100%; height: 100%; }
                        </style>
                    </head>
                    <body>
                        <embed src="${url}" type="application/pdf" width="100%" height="100%">
                    </body>
                </html>
            `);
            } else {
                // Si l'ouverture d'une nouvelle fenêtre est bloquée, essayer une approche différente
                setError("Impossible d'ouvrir le document dans un nouvel onglet. Vérifiez si les popups sont bloqués.");
            }
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