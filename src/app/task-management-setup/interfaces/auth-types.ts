export enum AuthType {
    OAUTH = 'oauth',
    API_KEY = 'api_key',
    BASIC = 'basic'
  }
  
  export interface ToolConfig {
    displayName: string;
    authType: AuthType;
    description: string;
    requiredFields: string[];
  }
  
  export const TASK_TOOL_CONFIGS: { [key: string]: ToolConfig } = {
    jira: {
      displayName: 'Jira',
      authType: AuthType.API_KEY,
      description: 'Connect to Jira for task and project management',
      requiredFields: ['apiKey']
    },
    azure: {
      displayName: 'Azure DevOps',
      authType: AuthType.API_KEY,
      description: 'Connect to Azure DevOps for task management',
      requiredFields: ['pat']
    }
  };
  