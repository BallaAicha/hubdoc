import React, {useState} from 'react';
import {FileGrid} from '../components/FileGrid';
import {FileItem} from '../types';
import {useNavigate, useParams} from "react-router-dom";
import {Plus} from "lucide-react";

// Données hiérarchiques contenant des dossiers imbriqués
const documents: FileItem[] = [
    {
        id: '1',
        name: 'Présentation des cas d\'usages de PI',
        type: 'pdf',
        createdAt: '23 mars 2023',
        updatedAt: '16 nov. 2023',
        version: '12.6',
        description: 'Description des cinématiques des transferts',
        versions: [
            {version: '12.6', date: '16 nov. 2023', url: '/docs/presentation-v12.6.pdf'},
            {version: '12.5', date: '10 oct. 2023', url: '/docs/presentation-v12.5.pdf'},
        ],
    },
    {
        id: '2',
        name: 'Catalogue messages',
        type: 'folder',
        createdAt: '15 mars 2024',
        updatedAt: '15 mars 2024',
        description: 'Collection complète des messages système',
        children: [
            {
                id: '2-1',
                name: 'Messages système de base',
                type: 'pdf',
                createdAt: '15 mars 2024',
                updatedAt: '15 mars 2024',
                version: '1.0',
                description: 'Documentation des messages principaux',
                versions: [
                    {version: '1.0', date: '15 mars 2024', url: '/docs/messages-base-v1.0.pdf'},
                ],
            },
            {
                id: '2-2',
                name: 'Notifications avancées',
                type: 'folder',
                createdAt: '15 mars 2024',
                updatedAt: '15 mars 2024',
                description: 'Exemples avancés de notifications',
                children: [
                    {
                        id: '2-2-1',
                        name: 'Notification A',
                        type: 'pdf',
                        createdAt: '16 mars 2024',
                        updatedAt: '16 mars 2024',
                        version: '1.0',
                        description: 'Exemple de notification avancée',
                        versions: [
                            {version: '1.0', date: '16 mars 2024', url: '/docs/notification-a-v1.0.pdf'},
                        ],
                    },
                ],
            },
        ],
    },
    {
        id: '3',
        name: 'Guide de déploiement',
        type: 'pdf',
        createdAt: '10 mars 2024',
        updatedAt: '15 mars 2024',
        version: '2.1',
        description: 'Instructions pour le déploiement',
        versions: [
            {version: '2.1', date: '15 mars 2024', url: '/docs/guide-deployment-v2.1.pdf'},
        ],
    },
];

function findFolderById(files: FileItem[], id: string): FileItem | null {
    for (const file of files) {
        if (file.id === id) return file;
        if (file.type === 'folder' && file.children) {
            const found = findFolderById(file.children, id);
            return found || null;
        }
    }
    return null;
}

export function Documents() {
    const navigate = useNavigate();
    const {folderId} = useParams();
    const [selectedFolder, setSelectedFolder] = useState<FileItem | null>(null);

    const folder = folderId
        ? findFolderById(documents, folderId)
        : {name: 'Documents', children: documents};

    if (!folder || ('type' in folder && folder.type === 'folder' && !folder.children)) {
        return (
            <div
                className="min-h-screen bg-gradient-to-br from-gray-100 via-[#f7f7f7] to-gray-50 flex items-center justify-center">
                <h1 className="text-3xl font-bold text-red-500">Dossier introuvable</h1>
            </div>
        );
    }

    const handleFolderClick = (folder: FileItem) => {
        if (folder.type === 'folder') {
            setSelectedFolder(folder);
        }
    };

    const closeFolderPopup = () => {
        setSelectedFolder(null);
    };

    const handleViewFolder = () => {
        if (selectedFolder) {
            navigate(`/documents/${selectedFolder.id}`);
            closeFolderPopup();
        }
    };

    const handleCreateDocumentVersion = () => {
        if (selectedFolder) {
            // Redirige vers la page de création du DocumentVersion avec l'ID du dossier
            navigate(`/documents/${selectedFolder.id}/create-version`);
            closeFolderPopup();
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#e9041e] via-gray-100 to-gray-50 py-12 px-6">
            {/* En-tête */}
            <div className="max-w-5xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">{folder.name}</h1>
                    <button
                        onClick={() => navigate('/documents/create')}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#e9041e] hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                        <Plus className="h-5 w-5 mr-2"/>
                        Créer un document
                    </button>
                </div>
            </div>

            {/* Grille de fichiers */}
            <div className="max-w-5xl mx-auto">
                <FileGrid files={folder.children || []} onFileClick={handleFolderClick}/>
            </div>

            {/* Popup pour les dossiers */}
            {selectedFolder && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
                        <h2 className="text-xl font-bold mb-4">Dossier sélectionné</h2>
                        <p className="text-gray-700 mb-6">
                            Que souhaitez-vous faire avec le dossier :{' '}
                            <span className="font-medium">{selectedFolder.name}</span> ?
                        </p>
                        <div className="flex flex-col space-y-4">
                            <button
                                onClick={handleViewFolder}
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                            >
                                Voir le Dossier
                            </button>
                            <button
                                onClick={handleCreateDocumentVersion}
                                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                            >
                                Créer un Document Version
                            </button>
                            <button
                                onClick={closeFolderPopup}
                                className="text-gray-500 hover:text-gray-700 underline block text-center"
                            >
                                Annuler
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}