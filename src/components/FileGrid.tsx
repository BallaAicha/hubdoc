import  { useState } from 'react';
import { FileItem } from '../test.ts';
import {
    File, Folder, User, Clock, Calendar, Eye, Download,
    FileText, FileSpreadsheet, FileImage, FileArchive
} from 'lucide-react';
import { FileDialog } from './FileDialog';
import clsx from 'clsx';

interface FileGridProps {
    files: FileItem[];
    onFileClick?: (file: FileItem) => void;
}

export function FileGrid({ files, onFileClick }: FileGridProps) {
    const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    // Fonction pour obtenir une couleur basée sur le type de fichier en utilisant notre palette
    const getFileTypeColor = (type: string) => {
        switch(type) {
            case 'folder': return 'bg-[#3b82f6]/10 text-[#3b82f6]'; // Info blue pour les dossiers
            case 'pdf': return 'bg-[#b91c1c]/10 text-[#b91c1c]';    // Primary red pour les PDFs
            case 'doc':
            case 'docx': return 'bg-[#4b5563]/10 text-[#4b5563]';   // Neutral pour les docs
            case 'xls':
            case 'xlsx': return 'bg-[#10b981]/10 text-[#10b981]';   // Success green pour les excels
            case 'ppt':
            case 'pptx': return 'bg-[#f97316]/10 text-[#f97316]';   // Secondary orange pour les présentations
            case 'jpg':
            case 'jpeg':
            case 'png': return 'bg-[#8b5cf6]/10 text-[#8b5cf6]';    // Violet pour les images
            case 'zip':
            case 'rar': return 'bg-[#6b7280]/10 text-[#6b7280]';    // Neutre pour les archives
            default: return 'bg-[#6b7280]/10 text-[#6b7280]';       // Neutre par défaut
        }
    };

    // Fonction pour obtenir l'icône basée sur le type de fichier
    const getFileIcon = (type: string) => {
        switch(type) {
            case 'folder': return <Folder className="h-6 w-6" />;
            case 'doc':
            case 'docx': return <FileText className="h-6 w-6" />;
            case 'xls':
            case 'xlsx': return <FileSpreadsheet className="h-6 w-6" />;
            case 'ppt':
            case 'jpg':
            case 'jpeg':
            case 'png': return <FileImage className="h-6 w-6" />;
            case 'zip':
            case 'rar': return <FileArchive className="h-6 w-6" />;
            default: return <File className="h-6 w-6" />;
        }
    };

    // Fonction pour formater la date
    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return new Intl.DateTimeFormat('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }).format(date);
    };

    // Temps écoulé depuis la mise à jour (format relatif)
    const getTimeAgo = (dateStr: string) => {
        const date = new Date(dateStr);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - date.getTime());
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return "Aujourd'hui";
        if (diffDays === 1) return "Hier";
        if (diffDays < 7) return `Il y a ${diffDays} jours`;
        if (diffDays < 30) return `Il y a ${Math.floor(diffDays/7)} semaine${Math.floor(diffDays/7) > 1 ? 's' : ''}`;
        if (diffDays < 365) return `Il y a ${Math.floor(diffDays/30)} mois`;
        return `Il y a ${Math.floor(diffDays/365)} an${Math.floor(diffDays/365) > 1 ? 's' : ''}`;
    };

    if (files.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-center bg-neutral-50 rounded-xl border border-neutral-200">
                <div className="bg-[#f3f4f6] rounded-full p-6 mb-5 shadow-sm">
                    <Folder className="h-14 w-14 text-[#9ca3af]" />
                </div>
                <h3 className="text-xl font-semibold text-[#374151] mb-3">Aucun document trouvé</h3>
                <p className="text-[#6b7280] max-w-md mx-auto px-4">
                    Aucun document n'est disponible dans ce répertoire. Commencez par créer ou importer des documents.
                </p>
            </div>
        );
    }

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {files.map((file) => (
                    <div
                        key={file.id}
                        className={clsx(
                            "bg-white rounded-xl border border-neutral-200 overflow-hidden cursor-pointer transition-all duration-200 flex flex-col",
                            "hover:border-[#dc2626]/30 hover:shadow-md",
                            hoveredId === file.id ? "shadow-md ring-1 ring-[#dc2626]/20" : "shadow-sm"
                        )}
                        onClick={() => {
                            if (file.type === 'folder') {
                                onFileClick?.(file);
                            } else {
                                setSelectedFile(file);
                            }
                        }}
                        onMouseEnter={() => setHoveredId(file.id)}
                        onMouseLeave={() => setHoveredId(null)}
                    >
                        <div className="p-5 flex-grow">
                            <div className="flex items-start justify-between mb-4">
                                <div className={clsx('p-3 rounded-lg', getFileTypeColor(file.type))}>
                                    {getFileIcon(file.type)}
                                </div>
                                {file.version && (
                                    <span className="inline-flex items-center rounded-full bg-[#f3f4f6] border border-neutral-200 px-2.5 py-0.5 text-xs font-medium text-[#374151]">
                    v{file.version}
                  </span>
                                )}
                            </div>

                            <h3 className="text-base font-semibold text-[#1f2937] mb-1.5 line-clamp-2 leading-tight">{file.name}</h3>

                            {file.description && (
                                <p className="text-sm text-[#6b7280] mb-3 line-clamp-2 leading-snug">{file.description}</p>
                            )}

                            <div className="flex flex-wrap items-center text-xs text-[#6b7280] mt-3 gap-x-4 gap-y-1">
                                <div className="flex items-center">
                                    <User className="h-3.5 w-3.5 mr-1.5 shrink-0" />
                                    <span className="truncate">Ousmane</span>
                                </div>
                                <div className="flex items-center">
                                    <Calendar className="h-3.5 w-3.5 mr-1.5 shrink-0" />
                                    <span className="truncate">{formatDate(file.createdAt)}</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-[#f9fafb] px-5 py-3 flex justify-between items-center border-t border-neutral-200">
                            <div className="flex items-center text-xs text-[#6b7280]">
                                <Clock className="h-3.5 w-3.5 mr-1.5 shrink-0" />
                                <span className="truncate">
                  {getTimeAgo(file.updatedAt)}
                </span>
                            </div>

                            <div className={clsx(
                                "flex space-x-1 transition-opacity",
                                hoveredId === file.id ? "opacity-100" : "opacity-0"
                            )}>
                                {file.type !== 'folder' && (
                                    <>
                                        <button
                                            className="p-1.5 rounded-md hover:bg-[#b91c1c]/10 text-[#6b7280] hover:text-[#b91c1c] transition-colors"
                                            aria-label="Aperçu"
                                            title="Aperçu"
                                        >
                                            <Eye className="h-4 w-4" />
                                        </button>
                                        <button
                                            className="p-1.5 rounded-md hover:bg-[#b91c1c]/10 text-[#6b7280] hover:text-[#b91c1c] transition-colors"
                                            aria-label="Télécharger"
                                            title="Télécharger"
                                        >
                                            <Download className="h-4 w-4" />
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {selectedFile && (
                <FileDialog
                    file={selectedFile}
                    isOpen={true}
                    onClose={() => setSelectedFile(null)}
                />
            )}
        </>
    );
}