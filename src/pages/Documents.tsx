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
            <div className="bg-white shadow sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <h1 className="hidden sm:block text-xl font-bold text-gray-900">Gestion des Documents</h1>
                    <button
                        onClick={handleCreateButtonClick}
                        className="bg-gradient-to-r from-[#850606] to-[#a51c1c] text-white px-4 py-2 rounded hover:from-[#750505] hover:to-[#951919]"
                    >
                        <Plus/> Créer
                    </button>
                    {/* Action Menu */}
                    {showActionMenu && (
                        <div className="absolute mt-40 right-10 bg-white rounded shadow">
                            <button onClick={handleCreateSubFolder} className="px-4 py-2 hover:bg-gray-100 w-full text-left">Créer un dossier</button>
                            <button onClick={handleCreateDocument} className="px-4 py-2 hover:bg-gray-100 w-full text-left">Créer un document</button>
                        </div>
                    )}
                </div>
            </div>

            {/* Barre de recherche et filtres */}
            <div className="px-6 py-4 flex gap-2">
                <input
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Rechercher..."
                    className="border rounded pl-4 flex-1"
                />
                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className={clsx("p-2 rounded", showFilters ? 'bg-blue-100' : 'bg-gray-200')}
                >
                    <Filter/>
                </button>
                <button
                    onClick={() => setSortBy(sortBy === 'name' ? 'date' : 'name')}
                    className="p-2 bg-gray-200 rounded"
                >
                    {sortBy === 'name' ? <Calendar/> : <Clock/>}
                </button>
                <button
                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                    className="p-2 bg-gray-200 rounded"
                >
                    <ArrowUpDown/>
                </button>
                <div className="flex">
                    <button
                        onClick={() => setViewMode('grid')}
                        className={clsx("p-2 rounded-l", viewMode === 'grid' ? 'bg-blue-100':'bg-gray-200')}
                    >
                        <Grid/>
                    </button>
                    <button
                        onClick={() => setViewMode('list')}
                        className={clsx("p-2 rounded-r", viewMode === 'list' ? 'bg-blue-100':'bg-gray-200')}
                    >
                        <List/>
                    </button>
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
