export interface PipelineConfig {
    id?: number;
    versionManager: 'azure' | 'gitlab';
    organization?: string;  // For Azure
    project: string;
    pipelineId: string;
    personalAccessToken: string;
    repositoryName?: string;
    branch?: string;
    active?: boolean;
  }
  
  export interface AzurePipeline {
    id: string;
    name: string;
    path: string;
    revision: number;
  }
  