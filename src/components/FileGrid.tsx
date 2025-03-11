import React, { useState } from 'react';
import { FileItem } from '../types';
import { File, Folder } from 'lucide-react';
import { FileDialog } from './FileDialog';

interface FileGridProps {
  files: FileItem[];
}

export function FileGrid({ files }: FileGridProps) {
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {files.map((file) => (
          <button
            key={file.id}
            onClick={() => setSelectedFile(file)}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow text-left w-full"
          >
            <div className="flex flex-col items-center justify-center gap-2">
              {file.type === 'folder' ? (
                <Folder className="h-16 w-16 text-blue-500" />
              ) : (
                <File className="h-16 w-16 text-red-500" />
              )}
              <span className="text-center font-medium text-gray-700">{file.name}</span>
            </div>
          </button>
        ))}
      </div>
      
      {selectedFile && (
        <FileDialog
          file={selectedFile}
          open={!!selectedFile}
          onClose={() => setSelectedFile(null)}
        />
      )}
    </>
  );
}