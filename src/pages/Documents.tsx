import React, {useState, useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {
    Plus, Search, ChevronRight, FolderOpen, ArrowLeft, X, FileText,
    Filter, Calendar, Clock, ArrowUpDown, Folder, Download,
    Grid, List, Eye, Star, Share
} from "lucide-react";
import {Dialog, Transition} from "@headlessui/react";
import clsx from "clsx";
import {useRootFolders} from "../hooks/useRootFolders.ts";
import {useFolder} from "../hooks/useFolder.ts";
import {useDocuments} from "../hooks/useDocuments.ts";

// Import your custom hooks


// Define interfaces for your data types
interface Document {
    id: number;
    name: string;
    description?: string;
    createdAt: string;
    updatedAt: string;
    fileType?: string;
    version?: string;
    fileSize?: number | string;
    readTime?: string;
    complexity?: string;
}

interface Folder {
    id: number;
    name: string;
    description?: string;
    createdAt: string;
    updatedAt: string;
    subFolderIds: number[];
}

export default function Documents() {
    const navigate = useNavigate();
    const {folderId} = useParams();

    // Data fetching hooks
    const {data: rootFolders, isLoading: isLoadingRootFolders} = useRootFolders();
    const {data: currentFolder, isLoading: isLoadingFolder} = useFolder(folderId ? parseInt(folderId) : 0);
    const {data: documents, isLoading: isLoadingDocuments} = useDocuments(folderId ? parseInt(folderId) : 0);

    // Local state
    const [selectedItem, setSelectedItem] = useState<Document | Folder | null>(null);
    const [breadcrumbs, setBreadcrumbs] = useState<Array<{ id: number | string, name: string }>>([{
        id: 'root',
        name: 'Documents'
    }]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [filteredItems, setFilteredItems] = useState<Array<Document | Folder>>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [showFilters, setShowFilters] = useState<boolean>(false);
    const [sortBy, setSortBy] = useState<string>('name');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [showDetails, setShowDetails] = useState<boolean>(false);

    // Combined loading state
    const isLoading = isLoadingRootFolders || isLoadingFolder || isLoadingDocuments;

    // Current items based on folder context
    const currentItems = folderId ? documents : rootFolders;

    // Update filtered items when data or search changes
    useEffect(() => {
        if (!currentItems) return;

        let items = [...currentItems];

        // Filter by search
        if (searchQuery) {
            items = items.filter(item =>
                item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()))
            );
        }

        // Sort items
        items.sort((a, b) => {
            // Folders first
            if ('subFolderIds' in a && !('subFolderIds' in b)) return -1;
            if (!('subFolderIds' in a) && 'subFolderIds' in b) return 1;

            // Then sort by selected criteria
            switch (sortBy) {
                case 'name':
                    return sortOrder === 'asc'
                        ? a.name.localeCompare(b.name)
                        : b.name.localeCompare(a.name);
                case 'date': {
                    const dateA = new Date(a.updatedAt).getTime();
                    const dateB = new Date(b.updatedAt).getTime();
                    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
                }
                default:
                    return 0;
            }
        });

        setFilteredItems(items as Array<Document | Folder>);
    }, [currentItems, searchQuery, sortBy, sortOrder]);

    // Update breadcrumbs when folder changes
    useEffect(() => {
        if (folderId && currentFolder) {
            // Here you would implement the logic to build the breadcrumb path
            // based on your folder structure and parentId relationships
            setBreadcrumbs([
                {id: 'root', name: 'Documents'},
                {id: currentFolder.id, name: currentFolder.name}
            ]);
        } else {
            setBreadcrumbs([{id: 'root', name: 'Documents'}]);
        }
    }, [folderId, currentFolder]);

    const handleItemClick = (item: Document | Folder) => {
        setSelectedItem(item);
        if ('subFolderIds' in item) {
            setIsModalOpen(true);
        } else {
            setShowDetails(true);
        }
    };

    const handleViewFolder = () => {
        if (selectedItem && 'subFolderIds' in selectedItem) {
            navigate(`/documents/${selectedItem.id}`);
            setIsModalOpen(false);
        }
    };

    const navigateBack = () => {
        if (breadcrumbs.length > 1) {
            const parentCrumb = breadcrumbs[breadcrumbs.length - 2];
            navigate(parentCrumb.id === 'root' ? '/documents' : `/documents/${parentCrumb.id}`);
        }
    };

    const getFileTypeIcon = (item: Document | Folder) => {
        if ('subFolderIds' in item) {
            return <Folder className="h-10 w-10 text-blue-500"/>;
        }
        return <FileText className="h-10 w-10 text-red-500"/>;
    };

    const getFileTypeColor = (item: Document | Folder) => {
        if ('subFolderIds' in item) {
            return 'bg-indigo-50 text-indigo-700 border-indigo-200';
        }
        return 'bg-red-50 text-red-700 border-red-200';
    };

    const [showActionMenu, setShowActionMenu] = useState(false);
    // Fonction pour gérer le clic sur le bouton Créer
    const handleCreateButtonClick = () => {
        console.log("Clic sur bouton Créer");
        console.log("Dossier actuel:", folderId ? `ID: ${folderId}` : "Racine (aucun dossier)");

        if (!folderId) {
            // Si on est à la racine (pas de folderId), rediriger directement vers la création de dossier root
            console.log("Navigation vers création de dossier racine");
            navigate(`/documents/create`);
        } else {
            // Sinon, afficher le menu d'options
            console.log("Affichage du menu d'options dans le dossier", folderId);
            setShowActionMenu(!showActionMenu);
        }
    };

    // Handler pour créer un sous-dossier
    const handleCreateSubFolder = () => {
        console.log("Création de sous-dossier dans le dossier", folderId);
        // Navigate to create document page with current folderId as parent
        navigate(`/documents/create?parentId=${folderId || ""}`);
        setShowActionMenu(false);
    };

// Handler pour créer un document
    const handleCreateDocument = () => {
        console.log("Création de document dans le dossier", folderId);
        // Navigate to create document version page with current folderId
        navigate(`/documents/${folderId}/create-version`);
        setShowActionMenu(false);
    };



    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-gradient-to-r from-[#850606] to-[#a51c1c] shadow-md sticky top-0 z-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        {/* Logo et Titre */}
                        <div className="flex items-center">
                            <div className="bg-white p-2 rounded-full shadow-md mr-3">
                                <FolderOpen className="h-6 w-6 text-[#850606]"/>
                            </div>
                            <h1 className="text-xl font-bold text-white leading-tight hidden sm:block">
                                Gestion des Documents
                            </h1>
                        </div>

                        {/* Menu de création - Dropdown */}
                        <div className="relative">
                            {/* Remplacez le bouton existant par celui-ci */}
                            <button
                                onClick={handleCreateButtonClick}
                                className="inline-flex items-center justify-center px-4 py-2 border border-white/20 rounded-lg shadow-sm text-sm font-medium text-white bg-white/10 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-1 focus:ring-offset-[#850606] transition-all duration-200"
                            >
                                <Plus className="h-4 w-4 mr-2"/>
                                Créer
                            </button>

                            {/* Menu déroulant - ne s'affichera que si on est dans un dossier */}
                            {showActionMenu && folderId && (
                                <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                                    <div className="py-1" role="menu" aria-orientation="vertical">
                                        <button
                                            onClick={handleCreateSubFolder}
                                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                                            role="menuitem"
                                        >
                                            <Folder className="h-4 w-4 mr-2"/>
                                            Créer un dossier
                                        </button>
                                        <button
                                            onClick={handleCreateDocument}
                                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                                            role="menuitem"
                                        >
                                            <FileText className="h-4 w-4 mr-2"/>
                                            Créer un document
                                        </button>
                                    </div>
                                </div>
                            )}

                            {showActionMenu && (
                                <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                                    <div className="py-1" role="menu" aria-orientation="vertical">
                                        <button
                                            onClick={handleCreateSubFolder}
                                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                                            role="menuitem"
                                        >
                                            <Folder className="h-4 w-4 mr-2"/>
                                            Créer un dossier
                                        </button>
                                        <button
                                            onClick={handleCreateDocument}
                                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                                            role="menuitem"
                                        >
                                            <FileText className="h-4 w-4 mr-2"/>
                                            Créer un document
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Search and filters */}
            <div className="mb-6">
                <div className="flex items-center w-full">
                    <div className="relative flex-1 mr-4">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"/>
                        <input
                            type="text"
                            placeholder="Rechercher..."
                            className="pl-10 pr-4 py-2 w-full border rounded-md"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <button
                        className={clsx("p-2 rounded-md", showFilters ? "bg-blue-100" : "bg-gray-200")}
                        onClick={() => setShowFilters(!showFilters)}
                    >
                        <Filter className="h-5 w-5"/>
                    </button>
                    <button
                        className="p-2 rounded-md bg-gray-200 ml-2"
                        onClick={() => setSortBy(sortBy === 'name' ? 'date' : 'name')}
                    >
                        {sortBy === 'name' ? <Calendar className="h-5 w-5"/> : <Clock className="h-5 w-5"/>}
                    </button>
                    <button
                        className="p-2 rounded-md bg-gray-200 ml-2"
                        onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                    >
                        <ArrowUpDown className="h-5 w-5"/>
                    </button>
                    <div className="ml-2 flex">
                        <button
                            className={clsx("p-2 rounded-l-md", viewMode === 'grid' ? "bg-blue-100" : "bg-gray-200")}
                            onClick={() => setViewMode('grid')}
                        >
                            <Grid className="h-5 w-5"/>
                        </button>
                        <button
                            className={clsx("p-2 rounded-r-md", viewMode === 'list' ? "bg-blue-100" : "bg-gray-200")}
                            onClick={() => setViewMode('list')}
                        >
                            <List className="h-5 w-5"/>
                        </button>
                    </div>
                </div>

                {showFilters && (
                    <div className="mt-4 p-4 bg-white border rounded-md">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-semibold">Filtres</h3>
                            <button onClick={() => setShowFilters(false)}>
                                <X className="h-5 w-5"/>
                            </button>
                        </div>
                        {/* Filters content */}
                    </div>
                )}
            </div>

            {/* Breadcrumbs */}
            <div className="mb-4 flex items-center">
                {breadcrumbs.length > 1 && (
                    <button
                        onClick={navigateBack}
                        className="mr-2 p-1 rounded-full hover:bg-gray-200"
                    >
                        <ArrowLeft className="h-5 w-5"/>
                    </button>
                )}
                <div className="flex items-center text-sm">
                    {breadcrumbs.map((crumb, index) => (
                        <React.Fragment key={crumb.id}>
                            <button
                                onClick={() => navigate(crumb.id === 'root' ? '/documents' : `/documents/${crumb.id}`)}
                                className="hover:text-blue-600"
                            >
                                {crumb.name}
                            </button>
                            {index < breadcrumbs.length - 1 && (
                                <ChevronRight className="h-4 w-4 mx-1"/>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>

            {/* Loading state */}
            {isLoading && (
                <div className="flex justify-center items-center py-8">
                    <div
                        className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent"></div>
                </div>
            )}

            {/* Content */}
            {!isLoading && (
                <>
                    {filteredItems.length === 0 ? (
                        <div className="bg-white rounded-lg shadow p-8 text-center">
                            <p className="text-gray-500">Aucun document trouvé</p>
                        </div>
                    ) : (
                        <div className={clsx(
                            viewMode === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" : "divide-y"
                        )}>
                            {filteredItems.map((item) => (
                                viewMode === 'grid' ? (
                                    <div
                                        key={item.id}
                                        className="bg-white p-4 rounded-lg shadow hover:shadow-md cursor-pointer"
                                        onClick={() => handleItemClick(item)}
                                    >
                                        <div className="flex justify-center mb-4">
                                            {getFileTypeIcon(item)}
                                        </div>
                                        <div className="text-center">
                                            <h3 className="font-medium text-gray-900 mb-1 truncate">{item.name}</h3>
                                            <p className="text-sm text-gray-500 mb-2">
                                                {new Date(item.updatedAt).toLocaleDateString('fr-FR')}
                                            </p>
                                            <div
                                                className={clsx("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs", getFileTypeColor(item))}>
                                                {'subFolderIds' in item ? "Dossier" : "Document"}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div
                                        key={item.id}
                                        className="flex items-center py-3 px-4 hover:bg-gray-50 cursor-pointer"
                                        onClick={() => handleItemClick(item)}
                                    >
                                        <div className="mr-4">
                                            {getFileTypeIcon(item)}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-medium text-gray-900">{item.name}</h3>
                                            <p className="text-sm text-gray-500">
                                                {item.description || 'Aucune description'}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-gray-500">
                                                {new Date(item.updatedAt).toLocaleDateString('fr-FR')}
                                            </p>
                                            <div
                                                className={clsx("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs", getFileTypeColor(item))}>
                                                {'subFolderIds' in item ? "Dossier" : "Document"}
                                            </div>
                                        </div>
                                    </div>
                                )
                            ))}
                        </div>
                    )}
                </>
            )}

            {/* Folder modal */}
            <Transition show={isModalOpen} as={React.Fragment}>
                <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={() => setIsModalOpen(false)}>
                    <div className="flex items-center justify-center min-h-screen">
                        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30"/>
                        <div className="relative bg-white rounded-lg max-w-md w-full mx-auto p-6 shadow-xl">
                            <Dialog.Title as="h3" className="text-lg font-medium text-gray-900">
                                {selectedItem?.name}
                            </Dialog.Title>
                            <div className="mt-4">
                                <p className="text-sm text-gray-500">
                                    {selectedItem?.description || 'Aucune description disponible'}
                                </p>
                            </div>
                            <div className="mt-6 flex justify-end space-x-3">
                                <button
                                    type="button"
                                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    Fermer
                                </button>
                                <button
                                    type="button"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center"
                                    onClick={handleViewFolder}
                                >
                                    <FolderOpen className="h-4 w-4 mr-2"/>
                                    Ouvrir
                                </button>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </Transition>

            {/* Document details */}
            <Transition show={showDetails} as={React.Fragment}>
                <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={() => setShowDetails(false)}>
                    <div className="flex items-center justify-center min-h-screen">
                        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30"/>
                        <div className="relative bg-white rounded-lg max-w-3xl w-full mx-auto p-6 shadow-xl">
                            <button
                                onClick={() => setShowDetails(false)}
                                className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
                            >
                                <X className="h-6 w-6"/>
                            </button>

                            {selectedItem && !('subFolderIds' in selectedItem) && (
                                <>
                                    <div className="flex items-start mb-6">
                                        <div className="mr-4">
                                            <FileText className="h-12 w-12 text-red-500"/>
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold text-gray-900">{selectedItem.name}</h2>
                                            <p className="text-sm text-gray-500 mt-1">{selectedItem.description}</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <h3 className="font-medium text-gray-700 mb-2">Informations</h3>
                                            <div className="space-y-2 text-sm">
                                                <p><span
                                                    className="text-gray-500">Type:</span> {selectedItem.fileType || 'Non spécifié'}
                                                </p>
                                                <p><span
                                                    className="text-gray-500">Version:</span> {selectedItem.version || 'N/A'}
                                                </p>
                                                <p><span
                                                    className="text-gray-500">Taille:</span> {selectedItem.fileSize || 'N/A'}
                                                </p>
                                                <p><span
                                                    className="text-gray-500">Temps de lecture:</span> {selectedItem.readTime || 'N/A'}
                                                </p>
                                                <p><span
                                                    className="text-gray-500">Complexité:</span> {selectedItem.complexity || 'N/A'}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <h3 className="font-medium text-gray-700 mb-2">Dates</h3>
                                            <div className="space-y-2 text-sm">
                                                <p><span
                                                    className="text-gray-500">Date de création:</span> {new Date(selectedItem.createdAt).toLocaleDateString('fr-FR')}
                                                </p>
                                                <p><span
                                                    className="text-gray-500">Dernière modification:</span> {new Date(selectedItem.updatedAt).toLocaleDateString('fr-FR')}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-6 flex space-x-2">
                                        <button
                                            className="px-3 py-2 bg-blue-600 text-white rounded-md flex items-center">
                                            <Download className="h-4 w-4 mr-2"/>
                                            Télécharger
                                        </button>
                                        <button
                                            className="px-3 py-2 bg-gray-200 text-gray-800 rounded-md flex items-center">
                                            <Eye className="h-4 w-4 mr-2"/>
                                            Visualiser
                                        </button>
                                        <button
                                            className="px-3 py-2 bg-gray-200 text-gray-800 rounded-md flex items-center">
                                            <Star className="h-4 w-4 mr-2"/>
                                            Favoris
                                        </button>
                                        <button
                                            className="px-3 py-2 bg-gray-200 text-gray-800 rounded-md flex items-center">
                                            <Share className="h-4 w-4 mr-2"/>
                                            Partager
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </Dialog>
            </Transition>

        </div>

    );
}