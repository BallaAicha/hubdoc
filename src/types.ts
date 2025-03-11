export interface FileVersion {
  version: string;
  date: string;
  url: string;
}

export interface FileItem {
  id: string;
  name: string;
  type: 'folder' | 'pdf';
  createdAt: string;
  updatedAt: string;
  version?: string;
  description?: string;
  downloadUrl?: string;
  versions?: FileVersion[];
}

export interface RecentPresentation {
  id: string;
  title: string;
  date: string;
  duration: string;
  status: string;
}