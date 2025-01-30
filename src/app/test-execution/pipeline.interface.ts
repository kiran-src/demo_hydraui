
export interface PipelineConfig {
  id?: number;
  pipelineName: string;
  repositoryName: string;
  repositoryUrl: string;
  branch: string;
  organization: string;
  project: string;
  pipelineId: string;
  definitionId: string;
  personalAccessToken: string;
  versionManager: string;
  projectName?: string;
  deviceName?: string;
  platform?: string;
}
  
  
export interface BuildRun {
  buildRunId: number;
  pipelineName: string;
  status: BuildStatus;
  startTime: string;
  endTime?: string;
  buildStatus: string;
  comment?: string;
  logs?: BuildRunLog[];
  configLab?: ConfigLab;
  pipelineConfig?: PipelineConfig;
}
  
  
export interface BuildRunLog {
  buildRunLogId: number;
  timestamp: string;
  message: string;
  level: LogLevel;
  buildStatus: string;
}

  export type LogLevel = 'info' | 'warning' | 'error';

  
  export interface Project {
    id: number;
    name: string;
    code: string;
    clientConfiguration?: ClientConfiguration;
    testCases?: TestCase[];
  }
  
  export interface ConfigLab {
    configLabId: number;
    platform: string;
    deviceName: string;
    parallelExecutionNumber: number;
    logs?: string;
    scheduleInfo?: any;
    mobileDeviceLibrary?: any;
    internalRun: boolean;
    project?: Project;
    testExecution?: TestExecution;
    buildRun?: BuildRun;
  }
  
  export interface TestExecution {
    testExecutionId: number;
    externalId?: string;
    summary: string;
    description?: string;
    startTime: string;
    endTime?: string;
    reporter?: string;
    assignee?: string;
    status: string;
    passFail: number;
    environment?: string;
    testSteps?: string[];
    scheduledDate?: string;
    isAutomated: boolean;
  }
  
  export interface ClientConfiguration {
    configId: number;
    toolName: string;
    accessToken?: string;
    apiKey?: string;
    username?: string;
    apiUrl?: string;
  }
  
  export enum BuildStatus {
    QUEUED = 'QUEUED',
    RUNNING = 'RUNNING',
    COMPLETED = 'COMPLETED',
    FAILED = 'FAILED',
    CANCELLED = 'CANCELLED',
    TIMEOUT = 'TIMEOUT',
    PARTIAL = 'PARTIAL',
    UNKNOWN = 'UNKNOWN'
  }
  
  export interface TestCase {
    testCaseId: number;
    externalId?: string;
    description: string;
    scenario?: string;
    status: string;
    priority: string;
    preconditions?: string;
    expectedResult?: string;
    createdDate: string;
    lastUpdated: string;
  }

  export interface AzureOrganization {
    accountId: string;
    accountUri: string;
    accountName: string;
  }

  export interface AzureProject {
    id: string;
    name: string;
    description?: string;
    url: string;
  }

  export interface AzurePipeline {
    id: string;
    name: string;
    revision: number;
    url: string;
    repository?: {
      id: string;
      name: string;
      url: string;
      defaultBranch: string;
    };
  }