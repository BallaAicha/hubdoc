import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileItem } from '../types';
import {
  Plus,
  FileText,
  Book,
  Code,
  Terminal,
  ArrowRight,
  ChevronRight,
  Rocket,
  ShieldCheck,
  Zap
} from 'lucide-react';
import clsx from 'clsx';

// Enrichissement des guides avec de meilleures descriptions
const quickStartGuides: FileItem[] = [
  {
    id: 'guide-installation',
    name: "Guide d'installation API",
    description: "Configuration complète de l'environnement, prérequis système et procédures de déploiement pas à pas",
    type: 'markdown',
    createdAt: '2024-03-01',
    updatedAt: '2024-04-15',
    icon: Book,
  },
  {
    id: 'nos-apis',
    name: 'Documentation des APIs',
    description: "Référence technique complète de tous les endpoints, formats de requêtes/réponses et exemples d'intégration",
    type: 'api',
    createdAt: '2024-03-01',
    updatedAt: '2024-04-18',
    icon: Code,
  }
];

// Enrichissement avec un guide supplémentaire
const popularDocs: FileItem[] = [
  {
    id: 'securite',
    name: 'Sécurité & Authentification',
    description: "Bonnes pratiques, OAuth 2.0, tokens JWT et protection des données sensibles",
    type: 'markdown',
    createdAt: '2024-03-10',
    updatedAt: '2024-04-12',
    icon: ShieldCheck,
  },
  {
    id: 'performances',
    name: 'Optimisation & Performance',
    description: "Techniques de mise en cache, compression et bonnes pratiques pour maximiser les performances",
    type: 'markdown',
    createdAt: '2024-03-15',
    updatedAt: '2024-04-10',
    icon: Zap,
  }
];

// Fonctionnalités principales améliorées
const features = [
  {
    title: 'Génération de projet',
    description: 'Créez un nouveau projet Spring Boot en quelques clics avec une configuration optimisée pour la production',
    icon: Terminal,
    color: 'bg-primary-600',
  },
  {
    title: 'Documentation interactive',
    description: 'Guides complets, exemples de code et sandbox pour tester les APIs en temps réel',
    icon: Book,
    color: 'bg-secondary-600',
  },
  {
    title: 'APIs RESTful évolutives',
    description: 'Architecture moderne, sécurisée et hautement scalable pour vos services distribués',
    icon: Code,
    color: 'bg-info',
  },
];

function FeatureCard({ feature }: { feature: typeof features[0] }) {
  const Icon = feature.icon;

  return (
      <div className="bg-white rounded-xl p-6 border border-neutral-200 shadow-sm hover:shadow-md transition-all duration-300 group h-full">
        <div className={clsx(
            "p-3 rounded-xl inline-flex mb-4 text-white transition-transform duration-300 group-hover:scale-110",
            feature.color
        )}>
          <Icon className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-semibold text-neutral-800 mb-2">{feature.title}</h3>
        <p className="text-neutral-600 leading-relaxed">{feature.description}</p>
      </div>
  );
}

function GuideCard({ guide }: { guide: FileItem }) {
  const navigate = useNavigate();
  const Icon = guide.icon || FileText;

  // Format date nicely
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  return (
      <div
          onClick={() =>
              navigate(guide.type === 'markdown' || guide.type === 'api' ? `/guide/${guide.id}` : '#')
          }
          className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer border border-neutral-200 hover:border-primary-500"
      >
        <div className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-primary-50 rounded-lg group-hover:bg-primary-100 transition-colors">
              <Icon className="w-5 h-5 text-primary-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-neutral-800 group-hover:text-primary-600 transition-colors">
                {guide.name}
              </h3>
              <p className="text-sm text-neutral-500">
                Mis à jour le {formatDate(guide.updatedAt)}
              </p>
            </div>
            <div className="w-8 h-8 rounded-full bg-neutral-100 group-hover:bg-primary-100 flex items-center justify-center transition-colors">
              <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-primary-600 transition-colors" />
            </div>
          </div>
          <p className="text-neutral-600 line-clamp-2">{guide.description}</p>
        </div>
      </div>
  );
}

function StatCard({ icon: Icon, value, label }: { icon: any, value: string, label: string }) {
  return (
      <div className="bg-white rounded-xl p-6 border border-neutral-200 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary-50 rounded-lg">
            <Icon className="w-5 h-5 text-primary-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-neutral-800">{value}</p>
            <p className="text-sm text-neutral-500">{label}</p>
          </div>
        </div>
      </div>
  );
}

export function QuickStart() {
  const navigate = useNavigate();

  return (
      <div className="min-h-screen bg-neutral-50">
        {/* Hero section avec gradient amélioré */}
        <div className="bg-gradient-to-r from-primary-800 via-primary-700 to-primary-600 text-black relative overflow-hidden">
          {/* Formes décoratives */}
          <div className="absolute inset-0 overflow-hidden opacity-10">
            <div className="absolute -left-20 -top-20 w-64 h-64 rounded-full bg-white"></div>
            <div className="absolute right-10 bottom-10 w-80 h-80 rounded-full bg-white"></div>
            <div className="absolute left-1/3 top-1/4 w-40 h-40 rounded-full bg-white"></div>
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 text-black mb-4 text-sm font-medium backdrop-blur-sm">
                    <Rocket className="w-4 h-4 mr-2" />
                    Démarrez rapidement
                  </div>
                  <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
                    Accélérez votre <br className="hidden md:inline" />
                    <span className="text-secondary-100">développement</span>
                  </h1>
                  <p className="text-xl text-black/90 leading-relaxed max-w-xl">
                    Nos outils et guides optimisés vous permettent de passer de l'idée à la production en un temps record, avec une qualité industrielle.
                  </p>
                </div>

                <button
                    onClick={() => navigate('/generate-spring-project')}
                    className="flex items-center gap-3 py-3.5 px-7 bg-white text-primary-700 font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group whitespace-nowrap"
                >
                  <Plus className="w-5 h-5" />
                  <span>Générer un projet Spring</span>
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>

              {/* Stats cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
                <StatCard icon={Terminal} value="2 min" label="Temps de génération d'un projet" />
                <StatCard icon={Code} value="25+" label="APIs documentées" />
                <StatCard icon={Book} value="10+" label="Guides techniques" />
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-10">
          <div className="max-w-7xl mx-auto">
            {/* Features section */}
            <div className="mb-16">
              <div className="flex justify-between items-end mb-8">
                <h2 className="text-2xl font-semibold text-neutral-800">Fonctionnalités principales</h2>
                <a className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1 text-sm">
                  <span>Toutes les fonctionnalités</span>
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature, index) => (
                    <FeatureCard key={index} feature={feature} />
                ))}
              </div>
            </div>

            {/* Documentation section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-white rounded-2xl p-8 border border-neutral-200 shadow-sm">
                <h2 className="text-2xl font-semibold text-neutral-800 mb-8 flex items-center">
                  <Book className="w-5 h-5 mr-2 text-primary-600" />
                  Guides essentiels
                </h2>
                <div className="grid grid-cols-1 gap-6">
                  {quickStartGuides.map((guide) => (
                      <GuideCard key={guide.id} guide={guide} />
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 border border-neutral-200 shadow-sm">
                <h2 className="text-2xl font-semibold text-neutral-800 mb-8 flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-secondary-600" />
                  Documentation populaire
                </h2>
                <div className="grid grid-cols-1 gap-6">
                  {popularDocs.map((doc) => (
                      <GuideCard key={doc.id} guide={doc} />
                  ))}
                </div>

                <button
                    onClick={() => navigate('/documents')}
                    className="mt-6 w-full py-3 px-4 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <span>Voir toute la documentation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}