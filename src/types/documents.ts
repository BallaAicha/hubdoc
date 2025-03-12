export interface MetaDataDTO {
    key: string;
    value: string;
}

export enum DocumentStatus {
    DRAFT = 'DRAFT',
    PUBLISHED = 'PUBLISHED',
    ARCHIVED = 'ARCHIVED'
}

export interface DocumentVersion {
    id: number;
    versionNumber: string;
    name: string;
    description?: string;
    creationDate: Date;
    createdBy: string;
}

export interface Document {
    id: number;
    name: string;
    description?: string;
    status: DocumentStatus;
    metadata: MetaDataDTO[];
    parentDocument?: Document;
    childDocuments: Document[];
    versions: DocumentVersion[];
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