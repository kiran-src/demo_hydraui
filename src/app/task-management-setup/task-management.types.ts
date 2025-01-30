
export interface ProjectStats {
  epics: number;
  sprints: number;
  releases: number;
  resources: number;
  tasks: {
    total: number;
    active: number;
  };
}

export interface JiraAuthCredentials {
  domain: string;
  email: string;
  apiKey: string;
}

export interface AuthRequest {
  toolName: string;
  [key: string]: any; // Allow additional properties
}

export interface AzureAuthCredentials {
  organization: string;
  apiKey: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  timestamp: string;
}

export interface TaskProject {
  title: string;
  code: string;
  counts: ProjectStats;  // Now using ProjectStats interface
}

export interface AuthCredentials {
  domain?: string;     // Jira domain (e.g., company.atlassian.net)
  email?: string;      // Jira user email
  apiKey: string;      // API token - required for both
  organization?: string; // Azure organization name
}

export interface AuthResponse {
  success: boolean;
  message: string;
  timestamp: string;
  error?: string;
}

export interface ToolConfig {
  key: string;
  displayName: string;
  authType: 'oauth' | 'api_key' | 'basic' | 'jira_xray';
  description: string;
  requiredFields: (keyof AuthCredentials)[];
}

export const TASK_TOOL_CONFIGS: Record<string, ToolConfig> = {
  jira: {
    key: 'jira',
    displayName: 'Jira',
    authType: 'jira_xray',
    description: 'Connect to Jira using your Atlassian domain and API token',
    requiredFields: ['domain', 'email', 'apiKey']
  },
  azure: {
    key: 'azure',
    displayName: 'Azure DevOps',
    authType: 'api_key',
    description: 'Connect to Azure DevOps services',
    requiredFields: ['apiKey', 'organization']
  }
};