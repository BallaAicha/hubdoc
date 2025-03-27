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
}

// Mock data structure
export const mockServices: APIService[] = [
  {
    id: "auth-service",
    name: "Authentication Service",
    trigramme: "ABB",
    infrastructure: {
      url_int: "https://int.auth.example.com",
      url_uat: "https://uat.auth.example.com",
      url_oat: "https://oat.auth.example.com",
      url_prod: "https://prod.auth.example.com"
    },
    description: "Authentication and authorization service",
    clientConsumers: ["OPENR", "BANKUP"],
    dataSources: {
      rabbitMQ: true,
      commonDB: false,
      dedicatedDB: true,
      s3: true
    },
    consumes: [
      "User Service",
      "Notification Service",
      "Audit Service",
      "Config Service",
      "Cache Service"
    ],
    consumedBy: ["OPENR", "BANKUP", "Mobile App"],
    endpoints: [
      {
        method: "POST",
        path: "/api/auth/login",
        curl: "curl -X POST https://api.example.com/api/auth/login -H 'Content-Type: application/json' -d '{\"email\":\"user@example.com\",\"password\":\"password\"}'",
        expectedResponse: "{ \"token\": \"jwt-token\" }",
        description: "Authenticate user and get JWT token"
      },
      {
        method: "POST",
        path: "/api/auth/refresh",
        curl: "curl -X POST https://api.example.com/api/auth/refresh -H 'Authorization: Bearer {token}'",
        expectedResponse: "{ \"token\": \"new-jwt-token\" }",
        description: "Refresh authentication token"
      }
    ],
    databaseSchema: "auth_schema.png"
  },
  {
    id: "notification-service",
    name: "Notification Service",
    trigramme: "ABB",
    infrastructure: {
      url_int: "https://int.notifications.example.com",
      url_uat: "https://uat.notifications.example.com",
      url_oat: "https://oat.notifications.example.com",
      url_prod: "https://prod.notifications.example.com"
    },
    description: "User notification management service",
    clientConsumers: ["OPENR", "BANKUP"],
    dataSources: {
      rabbitMQ: true,
      commonDB: false,
      dedicatedDB: true,
      s3: false
    },
    consumes: [
      "User Service",
      "Template Service",
      "Preference Service",
      "Email Service",
      "SMS Service"
    ],
    consumedBy: ["Auth Service", "Order Service", "Payment Service"],
    endpoints: [
      {
        method: "POST",
        path: "/api/notifications/send",
        curl: "curl -X POST https://api.example.com/api/notifications/send -H 'Content-Type: application/json' -d '{\"userId\":\"123\",\"type\":\"email\",\"templateId\":\"welcome\"}'",
        expectedResponse: "{ \"status\": \"sent\", \"id\": \"notif-123\" }",
        description: "Send notification to user"
      },
      {
        method: "GET",
        path: "/api/notifications/history",
        curl: "curl -X GET https://api.example.com/api/notifications/history -H 'Authorization: Bearer {token}'",
        expectedResponse: "{ \"notifications\": [] }",
        description: "Get notification history for user"
      }
    ],
    databaseSchema: "notification_schema.png"
  },
  {
    id: "payment-service",
    name: "Payment Processing",
    trigramme: "AEP",
    infrastructure: {
      url_int: "https://int.payments.example.com",
      url_uat: "https://uat.payments.example.com",
      url_oat: "https://oat.payments.example.com",
      url_prod: "https://prod.payments.example.com"
    },
    description: "Handle payment processing and transactions",
    clientConsumers: ["OPENR"],
    dataSources: {
      rabbitMQ: true,
      commonDB: true,
      dedicatedDB: false,
      s3: false
    },
    consumes: [
      "Auth Service",
      "Account Service",
      "Notification Service",
      "Audit Service",
      "Risk Service",
      "Transaction Service",
      "User Service"
    ],
    consumedBy: ["OPENR", "Mobile App"],
    endpoints: [
      {
        method: "POST",
        path: "/api/payments/process",
        curl: "curl -X POST https://api.example.com/api/payments/process",
        expectedResponse: "{ \"status\": \"success\" }",
        description: "Process a payment transaction"
      }
    ],
    databaseSchema: "payments_schema.png"
  },
  {
    id: "user-service",
    name: "User Management",
    trigramme: "BPX",
    infrastructure: {
      url_int: "https://int.users.example.com",
      url_uat: "https://uat.users.example.com",
      url_oat: "https://oat.users.example.com",
      url_prod: "https://prod.users.example.com"
    },
    description: "User management and profile service",
    clientConsumers: ["BANKUP"],
    dataSources: {
      rabbitMQ: false,
      commonDB: true,
      dedicatedDB: false,
      s3: true
    },
    consumes: [
      "Auth Service",
      "Notification Service",
      "Document Service",
      "Storage Service"
    ],
    consumedBy: ["BANKUP", "Mobile App"],
    endpoints: [
      {
        method: "GET",
        path: "/api/users/profile",
        curl: "curl -X GET https://api.example.com/api/users/profile",
        expectedResponse: "{ \"user\": {} }",
        description: "Get user profile information"
      }
    ]
  },
  // Ajout du premier service INO
  {
    id: "analytics-service",
    name: "Analytics Service",
    trigramme: "INO",
    infrastructure: {
      url_int: "https://int.analytics.example.com",
      url_uat: "https://uat.analytics.example.com",
      url_oat: "https://oat.analytics.example.com",
      url_prod: "https://prod.analytics.example.com"
    },
    description: "Business analytics and reporting service",
    clientConsumers: ["OPENR", "BANKUP", "ADMIN"],
    dataSources: {
      rabbitMQ: true,
      commonDB: true,
      dedicatedDB: true,
      s3: true
    },
    consumes: [
      "Data Lake Service",
      "User Service",
      "Transaction Service"
    ],
    consumedBy: ["OPENR", "BANKUP", "ADMIN", "Mobile App"],
    endpoints: [
      {
        method: "GET",
        path: "/api/analytics/dashboard",
        curl: "curl -X GET https://api.example.com/api/analytics/dashboard -H 'Authorization: Bearer {token}'",
        expectedResponse: "{ \"metrics\": [], \"charts\": [] }",
        description: "Get analytics dashboard data"
      },
      {
        method: "POST",
        path: "/api/analytics/report",
        curl: "curl -X POST https://api.example.com/api/analytics/report -H 'Content-Type: application/json' -d '{\"type\":\"monthly\",\"filters\":{}}' -H 'Authorization: Bearer {token}'",
        expectedResponse: "{ \"reportId\": \"rep123\", \"status\": \"processing\" }",
        description: "Generate custom analytics report"
      }
    ],
    databaseSchema: "analytics_schema.png"
  },
  // Ajout du deuxième service INO
  {
    id: "document-service",
    name: "Document Management Service",
    trigramme: "INO",
    infrastructure: {
      url_int: "https://int.documents.example.com",
      url_uat: "https://uat.documents.example.com",
      url_oat: "https://oat.documents.example.com",
      url_prod: "https://prod.documents.example.com"
    },
    description: "Document management and storage service",
    clientConsumers: ["BANKUP", "ADMIN"],
    dataSources: {
      rabbitMQ: false,
      commonDB: false,
      dedicatedDB: true,
      s3: true
    },
    consumes: [
      "Storage Service",
      "Auth Service",
      "OCR Service"
    ],
    consumedBy: ["User Service", "KYC Service", "Admin Portal"],
    endpoints: [
      {
        method: "POST",
        path: "/api/documents/upload",
        curl: "curl -X POST https://api.example.com/api/documents/upload -F 'file=@document.pdf' -H 'Authorization: Bearer {token}'",
        expectedResponse: "{ \"documentId\": \"doc123\", \"status\": \"uploaded\" }",
        description: "Upload new document"
      },
      {
        method: "GET",
        path: "/api/documents/{id}",
        curl: "curl -X GET https://api.example.com/api/documents/doc123 -H 'Authorization: Bearer {token}'",
        expectedResponse: "{ \"id\": \"doc123\", \"name\": \"document.pdf\", \"url\": \"...\" }",
        description: "Get document details"
      }
    ],
    databaseSchema: "document_schema.png"
  },
  // Ajout du troisième service INO
  {
    id: "workflow-service",
    name: "Workflow Service",
    trigramme: "INO",
    infrastructure: {
      url_int: "https://int.workflow.example.com",
      url_uat: "https://uat.workflow.example.com",
      url_oat: "https://oat.workflow.example.com",
      url_prod: "https://prod.workflow.example.com"
    },
    description: "Business process workflow orchestration service",
    clientConsumers: ["ADMIN", "BANKUP"],
    dataSources: {
      rabbitMQ: true,
      commonDB: false,
      dedicatedDB: true,
      s3: false
    },
    consumes: [
      "User Service",
      "Document Service",
      "Rule Engine Service"
    ],
    consumedBy: ["Admin Portal", "KYC Service", "Onboarding Service"],
    endpoints: [
      {
        method: "POST",
        path: "/api/workflows/start",
        curl: "curl -X POST https://api.example.com/api/workflows/start -H 'Content-Type: application/json' -d '{\"workflowType\":\"customer-onboarding\",\"entityId\":\"123\"}' -H 'Authorization: Bearer {token}'",
        expectedResponse: "{ \"workflowId\": \"wf123\", \"status\": \"started\" }",
        description: "Start a new workflow process"
      },
      {
        method: "GET",
        path: "/api/workflows/{id}/status",
        curl: "curl -X GET https://api.example.com/api/workflows/wf123/status -H 'Authorization: Bearer {token}'",
        expectedResponse: "{ \"id\": \"wf123\", \"status\": \"in-progress\", \"currentStep\": \"document-verification\" }",
        description: "Get workflow status information"
      }
    ],
    databaseSchema: "workflow_schema.png"
  }
];