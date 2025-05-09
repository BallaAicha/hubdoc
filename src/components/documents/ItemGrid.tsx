// import clsx from "clsx";
//
// import { Document , Folder } from "../../types";
// interface ItemGridProps {
//     items: (Document | Folder)[];
//     handleItemClick: (item: Document | Folder) => void;
//     getFileTypeIcon: (item: Document | Folder) => JSX.Element;
//     getFileTypeColor: (item: Document | Folder) => string;
// }
//
// export default function ItemGrid({items, handleItemClick, getFileTypeIcon, getFileTypeColor}: ItemGridProps) {
//     return (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//             {items.map(item => (
//                 <div key={item.id} className="bg-white p-4 rounded-lg shadow hover:shadow-md cursor-pointer"
//                      onClick={() => handleItemClick(item)}>
//                     <div className="flex justify-center mb-4">{getFileTypeIcon(item)}</div>
//                     <h3 className="font-medium text-gray-900 truncate text-center">{item.name}</h3>
//                     <p className="text-center text-sm text-gray-500 my-2">{new Date(item.updatedAt).toLocaleDateString('fr-FR')}</p>
//                     <span className={clsx("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs", getFileTypeColor(item))}>
//                         {'subFolderIds' in item ? "Dossier" : "Document"}
//                     </span>
//                 </div>
//             ))}
//         </div>
//     )
// }
import clsx from "clsx";
import { Document, Folder } from "../../types";
import { motion } from "framer-motion";
import { FileText, Folder as FolderIcon, Clock, Eye, Download, History } from "lucide-react";

interface ItemGridProps {
    items: (Document | Folder)[];
    handleItemClick: (item: Document | Folder) => void;
}

export default function ItemGrid({items, handleItemClick}: ItemGridProps) {
    // Filtrer les items pour n'afficher que les documents principaux (sans parentDocumentId)
    // ou les dossiers
    const filteredItems = items.filter(item => {
        // Si c'est un dossier, on le garde
        if ('subFolderIds' in item) {
            return true;
        }

        // Si c'est un document sans parentDocumentId ou avec la version la plus récente, on le garde
        return !item.parentDocumentId;
    });

    // Format date nicely
    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('fr-FR', options);
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.3 }
        }
    };

    return (
        <motion.div 
            className="px-6 pb-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {filteredItems.map(item => {
                    const isFolder = 'subFolderIds' in item;

                    return (
                        <motion.div 
                            key={item.id} 
                            variants={itemVariants}
                            whileHover={{ y: -5, scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={clsx(
                                "relative bg-white rounded-xl overflow-hidden cursor-pointer group transition-all duration-300",
                                isFolder 
                                    ? "border-2 border-primary-100 hover:border-primary-300 shadow-sm hover:shadow-md" 
                                    : "border border-gray-200 hover:border-red-200 shadow-sm hover:shadow-md"
                            )}
                            onClick={() => handleItemClick(item)}
                        >
                            {/* Top colored bar */}
                            <div className={clsx(
                                "h-1.5 w-full",
                                isFolder ? "bg-primary-500" : "bg-red-500"
                            )} />

                            <div className="p-5">
                                {/* Icon */}
                                <div className="flex justify-center mb-4">
                                    <div className={clsx(
                                        "p-4 rounded-full transition-colors",
                                        isFolder 
                                            ? "bg-primary-50 text-primary-500 group-hover:bg-primary-100" 
                                            : "bg-red-50 text-red-500 group-hover:bg-red-100"
                                    )}>
                                        {isFolder 
                                            ? <FolderIcon className="h-8 w-8" /> 
                                            : <FileText className="h-8 w-8" />
                                        }
                                    </div>
                                </div>

                                {/* Title */}
                                <h3 className="font-semibold text-gray-900 text-center mb-2 group-hover:text-primary-700 transition-colors truncate">
                                    {item.name}
                                </h3>

                                {/* Description (if available) */}
                                {item.description && (
                                    <p className="text-sm text-gray-500 text-center mb-3 line-clamp-2">
                                        {item.description}
                                    </p>
                                )}

                                {/* Metadata */}
                                <div className="flex items-center justify-center gap-3 mb-3">
                                    <div className="flex items-center text-xs text-gray-500">
                                        <Clock className="h-3 w-3 mr-1" />
                                        <span>{formatDate(item.updatedAt)}</span>
                                    </div>

                                    {!isFolder && item.fileType && (
                                        <span className="text-xs px-2 py-0.5 bg-gray-100 rounded-full uppercase">
                                            {item.fileType}
                                        </span>
                                    )}
                                </div>

                                {/* Type badge */}
                                <div className="flex justify-center">
                                    <span className={clsx(
                                        "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium",
                                        isFolder 
                                            ? "bg-primary-50 text-primary-700 border border-primary-200" 
                                            : "bg-red-50 text-red-700 border border-red-200"
                                    )}>
                                        {isFolder ? "Dossier" : "Document"}
                                    </span>
                                </div>
                            </div>

                            {/* Quick actions (visible on hover) */}
                            <div className={clsx(
                                "absolute inset-0 bg-black/5 backdrop-blur-sm flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                                isFolder ? "bg-primary-900/5" : "bg-red-900/5"
                            )}>
                                <motion.button 
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className={clsx(
                                        "p-2 rounded-full",
                                        isFolder 
                                            ? "bg-primary-100 text-primary-700 hover:bg-primary-200" 
                                            : "bg-white text-red-700 hover:bg-red-50"
                                    )}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleItemClick(item);
                                    }}
                                >
                                    <Eye className="h-5 w-5" />
                                </motion.button>

                                {!isFolder && (
                                    <motion.button 
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="p-2 rounded-full bg-white text-blue-700 hover:bg-blue-50"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            // Handle download action
                                        }}
                                    >
                                        <Download className="h-5 w-5" />
                                    </motion.button>
                                )}
                            </div>

                            {/* Version indicator */}
                            {!isFolder && item.hasVersions && (
                                <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full font-medium border border-blue-200">
                                    <History className="h-3 w-3" />
                                    <span>{item.versionsCount || ''}</span>
                                </div>
                            )}
                        </motion.div>
                    );
                })}
            </div>

            {filteredItems.length === 0 && (
                <div className="text-center py-16">
                    <div className="inline-flex items-center justify-center p-3 bg-gray-100 rounded-full mb-4">
                        <FolderIcon className="h-6 w-6 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-700 mb-1">Aucun élément</h3>
                    <p className="text-gray-500">Ce dossier est vide ou aucun élément ne correspond à votre recherche.</p>
                </div>
            )}
        </motion.div>
    );
}
