import { Dialog, Transition } from "@headlessui/react";
import { X, Download, Eye, FileText, Star, Share, Plus, History } from "lucide-react";
import { Document } from "../../types";
import React from "react";
import { useNavigate } from "react-router-dom";

interface DocumentDetailsProps {
    showDetails: boolean;
    setShowDetails: (value: boolean) => void;
    selectedItem: Document | null;
}

export default function DocumentDetails({ showDetails, setShowDetails, selectedItem }: DocumentDetailsProps) {
    const navigate = useNavigate();

    // Dans DocumentDetails.tsx
    const handleCreateVersion = () => {
        if (selectedItem) {
            // Naviguer vers la page de création avec à la fois l'ID du document parent
            // et son folderId comme paramètre d'URL
            navigate(`/documents/create-version/${selectedItem.id}?folderId=${selectedItem.folderId}`);
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
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={() => setShowDetails(false)}>
                <div className="flex items-center justify-center min-h-screen p-4">
                    <Dialog.Overlay className="fixed inset-0 bg-black/30 backdrop-blur-sm"/>
                    <div className="relative bg-white rounded-xl max-w-3xl w-full mx-auto shadow-xl">
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

                        {selectedItem && !('subFolderIds' in selectedItem) && (
                            <div className="p-6">
                                <div className="flex items-start mb-6">
                                    <div className="mr-4 p-3 bg-red-50 rounded-lg">
                                        <FileText className="h-8 w-8 text-red-500"/>
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-900">{selectedItem.name}</h2>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                                                v{selectedItem.version}
                                            </span>
                                            <span className="text-sm text-gray-500">
                                                {selectedItem.description}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h3 className="font-medium text-gray-700 mb-3">Informations</h3>
                                        <div className="space-y-2.5 text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">Type</span>
                                                <span className="font-medium">{selectedItem.fileType?.toUpperCase() || 'Non spécifié'}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">Version</span>
                                                <span className="font-medium">{selectedItem.version || 'N/A'}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">Taille</span>
                                                <span className="font-medium">{selectedItem.fileSize ? formatFileSize(selectedItem.fileSize) : 'N/A'}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">Statut</span>
                                                <span className={`font-medium ${
                                                    selectedItem.status === 'ACTIVE' ? 'text-green-600' : 'text-gray-600'
                                                }`}>
                                                    {selectedItem.status}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h3 className="font-medium text-gray-700 mb-3">Métadonnées</h3>
                                        <div className="space-y-2.5 text-sm">
                                            {Object.entries(selectedItem.metadata || {}).map(([key, value]) => (
                                                <div key={key} className="flex justify-between">
                                                    <span className="text-gray-500">{key}</span>
                                                    <span className="font-medium">{value}</span>
                                                </div>
                                            ))}
                                            {(!selectedItem.metadata || Object.keys(selectedItem.metadata).length === 0) && (
                                                <p className="text-gray-500 italic">Aucune métadonnée</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Tags */}
                                {selectedItem.tags && selectedItem.tags.length > 0 && (
                                    <div className="mb-6">
                                        <h3 className="font-medium text-gray-700 mb-2">Tags</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedItem.tags.map((tag, index) => (
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
                                {selectedItem.parentDocumentId && (
                                    <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                                        <div className="flex items-center gap-2 text-blue-700">
                                            <History className="h-5 w-5"/>
                                            <span className="text-sm font-medium">Version dérivée du document #{selectedItem.parentDocumentId}</span>
                                        </div>
                                    </div>
                                )}

                                <div className="flex flex-wrap items-center gap-3">
                                    <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                        <Download className="h-4 w-4 mr-2"/>
                                        Télécharger
                                    </button>
                                    <button className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                                        <Eye className="h-4 w-4 mr-2"/>
                                        Visualiser
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

                                {/* Timestamps */}
                                <div className="mt-6 pt-6 border-t border-gray-200">
                                    <div className="flex justify-between text-sm text-gray-500">
                                        <span>Créé le {new Date(selectedItem.createdAt).toLocaleDateString('fr-FR')}</span>
                                        <span>Modifié le {new Date(selectedItem.updatedAt).toLocaleDateString('fr-FR')}</span>
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