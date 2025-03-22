import React from 'react';
import { FileText, Folder, FileIcon as LucideFileIcon } from 'lucide-react';

interface FileIconProps {
    type: string;
    className?: string;
}

export const FileIcon: React.FC<FileIconProps> = ({ type, className = "h-10 w-10" }) => {
    switch (type.toLowerCase()) {
        case 'pdf':
            return <FileText className={`${className} text-red-500`} />;
        case 'folder':
            return <Folder className={`${className} text-blue-500`} />;
        default:
            return <LucideFileIcon className={`${className} text-gray-500`} />;
    }
};