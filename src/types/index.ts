import {DocumentStatus} from "./documents.ts";

export interface Folder {
    id: number;
    name: string;
    description: string;
    parentId: number | null;
    subFolderIds: number[];
    documentIds: number[];
    createdAt: string;
    updatedAt: string;
}

export interface Document {
    id: number;
    name: string;
    description: string;
    version: string;
    fileType: string;
    fileSize: number;
    filePath: string;
    status: string;
    folderId: number;
    parentDocumentId: number | null;
    versionIds: number[];
    tags: string[];
    metadata: {
        département: string;
        confidentialité: string;
        auteur: string;
    };
    createdAt: string;
    updatedAt: string;
}






export interface FormErrors {
    [key: string]: string | undefined;
}


export interface FormData {
    name: string;
    description: string;
    version: string;
    fileType: string;
    file: File | null;
    status: DocumentStatus;
    folderId: number | null;
    parentDocumentId: number | null;
    tags: string[];
    metadata: Record<string, string>;
}

export { DocumentStatus };