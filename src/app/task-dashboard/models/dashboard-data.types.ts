
// Project Types
export interface ProjectSummaryData {
  code: string;
  title: string;
  status: ProjectStatus;
  metrics: {
    taskMetrics: TaskMetrics;
    sprintMetrics: SprintMetrics;
    epicMetrics: EpicMetrics;
    resourceMetrics: ResourceMetricsOverview;
  };
}


export interface ProjectMetrics {
  tasks: number;
  milestones: number;
  resources: number;
}

export interface ProjectData {
  totalProjects: number;
  metrics: Array<{
    code: string;
    title: string;
    status: ProjectStatus;
    progress: number;
    metrics: ProjectMetrics;
  }>;
}

// Task Types
export interface TaskMetrics {
  total: number;
  completed: number;
  inProgress: number;
  blocked: number;
  completion: number;
}

export interface TaskStatusData {
  status: Array<{ status: string; count: number }>;
  priority: Record<string, number>;
  assignee: Record<string, number>;
  // Added for distribution data
  statusDistribution: Array<{ status: string; count: number }>;
  priorityDistribution: Record<string, number>;
  assigneeDistribution: Record<string, number>;
}

export interface Project {
  code: string;
  name: string;
  title?: string; 
  status: string;
  metrics?: {
    total: number;
    completed: number;
    inProgress: number;
  };
}


export interface TaskDistribution {
  [key: string]: number;
}

export interface Epic {
  epicId: string;
  title: string;
  status: string;
  completion: number;
  startDate: string;
  endDate: string;
  dueDate: string;
  totalTasks: number;
  completedTasks: number;
}

export interface ResourceMetrics {
  currentWorkload: Record<string, WorkloadInfo>;
  allocationTrends?: any[];
}

export interface TaskCount {
  total: number;
  completed: number;
  active: number;
}

export interface WorkloadInfo {
  totalTasks: number;
  completedTasks: number;
  activeTasks: number;
}

export interface ResourceData {
  name: string;
  utilization: number;
  taskCount: number;
  activeTaskCount: number;
  completedTaskCount: number;
}

export interface ResourceUtilizationData {
  totalResources: number;
  averageUtilization: number;
  resources: ResourceData[];
  weeklyData: Array<{
    week: string;
    utilization: number;
  }>;
}

export interface TaskStatusMetrics {
  status: Array<{ status: string; count: number }>;
  priority: TaskDistribution;
  assignee: TaskDistribution;
  statusDistribution: Array<{ status: string; count: number }>;
  priorityDistribution: TaskDistribution;
  assigneeDistribution: TaskDistribution;
  metrics: {
    total: number;
    completed: number;
    inProgress: number;
  };
}
export interface TaskDistributionData {
  statusDistribution: Array<{ status: string; count: number }>;
  priorityDistribution: Record<string, number>;
  assigneeDistribution: Record<string, number>;
}

// Sprint Types
export interface SprintMetrics {
  active: number;
  completed: number;
  planned: number;
}

export interface SprintData {
  activeSprint: ActiveSprint | null;
  velocityTrend: SprintVelocityPoint[];
  completionRate: number;
}

export interface SprintBurndown {
  ideal: BurndownPoint[];
  actual: BurndownPoint[];
}

export interface SprintCompletion {
  rate: number;
  trend: number;
}


export interface BurndownPoint {
  date: string;
  remaining: number;
}

export interface SprintVelocityPoint {
  sprint: string;
  velocity: number;
  completed: number;
  total: number;
}

export interface ActiveSprint {
  name: string;
  startDate: string;
  endDate: string;
  completion: number;
  burndown: SprintBurndown;
}

// Epic Types
interface EpicMetrics {
  total: number;
  completed: number;
  inProgress: number;
}

export interface EpicProgressData {
  total: number;
  completed: number;
  inProgress: number;
  completion: number;
  epics: {
      id: string;
      title: string;
      status: string;
      progress: number;
      startDate: string;
      endDate: string;
      totalTasks: number;
      completedTasks: number;
  }[];
}


// Resource Types
export interface ResourceMetricsOverview {
  totalResources: number;
  averageUtilization: number;
  overallocatedResources: number;
}


export interface ResourceMetrics {
  name: string;
  utilization: number;
  taskCount: number;
}

export interface ResourceWorkload {
  totalTasks: number;
  completedTasks: number;
  activeTasks: number;
  utilizationRate: number;
}

export interface WorkloadInfo {
  totalTasks: number;
  completedTasks: number;
  activeTasks: number;
}

export interface WeeklyUtilization {
  week: string;
  utilization: number;
}

export interface TaskStatusData {
  status: Array<{ status: string; count: number }>;
  priority: Record<string, number>;
  assignee: Record<string, number>;
  statusDistribution: Array<{ status: string; count: number }>;
  priorityDistribution: Record<string, number>;
  assigneeDistribution: Record<string, number>;
  metrics?: {
    total: number;
    completed: number;
    inProgress: number;
  };
}



// Team Performance Types
export interface TeamPerformanceData {
  velocity: TeamVelocity;
  sprintCompletion: SprintCompletion;
  taskDistribution: Record<string, number>;
  velocityTrend: SprintVelocityPoint[];
}


// Status Types
export type ProjectStatus = 'active' | 'paused' | 'completed' | 'error';
export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'BLOCKED' | 'DONE';
export type TaskPriority = 'HIGH' | 'MEDIUM' | 'LOW';
export type EpicStatus = 'PLANNED' | 'IN_PROGRESS' | 'COMPLETED';

// Main Dashboard Data Interface
export interface DashboardData {
  projects: ProjectSummaryData;
  taskStatus: TaskStatusData;
  sprintPerformance: SprintData;
  epicProgress: EpicProgressData;
  resourceUtilization: ResourceUtilizationData;
  teamPerformance: TeamPerformanceData;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: string;
}

export interface TeamVelocity {
  current: number;
  average: number;
  trend: number;
}

// Dashboard State Types
export interface DashboardState {
  selectedProjectId: string | null;
  timeRange: TimeRangeOption;
  filters: FilterOptions;
  refreshInterval: number;
  lastRefresh: Date | null;
  isLoading: boolean;
  error: string | null;
}

export interface FilterOptions {
  status: string[];
  priority: string[];
  assignee: string[];
}

export type TimeRangeOption = 'today' | 'last7Days' | 'last30Days' | 'last90Days' | 'custom';