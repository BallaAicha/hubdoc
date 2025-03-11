import React, { useState } from 'react';
import { Download, ExternalLink, X } from 'lucide-react';
import { FileItem, FileVersion } from '../types';

interface FileDialogProps {
  file: FileItem;
  onClose: () => void;
  open: boolean;
}

export function FileDialog({ file, onClose, open }: FileDialogProps) {
  const [selectedVersion, setSelectedVersion] = useState<FileVersion | undefined>(
    file.versions?.[0]
  );

  if (!open) return null;

  const handleDownload = () => {
    if (selectedVersion) {
      console.log('Downloading:', file.name, 'version:', selectedVersion.version);
      // Implement actual download logic here
    }
  };

  const handleOpenInBrowser = () => {
    if (selectedVersion) {
      console.log('Opening in browser:', file.name, 'version:', selectedVersion.version);
      window.open(selectedVersion.url, '_blank');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">{file.name}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-4 space-y-4">
          <div className="flex items-center gap-2">
            <span className="font-medium">Type:</span>
            <span className="uppercase">{file.type}</span>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-medium">Information</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <span className="text-gray-600">Créé le</span>
              <span>{file.createdAt}</span>
              
              <span className="text-gray-600">Mis à jour le</span>
              <span>{file.updatedAt}</span>
              
              {file.version && (
                <>
                  <span className="text-gray-600">Version actuelle</span>
                  <span>{file.version}</span>
                </>
              )}
            </div>
          </div>
          
          {file.description && (
            <div className="space-y-2">
              <h3 className="font-medium">Description</h3>
              <p className="text-gray-600">{file.description}</p>
            </div>
          )}

          {file.versions && file.versions.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-medium">Sélectionner une version</h3>
              <select
                className="w-full rounded-lg border border-gray-300 p-2"
                value={selectedVersion?.version}
                onChange={(e) => {
                  const version = file.versions?.find(v => v.version === e.target.value);
                  setSelectedVersion(version);
                }}
              >
                {file.versions.map((version) => (
                  <option key={version.version} value={version.version}>
                    Version {version.version} ({version.date})
                  </option>
                ))}
              </select>
            </div>
          )}
          
          <div className="flex gap-2 mt-4">
            <button 
              className="flex-1 bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 flex items-center justify-center gap-2"
              onClick={handleDownload}
            >
              <Download className="h-5 w-5" />
              Télécharger
            </button>
            <button 
              className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 flex items-center justify-center gap-2"
              onClick={handleOpenInBrowser}
            >
              <ExternalLink className="h-5 w-5" />
              Ouvrir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}