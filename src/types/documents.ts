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