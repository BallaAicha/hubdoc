//
// import { useState } from 'react';
// import documentService from '../services/document-service';
//
// export function useDocumentActions() {
//     const [isLoading, setIsLoading] = useState<boolean>(false);
//     const [error, setError] = useState<string | null>(null);
//     const [viewUrl, setViewUrl] = useState<string | null>(null);
//
//     const downloadDocument = async (documentId: number) => {
//         setIsLoading(true);
//         setError(null);
//
//         try {
//             await documentService.downloadOrViewDocument(documentId, true);
//         } catch (err) {
//             setError("Erreur lors du téléchargement du document");
//             console.error(err);
//         } finally {
//             setIsLoading(false);
//         }
//     };
//
//     const viewDocument = async (documentId: number) => {
//         setIsLoading(true);
//         setError(null);
//         setViewUrl(null);
//
//         try {
//             const url = await documentService.downloadOrViewDocument(documentId, false);
//             setViewUrl(url);
//             // Ouvrir dans un nouvel onglet
//             window.open(url, '_blank');
//         } catch (err) {
//             setError("Erreur lors de la visualisation du document");
//             console.error(err);
//         } finally {
//             setIsLoading(false);
//         }
//     };
//
//     return {
//         downloadDocument,
//         viewDocument,
//         isLoading,
//         error,
//         viewUrl
//     };
// }


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

            // Au lieu d'ouvrir simplement l'URL, créer un élément iframe ou embed pour afficher le PDF directement
            // Ou si l'URL pointe vers le contenu binaire du PDF, utiliser un blob URL
            if (url) {
                // Option 1: Si l'URL est une URL de contenu PDF directe
                window.open(url, '_blank');

                // Option 2: Si vous avez besoin de forcer l'affichage plutôt que le téléchargement
                // Créer un nouvel onglet avec un viewer PDF intégré
                /*
                const newWindow = window.open('', '_blank');
                if (newWindow) {
                    newWindow.document.write(`
                        <html>
                            <head>
                                <title>Visualisation de document</title>
                                <style>body, html, embed {margin: 0; padding: 0; height: 100%; width: 100%;}</style>
                            </head>
                            <body>
                                <embed src="${url}" type="application/pdf" width="100%" height="100%">
                            </body>
                        </html>
                    `);
                    newWindow.document.close();
                }
                */
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