export interface TestManagementTool {
    id: string;
    name: string;
    type: 'jira' | 'testrail' | 'qase';
    icon: string;
    description: string;
    isConfigured: boolean;
  }
  
  export interface SyncStatus {
    isRunning: boolean;
    progress: number;
    currentOperation: string;
    errors: string[];
    lastSync?: Date;
  }
  
  export interface ProjectInfo {
    projectKey: string;
    projectName: string;
    toolId: string;
    isActive: boolean;
  }