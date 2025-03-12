import React from 'react';
import { FileGrid } from '../components/FileGrid';
import { FileItem } from '../types';
import {useNavigate} from "react-router-dom";
import {Plus} from "lucide-react";

const documents: FileItem[] = [
  {
    id: '1',
    name: 'Présentation des cas d\'usages de PI',
    type: 'pdf',
    createdAt: '23 mars 2023, 11:06:19',
    updatedAt: '16 nov. 2023, 11:50:19',
    version: '12.6',
    description: 'Description des cinématiques des transferts',
    versions: [
      { version: '12.6', date: '16 nov. 2023', url: '/docs/presentation-v12.6.pdf' },
      { version: '12.5', date: '10 oct. 2023', url: '/docs/presentation-v12.5.pdf' },
      { version: '12.4', date: '15 sept. 2023', url: '/docs/presentation-v12.4.pdf' }
    ]
  },
  {
    id: '2',
    name: 'Catalogue messages',
    type: 'folder',
    createdAt: '15 mars 2024',
    updatedAt: '15 mars 2024',
    description: 'Collection complète des messages système'
  },
  {
    id: '3',
    name: 'Guide de déploiement',
    type: 'pdf',
    createdAt: '10 mars 2024',
    updatedAt: '15 mars 2024',
    version: '2.1',
    description: 'Instructions détaillées pour le déploiement',
    versions: [
      { version: '2.1', date: '15 mars 2024', url: '/docs/guide-deployment-v2.1.pdf' },
      { version: '2.0', date: '1 mars 2024', url: '/docs/guide-deployment-v2.0.pdf' }
    ]
  },
  {
    id: '4',
    name: 'Documentation API',
    type: 'pdf',
    createdAt: '1 mars 2024',
    updatedAt: '14 mars 2024',
    version: '3.0',
    description: 'Documentation complète de l\'API REST',
    versions: [
      { version: '3.0', date: '14 mars 2024', url: '/docs/api-docs-v3.0.pdf' },
      { version: '2.9', date: '1 mars 2024', url: '/docs/api-docs-v2.9.pdf' },
      { version: '2.8', date: '15 fév 2024', url: '/docs/api-docs-v2.8.pdf' }
    ]
  },
  {
    id: '5',
    name: 'Spécifications techniques',
    type: 'pdf',
    createdAt: '1 mars 2024',
    updatedAt: '13 mars 2024',
    version: '1.5',
    description: 'Spécifications techniques détaillées',
    versions: [
      { version: '1.5', date: '13 mars 2024', url: '/docs/specs-v1.5.pdf' },
      { version: '1.4', date: '1 mars 2024', url: '/docs/specs-v1.4.pdf' }
    ]
  },
  {
    id: '6',
    name: 'Guide d\'intégration',
    type: 'pdf',
    createdAt: '28 fév 2024',
    updatedAt: '12 mars 2024',
    version: '2.0',
    description: 'Guide complet d\'intégration du système',
    versions: [
      { version: '2.0', date: '12 mars 2024', url: '/docs/integration-guide-v2.0.pdf' },
      { version: '1.9', date: '28 fév 2024', url: '/docs/integration-guide-v1.9.pdf' }
    ]
  },
  {
    id: '7',
    name: 'Sandbox Setup',
    type: 'folder',
    createdAt: '25 fév 2024',
    updatedAt: '11 mars 2024',
    description: 'Configuration de l\'environnement sandbox'
  },
  {
    id: '8',
    name: 'Release Notes',
    type: 'pdf',
    createdAt: '20 fév 2024',
    updatedAt: '10 mars 2024',
    version: '1.0',
    description: 'Notes de version et changements',
    versions: [
      { version: '1.0', date: '10 mars 2024', url: '/docs/release-notes-v1.0.pdf' }
    ]
  },
  {
    id: '9',
    name: 'Manuel utilisateur',
    type: 'pdf',
    createdAt: '15 fév 2024',
    updatedAt: '9 mars 2024',
    version: '2.3',
    description: 'Guide utilisateur complet',
    versions: [
      { version: '2.3', date: '9 mars 2024', url: '/docs/user-manual-v2.3.pdf' },
      { version: '2.2', date: '15 fév 2024', url: '/docs/user-manual-v2.2.pdf' }
    ]
  },
  {
    id: '10',
    name: 'Protocoles de sécurité',
    type: 'pdf',
    createdAt: '10 fév 2024',
    updatedAt: '8 mars 2024',
    version: '1.8',
    description: 'Documentation des protocoles de sécurité',
    versions: [
      { version: '1.8', date: '8 mars 2024', url: '/docs/security-protocols-v1.8.pdf' },
      { version: '1.7', date: '10 fév 2024', url: '/docs/security-protocols-v1.7.pdf' }
    ]
  },
  {
    id: '11',
    name: 'Templates API',
    type: 'folder',
    createdAt: '5 fév 2024',
    updatedAt: '7 mars 2024',
    description: 'Templates pour l\'intégration API'
  },
  {
    id: '12',
    name: 'FAQ Technique',
    type: 'pdf',
    createdAt: '1 fév 2024',
    updatedAt: '6 mars 2024',
    version: '1.2',
    description: 'Questions fréquemment posées techniques',
    versions: [
      { version: '1.2', date: '6 mars 2024', url: '/docs/faq-v1.2.pdf' },
      { version: '1.1', date: '1 fév 2024', url: '/docs/faq-v1.1.pdf' }
    ]
  }
];

export function Documents() {
  const navigate = useNavigate();

  return (
      <div className="container mx-auto py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Documents</h1>
          <button
              onClick={() => navigate('/documents/create')}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            <Plus className="h-5 w-5 mr-2" />
            Create Document
          </button>
        </div>
        <FileGrid files={documents} />
      </div>
  );
}