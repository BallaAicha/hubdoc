import React from 'react';
import { ChevronRight, ArrowLeft, Home, Folder } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import clsx from "clsx";

interface Breadcrumb {
    id: number | string;
    name: string;
}

interface BreadcrumbsProps {
    breadcrumbs: Breadcrumb[];
    navigateBack: () => void;
}

export default function Breadcrumbs({ breadcrumbs, navigateBack }: BreadcrumbsProps) {
    const navigate = useNavigate();

    return (
        <nav className="mb-6 px-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-3 flex items-center overflow-x-auto">
                {breadcrumbs.length > 1 && (
                    <motion.button 
                        onClick={navigateBack}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="mr-3 p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors flex-shrink-0"
                        title="Retour au dossier parent"
                    >
                        <ArrowLeft className="h-4 w-4"/>
                    </motion.button>
                )}

                <div className="flex items-center text-sm overflow-x-auto scrollbar-hide">
                    {breadcrumbs.map((crumb, index) => (
                        <React.Fragment key={crumb.id}>
                            {index === 0 ? (
                                <motion.button 
                                    onClick={() => navigate('/documents')}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={clsx(
                                        "flex items-center gap-1.5 px-2.5 py-1.5 rounded-md transition-colors",
                                        breadcrumbs.length === 1 
                                            ? "bg-primary-50 text-primary-700 font-medium" 
                                            : "hover:bg-gray-100 text-gray-700"
                                    )}
                                >
                                    <Home className="h-3.5 w-3.5" />
                                    <span>Accueil</span>
                                </motion.button>
                            ) : (
                                <>
                                    <ChevronRight className="h-4 w-4 mx-1 text-gray-400 flex-shrink-0" />
                                    <motion.button 
                                        onClick={() => navigate(`/documents/${crumb.id}`)}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={clsx(
                                            "flex items-center gap-1.5 px-2.5 py-1.5 rounded-md transition-colors",
                                            index === breadcrumbs.length - 1 
                                                ? "bg-primary-50 text-primary-700 font-medium" 
                                                : "hover:bg-gray-100 text-gray-700"
                                        )}
                                    >
                                        <Folder className="h-3.5 w-3.5" />
                                        <span className="truncate max-w-[150px]">{crumb.name}</span>
                                    </motion.button>
                                </>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </nav>
    );
}
