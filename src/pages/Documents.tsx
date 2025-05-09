// import {useState, useMemo} from 'react';
// import {useNavigate, useParams} from "react-router-dom";
// import {
//     Plus, Filter, Calendar, Clock,
//     ArrowUpDown, Grid, List, Folder, FileText,
// } from "lucide-react";
// import clsx from "clsx";
// import {useRootFolders} from "../hooks/useRootFolders.ts";
// import {useFolder} from "../hooks/useFolder.ts";
// import {useDocuments} from "../hooks/useDocuments.ts";
// import {useSubFolders} from "../hooks/useSubFolders.ts";
// import Breadcrumbs from "../components/documents/Breadcrumbs.tsx";
// import ItemGrid from "../components/documents/ItemGrid.tsx";
// import ItemList from "../components/documents/ItemList.tsx";
// import DocumentDetails from "../components/documents/DocumentDetails.tsx";
//
// export interface Document {
//     id: number;
//     name: string;
//     description?: string;
//     createdAt: string;
//     updatedAt: string;
//     fileType?: string;
//     version?: string;
//     fileSize?: number | string;
//     readTime?: string;
//     complexity?: string;
// }
//
// export interface Folder {
//     id: number;
//     name: string;
//     description?: string;
//     createdAt: string;
//     updatedAt: string;
//     subFolderIds: number[];
// }
//
// export default function Documents() {
//     const navigate = useNavigate();
//     const {folderId} = useParams();
//     const folderIdNum = folderId ? parseInt(folderId) : undefined;
//     const {data: rootFolders, isLoading: isLoadingRootFolders} = useRootFolders();
//     const {data: currentFolder, isLoading: isLoadingFolder} = useFolder(folderIdNum ?? 0);
//     const {data: documents, isLoading: isLoadingDocuments} = useDocuments(folderIdNum ?? 0);
//     const {data: subFolders, isLoading: isLoadingSubFolders} = useSubFolders(folderIdNum ?? 0);
//
//     // Update the state type to match the expected Document type with all required properties
//     const [selectedItem, setSelectedItem] = useState<Folder | Document | null>(null);
//     const [searchQuery, setSearchQuery] = useState('');
//     const [showFilters, setShowFilters] = useState(false);
//     const [sortBy, setSortBy] = useState('name');
//     const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
//     const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
//     const [showDetails, setShowDetails] = useState(false);
//     const [showActionMenu, setShowActionMenu] = useState(false);
//
//     const breadcrumbs = useMemo(() =>
//             folderId && currentFolder
//                 ? [{id: 'root', name: 'Documents'}, {id: currentFolder.id, name: currentFolder.name}]
//                 : [{id: 'root', name: 'Documents'}],
//         [folderId, currentFolder]
//     );
//
//     const navigateBack = () => {
//         if (breadcrumbs.length > 1) {
//             const parentCrumb = breadcrumbs[breadcrumbs.length - 2];
//             navigate(parentCrumb.id === 'root' ? '/documents' : `/documents/${parentCrumb.id}`);
//         }
//     };
//
//     const handleItemClick = (item: Document | Folder) => {
//         setSelectedItem(item);
//         if ('subFolderIds' in item) {
//             // Navigation directe vers le dossier au lieu d'ouvrir le modal
//             navigate(`/documents/${item.id}`);
//         } else {
//             setShowDetails(true);
//         }
//     };
//
//     const getFileTypeIcon = (item: Document | Folder) =>
//         'subFolderIds' in item ? <Folder className="h-10 w-10 text-blue-500"/> : <FileText className="h-10 w-10 text-red-500"/>;
//
//     const getFileTypeColor = (item: Document | Folder) =>
//         'subFolderIds' in item ? 'bg-indigo-50 text-indigo-700' : 'bg-red-50 text-red-700';
//
//     const handleCreateButtonClick = () => {
//         if (!folderId) navigate(`/documents/create`);
//         else setShowActionMenu(!showActionMenu);
//     };
//
//     const handleCreateSubFolder = () => {
//         navigate(`/documents/create/${folderId}`);
//         setShowActionMenu(false);
//     };
//
//     const handleCreateDocument = () => {
//         navigate(`/documents/create-version?folderId=${folderId}`);
//         setShowActionMenu(false);
//     };
//
//     const isLoading = isLoadingRootFolders || isLoadingFolder || isLoadingDocuments || isLoadingSubFolders;
//
//     const currentItems = useMemo(() =>
//             folderId ? [...(subFolders || []), ...(documents || [])] : rootFolders || [],
//         [folderId, subFolders, documents, rootFolders]
//     );
//
//     const filteredItems = useMemo(() => {
//         return currentItems.filter(item =>
//             item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             (item.description?.toLowerCase().includes(searchQuery.toLowerCase()))
//         ).sort((a, b) => {
//             if ('subFolderIds' in a && !('subFolderIds' in b)) return -1;
//             if (!('subFolderIds' in a) && 'subFolderIds' in b) return 1;
//             const compare = sortBy === 'name' ? a.name.localeCompare(b.name) : new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
//             return sortOrder === 'asc' ? compare : -compare;
//         });
//     }, [currentItems, searchQuery, sortBy, sortOrder]);
//
//     return (
//         <div className="min-h-screen bg-gray-50">
//             <div className="bg-white shadow sticky top-0 z-10">
//                 <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
//                     <h1 className="hidden sm:block text-xl font-bold text-gray-900">Gestion des Documents</h1>
//                     <button onClick={handleCreateButtonClick} className="bg-gradient-to-r from-[#850606] to-[#a51c1c] text-white px-4 py-2 rounded hover:from-[#750505] hover:to-[#951919]">
//                         <Plus/> Créer
//                     </button>
//                     {/* Action Menu */}
//                     {showActionMenu && (
//                         <div className="absolute mt-40 right-10 bg-white rounded shadow">
//                             <button onClick={handleCreateSubFolder} className="px-4 py-2 hover:bg-gray-100 w-full text-left">Créer un dossier</button>
//                             <button onClick={handleCreateDocument} className="px-4 py-2 hover:bg-gray-100 w-full text-left">Créer un document</button>
//                         </div>
//                     )}
//                 </div>
//             </div>
//
//             {/* Search & Filters */}
//             <div className="px-6 py-4 flex gap-2">
//                 <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Rechercher..." className="border rounded pl-4 flex-1"/>
//                 <button onClick={() => setShowFilters(!showFilters)} className={clsx("p-2 rounded", showFilters ? 'bg-blue-100' : 'bg-gray-200')}><Filter/></button>
//                 <button onClick={() => setSortBy(sortBy === 'name' ? 'date' : 'name')} className="p-2 bg-gray-200 rounded">{sortBy === 'name' ? <Calendar/> : <Clock/>}</button>
//                 <button onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')} className="p-2 bg-gray-200 rounded"><ArrowUpDown/></button>
//                 <div className="flex">
//                     <button onClick={() => setViewMode('grid')} className={clsx("p-2 rounded-l", viewMode === 'grid' ? 'bg-blue-100':'bg-gray-200')}><Grid/></button>
//                     <button onClick={() => setViewMode('list')} className={clsx("p-2 rounded-r", viewMode === 'list' ? 'bg-blue-100':'bg-gray-200')}><List/></button>
//                 </div>
//             </div>
//
//             <Breadcrumbs breadcrumbs={breadcrumbs} navigateBack={navigateBack}/>
//
//             {isLoading && <div className='text-center py-10'>Chargement...</div>}
//
//             {!isLoading && (viewMode === 'grid'
//                 ? <ItemGrid items={filteredItems} {...{handleItemClick,getFileTypeIcon,getFileTypeColor}}/>
//                 : <ItemList items={filteredItems} {...{handleItemClick,getFileTypeIcon,getFileTypeColor}}/>)
//             }
//
//             {selectedItem && !('subFolderIds' in selectedItem) && (
//                 <DocumentDetails selectedItem={selectedItem as any} showDetails={showDetails} setShowDetails={setShowDetails} />
//             )}
//         </div>
//     );
// }

import { useState, useMemo, useCallback, lazy, Suspense } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import {
    Plus, Filter, Calendar, Clock,
    ArrowUpDown, Grid, List, Folder, FileText,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { useRootFolders } from "../hooks/useRootFolders.ts";
import { useFolder } from "../hooks/useFolder.ts";
import { useDocuments } from "../hooks/useDocuments.ts";
import { useSubFolders } from "../hooks/useSubFolders.ts";
import Breadcrumbs from "../components/documents/Breadcrumbs.tsx";

// Lazy loading des composants lourds
const ItemGrid = lazy(() => import("../components/documents/ItemGrid.tsx"));
const ItemList = lazy(() => import("../components/documents/ItemList.tsx"));
const DocumentDetails = lazy(() => import("../components/documents/DocumentDetails.tsx"));

// Loading fallback
const LoadingFallback = () => <div className="text-center py-4">Chargement...</div>;

export interface Document {
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

export interface Folder {
    id: number;
    name: string;
    description?: string;
    createdAt: string;
    updatedAt: string;
    subFolderIds: number[];
}

export default function Documents() {
    const navigate = useNavigate();
    const { folderId } = useParams();
    const folderIdNum = folderId ? parseInt(folderId) : undefined;

    // Optimisation 1: N'utiliser les hooks que lorsque nécessaire
    const { data: rootFolders, isLoading: isLoadingRootFolders } = useRootFolders();

    // Always call hooks unconditionally, but pass null/undefined when not needed
    const { data: currentFolder, isLoading: isLoadingFolder } = useFolder(folderIdNum || null);

    const { data: documents, isLoading: isLoadingDocuments } = useDocuments(folderIdNum || null);

    const { data: subFolders, isLoading: isLoadingSubFolders } = useSubFolders(folderIdNum || null);

    const [selectedItem, setSelectedItem] = useState<Folder | Document | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [sortBy, setSortBy] = useState('name');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [showDetails, setShowDetails] = useState(false);
    const [showActionMenu, setShowActionMenu] = useState(false);
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    // Mémoisation du calcul des breadcrumbs
    const breadcrumbs = useMemo(() =>
            folderId && currentFolder
                ? [{ id: 'root', name: 'Documents' }, { id: currentFolder.id, name: currentFolder.name }]
                : [{ id: 'root', name: 'Documents' }],
        [folderId, currentFolder]
    );

    // Optimisation 2: Mémoisation des handlers pour éviter les re-rendus
    const navigateBack = useCallback(() => {
        if (breadcrumbs.length > 1) {
            const parentCrumb = breadcrumbs[breadcrumbs.length - 2];
            navigate(parentCrumb.id === 'root' ? '/documents' : `/documents/${parentCrumb.id}`);
        }
    }, [breadcrumbs, navigate]);

    const handleItemClick = useCallback((item: Document | Folder) => {
        setSelectedItem(item);
        if ('subFolderIds' in item) {
            navigate(`/documents/${item.id}`);
        } else {
            setShowDetails(true);
        }
    }, [navigate]);

    // Optimisation 3: Mémoisation des fonctions d'aide
    const getFileTypeIcon = useCallback((item: Document | Folder) =>
            'subFolderIds' in item ? <Folder className="h-10 w-10 text-blue-500" /> : <FileText className="h-10 w-10 text-red-500" />,
        []
    );

    const getFileTypeColor = useCallback((item: Document | Folder) =>
            'subFolderIds' in item ? 'bg-indigo-50 text-indigo-700' : 'bg-red-50 text-red-700',
        []
    );

    const handleCreateButtonClick = useCallback(() => {
        if (!folderId) navigate(`/documents/create`);
        else setShowActionMenu(prev => !prev);
    }, [folderId, navigate]);

    const handleCreateSubFolder = useCallback(() => {
        navigate(`/documents/create/${folderId}`);
        setShowActionMenu(false);
    }, [folderId, navigate]);

    const handleCreateDocument = useCallback(() => {
        navigate(`/documents/create-version?folderId=${folderId}`);
        setShowActionMenu(false);
    }, [folderId, navigate]);

    // Détermination simplifiée de l'état de chargement
    const isLoading = folderIdNum
        ? (isLoadingFolder || isLoadingDocuments || isLoadingSubFolders)
        : isLoadingRootFolders;

    // Optimisation 4: Mémoisation des items courants
    const currentItems = useMemo(() => {
        if (folderIdNum) {
            if (subFolders && documents) {
                return [...subFolders, ...documents];
            }
            return [];
        }
        return rootFolders || [];
    }, [folderIdNum, subFolders, documents, rootFolders]);

    // Optimisation 5: Mémoisation du filtrage et tri
    const filteredItems = useMemo(() => {
        // Sortie rapide si aucun élément
        if (!currentItems.length) return [];

        return currentItems
            .filter(item => {
                const searchLower = searchQuery.toLowerCase();
                if (!searchLower) return true;

                return item.name.toLowerCase().includes(searchLower) ||
                    (item.description?.toLowerCase().includes(searchLower));
            })
            .sort((a, b) => {
                // Trier les dossiers avant les documents
                if ('subFolderIds' in a && !('subFolderIds' in b)) return -1;
                if (!('subFolderIds' in a) && 'subFolderIds' in b) return 1;

                // Tri par nom ou date
                const compare = sortBy === 'name'
                    ? a.name.localeCompare(b.name)
                    : new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();

                return sortOrder === 'asc' ? compare : -compare;
            });
    }, [currentItems, searchQuery, sortBy, sortOrder]);

    // Optimisation 6: Extraction des props partagées
    const itemProps = useMemo(() => ({
        handleItemClick,
        getFileTypeIcon,
        getFileTypeColor
    }), [handleItemClick, getFileTypeIcon, getFileTypeColor]);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header et bouton de création */}
            <div className="bg-gradient-to-r from-secondary-900 to-secondary-800 shadow-md sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
                    <div className="flex items-center">
                        <div className="bg-white/10 p-2 rounded-lg mr-3 hidden sm:flex">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                            </svg>
                        </div>
                        <h1 className="text-xl sm:text-2xl font-bold text-white">Gestion des Documents</h1>
                    </div>

                    <div className="relative">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleCreateButtonClick}
                            className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2.5 rounded-lg shadow-lg shadow-primary-900/20 flex items-center gap-2 transition-colors"
                        >
                            <Plus className="h-5 w-5" /> 
                            <span className="font-medium">Créer</span>
                        </motion.button>

                        {/* Action Menu */}
                        <AnimatePresence>
                            {showActionMenu && (
                                <motion.div 
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute mt-2 right-0 bg-white rounded-lg shadow-xl py-2 z-50 min-w-[200px] border border-gray-100"
                                >
                                    <motion.button 
                                        whileHover={{ x: 5, backgroundColor: 'rgba(79, 70, 229, 0.1)' }}
                                        onClick={handleCreateSubFolder} 
                                        className="px-4 py-3 hover:bg-gray-50 w-full text-left flex items-center gap-3"
                                    >
                                        <div className="p-1.5 rounded-md bg-primary-50 text-primary-600">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                                            </svg>
                                        </div>
                                        <span className="font-medium text-gray-700">Créer un dossier</span>
                                    </motion.button>

                                    <motion.button 
                                        whileHover={{ x: 5, backgroundColor: 'rgba(239, 68, 68, 0.1)' }}
                                        onClick={handleCreateDocument} 
                                        className="px-4 py-3 hover:bg-gray-50 w-full text-left flex items-center gap-3"
                                    >
                                        <div className="p-1.5 rounded-md bg-red-50 text-red-600">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </div>
                                        <span className="font-medium text-gray-700">Créer un document</span>
                                    </motion.button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* Barre de recherche et filtres */}
            <div className="px-6 py-4 flex flex-wrap gap-2">
                <div className={clsx(
                    "relative flex-1 min-w-[200px] transition-all duration-200",
                    isSearchFocused ? "ring-2 ring-primary-500/20" : ""
                )}>
                    <div className={clsx(
                        "absolute left-3 top-1/2 -translate-y-1/2 transition-colors",
                        isSearchFocused ? "text-primary-500" : "text-gray-400"
                    )}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <input
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        onFocus={() => setIsSearchFocused(true)}
                        onBlur={() => setIsSearchFocused(false)}
                        placeholder="Rechercher un document ou un dossier..."
                        className={clsx(
                            "w-full py-2.5 pl-10 pr-4 border rounded-lg shadow-sm focus:outline-none transition-all",
                            isSearchFocused 
                                ? "border-primary-500/40 bg-white" 
                                : "border-gray-300 bg-gray-50 hover:bg-white focus:bg-white"
                        )}
                    />
                    {searchQuery && (
                        <button 
                            onClick={() => setSearchQuery('')}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    )}
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className={clsx(
                            "p-2.5 rounded-lg transition-colors flex items-center gap-1.5",
                            showFilters 
                                ? 'bg-primary-100 text-primary-700 border border-primary-200' 
                                : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                        )}
                    >
                        <Filter className="h-4 w-4" />
                        <span className="hidden sm:inline text-sm font-medium">Filtres</span>
                    </button>

                    <button
                        onClick={() => setSortBy(sortBy === 'name' ? 'date' : 'name')}
                        className="p-2.5 bg-gray-100 text-gray-700 rounded-lg border border-gray-200 hover:bg-gray-200 transition-colors"
                        title={sortBy === 'name' ? 'Trier par date' : 'Trier par nom'}
                    >
                        {sortBy === 'name' ? <Calendar className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
                    </button>

                    <button
                        onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                        className="p-2.5 bg-gray-100 text-gray-700 rounded-lg border border-gray-200 hover:bg-gray-200 transition-colors"
                        title={sortOrder === 'asc' ? 'Ordre décroissant' : 'Ordre croissant'}
                    >
                        <ArrowUpDown className="h-4 w-4" />
                    </button>

                    <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                        <button 
                            onClick={() => setViewMode('grid')} 
                            className={clsx(
                                "p-2.5 transition-colors",
                                viewMode === 'grid' 
                                    ? 'bg-primary-100 text-primary-700' 
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            )}
                            title="Vue en grille"
                        >
                            <Grid className="h-4 w-4" />
                        </button>
                        <button 
                            onClick={() => setViewMode('list')} 
                            className={clsx(
                                "p-2.5 transition-colors",
                                viewMode === 'list' 
                                    ? 'bg-primary-100 text-primary-700' 
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            )}
                            title="Vue en liste"
                        >
                            <List className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>

            <Breadcrumbs breadcrumbs={breadcrumbs} navigateBack={navigateBack} />

            {/* Affichage conditionnel avec Suspense pour le lazy loading */}
            {isLoading ? (
                <div className='text-center py-10'>Chargement...</div>
            ) : (
                <Suspense fallback={<LoadingFallback />}>
                    {viewMode === 'grid'
                        ? <ItemGrid items={filteredItems} {...itemProps} />
                        : <ItemList items={filteredItems} {...itemProps} />
                    }
                </Suspense>
            )}

            {/* Modal de détails */}
            {selectedItem && !('subFolderIds' in selectedItem) && (
                <Suspense fallback={<LoadingFallback />}>
                    <DocumentDetails
                        selectedItem={selectedItem as unknown as Document}
                        showDetails={showDetails}
                        setShowDetails={setShowDetails}
                    />
                </Suspense>
            )}
        </div>
    );
}
