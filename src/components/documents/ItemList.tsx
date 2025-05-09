import clsx from "clsx";
import { Document, Folder } from "../../types";
import { motion } from "framer-motion";
import { FileText, Folder as FolderIcon, Clock, Eye, Download, History, ChevronRight } from "lucide-react";

interface ItemListProps {
    items: (Document | Folder)[];
    handleItemClick: (item: Document | Folder) => void;
}

export default function ItemList({items, handleItemClick}: ItemListProps) {
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
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
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
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                {filteredItems.length > 0 ? (
                    <div className="divide-y divide-gray-100">
                        {filteredItems.map(item => {
                            const isFolder = 'subFolderIds' in item;

                            return (
                                <motion.div 
                                    key={item.id} 
                                    variants={itemVariants}
                                    whileHover={{ backgroundColor: isFolder ? 'rgba(79, 70, 229, 0.05)' : 'rgba(239, 68, 68, 0.05)' }}
                                    className={clsx(
                                        "flex items-center py-4 px-6 cursor-pointer group transition-colors relative",
                                        isFolder ? "hover:border-l-4 hover:border-l-primary-500" : "hover:border-l-4 hover:border-l-red-500"
                                    )}
                                    onClick={() => handleItemClick(item)}
                                >
                                    {/* Icon */}
                                    <div className={clsx(
                                        "mr-4 p-3 rounded-lg transition-colors flex-shrink-0",
                                        isFolder 
                                            ? "bg-primary-50 text-primary-500 group-hover:bg-primary-100" 
                                            : "bg-red-50 text-red-500 group-hover:bg-red-100"
                                    )}>
                                        {isFolder 
                                            ? <FolderIcon className="h-6 w-6" /> 
                                            : <FileText className="h-6 w-6" />
                                        }
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <h3 className={clsx(
                                            "font-medium truncate transition-colors",
                                            isFolder 
                                                ? "group-hover:text-primary-700" 
                                                : "group-hover:text-red-700"
                                        )}>
                                            {item.name}
                                        </h3>
                                        <p className="text-sm text-gray-500 truncate mt-1">
                                            {item.description || 'Aucune description'}
                                        </p>
                                    </div>

                                    {/* Metadata */}
                                    <div className="ml-4 flex-shrink-0 flex flex-col items-end gap-2">
                                        <div className="flex items-center text-xs text-gray-500">
                                            <Clock className="h-3 w-3 mr-1" />
                                            <span>{formatDate(item.updatedAt)}</span>
                                        </div>

                                        <span className={clsx(
                                            "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium",
                                            isFolder 
                                                ? "bg-primary-50 text-primary-700 border border-primary-200" 
                                                : "bg-red-50 text-red-700 border border-red-200"
                                        )}>
                                            {isFolder ? "Dossier" : "Document"}
                                        </span>
                                    </div>

                                    {/* Quick actions */}
                                    <div className="ml-4 flex-shrink-0 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <motion.button 
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            className={clsx(
                                                "p-1.5 rounded-full",
                                                isFolder 
                                                    ? "bg-primary-100 text-primary-700 hover:bg-primary-200" 
                                                    : "bg-red-100 text-red-700 hover:bg-red-200"
                                            )}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleItemClick(item);
                                            }}
                                        >
                                            <Eye className="h-4 w-4" />
                                        </motion.button>

                                        {!isFolder && (
                                            <motion.button 
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                className="p-1.5 rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    // Handle download action
                                                }}
                                            >
                                                <Download className="h-4 w-4" />
                                            </motion.button>
                                        )}
                                    </div>

                                    {/* Arrow indicator */}
                                    <ChevronRight className="h-5 w-5 ml-2 text-gray-400 group-hover:text-gray-600 transition-colors" />

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
                ) : (
                    <div className="text-center py-16">
                        <div className="inline-flex items-center justify-center p-3 bg-gray-100 rounded-full mb-4">
                            <FolderIcon className="h-6 w-6 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-700 mb-1">Aucun élément</h3>
                        <p className="text-gray-500">Ce dossier est vide ou aucun élément ne correspond à votre recherche.</p>
                    </div>
                )}
            </div>
        </motion.div>
    );
}
