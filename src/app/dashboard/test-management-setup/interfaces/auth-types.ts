// auth-types.ts
export enum AuthType {
  OAUTH = 'oauth',
  API_KEY = 'api_key',
  BASIC = 'basic',
  JIRA_XRAY = 'jira_xray'
}

export interface AuthCredentials {
  domain?: string;   // Changed from email to domain
  apiKey?: string;
  username?: string;
  password?: string;
}

export interface ToolConfig {
  displayName: string;
  authType: AuthType;
  description?: string;
  requiredFields: string[];
}

export const TOOL_CONFIGS: { [key: string]: ToolConfig } = {
  xray: {
    displayName: 'Xray (Jira)',
    authType: AuthType.JIRA_XRAY,
    requiredFields: ['domain', 'apiKey'],
    description: 'Connect to Xray through Jira using your Jira domain (e.g., yoursite.atlassian.net) and API token.'
  },
  qase: {
    displayName: 'Qase',
    authType: AuthType.API_KEY,
    requiredFields: ['apiKey'],
    description: 'Connect to Qase using an API token'
  },
  testrail: {
    displayName: 'TestRail',
    authType: AuthType.BASIC,
    requiredFields: ['username', 'password'],
    description: 'Connect to TestRail using your credentials'
  }
};