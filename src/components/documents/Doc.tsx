import { Dialog, Transition } from "@headlessui/react";
import { X, Download, Eye, FileText, Share, Plus, History } from "lucide-react";
import { Document } from "../../types";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import documentService from "../../services/document-service";
import { useDocumentActions } from "../../hooks/useDocumentActions";

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

    // Utilisation du hook personnalisé
    const {
        downloadDocument,
        viewDocument,
        isLoading: isActionLoading,
        error: actionError
    } = useDocumentActions();

    // Charger les versions du document lorsqu'un document est sélectionné
    useEffect(() => {
        // Code existant...
    }, [selectedItem, showDetails]);

    // Vos méthodes existantes...

    // Nouvelles méthodes pour gérer les actions de document
    const handleDownload = () => {
        if (currentDocument) {
            downloadDocument(currentDocument.id);
        }
    };

    const handleView = () => {
        if (currentDocument) {
            viewDocument(currentDocument.id);
        }
    };

    // Le reste de votre composant...

    return (
        <Transition show={showDetails} as={React.Fragment}>
            <Dialog as="div" className="fixed z-30 inset-0 overflow-y-auto"
                    onClose={() => setShowDetails(false)}>
                {/* Votre code existant... */}

                {currentDocument && !('subFolderIds' in currentDocument) && (
                    <div className="p-6">
                        {/* Votre code existant... */}

                        <div className="flex flex-wrap items-center gap-3">
                            <button
                                onClick={handleDownload}
                                disabled={isActionLoading}
                                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Download className="h-4 w-4 mr-2"/>
                                {isActionLoading ? 'Chargement...' : 'Télécharger'}
                            </button>
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

                        {/* Le reste de votre composant... */}
                    </div>
                )}
            </Dialog>
        </Transition>
    );
}