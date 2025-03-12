export interface FileVersion {
  version: string;
  date: string;
  url: string;
}

// types/index.ts
export interface FileItem {
  id: string;
  name: string;
  type: 'pdf' | 'folder'; // Décrit si c'est un fichier ou un dossier
  createdAt: string;
  updatedAt: string;
  description: string;
  version?: string; // Optionnel : utilisé uniquement pour les fichiers
  versions?: Array<{ version: string; date: string; url: string }>; // Versions d'un fichier
  children?: FileItem[]; // Optionnel : uniquement présent pour les dossiers
}
export interface RecentPresentation {
  id: string;
  title: string;
  date: string;
  duration: string;
  status: string;
}