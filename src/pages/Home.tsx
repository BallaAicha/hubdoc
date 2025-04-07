// import React, { useState, useEffect } from 'react';
// import {
//   Mail, Phone, ExternalLink, Download, HelpCircle,
//   AlertCircle, Calendar, ChevronRight, Search,
//   Bell, Users, BookOpen, BarChart, Briefcase, Clock
// } from 'lucide-react';
// import { RecentPresentation } from '../test.ts';
// import clsx from 'clsx';
// import {useLatestDocumentVersions} from "../hooks/useLatestDocumentVersions.ts";
//
// // Données des présentations récentes
// const recentPresentations: RecentPresentation[] = [
//   {
//     id: '1',
//     title: 'Formation sur les Normes de Dev',
//     date: '15 mars 2024',
//     duration: '1h30',
//     status: 'En cours',
//     image: '/assets/presentation1.jpg',
//   },
//   {
//     id: '2',
//     title: 'Présentation des cas d\'usages de Platform',
//     date: '14 mars 2024',
//     duration: '2h00',
//     status: 'Terminé',
//     image: '/assets/presentation2.jpg',
//   },
//   {
//     id: '3',
//     title: 'Réunion Tech Lead Pour les Sujets de Stage PFE',
//     date: '13 mars 2024',
//     duration: '1h30',
//     status: 'Terminé',
//     image: '/assets/presentation3.jpg',
//   },
// ];
//
// // Documents importants
// const importantDocuments = [
//   { id: 1, title: "Normes de développement", category: "Développement", downloads: 128, updatedAt: "2024-03-10" },
//   { id: 2, title: "Guide d'intégration", category: "Onboarding", downloads: 87, updatedAt: "2024-03-15" },
//   { id: 3, title: "Nos APIs", category: "Documentation", downloads: 215, updatedAt: "2024-03-12" },
//   { id: 4, title: "Normes de sécurité", category: "Sécurité", downloads: 96, updatedAt: "2024-03-08" },
//   { id: 5, title: "Architecture hexagonale", category: "Architecture", downloads: 142, updatedAt: "2024-03-14" },
// ];
//
// // Statistiques rapides
// const quickStats = [
//   { id: 1, label: "Documents", value: "124", icon: <BookOpen className="w-5 h-5" />, color: "bg-blue-50 text-blue-600" },
//   { id: 2, label: "Présentations", value: "37", icon: <Users className="w-5 h-5" />, color: "bg-purple-50 text-purple-600" },
//   { id: 3, label: "Téléchargements", value: "1.2k", icon: <BarChart className="w-5 h-5" />, color: "bg-amber-50 text-amber-600" },
//   { id: 4, label: "Projets", value: "18", icon: <Briefcase className="w-5 h-5" />, color: "bg-emerald-50 text-emerald-600" },
// ];
//
// interface CardProps {
//   children: React.ReactNode;
//   className?: string;
//   fullWidth?: boolean;
// }
//
// const Card = ({ children, className, fullWidth = false }: CardProps) => (
//     <div className={clsx(
//         "bg-white rounded-xl shadow-sm overflow-hidden border border-neutral-200/80",
//         "transition-all duration-300 hover:shadow-md",
//         fullWidth ? "md:col-span-3" : "",
//         className
//     )}>
//       {children}
//     </div>
// );
//
// const CardHeader = ({
//                       title,
//                       icon,
//                       action
//                     }: {
//   title: string;
//   icon?: React.ReactNode;
//   action?: React.ReactNode;
// }) => (
//     <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between bg-white">
//       <div className="flex items-center gap-2">
//         {icon && <div className="text-primary-600">{icon}</div>}
//         <h2 className="text-lg font-semibold text-neutral-800">{title}</h2>
//       </div>
//       {action && <div>{action}</div>}
//     </div>
// );
//
// const Button = ({
//                   children,
//                   variant = 'text',
//                   size = 'md',
//                   className,
//                   ...props
//                 }: React.ButtonHTMLAttributes<HTMLButtonElement> & {
//   variant?: 'text' | 'outlined' | 'contained' | 'subtle';
//   size?: 'xs' | 'sm' | 'md' | 'lg';
// }) => {
//   return (
//       <button
//           className={clsx(
//               "flex items-center justify-center transition-all font-medium",
//               variant === 'text' && "text-primary-600 hover:text-primary-700 hover:bg-primary-50/50",
//               variant === 'outlined' && "border border-primary-300 text-primary-700 hover:bg-primary-50/70 rounded-lg",
//               variant === 'contained' && "bg-primary-600 text-white hover:bg-primary-700 rounded-lg shadow-sm hover:shadow",
//               variant === 'subtle' && "bg-primary-50 text-primary-700 hover:bg-primary-100 rounded-lg",
//               size === 'xs' && "text-xs gap-1 px-2 py-1",
//               size === 'sm' && "text-xs gap-1.5 px-3 py-1.5",
//               size === 'md' && "text-sm gap-2 px-4 py-2",
//               size === 'lg' && "text-base gap-2 px-5 py-2.5",
//               className
//           )}
//           {...props}
//       >
//         {children}
//       </button>
//   );
// };
//
// const StatusBadge = ({ status }: { status: string }) => {
//   return (
//       <span className={clsx(
//           "text-xs font-medium px-2.5 py-1 rounded-full",
//           status === "En cours"
//               ? "bg-primary-50 text-primary-700 border border-primary-200"
//               : "bg-emerald-50 text-emerald-700 border border-emerald-200"
//       )}>
//       {status}
//     </span>
//   );
// };
//
// // Nouveau composant pour la barre de recherche
// const SearchBar = () => (
//     <div className="relative max-w-lg w-full">
//       <div className="absolute inset-y-0 start-0 flex items-center pl-3 pointer-events-none">
//         <Search className="w-4 h-4 text-neutral-500" />
//       </div>
//       <input
//           type="search"
//           className="block w-full p-2.5 pl-10 text-sm text-neutral-800 border border-neutral-200 rounded-lg bg-neutral-50 focus:ring-primary-500 focus:border-primary-500 focus:outline-none"
//           placeholder="Rechercher des documents, présentations..."
//       />
//     </div>
// );
//
// // Nouveau composant de navigation
// const Navbar = () => (
//     <nav className="bg-white shadow-sm border-b border-neutral-200/80 fixed top-0 left-0 right-0 z-10">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16">
//           <div className="flex items-center">
//             <div className="flex-shrink-0 flex items-center">
//               <img className="h-8 w-auto" src="/logo.svg" alt="Company Logo" />
//               <span className="ml-2 text-lg font-semibold text-primary-800">PortailPro</span>
//             </div>
//             <div className="hidden md:ml-10 md:flex md:space-x-8">
//               <a href="#" className="border-primary-500 text-neutral-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
//                 Accueil
//               </a>
//               <a href="#" className="border-transparent text-neutral-500 hover:border-neutral-300 hover:text-neutral-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
//                 Documents
//               </a>
//               <a href="#" className="border-transparent text-neutral-500 hover:border-neutral-300 hover:text-neutral-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
//                 Présentations
//               </a>
//               <a href="#" className="border-transparent text-neutral-500 hover:border-neutral-300 hover:text-neutral-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
//                 Aide
//               </a>
//             </div>
//           </div>
//           <div className="flex items-center space-x-4">
//             <button className="p-1.5 rounded-full text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100">
//               <Bell className="w-5 h-5" />
//             </button>
//             <div className="ml-3 relative">
//               <div>
//                 <button className="flex text-sm rounded-full focus:outline-none">
//                   <div className="h-8 w-8 rounded-full bg-neutral-200 flex items-center justify-center text-neutral-700 font-medium">
//                     UT
//                   </div>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </nav>
// );
//
// export function Home() {
//   const [loading, setLoading] = useState(true);
//
//   const { data: documents, isLoading } = useLatestDocumentVersions();
//
//
//   // Simuler un chargement initial pour une transition fluide
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setLoading(false);
//     }, 800);
//
//     return () => clearTimeout(timer);
//   }, []);
//
//   if (loading) {
//     return (
//         <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
//           <div className="text-center">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-700 mx-auto"></div>
//             <p className="mt-4 text-neutral-600">Chargement de votre portail...</p>
//           </div>
//         </div>
//     );
//   }
//
//   return (
//       <div className="min-h-screen bg-neutral-50">
//         <Navbar />
//
//         {/* En-tête Principal avec dégradé */}
//         <header className="bg-gradient-to-r from-primary-700 via-primary-600 to-primary-500 pt-24 pb-32 px-6">
//           <div className="max-w-7xl mx-auto">
//             <div className="flex flex-col md:flex-row md:items-center md:justify-between">
//               <div className="mb-8 md:mb-0">
//                 <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black">
//                   Bienvenue sur votre Portail
//                 </h1>
//                 <p className="mt-4 text-lg md:text-xl text-black/90 max-w-2xl font-light">
//                   Accédez aux documents, présentations et ressources pour optimiser vos processus.
//                 </p>
//               </div>
//               <SearchBar />
//             </div>
//           </div>
//         </header>
//
//         {/* Statistiques rapides */}
//         <div className="max-w-7xl mx-auto px-4 -mt-16">
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//             {quickStats.map((stat) => (
//                 <div
//                     key={stat.id}
//                     className="bg-white rounded-xl shadow overflow-hidden flex items-center p-6 transform transition-all hover:-translate-y-1 hover:shadow-md"
//                 >
//                   <div className={`${stat.color} p-3 rounded-lg`}>
//                     {stat.icon}
//                   </div>
//                   <div className="ml-4">
//                     <p className="text-sm font-medium text-neutral-500">{stat.label}</p>
//                     <p className="text-2xl font-bold text-neutral-800">{stat.value}</p>
//                   </div>
//                 </div>
//             ))}
//           </div>
//         </div>
//
//         {/* Notification principale */}
//         <div className="max-w-7xl mx-auto px-4 mt-8">
//           <div className="bg-white border-l-4 border-amber-500 text-neutral-700 p-5 rounded-lg flex items-center gap-4 mb-8 shadow-sm">
//             <AlertCircle className="w-6 h-6 text-amber-500 flex-shrink-0" />
//             <div>
//               <p className="font-medium">Information importante</p>
//               <p className="text-neutral-600">
//                 Merci de consulter la <span className="font-medium text-primary-700">base de connaissance</span> pour découvrir la procédure en cours pour votre intégration.
//               </p>
//             </div>
//           </div>
//         </div>
//
//         {/* Contenu Principal */}
//         <div className="max-w-7xl mx-auto px-4 mb-16">
//           {/* Grille de contenu principale */}
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
//             {/* Documents */}
//             <Card className="lg:col-span-2">
//               <CardHeader
//                   title="Documents Récents"
//                   icon={<BookOpen className="w-5 h-5" />}
//                   action={
//                     <Button variant="subtle" size="sm">
//                       Voir tout
//                     </Button>
//                   }
//               />
//               <div className="p-6">
//                 <div className="overflow-x-auto">
//                   <table className="min-w-full">
//                     <thead className="bg-neutral-50/80">
//                     <tr>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Document</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Catégorie</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Téléchargements</th>
//                       <th className="px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">Action</th>
//                     </tr>
//                     </thead>
//                     <tbody className="divide-y divide-neutral-200 bg-white">
//                     {importantDocuments.map((doc) => (
//                         <tr key={doc.id} className="hover:bg-neutral-50 transition-colors">
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             <div className="flex flex-col">
//                               <span className="text-neutral-800 font-medium">{doc.title}</span>
//                               <span className="text-xs text-neutral-500">Mis à jour le {doc.updatedAt}</span>
//                             </div>
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap">
//                           <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-800">
//                             {doc.category}
//                           </span>
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap text-neutral-500 text-sm">
//                             {doc.downloads}
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap text-right">
//                             <Button variant="outlined" size="sm">
//                               <Download className="w-4 h-4" />
//                               Télécharger
//                             </Button>
//                           </td>
//                         </tr>
//                     ))}
//                     </tbody>
//                   </table>
//                 </div>
//                 <div className="mt-6 pt-6 border-t border-neutral-100 flex justify-center">
//                   <Button variant="contained">
//                     Explorer tous les documents
//                     <ChevronRight className="w-4 h-4" />
//                   </Button>
//                 </div>
//               </div>
//             </Card>
import React, { useState, useEffect } from 'react';
import {

  AlertCircle,  Search,
  Bell, BookOpen
} from 'lucide-react';
import clsx from 'clsx';
import { useLatestDocumentVersions } from "../hooks/useLatestDocumentVersions.ts";

import { Document } from "../types/index.ts";


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

const Navbar = () => (
    <nav className="bg-white shadow-sm border-b border-neutral-200/80 fixed top-0 left-0 right-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <img className="h-8 w-auto" src="/logo.svg" alt="Logo" />
            <span className="ml-2 text-lg font-semibold text-primary-800">PortailPro</span>
          </div>
          <div className="flex items-center">
            <button className="p-1.5 rounded-full text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100">
              <Bell className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
);

interface Presentation {
  id: string;
  title: string;
  date: string;
  duration: string;
  status: "En cours" | "Terminé";
}

const recentPresentations: Presentation[] = [
  {
    id: '1',
    title: 'Présentation React',
    date: '12 Juin 2024',
    duration: '1h 30min',
    status: 'En cours'
  },
  {
    id: '2',
    title: 'Présentation Redux',
    date: '10 Juin 2024',
    duration: '2h',
    status: 'Terminé'
  }
];

const StatusBadge = ({ status }: { status: string }) => (
    <span
        className={clsx(
            "px-2 py-1 text-xs font-semibold rounded-full",
            status === "En cours" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
        )}
    >
    {status}
  </span>
);

export function Home() {
  const [loading, setLoading] = useState(true);
  const { data: documents = [], isLoading } = useLatestDocumentVersions();

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

        <header className="bg-gradient-to-r from-primary-700 via-primary-600 to-primary-500 pt-24 pb-32 px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between">
            <h1 className="text-3xl font-bold text-black">Bienvenue sur votre Portail</h1>
            <SearchBar />
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 mt-8 space-y-8">

          <div className="bg-white border-l-4 border-amber-500 text-neutral-700 p-5 rounded-lg flex items-center gap-4 shadow-sm">
            <AlertCircle className="w-6 h-6 text-amber-500" />
            <p>Consultez la base de connaissance pour votre intégration.</p>
          </div>

          <Card>
            <CardHeader title="Documents Récents" icon={<BookOpen className="w-5 h-5" />} />
            <div className="p-6">
              {isLoading ? (
                  <p>Chargement des documents...</p>
              ) : (
                  documents.length > 0 ? (
                      <ul>
                        {documents.map((doc: Document) => (
                            <li key={doc.id} className="mb-4">
                              <p className="font-semibold">{doc.name}</p>
                            </li>
                        ))}
                      </ul>
                  ) : (
                      <p className="text-gray-500">Aucun document récent disponible.</p>
                  )
              )}
            </div>
          </Card>

          {/* Continuez avec les autres éléments tels que Centre d'aide, Présentations récentes, Section d'assistance et Footer existants dans votre code original sans modification */}

        </div>

        {/* Footer existant sans modification */}
      </div>
  );
}