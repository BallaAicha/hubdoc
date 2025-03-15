import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileItem } from '../types';
import { Plus, FileText, Book, Code, Terminal, ArrowRight } from 'lucide-react';

const quickStartGuides: FileItem[] = [
  {
    id: 'guide-installation',
    name: "Guide d'installation API",
    description: "Apprenez à configurer et installer nos APIs étape par étape",
    type: 'markdown',
    createdAt: '2024-03-01',
    updatedAt: '2024-03-01',
    icon: Book,
  },
  {
    id: 'nos-apis',
    name: 'Nos APIs',
    description: "Documentation complète de nos endpoints et services",
    type: 'api',
    createdAt: '2024-03-01',
    updatedAt: '2024-03-01',
    icon: Code,
  }
];

const features = [
  {
    title: 'Génération de projet',
    description: 'Créez un nouveau projet Spring Boot en quelques clics',
    icon: Terminal,
  },
  {
    title: 'Documentation détaillée',
    description: 'Guides complets et exemples de code',
    icon: Book,
  },
  {
    title: 'APIs RESTful',
    description: 'Intégration simple avec des APIs modernes',
    icon: Code,
  },
];

function FeatureCard({ feature }: { feature: typeof features[0] }) {
  const Icon = feature.icon;

  return (
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <div className="p-3 bg-red-50 rounded-lg w-fit mb-4">
          <Icon className="w-6 h-6 text-[#e9041e]" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3> {/* Noir */}
        <p className="text-gray-700">{feature.description}</p> {/* Noir */}
      </div>
  );
}

function GuideCard({ guide }: { guide: FileItem }) {
  const navigate = useNavigate();
  const Icon = guide.icon || FileText;

  return (
      <div
          onClick={() =>
              navigate(guide.type === 'markdown' || guide.type === 'api' ? `/guide/${guide.id}` : '#')
          }
          className="group relative bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer border border-gray-100"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#e9041e]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-red-50 rounded-lg">
              <Icon className="w-6 h-6 text-[#e9041e]" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#e9041e] transition-colors">
                {guide.name}
              </h3>
              <p className="text-sm text-gray-500">
                Mis à jour le {new Date(guide.updatedAt).toLocaleDateString('fr-FR')}
              </p>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#e9041e] group-hover:translate-x-1 transition-all" />
          </div>
          <p className="text-gray-600">{guide.description}</p>
        </div>
      </div>
  );
}

export function QuickStart() {
  const navigate = useNavigate();

  return (
      <main className="min-h-screen bg-gradient-to-br from-[#e9041e] via-gray-100 to-gray-50">
        <div className="relative">
          <div className="container mx-auto px-6 max-w-7xl py-16">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16">
              <div className="max-w-2xl">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Démarrage rapide</h1>
                <p className="text-xl text-gray-700 leading-relaxed">
                  Accélérez votre développement avec nos outils et guides optimisés pour une intégration rapide et efficace.
                </p>
              </div>

              <button
                  onClick={() => navigate('/generate-spring-project')}
                  className="flex items-center gap-3 py-3 px-6 bg-[#e9041e] text-white font-semibold rounded-lg shadow-lg hover:bg-red-600 transition-all duration-300 group"
              >
                <Plus className="w-5 h-5" />
                Générer un projet Spring
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {features.map((feature, index) => (
                  <FeatureCard key={index} feature={feature} />
              ))}
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h2 className="text-2xl font-semibold text-gray-900 mb-8">Guides et Documentation</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {quickStartGuides.map((guide) => (
                    <GuideCard key={guide.id} guide={guide} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
  );
}