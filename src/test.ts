// types/index.ts
export interface FileVersion {
  version: string;
  date: string;
  url: string;
}

export interface FileItem {
    size: any;
  id: string;
  name: string;
  type: 'pdf' | 'folder' | 'markdown'  | 'api'; // Ajout de 'markdown' pour représenter un fichier Markdown
  createdAt: string;
  updatedAt: string;
  description: string;
  version?: string; // Optionnel : utilisé uniquement pour les fichiers versionnés
  versions?: Array<FileVersion>; // Versions d'un fichier (PDF ou autre)
  children?: FileItem[]; // Optionnel : uniquement présent pour les dossiers
    icon?: React.ComponentType; // Icône associée au fichier,
  readTime : string;
  complexity : string;
}

export interface RecentPresentation {
  id: string;
  title: string;
  date: string;
  duration: string;
  status: string;
}