import React, { useState } from 'react';
import { FileItem } from '../types';
import { File, Folder, User } from 'lucide-react';
import { FileDialog } from './FileDialog';
import { useNavigate } from 'react-router-dom';

interface FileGridProps {
    files: FileItem[];
}

export function FileGrid({ files }: FileGridProps) {
    const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
    const navigate = useNavigate();

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {files.map((file) => (
                    <div
                        key={file.id}
                        className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-200 cursor-pointer"
                        onClick={() => {
                            if (file.type === 'folder') {
                                // Navigation lorsque l'utilisateur clique sur un dossier.
                                navigate(`/documents/${file.id}`);
                            } else if (file.type === 'pdf') {
                                // Ouvrir la boîte de dialogue pour les fichiers PDF.
                                setSelectedFile(file);
                            }
                        }}
                    >
                        <div className="mb-4">
                            {file.type === 'folder' ? (
                                <Folder className="h-8 w-8 text-blue-500" />
                            ) : (
                                <File className="h-8 w-8 text-orange-500" />
                            )}
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">{file.name}</h3>
                        <p className="text-sm text-gray-500 mb-4">{file.description}</p>
                        <div className="flex flex-col space-y-2 text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                                <User className="h-4 w-4" />
                                <span>Ousmane</span>
                            </div>
                            <div>Created: {file.createdAt}</div>
                            <div>Updated: {file.updatedAt}</div>
                            {file.version && (
                                <div className="flex items-center space-x-2">
                  <span className="inline-flex items-center rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-medium text-orange-800">
                    v{file.version}
                  </span>
                                    <span className="text-xs">
                    ({file.versions?.length || 0} version{file.versions?.length !== 1 ? 's' : ''})
                  </span>
                                </div>
                            )}
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