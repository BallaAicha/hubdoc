import React from 'react';
import clsx from 'clsx';

interface FileTypeTagProps {
    type: string;
    className?: string;
}

export const FileTypeTag: React.FC<FileTypeTagProps> = ({ type, className }) => {
    const getTypeColor = (fileType: string) => {
        switch (fileType.toLowerCase()) {
            case 'pdf':
                return 'bg-red-50 text-red-700 border-red-200';
            case 'folder':
                return 'bg-indigo-50 text-indigo-700 border-indigo-200';
            default:
                return 'bg-gray-50 text-gray-700 border-gray-200';
        }
    };

    return (
        <span className={clsx(
            'px-2.5 py-1 rounded-full text-xs font-medium',
            getTypeColor(type),
            className
        )}>
      {type.toUpperCase()}
    </span>
    );
};