import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileItem } from '../types';
import { Plus, Folder, FileText } from 'lucide-react';

const quickStartGuides: FileItem[] = [
  {
    id: 'qs1',
    name: "Guide d'installation API",
    type: 'pdf',
    createdAt: '2024-03-01',
    updatedAt: '2024-03-01',
  },
  {
    id: 'qs2',
    name: 'Configuration Sandbox',
    type: 'pdf',
    createdAt: '2024-03-01',
    updatedAt: '2024-03-01',
  },
  {
    id: 'qs3',
    name: 'Documentation API REST',
    type: 'folder',
    createdAt: '2024-03-01',
    updatedAt: '2024-03-01',
  },
  {
    id: 'qs4',
    name: 'Exemples d’intégration',
    type: 'folder',
    createdAt: '2024-03-01',
    updatedAt: '2024-03-01',
  },
];

export function QuickStart() {
  const navigate = useNavigate();

  const handleGenerateSpringProject = () => {
    navigate('/generate-spring-project');
  };

  return (
      <main className="min-h-screen bg-gradient-to-br from-[#e9041e] via-gray-100 to-gray-50 py-12">
        <div className="container mx-auto px-6 max-w-5xl">
          {/* En-tête */}
          <header className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white">Démarrage rapide</h1>
              <p className="text-gray-200 mt-2">
                Suivez nos guides pour démarrer rapidement avec nos APIs et outils.
              </p>
            </div>
            <button
                onClick={handleGenerateSpringProject}
                className="flex items-center gap-2 py-2 px-4 bg-[#e9041e] text-white font-medium text-sm rounded-lg shadow-md hover:bg-[#d1031b] focus:outline-none focus:ring focus:ring-orange-400"
            >
              <Plus className="w-5 h-5" />
              Générer un projet Spring
            </button>
          </header>

          {/* Liste des guides */}
          <section>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {quickStartGuides.map((guide) => (
                  <div
                      key={guide.id}
                      className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:bg-gray-50 transition-shadow cursor-pointer"
                      onClick={() => navigate(guide.type === 'folder' ? `/documents/${guide.id}` : `#`)}
                  >
                    {/* Icône */}
                    {guide.type === 'folder' ? (
                        <Folder className="w-6 h-6 text-orange-500" />
                    ) : (
                        <FileText className="w-6 h-6 text-blue-500" />
                    )}

                    {/* Contenu */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-800">{guide.name}</h3>
                      <p className="text-sm text-gray-500">Mis à jour : {guide.updatedAt}</p>
                    </div>
                  </div>
              ))}
            </div>
          </section>
        </div>
      </main>
  );
}