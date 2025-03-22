import React, { useState, useEffect } from 'react';
import {
  Mail, Phone, ExternalLink, Download, HelpCircle,
  AlertCircle, Calendar, ChevronRight, Search,
  Bell, Users, BookOpen, BarChart, Briefcase, Clock
} from 'lucide-react';
import { RecentPresentation } from '../test.ts';
import clsx from 'clsx';

// Données des présentations récentes
const recentPresentations: RecentPresentation[] = [
  {
    id: '1',
    title: 'Formation sur les Normes de Dev',
    date: '15 mars 2024',
    duration: '1h30',
    status: 'En cours',
    image: '/assets/presentation1.jpg',
  },
  {
    id: '2',
    title: 'Présentation des cas d\'usages de Platform',
    date: '14 mars 2024',
    duration: '2h00',
    status: 'Terminé',
    image: '/assets/presentation2.jpg',
  },
  {
    id: '3',
    title: 'Réunion Tech Lead Pour les Sujets de Stage PFE',
    date: '13 mars 2024',
    duration: '1h30',
    status: 'Terminé',
    image: '/assets/presentation3.jpg',
  },
];

// Documents importants
const importantDocuments = [
  { id: 1, title: "Normes de développement", category: "Développement", downloads: 128, updatedAt: "2024-03-10" },
  { id: 2, title: "Guide d'intégration", category: "Onboarding", downloads: 87, updatedAt: "2024-03-15" },
  { id: 3, title: "Nos APIs", category: "Documentation", downloads: 215, updatedAt: "2024-03-12" },
  { id: 4, title: "Normes de sécurité", category: "Sécurité", downloads: 96, updatedAt: "2024-03-08" },
  { id: 5, title: "Architecture hexagonale", category: "Architecture", downloads: 142, updatedAt: "2024-03-14" },
];

// Statistiques rapides
const quickStats = [
  { id: 1, label: "Documents", value: "124", icon: <BookOpen className="w-5 h-5" />, color: "bg-blue-50 text-blue-600" },
  { id: 2, label: "Présentations", value: "37", icon: <Users className="w-5 h-5" />, color: "bg-purple-50 text-purple-600" },
  { id: 3, label: "Téléchargements", value: "1.2k", icon: <BarChart className="w-5 h-5" />, color: "bg-amber-50 text-amber-600" },
  { id: 4, label: "Projets", value: "18", icon: <Briefcase className="w-5 h-5" />, color: "bg-emerald-50 text-emerald-600" },
];

interface CardProps {
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
}

const Card = ({ children, className, fullWidth = false }: CardProps) => (
    <div className={clsx(
        "bg-white rounded-xl shadow-sm overflow-hidden border border-neutral-200/80",
        "transition-all duration-300 hover:shadow-md",
        fullWidth ? "md:col-span-3" : "",
        className
    )}>
      {children}
    </div>
);

const CardHeader = ({
                      title,
                      icon,
                      action
                    }: {
  title: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}) => (
    <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between bg-white">
      <div className="flex items-center gap-2">
        {icon && <div className="text-primary-600">{icon}</div>}
        <h2 className="text-lg font-semibold text-neutral-800">{title}</h2>
      </div>
      {action && <div>{action}</div>}
    </div>
);

const Button = ({
                  children,
                  variant = 'text',
                  size = 'md',
                  className,
                  ...props
                }: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'text' | 'outlined' | 'contained' | 'subtle';
  size?: 'xs' | 'sm' | 'md' | 'lg';
}) => {
  return (
      <button
          className={clsx(
              "flex items-center justify-center transition-all font-medium",
              variant === 'text' && "text-primary-600 hover:text-primary-700 hover:bg-primary-50/50",
              variant === 'outlined' && "border border-primary-300 text-primary-700 hover:bg-primary-50/70 rounded-lg",
              variant === 'contained' && "bg-primary-600 text-white hover:bg-primary-700 rounded-lg shadow-sm hover:shadow",
              variant === 'subtle' && "bg-primary-50 text-primary-700 hover:bg-primary-100 rounded-lg",
              size === 'xs' && "text-xs gap-1 px-2 py-1",
              size === 'sm' && "text-xs gap-1.5 px-3 py-1.5",
              size === 'md' && "text-sm gap-2 px-4 py-2",
              size === 'lg' && "text-base gap-2 px-5 py-2.5",
              className
          )}
          {...props}
      >
        {children}
      </button>
  );
};

const StatusBadge = ({ status }: { status: string }) => {
  return (
      <span className={clsx(
          "text-xs font-medium px-2.5 py-1 rounded-full",
          status === "En cours"
              ? "bg-primary-50 text-primary-700 border border-primary-200"
              : "bg-emerald-50 text-emerald-700 border border-emerald-200"
      )}>
      {status}
    </span>
  );
};

// Nouveau composant pour la barre de recherche
const SearchBar = () => (
    <div className="relative max-w-lg w-full">
      <div className="absolute inset-y-0 start-0 flex items-center pl-3 pointer-events-none">
        <Search className="w-4 h-4 text-neutral-500" />
      </div>
      <input
          type="search"
          className="block w-full p-2.5 pl-10 text-sm text-neutral-800 border border-neutral-200 rounded-lg bg-neutral-50 focus:ring-primary-500 focus:border-primary-500 focus:outline-none"
          placeholder="Rechercher des documents, présentations..."
      />
    </div>
);

// Nouveau composant de navigation
const Navbar = () => (
    <nav className="bg-white shadow-sm border-b border-neutral-200/80 fixed top-0 left-0 right-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <img className="h-8 w-auto" src="/logo.svg" alt="Company Logo" />
              <span className="ml-2 text-lg font-semibold text-primary-800">PortailPro</span>
            </div>
            <div className="hidden md:ml-10 md:flex md:space-x-8">
              <a href="#" className="border-primary-500 text-neutral-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Accueil
              </a>
              <a href="#" className="border-transparent text-neutral-500 hover:border-neutral-300 hover:text-neutral-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Documents
              </a>
              <a href="#" className="border-transparent text-neutral-500 hover:border-neutral-300 hover:text-neutral-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Présentations
              </a>
              <a href="#" className="border-transparent text-neutral-500 hover:border-neutral-300 hover:text-neutral-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Aide
              </a>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-1.5 rounded-full text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100">
              <Bell className="w-5 h-5" />
            </button>
            <div className="ml-3 relative">
              <div>
                <button className="flex text-sm rounded-full focus:outline-none">
                  <div className="h-8 w-8 rounded-full bg-neutral-200 flex items-center justify-center text-neutral-700 font-medium">
                    UT
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
);

export function Home() {
  const [loading, setLoading] = useState(true);

  // Simuler un chargement initial pour une transition fluide
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
        <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-700 mx-auto"></div>
            <p className="mt-4 text-neutral-600">Chargement de votre portail...</p>
          </div>
        </div>
    );
  }

  return (
      <div className="min-h-screen bg-neutral-50">
        <Navbar />

        {/* En-tête Principal avec dégradé */}
        <header className="bg-gradient-to-r from-primary-700 via-primary-600 to-primary-500 pt-24 pb-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="mb-8 md:mb-0">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black">
                  Bienvenue sur votre Portail
                </h1>
                <p className="mt-4 text-lg md:text-xl text-black/90 max-w-2xl font-light">
                  Accédez aux documents, présentations et ressources pour optimiser vos processus.
                </p>
              </div>
              <SearchBar />
            </div>
          </div>
        </header>

        {/* Statistiques rapides */}
        <div className="max-w-7xl mx-auto px-4 -mt-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickStats.map((stat) => (
                <div
                    key={stat.id}
                    className="bg-white rounded-xl shadow overflow-hidden flex items-center p-6 transform transition-all hover:-translate-y-1 hover:shadow-md"
                >
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    {stat.icon}
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-neutral-500">{stat.label}</p>
                    <p className="text-2xl font-bold text-neutral-800">{stat.value}</p>
                  </div>
                </div>
            ))}
          </div>
        </div>

        {/* Notification principale */}
        <div className="max-w-7xl mx-auto px-4 mt-8">
          <div className="bg-white border-l-4 border-amber-500 text-neutral-700 p-5 rounded-lg flex items-center gap-4 mb-8 shadow-sm">
            <AlertCircle className="w-6 h-6 text-amber-500 flex-shrink-0" />
            <div>
              <p className="font-medium">Information importante</p>
              <p className="text-neutral-600">
                Merci de consulter la <span className="font-medium text-primary-700">base de connaissance</span> pour découvrir la procédure en cours pour votre intégration.
              </p>
            </div>
          </div>
        </div>

        {/* Contenu Principal */}
        <div className="max-w-7xl mx-auto px-4 mb-16">
          {/* Grille de contenu principale */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Documents */}
            <Card className="lg:col-span-2">
              <CardHeader
                  title="Documents Importants"
                  icon={<BookOpen className="w-5 h-5" />}
                  action={
                    <Button variant="subtle" size="sm">
                      Voir tout
                    </Button>
                  }
              />
              <div className="p-6">
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-neutral-50/80">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Document</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Catégorie</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Téléchargements</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">Action</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200 bg-white">
                    {importantDocuments.map((doc) => (
                        <tr key={doc.id} className="hover:bg-neutral-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex flex-col">
                              <span className="text-neutral-800 font-medium">{doc.title}</span>
                              <span className="text-xs text-neutral-500">Mis à jour le {doc.updatedAt}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-800">
                            {doc.category}
                          </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-neutral-500 text-sm">
                            {doc.downloads}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <Button variant="outlined" size="sm">
                              <Download className="w-4 h-4" />
                              Télécharger
                            </Button>
                          </td>
                        </tr>
                    ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-6 pt-6 border-t border-neutral-100 flex justify-center">
                  <Button variant="contained">
                    Explorer tous les documents
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>

            {/* Centre d'Aide */}
            <Card>
              <CardHeader
                  title="Centre d'Aide"
                  icon={<HelpCircle className="w-5 h-5" />}
              />
              <div className="p-6">
                <div className="space-y-4">
                  <button className="w-full flex items-center gap-4 p-4 rounded-lg hover:bg-neutral-50 transition-colors text-neutral-800 border border-neutral-200 group">
                    <div className="w-12 h-12 rounded-full bg-primary-50 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-100 transition-colors">
                      <HelpCircle className="w-6 h-6 text-primary-600" />
                    </div>
                    <div className="text-left">
                      <span className="font-medium block mb-1">Foire aux questions</span>
                      <span className="text-sm text-neutral-500">Réponses rapides à vos questions</span>
                    </div>
                  </button>

                  <button className="w-full flex items-center gap-4 p-4 rounded-lg hover:bg-neutral-50 transition-colors text-neutral-800 border border-neutral-200 group">
                    <div className="w-12 h-12 rounded-full bg-primary-50 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-100 transition-colors">
                      <Phone className="w-6 h-6 text-primary-600" />
                    </div>
                    <div className="text-left">
                      <span className="font-medium block mb-1">Contacter le support</span>
                      <span className="text-sm text-neutral-500">Assistance technique disponible 24/7</span>
                    </div>
                  </button>

                  <button className="w-full flex items-center gap-4 p-4 rounded-lg hover:bg-neutral-50 transition-colors text-neutral-800 border border-neutral-200 group">
                    <div className="w-12 h-12 rounded-full bg-primary-50 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-100 transition-colors">
                      <Mail className="w-6 h-6 text-primary-600" />
                    </div>
                    <div className="text-left">
                      <span className="font-medium block mb-1">Nous contacter</span>
                      <span className="text-sm text-neutral-500">contact@pi-becon.com</span>
                    </div>
                  </button>
                </div>
                <div className="mt-6 pt-4 border-t border-neutral-100 flex justify-center">
                  <Button variant="text">
                    Voir toutes les ressources
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Présentations Récentes */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-neutral-800">Présentations Récentes</h2>
              <Button variant="outlined">
                Voir toutes
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentPresentations.map((presentation) => (
                  <div
                      key={presentation.id}
                      className="bg-white rounded-xl overflow-hidden shadow-sm border border-neutral-200 hover:shadow-md transition-all flex flex-col"
                  >
                    <div className="h-48 bg-neutral-100 overflow-hidden">
                      <div className="h-full w-full bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center text-primary-900/20">
                        <Calendar className="w-16 h-16" />
                      </div>
                    </div>
                    <div className="p-6 flex-grow">
                      <h3 className="font-semibold text-lg text-neutral-800 mb-2">{presentation.title}</h3>
                      <div className="flex items-center text-sm text-neutral-500 mb-4">
                        <Clock className="w-4 h-4 mr-2" />
                        <span>{presentation.date}</span>
                        <span className="mx-2 text-neutral-300">•</span>
                        <span>{presentation.duration}</span>
                      </div>
                    </div>
                    <div className="px-6 py-4 border-t border-neutral-100 bg-neutral-50 flex items-center justify-between">
                      <StatusBadge status={presentation.status} />
                      {presentation.status === "En cours" && (
                          <Button variant="contained" size="sm">
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>Rejoindre</span>
                          </Button>
                      )}
                      {presentation.status === "Terminé" && (
                          <Button variant="outlined" size="sm">
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>Replay</span>
                          </Button>
                      )}
                    </div>
                  </div>
              ))}
            </div>
          </div>

          {/* Section de mise en avant */}
          <Card fullWidth>
            <div className="p-8 bg-gradient-to-r from-primary-600 to-primary-700 text-black rounded-xl">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="mb-6 md:mb-0 md:mr-8">
                  <h2 className="text-2xl font-bold mb-2">Besoin d'assistance supplémentaire?</h2>
                  <p className="opacity-90 mb-6">Notre équipe est disponible pour vous aider dans votre intégration et votre utilisation de la plateforme</p>
                  <Button
                      variant="outlined"
                      className="border-white text-black hover:bg-white/20"
                  >
                    Prendre rendez-vous
                  </Button>
                </div>
                <div className="w-40 h-40 bg-white/10 rounded-full flex items-center justify-center">
                  <Users className="w-20 h-20 text-white/70" />
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Footer */}
        <footer className="bg-neutral-800 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                  <div className="flex items-center space-x-3 mb-6">
                    <img
                        src="/src/logo.jpeg"
                        alt="Logo"
                        className="h-8 w-auto bg-white rounded-md p-1"
                    />
                    <span className="font-bold text-xl">DOC HUB</span>
                  </div>
                  <p className="text-neutral-400 mb-4">
                    Plateforme de documentation et de génération de projets pour développeurs.
                  </p>
                  <div className="flex space-x-4">
                    <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                      <span className="sr-only">Twitter</span>
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                    <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                      <span className="sr-only">GitHub</span>
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                      <span className="sr-only">LinkedIn</span>
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-white text-lg mb-4">Produit</h3>
                  <ul className="space-y-3">
                    <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Caractéristiques</a></li>
                    <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Tarification</a></li>
                    <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Démo</a></li>
                    <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Roadmap</a></li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-white text-lg mb-4">Documentation</h3>
                  <ul className="space-y-3">
                    <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Guides</a></li>
                    <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">API Reference</a></li>
                    <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Tutoriels</a></li>
                    <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Exemples</a></li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-white text-lg mb-4">Entreprise</h3>
                  <ul className="space-y-3">
                    <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">À propos</a></li>
                    <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Blog</a></li>
                    <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Carrières</a></li>
                    <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Contact</a></li>
                  </ul>
                </div>
              </div>

              <div className="border-t border-neutral-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
                <p className="text-neutral-400 text-sm">
                  &copy; {new Date().getFullYear()} DOC HUB. Tous droits réservés.
                </p>
                <div className="flex space-x-6 mt-4 md:mt-0">
                  <a href="#" className="text-neutral-400 hover:text-white text-sm transition-colors">
                    Confidentialité
                  </a>
                  <a href="#" className="text-neutral-400 hover:text-white text-sm transition-colors">
                    Conditions d'utilisation
                  </a>
                  <a href="#" className="text-neutral-400 hover:text-white text-sm transition-colors">
                    Mentions légales
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
  );
}