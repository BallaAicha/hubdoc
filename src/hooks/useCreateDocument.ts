// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import documentService, { CreateDocumentData } from '../services/document-service';
// import { Document } from "../types";
//
// export const useCreateDocument = (onSuccess?: () => void) => {
//     const queryClient = useQueryClient();
//
//     return useMutation<Document, Error, CreateDocumentData>({
//         mutationFn: documentService.createDocument,
//
//         onMutate: async (newDocument) => {
//             // Annuler les requêtes en cours
//             await queryClient.cancelQueries({ queryKey: ['documents'] });
//
//             if (newDocument.folderId) {
//                 await queryClient.cancelQueries({ queryKey: ['documents', newDocument.folderId] });
//             }
//
//             // Si c'est une version d'un document existant, annuler aussi les requêtes relatives au document parent
//             if (newDocument.parentDocumentId) {
//                 await queryClient.cancelQueries({ queryKey: ['document', newDocument.parentDocumentId] });
//                 await queryClient.cancelQueries({ queryKey: ['document-versions', newDocument.parentDocumentId] });
//
//                 // Récupérer le document parent pour obtenir son folderId
//                 const parentDocument = queryClient.getQueryData<Document>(
//                     ['document', newDocument.parentDocumentId]
//                 );
//
//                 // Si le document parent existe et qu'aucun folderId n'est spécifié, utiliser celui du parent
//                 if (parentDocument && !newDocument.folderId) {
//                     newDocument.folderId = parentDocument.folderId;
//                 }
//             }
//
//             // Sauvegarde de l'état précédent
//             const queryKey = newDocument.folderId
//                 ? ['documents', newDocument.folderId]
//                 : ['documents'];
//
//             const previousDocuments = queryClient.getQueryData<Document[]>(queryKey) || [];
//
//             // Document optimiste pour UI immédiate
//             const optimisticDocument: Document = {
//                 ...newDocument,
//                 id: Math.random(),
//                 status: 'ACTIVE',
//                 versionIds: [],
//                 filePath: newDocument.filePath || '',
//                 fileSize: newDocument.fileSize || 0,
//                 createdAt: new Date().toISOString(),
//                 updatedAt: new Date().toISOString(),
//                 metadata: {
//                     département: newDocument.metadata?.département || '',
//                     confidentialité: newDocument.metadata?.confidentialité || '',
//                     auteur: newDocument.metadata?.auteur || '',
//                     ...(newDocument.metadata || {})
//                 },
//                 fileType: newDocument.fileType || '',
//                 version: newDocument.version || '1.0', // Version par défaut si non spécifiée
//                 folderId: newDocument.folderId || 0,
//                 parentDocumentId: newDocument.parentDocumentId || null,
//                 tags: newDocument.tags || []
//             };
//
//             // Mise à jour de l'UI avec le document optimiste
//             queryClient.setQueryData<Document[]>(queryKey, [...previousDocuments, optimisticDocument]);
//
//             return { previousDocuments, queryKey };
//         },
//
//         onSuccess: (newDocument) => {
//             // Invalider les requêtes pour forcer un rafraîchissement
//             queryClient.invalidateQueries({ queryKey: ['documents'] });
//
//             if (newDocument.folderId) {
//                 queryClient.invalidateQueries({ queryKey: ['documents', newDocument.folderId] });
//             }
//
//             // Si c'est une nouvelle version, mettre à jour le document parent et ses versions
//             if (newDocument.parentDocumentId) {
//                 queryClient.invalidateQueries({ queryKey: ['document', newDocument.parentDocumentId] });
//                 queryClient.invalidateQueries({ queryKey: ['document-versions', newDocument.parentDocumentId] });
//
//                 // Mettre à jour également la liste des versions du document parent
//                 const parentDocument = queryClient.getQueryData<Document>(['document', newDocument.parentDocumentId]);
//                 if (parentDocument && parentDocument.versionIds) {
//                     queryClient.setQueryData(['document', newDocument.parentDocumentId], {
//                         ...parentDocument,
//                         versionIds: [...parentDocument.versionIds, newDocument.id]
//                     });
//                 }
//             }
//
//             // Appeler le callback de succès si fourni
//             if (onSuccess) {
//                 onSuccess();
//             }
//         },
//
//         onError: (_, _newDocument, context: any) => {
//             // En cas d'erreur, restaurer l'état précédent
//             if (!context) return;
//             queryClient.setQueryData(context.queryKey, context.previousDocuments);
//         }
//     });
// };
import { useMutation, useQueryClient } from '@tanstack/react-query';
import documentService, { CreateDocumentData } from '../services/document-service';
import { Document } from "../types";

export const useCreateDocument = (onSuccess?: () => void) => {
    const queryClient = useQueryClient();

    return useMutation<Document, Error, CreateDocumentData>({
        mutationFn: documentService.createDocument,

        onMutate: async (newDocument) => {
            // Annuler les requêtes en cours
            await queryClient.cancelQueries({ queryKey: ['documents'] });

            if (newDocument.folderId) {
                await queryClient.cancelQueries({ queryKey: ['documents', newDocument.folderId] });
            }

            // Si c'est une version d'un document existant, annuler aussi les requêtes relatives au document parent
            if (newDocument.parentDocumentId) {
                await queryClient.cancelQueries({ queryKey: ['document', newDocument.parentDocumentId] });
                await queryClient.cancelQueries({ queryKey: ['document-versions', newDocument.parentDocumentId] });

                // Récupérer le document parent pour obtenir son folderId
                const parentDocument = queryClient.getQueryData<Document>(
                    ['document', newDocument.parentDocumentId]
                );

                // Si le document parent existe et qu'aucun folderId n'est spécifié, utiliser celui du parent
                if (parentDocument && !newDocument.folderId) {
                    newDocument.folderId = parentDocument.folderId;
                }
            }

            // Sauvegarde de l'état précédent
            const queryKey = newDocument.folderId
                ? ['documents', newDocument.folderId]
                : ['documents'];

            const previousDocuments = queryClient.getQueryData<Document[]>(queryKey) || [];

            // Document optimiste pour UI immédiate
            const optimisticDocument: Document = {
                ...newDocument,
                id: Math.random(),
                status: newDocument.status || 'DRAFT',
                versionIds: [],
                filePath: '',
                fileSize: newDocument.file.size,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                metadata: {
                    département: newDocument.metadata?.département || '',
                    confidentialité: newDocument.metadata?.confidentialité || '',
                    auteur: newDocument.metadata?.auteur || '',
                    ...(newDocument.metadata || {})
                },
                fileType: newDocument.file.type || 'application/pdf',
                version: newDocument.version || '1.0',
                folderId: newDocument.folderId || 0,
                parentDocumentId: newDocument.parentDocumentId || null,
                tags: newDocument.tags || [],
                name: newDocument.name,
                description: newDocument.description
            };

            // Mise à jour de l'UI avec le document optimiste
            queryClient.setQueryData<Document[]>(queryKey, [...previousDocuments, optimisticDocument]);

            return { previousDocuments, queryKey };
        },

        onSuccess: (newDocument) => {
            // Invalider les requêtes pour forcer un rafraîchissement
            queryClient.invalidateQueries({ queryKey: ['documents'] });

            if (newDocument.folderId) {
                queryClient.invalidateQueries({ queryKey: ['documents', newDocument.folderId] });
            }

            // Si c'est une nouvelle version, mettre à jour le document parent et ses versions
            if (newDocument.parentDocumentId) {
                queryClient.invalidateQueries({ queryKey: ['document', newDocument.parentDocumentId] });
                queryClient.invalidateQueries({ queryKey: ['document-versions', newDocument.parentDocumentId] });

                // Mettre à jour également la liste des versions du document parent
                const parentDocument = queryClient.getQueryData<Document>(['document', newDocument.parentDocumentId]);
                if (parentDocument && parentDocument.versionIds) {
                    queryClient.setQueryData(['document', newDocument.parentDocumentId], {
                        ...parentDocument,
                        versionIds: [...parentDocument.versionIds, newDocument.id]
                    });
                }
            }

            // Appeler le callback de succès si fourni
            if (onSuccess) {
                onSuccess();
            }
        },

        onError: (_, _newDocument, context: any) => {
            // En cas d'erreur, restaurer l'état précédent
            if (!context) return;
            queryClient.setQueryData(context.queryKey, context.previousDocuments);
        }
    });
};