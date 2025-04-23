// Project configuration types
export interface ProjectConfig {
  projectName: string;
  description: string;
  version: string;
  language: 'javascript' | 'typescript';
  features: {
    routing: boolean;
    i18n: boolean;
    apiClient: boolean;
    tenantConfig: boolean;
  };
}

// Project structure representation
export interface FolderStructure {
  name: string;
  type: 'folder' | 'file';
  children?: FolderStructure[];
}