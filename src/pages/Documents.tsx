import React, { useState, useEffect } from 'react';
import { FileGrid } from '../components/FileGrid';
import { FileItem } from '../types';
import { useNavigate, useParams, Link } from "react-router-dom";
import { Plus, Search, ChevronRight, FolderOpen, ArrowLeft, X, FileText, Filter } from "lucide-react";
import { Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";



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
        size: '2.3 MB', // Added size property
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
        size: 'N/A', // Added size property for folders
        children: [
            {
                id: '2-1',
                name: 'Messages système de base',
                type: 'pdf',
                createdAt: '15 mars 2024',
                updatedAt: '15 mars 2024',
                version: '1.0',
                description: 'Documentation des messages principaux',
                size: '1.5 MB', // Added size property
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
                size: 'N/A', // Added size property for folders
                children: [
                    {
                        id: '2-2-1',
                        name: 'Notification A',
                        type: 'pdf',
                        createdAt: '16 mars 2024',
                        updatedAt: '16 mars 2024',
                        version: '1.0',
                        description: 'Exemple de notification avancée',
                        size: '850 KB', // Added size property
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
        size: '3.7 MB', // Added size property
        versions: [
            {version: '2.1', date: '15 mars 2024', url: '/docs/guide-deployment-v2.1.pdf'},
        ],
    },
];

// Type pour le fil d'Ariane
interface Breadcrumb {
    id: string;
    name: string;
}

// Fonction pour trouver un dossier par ID avec chemin pour le fil d'Ariane
function findFolderByIdWithPath(files: FileItem[], id: string, path: Breadcrumb[] = []): { folder: FileItem | null, path: Breadcrumb[] } {
    for (const file of files) {
        if (file.id === id) {
            return { folder: file, path: [...path, { id: file.id, name: file.name }] };
        }

        if (file.type === 'folder' && file.children) {
            const newPath = [...path, { id: file.id, name: file.name }];
            const result = findFolderByIdWithPath(file.children, id, newPath);
            if (result.folder) return result;
        }
    }

    return { folder: null, path: [] };
}

export function Documents() {
    const navigate = useNavigate();
    const { folderId } = useParams();
    const [selectedFolder, setSelectedFolder] = useState<FileItem | null>(null);
    const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([{ id: 'root', name: 'Documents' }]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [filteredFiles, setFilteredFiles] = useState<FileItem[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [showFilters, setShowFilters] = useState<boolean>(false);
    const [sortBy, setSortBy] = useState<string>('name');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    // Trouver le dossier actuel et mettre à jour le fil d'Ariane
    useEffect(() => {
        setIsLoading(true);

        if (folderId) {
            const { folder: foundFolder, path } = findFolderByIdWithPath(documents, folderId);

            if (foundFolder) {
                setBreadcrumbs([{ id: 'root', name: 'Documents' }, ...path]);
            } else {
                setBreadcrumbs([{ id: 'root', name: 'Documents' }]);
            }
        } else {
            setBreadcrumbs([{ id: 'root', name: 'Documents' }]);
        }

        // Simulation d'un chargement des fichiers (à remplacer par un vrai appel API)
        setTimeout(() => setIsLoading(false), 300);
    }, [folderId]);

    const folder = folderId
        ? findFolderByIdWithPath(documents, folderId).folder
        : { name: 'Documents', children: documents };

    // Filtrer et trier les fichiers
    useEffect(() => {
        if (!folder) return;

        let files = (folder.children || []) as FileItem[];

        // Filtrer par recherche
        if (searchQuery) {
            files = files.filter(file =>
                file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (file.description && file.description.toLowerCase().includes(searchQuery.toLowerCase()))
            );
        }

        // Trier les fichiers
        files = [...files].sort((a, b) => {
            // D'abord trier par type (dossiers en premier)
            if (a.type === 'folder' && b.type !== 'folder') return -1;
            if (a.type !== 'folder' && b.type === 'folder') return 1;

            // Puis trier selon le critère sélectionné
            let comparison = 0;
            if (sortBy === 'name') {
                comparison = a.name.localeCompare(b.name);
            } else if (sortBy === 'date') {
                const dateA = new Date(a.updatedAt).getTime();
                const dateB = new Date(b.updatedAt).getTime();
                comparison = dateA - dateB;
            } else if (sortBy === 'type') {
                comparison = (a.type || '').localeCompare(b.type || '');
            }

            return sortOrder === 'asc' ? comparison : -comparison;
        });

        setFilteredFiles(files);
    }, [searchQuery, folder, sortBy, sortOrder]);

    if (!folder || ('type' in folder && folder.type === 'folder' && !folder.children)) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 flex flex-col items-center justify-center p-4">
                <div className="bg-white rounded-xl shadow-md p-8 max-w-md w-full text-center">
                    <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-primary-50 mb-6">
                        <FolderOpen className="h-8 w-8 text-primary-600" />
                    </div>
                    <h1 className="text-2xl font-bold text-neutral-800 mb-4">Dossier introuvable</h1>
                    <p className="text-neutral-600 mb-8">Le dossier demandé n'existe pas ou a été supprimé.</p>
                    <button
                        onClick={() => navigate('/documents')}
                        className="inline-flex items-center justify-center px-5 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200"
                    >
                        <ArrowLeft className="h-5 w-5 mr-2" />
                        Retour aux documents
                    </button>
                </div>
            </div>
        );
    }

    const handleFolderClick = (folder: FileItem) => {
        if (folder.type === 'folder') {
            setSelectedFolder(folder);
            setIsModalOpen(true);
        }
    };

    const handleViewFolder = () => {
        if (selectedFolder) {
            navigate(`/documents/${selectedFolder.id}`);
            setIsModalOpen(false);
        }
    };

    const handleCreateDocumentVersion = () => {
        if (selectedFolder) {
            navigate(`/documents/${selectedFolder.id}/create-version`);
            setIsModalOpen(false);
        }
    };

    const navigateBack = () => {
        // Si nous sommes dans un dossier, on remonte d'un niveau
        if (breadcrumbs.length > 1) {
            const parentCrumb = breadcrumbs[breadcrumbs.length - 2];
            if (parentCrumb.id === 'root') {
                navigate('/documents');
            } else {
                navigate(`/documents/${parentCrumb.id}`);
            }
        }
    };

    const toggleSortOrder = () => {
        setSortOrder(prevOrder => prevOrder === 'asc' ? 'desc' : 'asc');
    };

    return (
        <div className="min-h-screen bg-neutral-50">
            {/* Barre supérieure */}
            <div className="bg-white shadow-sm border-b border-neutral-200 sticky top-0 z-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        {/* Titre et fil d'Ariane */}
                        <div className="flex flex-col space-y-1">
                            <h1 className="text-2xl font-bold text-neutral-800 leading-tight">
                                {folder.name}
                            </h1>

                            <nav className="flex" aria-label="Breadcrumb">
                                <ol className="inline-flex items-center space-x-1 text-sm">
                                    {breadcrumbs.map((crumb, index) => (
                                        <React.Fragment key={crumb.id}>
                                            {index > 0 && (
                                                <ChevronRight className="h-3.5 w-3.5 text-neutral-400 flex-shrink-0" />
                                            )}
                                            <li className="inline-flex items-center">
                                                <Link
                                                    to={crumb.id === 'root' ? '/documents' : `/documents/${crumb.id}`}
                                                    className={clsx(
                                                        "inline-flex items-center font-medium px-1",
                                                        index === breadcrumbs.length - 1
                                                            ? "text-primary-600 hover:text-primary-700"
                                                            : "text-neutral-600 hover:text-neutral-900"
                                                    )}
                                                >
                                                    {index === 0 && <FolderOpen className="h-3.5 w-3.5 mr-1" />}
                                                    {crumb.name}
                                                </Link>
                                            </li>
                                        </React.Fragment>
                                    ))}
                                </ol>
                            </nav>
                        </div>

                        {/* Actions principales */}
                        <div className="flex items-center space-x-3">
                            {breadcrumbs.length > 1 && (
                                <button
                                    onClick={navigateBack}
                                    className="inline-flex items-center justify-center p-2 rounded-full text-neutral-700 bg-neutral-50 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
                                    title="Retour au niveau supérieur"
                                >
                                    <ArrowLeft className="h-5 w-5" />
                                </button>
                            )}
                            {/* Bouton Créer Document avec la couleur spécifiée #850606 */}
                            <button
                                onClick={() => navigate('/documents/create')}
                                className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#850606] hover:bg-[#700505] focus:outline-none focus:ring-2 focus:ring-[#850606] transition-all duration-200"
                            >
                                <Plus className="h-4 w-4 mr-2" />
                                Créer Document
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contenu principal */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {/* Barre d'outils */}
                <div className="bg-white rounded-xl shadow-sm mb-6">
                    <div className="px-4 py-4 sm:px-6 flex flex-wrap items-center justify-between gap-4">
                        {/* Recherche */}
                        <div className="relative flex-grow max-w-md">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <Search className="h-5 w-5 text-neutral-400" />
                            </div>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Rechercher un document..."
                                className="block w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 text-sm placeholder-neutral-400 bg-white"
                            />
                        </div>

                        {/* Options de tri et filtre */}
                        <div className="flex items-center space-x-3">
                            <div className="relative">
                                <button
                                    onClick={() => setShowFilters(!showFilters)}
                                    className="inline-flex items-center px-3 py-2 border border-neutral-300 rounded-lg text-sm font-medium text-neutral-700 bg-white hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                                >
                                    <Filter className="h-4 w-4 mr-2" />
                                    Trier
                                </button>

                                {showFilters && (
                                    <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-neutral-100 focus:outline-none z-10">
                                        <div className="py-1">
                                            <button
                                                onClick={() => { setSortBy('name'); setShowFilters(false); }}
                                                className={`flex items-center justify-between px-4 py-2 text-sm w-full text-left ${sortBy === 'name' ? 'text-primary-600 bg-neutral-50' : 'text-neutral-700 hover:bg-neutral-50'}`}
                                            >
                                                Par nom
                                                {sortBy === 'name' && (
                                                    <span onClick={(e) => { e.stopPropagation(); toggleSortOrder(); }}>
                                                        {sortOrder === 'asc' ? '↑' : '↓'}
                                                    </span>
                                                )}
                                            </button>
                                            <button
                                                onClick={() => { setSortBy('date'); setShowFilters(false); }}
                                                className={`flex items-center justify-between px-4 py-2 text-sm w-full text-left ${sortBy === 'date' ? 'text-primary-600 bg-neutral-50' : 'text-neutral-700 hover:bg-neutral-50'}`}
                                            >
                                                Par date
                                                {sortBy === 'date' && (
                                                    <span onClick={(e) => { e.stopPropagation(); toggleSortOrder(); }}>
                                                        {sortOrder === 'asc' ? '↑' : '↓'}
                                                    </span>
                                                )}
                                            </button>
                                            <button
                                                onClick={() => { setSortBy('type'); setShowFilters(false); }}
                                                className={`flex items-center justify-between px-4 py-2 text-sm w-full text-left ${sortBy === 'type' ? 'text-primary-600 bg-neutral-50' : 'text-neutral-700 hover:bg-neutral-50'}`}
                                            >
                                                Par type
                                                {sortBy === 'type' && (
                                                    <span onClick={(e) => { e.stopPropagation(); toggleSortOrder(); }}>
                                                        {sortOrder === 'asc' ? '↑' : '↓'}
                                                    </span>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="inline-flex items-center px-3 py-2 border border-neutral-300 rounded-lg text-sm font-medium text-neutral-700 bg-white hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                                >
                                    <X className="h-4 w-4 mr-2" />
                                    Effacer
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Contenu des fichiers */}
                {isLoading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="relative">
                            <div className="h-16 w-16 rounded-full border-4 border-neutral-200"></div>
                            <div className="absolute top-0 left-0 h-16 w-16 rounded-full border-t-4 border-l-4 border-primary-600 animate-spin"></div>
                        </div>
                    </div>
                ) : filteredFiles.length > 0 ? (
                    <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 transition-all duration-300">
                        <FileGrid files={filteredFiles} onFileClick={handleFolderClick} />
                    </div>
                ) : (
                    <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-neutral-100 mb-4">
                            {searchQuery ? (
                                <Search className="h-8 w-8 text-neutral-500" />
                            ) : (
                                <FolderOpen className="h-8 w-8 text-neutral-500" />
                            )}
                        </div>
                        <h3 className="text-lg font-medium text-neutral-900 mb-2">
                            {searchQuery ? 'Aucun document trouvé' : 'Dossier vide'}
                        </h3>
                        <p className="text-neutral-500 max-w-md mx-auto mb-6">
                            {searchQuery
                                ? `Aucun document correspondant à "${searchQuery}" n'a été trouvé dans ce dossier.`
                                : 'Ce dossier ne contient aucun élément pour le moment.'}
                        </p>
                        {searchQuery ? (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="inline-flex items-center px-4 py-2 border border-neutral-300 shadow-sm text-sm font-medium rounded-md text-neutral-700 bg-white hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
                            >
                                Effacer la recherche
                            </button>
                        ) : (
                            <button
                                onClick={() => navigate('/documents/create')}
                                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#850606] hover:bg-[#700505] focus:outline-none focus:ring-2 focus:ring-[#850606] transition-colors"
                            >
                                <Plus className="h-4 w-4 mr-2" />
                                Créer un document
                            </button>
                        )}
                    </div>
                )}
            </div>

            {/* Modal pour les dossiers */}
            <Transition show={isModalOpen} as={React.Fragment}>
                <Dialog
                    as="div"
                    className="relative z-50"
                    onClose={() => setIsModalOpen(false)}
                >
                    <Transition.Child
                        as={React.Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-neutral-900/50 backdrop-blur-sm" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={React.Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <div className="flex justify-between items-center mb-4">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-lg font-semibold leading-6 text-neutral-900"
                                        >
                                            Options du dossier
                                        </Dialog.Title>
                                        <button
                                            onClick={() => setIsModalOpen(false)}
                                            className="rounded-full p-1 text-neutral-400 hover:text-neutral-500 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
                                        >
                                            <X className="h-5 w-5" />
                                        </button>
                                    </div>

                                    {selectedFolder && (
                                        <>
                                            <div className="bg-neutral-50 rounded-lg p-4 mb-5">
                                                <h4 className="font-medium text-neutral-900 mb-1">
                                                    {selectedFolder.name}
                                                </h4>
                                                {selectedFolder.description && (
                                                    <p className="text-sm text-neutral-600">
                                                        {selectedFolder.description}
                                                    </p>
                                                )}
                                                <div className="mt-2 flex items-center text-xs text-neutral-500">
                                                    <span>Créé le {selectedFolder.createdAt}</span>
                                                    <span className="mx-2">•</span>
                                                    <span>Mis à jour le {selectedFolder.updatedAt}</span>
                                                </div>
                                            </div>

                                            <div className="space-y-3">
                                                <button
                                                    onClick={handleViewFolder}
                                                    className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-info hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-info transition-all duration-200"
                                                >
                                                    <FolderOpen className="h-5 w-5 mr-2" />
                                                    Ouvrir le dossier
                                                </button>
                                                <button
                                                    onClick={handleCreateDocumentVersion}
                                                    className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-success hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-success transition-all duration-200"
                                                >
                                                    <FileText className="h-5 w-5 mr-2" />
                                                    Créer un document
                                                </button>
                                                <button
                                                    onClick={() => setIsModalOpen(false)}
                                                    className="w-full flex items-center justify-center px-4 py-2 border border-neutral-300 rounded-lg text-sm font-medium text-neutral-700 bg-white hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200"
                                                >
                                                    Annuler
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
}