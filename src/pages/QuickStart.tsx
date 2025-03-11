import React from 'react';
import { FileGrid } from '../components/FileGrid';
import { FileItem } from '../types';

const quickStartGuides: FileItem[] = [
  {
    id: 'qs1',
    name: 'Guide d\'installation API',
    type: 'pdf',
    createdAt: '2024-03-01',
    updatedAt: '2024-03-01'
  },
  {
    id: 'qs2',
    name: 'Configuration Sandbox',
    type: 'pdf',
    createdAt: '2024-03-01',
    updatedAt: '2024-03-01'
  },
  {
    id: 'qs3',
    name: 'Documentation API REST',
    type: 'folder',
    createdAt: '2024-03-01',
    updatedAt: '2024-03-01'
  },
  {
    id: 'qs4',
    name: 'Exemples d\'intégration',
    type: 'folder',
    createdAt: '2024-03-01',
    updatedAt: '2024-03-01'
  }
];

export function QuickStart() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Démarrage rapide</h1>
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Guides d'installation et API</h2>
        <p className="text-gray-600 mb-4">
          Retrouvez ici tous les guides et la documentation nécessaire pour démarrer rapidement avec nos APIs.
        </p>
      </div>
      <FileGrid files={quickStartGuides} />
    </div>
  );
}