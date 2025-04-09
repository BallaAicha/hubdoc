// API Types
export interface Infrastructure {
  url_int: string;
  url_uat: string;
  url_oat: string;
  url_prod: string;
}

export interface DataSource {
  rabbitMQ: boolean;
  commonDB: boolean;
  dedicatedDB: boolean;
  s3: boolean;
}

export interface Endpoint {
  method: string;
  path: string;
  curl: string;
  expectedResponse: string;
  description: string;
}

export interface APIService {
  id: string;
  name: string;
  trigramme: string;
  infrastructure: Infrastructure;
  description: string;
  clientConsumers: string[];
  dataSources: DataSource;
  consumes: string[];
  consumedBy: string[];
  endpoints: Endpoint[];
  databaseSchema?: string;
  criticality: string;
  bridgeCommunication ?: boolean;
  poCoedev ?: string;
  techlead ?: string;
  java17Migrated ?: boolean;
  sonarized ?: boolean;
  version ?: string;
}

// Mock data structure
