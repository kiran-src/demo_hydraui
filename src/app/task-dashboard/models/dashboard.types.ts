// Dashboard State
export interface DashboardState {
  selectedProjectId: string | null;
  timeRange: TimeRangeOption;
  filters: FilterOptions;
  refreshInterval: number;
  lastRefresh: Date | null;
  isLoading: boolean;
  error: string | null;
}
  
  // Filter Options
  export interface FilterOptions {
    status: string[];
    priority: string[];
    assignee: string[];
  }
  
  // Time Range Options
  export type TimeRangeOption = 'today' | 'last7Days' | 'last30Days' | 'last90Days' | 'custom';
  
  // Project Metrics
  export interface ProjectMetrics {
    id: string;
    title: string;
    status: ProjectStatus;
    health: HealthStatus;
    progress: number;
    startDate: Date;
    deadline: Date;
    totalTasks: number;
    completedTasks: number;
    openIssues: number;
    teamSize: number;
    nextMilestone: string;
    risks: Risk[];
    metrics: {
      velocity: number;
      completionRate: number;
      qualityScore: number;
      teamUtilization: number;
    };
  }
  
  // Project Status
  export type ProjectStatus = 'ACTIVE' | 'PAUSED' | 'COMPLETED' | 'AT_RISK';
  
  // Health Status
  export type HealthStatus = 'GOOD' | 'WARNING' | 'CRITICAL';
  
  // Risk
  export interface Risk {
    type: RiskType;
    severity: RiskSeverity;
    description: string;
    mitigation?: string;
  }
  
  // Risk Type
  export type RiskType = 'SCHEDULE' | 'BUDGET' | 'RESOURCE' | 'TECHNICAL' | 'SCOPE';
  
  // Risk Severity
  export type RiskSeverity = 'HIGH' | 'MEDIUM' | 'LOW';
  
  // Task Status
  export type TaskStatus = 'TO_DO' | 'IN_PROGRESS' | 'BLOCKED' | 'DONE';
  
  // Epic
  export interface Epic {
    id: string;
    title: string;
    status: TaskStatus;
    progress: number;
    startDate: Date;
    endDate: Date;
    tasks: Task[];
  }
  
  // Sprint
  export interface Sprint {
    id: string;
    name: string;
    status: SprintStatus;
    startDate: Date;
    endDate: Date;
    goal: string;
    tasks: Task[];
    metrics: SprintMetrics;
  }
  
  // Sprint Status
  export type SprintStatus = 'PLANNED' | 'ACTIVE' | 'COMPLETED';
  
  // Sprint Metrics
  export interface SprintMetrics {
    totalPoints: number;
    completedPoints: number;
    totalTasks: number;
    completedTasks: number;
    completionRate: number;
    predictedCompletion?: Date;
  }
  
  // Task
  export interface Task {
    id: string;
    title: string;
    status: TaskStatus;
    priority: TaskPriority;
    assignee: string;
    storyPoints: number;
    epic?: string;
    sprint?: string;
    startDate?: Date;
    dueDate?: Date;
    completedDate?: Date;
    blockers?: string[];
  }
  
  // Task Priority
  export type TaskPriority = 'HIGH' | 'MEDIUM' | 'LOW';
  
  // Resource
  export interface Resource {
    id: string;
    name: string;
    role: string;
    utilization: number;
    availability: number;
    assignedTasks: Task[];
    skills: string[];
  }
  
  // Team Performance
  export interface TeamPerformance {
    velocity: {
      current: number;
      average: number;
      trend: number;
    };
    sprintCompletion: {
      rate: number;
      trend: number;
    };
    taskDistribution: {
      [key: string]: number;
    };
    qualityMetrics: {
      defectRate: number;
      reworkRate: number;
      testCoverage: number;
    };
  }
  
  // Dashboard Layout
  export interface DashboardLayout {
    id: string;
    name: string;
    userId: string;
    widgets: DashboardWidget[];
    createdAt: Date;
    updatedAt: Date;
  }
  
  // Dashboard Widget
  export interface DashboardWidget {
    id: string;
    type: WidgetType;
    position: {
      x: number;
      y: number;
      width: number;
      height: number;
    };
    config: any;
  }

  
  export interface FilterOptions {
    status: string[];
    priority: string[];
    assignee: string[];
  }

  // Widget Type
  export type WidgetType = 
    | 'PROJECT_OVERVIEW'
    | 'EPIC_PROGRESS'
    | 'SPRINT_BURNDOWN'
    | 'TASK_DISTRIBUTION'
    | 'RESOURCE_WORKLOAD'
    | 'TEAM_VELOCITY';



