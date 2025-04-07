
import { Dialog, Transition } from "@headlessui/react";
import { X, Download, Eye, FileText, Share, Plus, History } from "lucide-react";
import { Document } from "../../types";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import documentService from "../../services/document-service";
import {useDocumentActions} from "../../hooks/useDocumentActions.ts";

interface DocumentDetailsProps {
    showDetails: boolean;
    setShowDetails: (value: boolean) => void;
    selectedItem: Document | null;
}

export default function DocumentDetails({ showDetails, setShowDetails, selectedItem }: DocumentDetailsProps) {
    const navigate = useNavigate();
    const [documentVersions, setDocumentVersions] = useState<Document[]>([]);
    const [currentDocument, setCurrentDocument] = useState<Document | null>(selectedItem);
    const [isLoadingVersions, setIsLoadingVersions] = useState(false);

    const {
        downloadDocument,
        viewDocument,
        isLoading: isActionLoading,
        error: actionError
    } = useDocumentActions();


    // Charger les versions du document lorsqu'un document est sélectionné
    useEffect(() => {
        if (selectedItem && showDetails) {
            setIsLoadingVersions(true);
            setCurrentDocument(selectedItem);

            // Déterminer l'ID du document parent ou utiliser l'ID actuel si c'est le parent
            const documentId = selectedItem.parentDocumentId || selectedItem.id;

            documentService.getDocumentVersions(documentId)
                .then(versions => {
                    setDocumentVersions(versions);
                    setIsLoadingVersions(false);
                })
                .catch(error => {
                    console.error("Erreur lors du chargement des versions:", error);
                    setIsLoadingVersions(false);
                });
        }
    }, [selectedItem, showDetails]);

    const handleDownload = () => {
        if (currentDocument) {
            downloadDocument(currentDocument.id);
        }
    };


    // const handleView = () => {
    //     if (currentDocument) {
    //         viewDocument(currentDocument.id);
    //     }
    // };

    const handleView = async () => {
        if (!currentDocument) return;

        try {
            const url = await documentService.downloadOrViewDocument(currentDocument.id, false);
            window.open(url, '_blank'); // Cela ouvre directement le PDF dans le navigateur
        } catch (error) {
            console.error("Erreur ouverture document", error);
        }
    };

    // Changement de version sélectionnée
    const handleVersionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedVersionId = parseInt(event.target.value);
        const selectedVersion = documentVersions.find(doc => doc.id === selectedVersionId);
        if (selectedVersion) {
            setCurrentDocument(selectedVersion);
        }
    };

    const handleCreateVersion = () => {
        if (currentDocument) {
            navigate(`/documents/create-version/${currentDocument.id}?folderId=${currentDocument.folderId}`);
            setShowDetails(false);
        }
    };

    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <Transition show={showDetails} as={React.Fragment}>
            <Dialog as="div" className="fixed z-30 inset-0 overflow-y-auto"
                    onClose={() => setShowDetails(false)}>
                <div className="flex items-center justify-center min-h-screen pt-16 px-4 pb-4">
                    <Dialog.Overlay className="fixed inset-0 bg-black/30 backdrop-blur-sm"/>
                    <div className="relative bg-white rounded-xl max-w-3xl w-full mx-auto shadow-xl transform transition-all sm:my-8">
                        {/* Header */}
                        <div className="px-6 py-4 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <Dialog.Title className="text-lg font-semibold text-gray-900">
                                    Détails du document
                                </Dialog.Title>
                                <button
                                    onClick={() => setShowDetails(false)}
                                    className="text-gray-400 hover:text-gray-500 transition-colors"
                                >
                                    <X className="h-5 w-5"/>
                                </button>
                            </div>
                        </div>

                        {currentDocument && !('subFolderIds' in currentDocument) && (
                            <div className="p-6">
                                <div className="flex items-start mb-6">
                                    <div className="mr-4 p-3 bg-red-50 rounded-lg">
                                        <FileText className="h-8 w-8 text-red-500"/>
                                    </div>
                                    <div className="flex-grow">
                                        <h2 className="text-xl font-bold text-gray-900">{currentDocument.name}</h2>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                                                v{currentDocument.version}
                                            </span>
                                            <span className="text-sm text-gray-500">
                                                {currentDocument.description}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Sélecteur de versions - Sans sélection par défaut */}
                                    <div className="min-w-[180px]">
                                        <label htmlFor="version-selector" className="block text-sm font-medium text-gray-700 mb-1">
                                            Choisir version
                                        </label>
                                        <select
                                            id="version-selector"
                                            className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                            onChange={handleVersionChange}
                                            defaultValue=""
                                            disabled={isLoadingVersions || documentVersions.length === 0}
                                        >
                                            <option value="" disabled>Sélectionner une version</option>
                                            {isLoadingVersions ? (
                                                <option disabled>Chargement...</option>
                                            ) : documentVersions.length === 0 ? (
                                                <option disabled>Aucune version</option>
                                            ) : (
                                                documentVersions.map(version => (
                                                    <option key={version.id} value={version.id}>
                                                        v{version.version} - {new Date(version.createdAt).toLocaleDateString('fr-FR')}
                                                    </option>
                                                ))
                                            )}
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h3 className="font-medium text-gray-700 mb-3">Informations</h3>
                                        <div className="space-y-2.5 text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">Type</span>
                                                <span className="font-medium">{currentDocument.fileType?.toUpperCase() || 'Non spécifié'}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">Version</span>
                                                <span className="font-medium">{currentDocument.version || 'N/A'}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">Taille</span>
                                                <span className="font-medium">{currentDocument.fileSize ? formatFileSize(currentDocument.fileSize) : 'N/A'}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">Statut</span>
                                                <span className={`font-medium ${
                                                    currentDocument.status === 'ACTIVE' ? 'text-green-600' : 'text-gray-600'
                                                }`}>
                                                    {currentDocument.status}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h3 className="font-medium text-gray-700 mb-3">Métadonnées</h3>
                                        <div className="space-y-2.5 text-sm">
                                            {Object.entries(currentDocument.metadata || {}).map(([key, value]) => (
                                                <div key={key} className="flex justify-between">
                                                    <span className="text-gray-500">{key}</span>
                                                    <span className="font-medium">{value}</span>
                                                </div>
                                            ))}
                                            {(!currentDocument.metadata || Object.keys(currentDocument.metadata).length === 0) && (
                                                <p className="text-gray-500 italic">Aucune métadonnée</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Tags */}
                                {currentDocument.tags && currentDocument.tags.length > 0 && (
                                    <div className="mb-6">
                                        <h3 className="font-medium text-gray-700 mb-2">Tags</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {currentDocument.tags.map((tag, index) => (
                                                <span
                                                    key={index}
                                                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Version info */}
                                {currentDocument.parentDocumentId && (
                                    <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                                        <div className="flex items-center gap-2 text-blue-700">
                                            <History className="h-5 w-5"/>
                                            <span className="text-sm font-medium">Version dérivée du document #{currentDocument.parentDocumentId}</span>
                                        </div>
                                    </div>
                                )}

                                <div className="flex flex-wrap items-center gap-3">
                                    {/*<button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">*/}
                                    {/*    <Download className="h-4 w-4 mr-2"/>*/}
                                    {/*    Télécharger*/}
                                    {/*</button>*/}

                                    <button
                                        onClick={handleDownload}
                                        disabled={isActionLoading}
                                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <Download className="h-4 w-4 mr-2"/>
                                        {isActionLoading ? 'Chargement...' : 'Télécharger'}
                                    </button>
                                    {/*<button className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">*/}
                                    {/*    <Eye className="h-4 w-4 mr-2"/>*/}
                                    {/*    Visualiser*/}
                                    {/*</button>*/}

                                    <button
                                        onClick={handleView}
                                        disabled={isActionLoading}
                                        className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <Eye className="h-4 w-4 mr-2"/>
                                        {isActionLoading ? 'Chargement...' : 'Visualiser'}
                                    </button>
                                    <button className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                                        <Share className="h-4 w-4 mr-2"/>
                                        Partager
                                    </button>
                                    <button
                                        onClick={handleCreateVersion}
                                        className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors ml-auto"
                                    >
                                        <Plus className="h-4 w-4 mr-2"/>
                                        Nouvelle version
                                    </button>
                                </div>


                                {/* Afficher les erreurs s'il y en a */}
                                {actionError && (
                                    <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md">
                                        {actionError}
                                    </div>
                                )}
                                {/* Timestamps */}
                                <div className="mt-6 pt-6 border-t border-gray-200">
                                    <div className="flex justify-between text-sm text-gray-500">
                                        <span>Créé le {new Date(currentDocument.createdAt).toLocaleDateString('fr-FR')}</span>
                                        <span>Modifié le {new Date(currentDocument.updatedAt).toLocaleDateString('fr-FR')}</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}