
export interface PipelineConfig {
    id: number;
    pipelineName: string;
    repositoryName: string;
    branch: string;
    status: string;
    active: boolean;
  }

  export interface PipelineLog {
    timestamp: Date;
    level: string;
    message: string;
  }
  
  export interface PipelineUpdate {
    buildRunId: number;
    pipelineId: string;
    status: string;
    isRunning: boolean;
    logs: PipelineLog[];
    runTime: string;
    endTime?: string;
  }
  
  export interface WebSocketPipelineMessage {
    buildRunId: number;
    buildStatus: string;
    runTime: string;
    endTime: string | null;
    logs: Array<{
      timestamp: string;
      level: string;
      message: string;
    }>;
  }
  
  export interface PipelineRun {
    id: number;
    runId: string;
    buildNumber: string;
    startTime: string;
    endTime: string;
    status: string;
    triggerSource: string;
    duration: number;
    owner: string;
    branchName: string;
    resourceMetrics: {
      agentName: string;
      agentPool: string;
    };
  }
  
  export interface PipelineMetrics {
    averageExecutionTime: number;
    successRate: number;
    failureRate: number;
    statusMetrics: Array<{
      status: string;
      count: number;
    }>;
}