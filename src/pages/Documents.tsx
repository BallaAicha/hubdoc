import React, { useState, useEffect } from 'react';

import { FileItem } from '../types';
import { useNavigate, useParams, Link } from "react-router-dom";
import {
    Plus, Search, ChevronRight, FolderOpen, ArrowLeft, X, FileText,
    Filter, Calendar, Clock, ArrowUpDown, Folder, FileIcon, Download,
    Grid, List, Eye, Star, Share
} from "lucide-react";
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
        readTime: '5 min',
        complexity: 'Moyenne',
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
        readTime: 'N/A',
        complexity: 'N/A',
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
                    readTime: '3 min',
                    complexity: 'Faible',
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
                    readTime: 'N/A',
                    complexity: 'N/A',
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
                        readTime: '2 min',
                        complexity: 'Faible',
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
        readTime: '10 min',
        complexity: 'Élevée',
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
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [showDetails, setShowDetails] = useState<boolean>(false);
    const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);

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

        // Simulation d'un chargement des fichiers
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
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center p-4">
                <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center border border-gray-100">
                    <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-red-50 mb-6">
                        <FolderOpen className="h-10 w-10 text-red-600" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">Dossier introuvable</h1>
                    <p className="text-gray-600 mb-8">Le dossier demandé n'existe pas ou a été supprimé.</p>
                    <button
                        onClick={() => navigate('/documents')}
                        className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-[#850606] hover:bg-[#700505] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#850606] transition-all duration-200"
                    >
                        <ArrowLeft className="h-5 w-5 mr-2" />
                        Retour aux documents
                    </button>
                </div>
            </div>
        );
    }

    const handleFolderClick = (file: FileItem) => {
        if (file.type === 'folder') {
            setSelectedFolder(file);
            setIsModalOpen(true);
        } else {
            setSelectedFile(file);
            setShowDetails(true);
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

    const getFileTypeIcon = (type: string) => {
        switch (type) {
            case 'pdf':
                return <FileText className="h-10 w-10 text-red-500" />;
            case 'folder':
                return <Folder className="h-10 w-10 text-blue-500" />;
            default:
                return <FileIcon className="h-10 w-10 text-gray-500" />;
        }
    };

    const getFileTypeColor = (type: string) => {
        switch (type) {
            case 'pdf':
                return 'bg-red-50 text-red-700 border-red-200';
            case 'doc':
            case 'docx':
                return 'bg-blue-50 text-blue-700 border-blue-200';
            case 'xls':
            case 'xlsx':
                return 'bg-green-50 text-green-700 border-green-200';
            case 'ppt':
            case 'pptx':
                return 'bg-orange-50 text-orange-700 border-orange-200';
            case 'folder':
                return 'bg-indigo-50 text-indigo-700 border-indigo-200';
            default:
                return 'bg-gray-50 text-gray-700 border-gray-200';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Barre supérieure avec dégradé */}
            <div className="bg-gradient-to-r from-[#850606] to-[#a51c1c] shadow-md sticky top-0 z-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        {/* Logo et Titre */}
                        <div className="flex items-center">
                            <div className="bg-white p-2 rounded-full shadow-md mr-3">
                                <FolderOpen className="h-6 w-6 text-[#850606]" />
                            </div>
                            <h1 className="text-xl font-bold text-white leading-tight hidden sm:block">
                                Gestion des Documents
                            </h1>
                        </div>

                        {/* Bouton Créer Document - Toujours visible */}
                        <button
                            onClick={() => navigate('/documents/create')}
                            className="inline-flex items-center justify-center px-4 py-2 border border-white/20 rounded-lg shadow-sm text-sm font-medium text-white bg-white/10 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-1 focus:ring-offset-[#850606] transition-all duration-200"
                        >
                            <Plus className="h-4 w-4 mr-2" />
                            Créer Document
                        </button>
                    </div>
                </div>
            </div>

            {/* Sous-barre avec fil d'Ariane */}
            <div className="bg-white border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                    <div className="flex items-center justify-between">
                        {/* Fil d'Ariane */}
                        <nav className="flex" aria-label="Breadcrumb">
                            <ol className="inline-flex items-center space-x-1 text-sm">
                                {breadcrumbs.map((crumb, index) => (
                                    <React.Fragment key={crumb.id}>
                                        {index > 0 && (
                                            <ChevronRight className="h-3.5 w-3.5 text-gray-400 flex-shrink-0" />
                                        )}
                                        <li className="inline-flex items-center">
                                            <Link
                                                to={crumb.id === 'root' ? '/documents' : `/documents/${crumb.id}`}
                                                className={clsx(
                                                    "inline-flex items-center px-1.5 py-1 rounded-md transition-colors",
                                                    index === breadcrumbs.length - 1
                                                        ? "text-[#850606] font-medium bg-red-50"
                                                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                                                )}
                                            >
                                                {index === 0 && <FolderOpen className="h-3.5 w-3.5 mr-1.5" />}
                                                {crumb.name}
                                            </Link>
                                        </li>
                                    </React.Fragment>
                                ))}
                            </ol>
                        </nav>

                        {/* Actions de navigation */}
                        <div className="flex items-center space-x-2">
                            {breadcrumbs.length > 1 && (
                                <button
                                    onClick={navigateBack}
                                    className="inline-flex items-center justify-center p-1.5 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#850606] transition-colors"
                                    title="Retour au niveau supérieur"
                                >
                                    <ArrowLeft className="h-5 w-5" />
                                </button>
                            )}
                            <div className="flex items-center border-l border-gray-200 pl-2">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={clsx(
                                        "p-1.5 rounded-md transition-colors",
                                        viewMode === 'grid'
                                            ? "bg-gray-100 text-[#850606]"
                                            : "text-gray-500 hover:bg-gray-100"
                                    )}
                                    title="Vue en grille"
                                >
                                    <Grid className="h-4 w-4" />
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={clsx(
                                        "p-1.5 rounded-md transition-colors",
                                        viewMode === 'list'
                                            ? "bg-gray-100 text-[#850606]"
                                            : "text-gray-500 hover:bg-gray-100"
                                    )}
                                    title="Vue en liste"
                                >
                                    <List className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contenu principal */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {/* Barre de recherche et filtres */}
                <div className="bg-white rounded-xl shadow-sm mb-6 border border-gray-100">
                    <div className="p-4 flex flex-wrap items-center justify-between gap-4">
                        {/* Titre du dossier actuel en version mobile */}
                        <div className="w-full sm:hidden mb-3">
                            <h2 className="text-lg font-medium text-gray-800">{folder.name}</h2>
                        </div>

                        {/* Recherche */}
                        <div className="relative flex-grow max-w-md">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <Search className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Rechercher un document..."
                                className="block w-full pl-10 pr-12 py-2.5 border border-gray-300 rounded-lg focus:ring-[#850606] focus:border-[#850606] text-gray-900 placeholder-gray-400 bg-white transition-all duration-200 shadow-sm"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            )}
                        </div>

                        {/* Options de tri et filtre */}
                        <div className="flex items-center space-x-3">
                            <div className="relative">
                                <button
                                    onClick={() => setShowFilters(!showFilters)}
                                    className="inline-flex items-center px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#850606] shadow-sm transition-colors"
                                >
                                    <Filter className="h-4 w-4 mr-2" />
                                    <span className="hidden sm:inline">Trier</span>
                                    <ArrowUpDown className="h-4 w-4 ml-2" />
                                </button>

                                {showFilters && (
                                    <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none z-10 border border-gray-100">
                                        <div className="py-1">
                                            <button
                                                onClick={() => { setSortBy('name'); setShowFilters(false); }}
                                                className={`flex items-center justify-between px-4 py-2.5 text-sm w-full text-left ${sortBy === 'name' ? 'text-[#850606] bg-red-50 font-medium' : 'text-gray-700 hover:bg-gray-50'}`}
                                            >
                                                <div className="flex items-center">
                                                    <FileText className="h-4 w-4 mr-2" />
                                                    Par nom
                                                </div>
                                                {sortBy === 'name' && (
                                                    <button onClick={(e) => { e.stopPropagation(); toggleSortOrder(); }}>
                                                        {sortOrder === 'asc' ? '↑' : '↓'}
                                                    </button>
                                                )}
                                            </button>
                                            <button
                                                onClick={() => { setSortBy('date'); setShowFilters(false); }}
                                                className={`flex items-center justify-between px-4 py-2.5 text-sm w-full text-left ${sortBy === 'date' ? 'text-[#850606] bg-red-50 font-medium' : 'text-gray-700 hover:bg-gray-50'}`}
                                            >
                                                <div className="flex items-center">
                                                    <Calendar className="h-4 w-4 mr-2" />
                                                    Par date
                                                </div>
                                                {sortBy === 'date' && (
                                                    <button onClick={(e) => { e.stopPropagation(); toggleSortOrder(); }}>
                                                        {sortOrder === 'asc' ? '↑' : '↓'}
                                                    </button>
                                                )}
                                            </button>
                                            <button
                                                onClick={() => { setSortBy('type'); setShowFilters(false); }}
                                                className={`flex items-center justify-between px-4 py-2.5 text-sm w-full text-left ${sortBy === 'type' ? 'text-[#850606] bg-red-50 font-medium' : 'text-gray-700 hover:bg-gray-50'}`}
                                            >
                                                <div className="flex items-center">
                                                    <FileIcon className="h-4 w-4 mr-2" />
                                                    Par type
                                                </div>
                                                {sortBy === 'type' && (
                                                    <button onClick={(e) => { e.stopPropagation(); toggleSortOrder(); }}>
                                                        {sortOrder === 'asc' ? '↑' : '↓'}
                                                    </button>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contenu des fichiers */}
                {isLoading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="relative">
                            <div className="h-16 w-16 rounded-full border-4 border-gray-100"></div>
                            <div className="absolute top-0 left-0 h-16 w-16 rounded-full border-t-4 border-l-4 border-[#850606] animate-spin"></div>
                        </div>
                        <span className="ml-4 text-gray-600 font-medium">Chargement des documents...</span>
                    </div>
                ) : filteredFiles.length > 0 ? (
                    <div className="bg-white rounded-xl shadow-sm p-1 sm:p-4 transition-all duration-300 border border-gray-100">
                        {/* Vue en grille ou en liste selon le mode sélectionné */}
                        {viewMode === 'grid' ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                {filteredFiles.map((file) => (
                                    <div
                                        key={file.id}
                                        onClick={() => handleFolderClick(file)}
                                        className="relative group bg-white border border-gray-100 rounded-lg p-4 cursor-pointer transition-all duration-200 hover:shadow-md hover:border-gray-300 flex flex-col items-center text-center"
                                    >
                                        <div className={`${getFileTypeColor(file.type)} p-5 rounded-xl mb-3 transition-transform group-hover:scale-110`}>
                                            {getFileTypeIcon(file.type)}
                                        </div>
                                        <h3 className="font-medium text-gray-900 mb-1 text-sm line-clamp-2">
                                            {file.name}
                                        </h3>
                                        <div className="mt-auto pt-2 text-xs text-gray-500 w-full space-y-1">
                                            {file.type !== 'folder' && file.version && (
                                                <div className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full inline-block">
                                                    v{file.version}
                                                </div>
                                            )}
                                            <div className="flex justify-center items-center">
                                                <Clock className="h-3 w-3 mr-1" />
                                                {file.updatedAt}
                                            </div>
                                        </div>
                                        {/* Boutons d'action sur survol */}
                                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-1 rounded-full bg-white/90 hover:bg-gray-100 text-gray-700">
                                                {file.type === 'folder' ?
                                                    <FolderOpen className="h-4 w-4" /> :
                                                    <Eye className="h-4 w-4" />
                                                }
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="overflow-hidden rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Nom
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                                            Type
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                                            Mise à jour
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                                            Taille
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredFiles.map((file) => (
                                        <tr
                                            key={file.id}
                                            onClick={() => handleFolderClick(file)}
                                            className="hover:bg-gray-50 cursor-pointer"
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className={`flex-shrink-0 ${getFileTypeColor(file.type)} p-2 rounded-md`}>
                                                        {file.type === 'folder' ?
                                                            <Folder className="h-5 w-5" /> :
                                                            <FileText className="h-5 w-5" />
                                                        }
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">{file.name}</div>
                                                        {file.description && (
                                                            <div className="text-xs text-gray-500 line-clamp-1">{file.description}</div>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                                                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getFileTypeColor(file.type)}`}>
                                                        {file.type.toUpperCase()}
                                                    </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">
                                                <div className="flex flex-col">
                                                    <span>{file.updatedAt}</span>
                                                    {file.type !== 'folder' && file.version && (
                                                        <span className="text-xs text-blue-600">v{file.version}</span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden lg:table-cell">
                                                {file.size}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex justify-end space-x-2">
                                                    {file.type === 'folder' ? (
                                                        <button
                                                            className="text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-50"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                navigate(`/documents/${file.id}`);
                                                            }}
                                                        >
                                                            <FolderOpen className="h-5 w-5" />
                                                        </button>
                                                    ) : (
                                                        <>
                                                            <button
                                                                className="text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-50"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    setSelectedFile(file);
                                                                    setShowDetails(true);
                                                                }}
                                                            >
                                                                <Eye className="h-5 w-5" />
                                                            </button>
                                                            <button
                                                                className="text-gray-600 hover:text-gray-800 p-1 rounded-full hover:bg-gray-50"
                                                                onClick={(e) => e.stopPropagation()}
                                                            >
                                                                <Download className="h-5 w-5" />
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="bg-white rounded-xl shadow-sm p-10 text-center border border-gray-100">
                        <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-gray-50 mb-6">
                            {searchQuery ? (
                                <Search className="h-10 w-10 text-gray-400" />
                            ) : (
                                <FolderOpen className="h-10 w-10 text-gray-400" />
                            )}
                        </div>
                        <h3 className="text-xl font-medium text-gray-900 mb-2">
                            {searchQuery ? 'Aucun document trouvé' : 'Dossier vide'}
                        </h3>
                        <p className="text-gray-500 mb-6">
                            {searchQuery
                                ? `Aucun document ne correspond à "${searchQuery}". Essayez une autre recherche.`
                                : "Ce dossier ne contient aucun document. Vous pouvez en créer un nouveau."}
                        </p>
                        <button
                            onClick={() => navigate('/documents/create')}
                            className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#850606] hover:bg-[#700505] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#850606] transition-all duration-200"
                        >
                            <Plus className="h-4 w-4 mr-2" />
                            Créer un nouveau document
                        </button>
                    </div>
                )}
            </div>

            {/* Modal pour les actions sur dossier */}
            <Transition show={isModalOpen} as={React.Fragment}>
                <Dialog as="div" className="fixed inset-0 z-30 overflow-y-auto" onClose={() => setIsModalOpen(false)}>
                    <div className="min-h-screen px-4 text-center">
                        <Transition.Child
                            as={React.Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30 transition-opacity" />
                        </Transition.Child>

                        {/* Centrer le modal */}
                        <span className="inline-block h-screen align-middle" aria-hidden="true">&#8203;</span>

                        <Transition.Child
                            as={React.Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 mb-2">
                                    Actions pour {selectedFolder?.name}
                                </Dialog.Title>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">
                                        Sélectionnez l'action que vous souhaitez effectuer avec ce dossier.
                                    </p>
                                </div>

                                <div className="mt-6 space-y-3">
                                    <button
                                        onClick={handleViewFolder}
                                        className="w-full inline-flex items-center justify-center px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#850606] transition-all duration-200"
                                    >
                                        <FolderOpen className="h-5 w-5 mr-2 text-blue-500" />
                                        Ouvrir le dossier
                                    </button>
                                    <button
                                        onClick={handleCreateDocumentVersion}
                                        className="w-full inline-flex items-center justify-center px-4 py-2.5 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#850606] hover:bg-[#700505] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#850606] transition-all duration-200"
                                    >
                                        <Plus className="h-5 w-5 mr-2" />
                                        Ajouter un document
                                    </button>
                                </div>

                                <div className="mt-6">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#850606] rounded-lg"
                                        onClick={() => setIsModalOpen(false)}
                                    >
                                        Annuler
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>

            {/* Panneau latéral pour les détails de fichier */}
            <Transition show={showDetails} as={React.Fragment}>
                <div className="fixed inset-0 z-30 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <Transition.Child
                            as={React.Fragment}
                            enter="ease-in-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in-out duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                                 onClick={() => setShowDetails(false)} />
                        </Transition.Child>

                        <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
                            <Transition.Child
                                as={React.Fragment}
                                enter="transform transition ease-in-out duration-300"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-300"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <div className="w-screen max-w-md">
                                    <div className="h-full flex flex-col bg-white shadow-xl overflow-y-auto">
                                        <div className="p-6 border-b border-gray-200">
                                            <div className="flex items-start justify-between">
                                                <h2 className="text-lg font-medium text-gray-900">
                                                    Détails du document
                                                </h2>
                                                <button
                                                    className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                                                    onClick={() => setShowDetails(false)}
                                                >
                                                    <span className="sr-only">Fermer</span>
                                                    <X className="h-6 w-6" />
                                                </button>
                                            </div>
                                        </div>

                                        {selectedFile && (
                                            <div className="flex-1 p-6">
                                                <div className="flex justify-center mb-6">
                                                    <div className={`${getFileTypeColor(selectedFile.type)} p-6 rounded-xl`}>
                                                        {getFileTypeIcon(selectedFile.type)}
                                                    </div>
                                                </div>

                                                <h3 className="text-xl font-semibold text-center mb-6">
                                                    {selectedFile.name}
                                                </h3>

                                                <div className="space-y-4">
                                                    {selectedFile.description && (
                                                        <div>
                                                            <h4 className="text-sm font-medium text-gray-500 mb-1">Description</h4>
                                                            <p className="text-sm text-gray-700">{selectedFile.description}</p>
                                                        </div>
                                                    )}

                                                    <div className="pt-2">
                                                        <h4 className="text-sm font-medium text-gray-500 mb-3">Informations</h4>
                                                        <div className="grid grid-cols-2 gap-4">
                                                            <div className="bg-gray-50 px-4 py-3 rounded-lg">
                                                                <p className="text-xs text-gray-500 mb-1">Type</p>
                                                                <p className="text-sm font-medium text-gray-900">{selectedFile.type.toUpperCase()}</p>
                                                            </div>
                                                            <div className="bg-gray-50 px-4 py-3 rounded-lg">
                                                                <p className="text-xs text-gray-500 mb-1">Version</p>
                                                                <p className="text-sm font-medium text-gray-900">{selectedFile.version || 'N/A'}</p>
                                                            </div>
                                                            <div className="bg-gray-50 px-4 py-3 rounded-lg">
                                                                <p className="text-xs text-gray-500 mb-1">Créé le</p>
                                                                <p className="text-sm font-medium text-gray-900">{selectedFile.createdAt}</p>
                                                            </div>
                                                            <div className="bg-gray-50 px-4 py-3 rounded-lg">
                                                                <p className="text-xs text-gray-500 mb-1">Modifié le</p>
                                                                <p className="text-sm font-medium text-gray-900">{selectedFile.updatedAt}</p>
                                                            </div>
                                                            <div className="bg-gray-50 px-4 py-3 rounded-lg">
                                                                <p className="text-xs text-gray-500 mb-1">Taille</p>
                                                                <p className="text-sm font-medium text-gray-900">{selectedFile.size || 'N/A'}</p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {selectedFile.versions && selectedFile.versions.length > 0 && (
                                                        <div className="pt-4">
                                                            <h4 className="text-sm font-medium text-gray-500 mb-3">Versions précédentes</h4>
                                                            <div className="border rounded-lg divide-y">
                                                                {selectedFile.versions.map((version, index) => (
                                                                    <div key={index} className="flex items-center justify-between py-3 px-4">
                                                                        <div>
                                                                            <p className="text-sm font-medium text-gray-900">Version {version.version}</p>
                                                                            <p className="text-xs text-gray-500">{version.date}</p>
                                                                        </div>
                                                                        <button
                                                                            className="text-blue-600 hover:text-blue-800 focus:outline-none"
                                                                            onClick={() => window.open(version.url, '_blank')}
                                                                        >
                                                                            <Download className="h-5 w-5" />
                                                                        </button>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="mt-8 space-y-3">
                                                    <button
                                                        className="w-full inline-flex items-center justify-center px-4 py-2.5 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#850606] hover:bg-[#700505] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#850606] transition-all duration-200"
                                                    >
                                                        <Download className="h-5 w-5 mr-2" />
                                                        Télécharger le document
                                                    </button>
                                                    <div className="flex space-x-3">
                                                        <button
                                                            className="flex-1 inline-flex items-center justify-center px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#850606] transition-all duration-200"
                                                        >
                                                            <Share className="h-5 w-5 mr-2" />
                                                            Partager
                                                        </button>
                                                        <button
                                                            className="flex-1 inline-flex items-center justify-center px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#850606] transition-all duration-200"
                                                        >
                                                            <Star className="h-5 w-5 mr-2 text-yellow-500" />
                                                            Favoris
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Transition>
            {/* Footer */}
            <footer className="bg-neutral-800 text-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            <div>
                                <div className="flex items-center space-x-3 mb-6">
                                    <img
                                        src="/src/logo.jpeg"
                                        alt="Logo"
                                        className="h-8 w-auto bg-white rounded-md p-1"
                                    />
                                    <span className="font-bold text-xl">DOC HUB</span>
                                </div>
                                <p className="text-neutral-400 mb-4">
                                    Plateforme de documentation et de génération de projets pour développeurs.
                                </p>
                                <div className="flex space-x-4">
                                    <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                                        <span className="sr-only">Twitter</span>
                                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                        </svg>
                                    </a>
                                    <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                                        <span className="sr-only">GitHub</span>
                                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                        </svg>
                                    </a>
                                    <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                                        <span className="sr-only">LinkedIn</span>
                                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                                        </svg>
                                    </a>
                                </div>
                            </div>

                            <div>
                                <h3 className="font-semibold text-white text-lg mb-4">Produit</h3>
                                <ul className="space-y-3">
                                    <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Caractéristiques</a></li>
                                    <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Tarification</a></li>
                                    <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Démo</a></li>
                                    <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Roadmap</a></li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="font-semibold text-white text-lg mb-4">Documentation</h3>
                                <ul className="space-y-3">
                                    <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Guides</a></li>
                                    <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">API Reference</a></li>
                                    <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Tutoriels</a></li>
                                    <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Exemples</a></li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="font-semibold text-white text-lg mb-4">Entreprise</h3>
                                <ul className="space-y-3">
                                    <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">À propos</a></li>
                                    <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Blog</a></li>
                                    <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Carrières</a></li>
                                    <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Contact</a></li>
                                </ul>
                            </div>
                        </div>

                        <div className="border-t border-neutral-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
                            <p className="text-neutral-400 text-sm">
                                &copy; {new Date().getFullYear()} DOC HUB. Tous droits réservés.
                            </p>
                            <div className="flex space-x-6 mt-4 md:mt-0">
                                <a href="#" className="text-neutral-400 hover:text-white text-sm transition-colors">
                                    Confidentialité
                                </a>
                                <a href="#" className="text-neutral-400 hover:text-white text-sm transition-colors">
                                    Conditions d'utilisation
                                </a>
                                <a href="#" className="text-neutral-400 hover:text-white text-sm transition-colors">
                                    Mentions légales
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}


