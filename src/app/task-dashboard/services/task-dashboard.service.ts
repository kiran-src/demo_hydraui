import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { DashboardData, ResourceUtilizationData } from '../models/dashboard-data.types';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: string;
}

interface Epic {
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


interface ResourceWorkload {
  totalTasks: number;
  completedTasks: number;
  activeTasks: number;
  utilizationRate: number;
}

interface TaskStatusMetrics {
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

interface Project {
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

interface AssigneeDistribution {
  [key: string]: {
    total: number;
    completed: number;
    active: number;
  };
}
interface TaskCount {
  total: number;
  completed: number;
  active: number;
}

interface ResourceData {
  name: string;
  utilization: number;
  taskCount: number;
  activeTaskCount: number;
  completedTaskCount: number;
}

interface ResourceWorkload {
  totalTasks: number;
  completedTasks: number;
  activeTasks: number;
  utilizationRate: number;
}

interface WorkloadInfo {
  totalTasks: number;
  completedTasks: number;
  activeTasks: number;
}

interface WeeklyUtilization {
  week: string;
  utilization: number;
}

interface ResourceMetrics {
  currentWorkload: Record<string, WorkloadInfo>;
  allocationTrends?: any[];
}

interface TaskDistribution {
  [key: string]: number;
}

interface TaskCount {
  total: number;
  completed: number;
  active: number;
}

interface ResourceData {
  name: string;
  utilization: number;
  taskCount: number;
  activeTaskCount: number;
  completedTaskCount: number;
}

@Injectable({
  providedIn: 'root'
})
export class TaskDashboardService {
  private readonly apiUrl = `${environment.apiUrl}/api/task-management/dashboard`;

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication token not found');
    }
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }



  getDashboardMetrics(selectedProjectId?: string | null): Observable<DashboardData> {
    let params = new HttpParams();
    if (selectedProjectId) {
      params = params.append('projectCode', selectedProjectId);
    }
  
    return this.http.get<ApiResponse<any>>(this.apiUrl, {
      headers: this.getAuthHeaders(),
      params
    }).pipe(
      tap(response => {
        console.log('Raw API Response:', response);
        console.log('Task Metrics:', response.data.taskMetrics);
        console.log('Resource Metrics:', response.data.resourceMetrics);
        console.log('Sprint Metrics:', response.data.sprintMetrics);
      }),
      map(response => {
        if (!response.success) {
          throw new Error(response.message || 'Failed to fetch dashboard data');
        }
        return this.transformDashboardData(response.data);
      }),
      catchError(this.handleError)
    );
  }

  private transformDashboardData(data: any): DashboardData {
    const taskMetrics = data.taskMetrics || {};
    const resourceMetrics = this.transformResourceMetrics(data);
    const sprintMetrics = this.transformSprintMetrics(data);
    const taskDistribution = this.transformTaskDistributions(data);
    const epicData = data.epicProgress || {};

    return {
      projects: {
        code: data.projectOverview?.code || '',
        title: data.projectOverview?.name || 'No Project Selected',
        status: this.normalizeStatus(data.projectOverview?.status || 'active'),
        metrics: {
          taskMetrics: {
            total: taskMetrics.total || 0,
            completed: taskMetrics.completed || 0,
            inProgress: taskMetrics.inProgress || 0,
            blocked: taskMetrics.blocked || 0,
            completion: taskMetrics.completion || 0
          },
          sprintMetrics: {
            active: sprintMetrics.statusDistribution?.ACTIVE || 0,
            completed: sprintMetrics.statusDistribution?.COMPLETED || 0,
            planned: sprintMetrics.statusDistribution?.PLANNED || 0
          },
          epicMetrics: {
            total: data.projectOverview?.epicMetrics?.total || 0,
            completed: data.projectOverview?.epicMetrics?.completed || 0,
            inProgress: data.projectOverview?.epicMetrics?.inProgress || 0
          },
          resourceMetrics: {
            totalResources: resourceMetrics.totalResources,
            averageUtilization: resourceMetrics.averageUtilization,
            overallocatedResources: resourceMetrics.resources.filter(r => r.utilization > 100).length
          }
        }
      },
      taskStatus: taskDistribution,
      resourceUtilization: resourceMetrics,
      sprintPerformance: {
        activeSprint: sprintMetrics.activeSprint,
        velocityTrend: sprintMetrics.velocityTrend,
        completionRate: sprintMetrics.completionRate
      },
      teamPerformance: {
        velocity: sprintMetrics.performance.velocity,
        sprintCompletion: sprintMetrics.performance.completion,
        taskDistribution: taskDistribution.assignee,
        velocityTrend: sprintMetrics.velocityTrend
      },
      epicProgress: {
        total: epicData.total || epicData.epics?.length || 0,
        completed: (epicData.epics || []).filter((e: Epic) => e.status === 'COMPLETED').length,
        inProgress: (epicData.epics || []).filter((e: Epic) => e.status === 'IN_PROGRESS').length,
        completion: taskMetrics.completion || 0,
        epics: (epicData.epics || []).map((epic: Epic) => ({
          id: epic.epicId || '',
          title: epic.title || '',
          status: epic.status || '',
          progress: epic.completion || 0,
          startDate: epic.startDate || '',
          endDate: epic.endDate || epic.dueDate || '',
          totalTasks: epic.totalTasks || 0,
          completedTasks: epic.completedTasks || 0
        }))
      }
    };
  }

  

  private transformTaskDistributions(data: any): TaskStatusMetrics {
    const taskMetrics = data.taskMetrics || {};
    const statusDist = taskMetrics.statusDistribution || {};
    const priorityDist = taskMetrics.priorityDistribution || {};
    const assigneeDist: TaskDistribution = {};
  
    // Transform resource workload data into simple task counts
    if (data.resourceMetrics?.currentWorkload) {
      Object.entries(data.resourceMetrics.currentWorkload).forEach(([name, info]) => {
        const workloadInfo = info as WorkloadInfo;
        if (workloadInfo.totalTasks > 0) {
          assigneeDist[name] = workloadInfo.totalTasks;
        }
      });
    }
  
    return {
      status: Object.entries(statusDist).map(([status, count]) => ({
        status,
        count: Number(count)
      })),
      priority: priorityDist,
      assignee: assigneeDist,
      statusDistribution: Object.entries(statusDist).map(([status, count]) => ({
        status,
        count: Number(count)
      })),
      priorityDistribution: priorityDist,
      assigneeDistribution: assigneeDist,
      metrics: {
        total: taskMetrics.total || 0,
        completed: taskMetrics.completed || 0,
        inProgress: taskMetrics.inProgress || 0
      }
    };
  }


  private transformResourceMetrics(data: any): ResourceUtilizationData {
    const workload = data.resourceMetrics?.currentWorkload || {};
    const resources: ResourceData[] = Object.entries(workload)
      .map(([name, info]) => {
        const workloadInfo = info as WorkloadInfo;
        const totalTasks = workloadInfo.totalTasks || 0;
        const completedTasks = workloadInfo.completedTasks || 0;
        const utilization = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
        
        return {
          name,
          utilization: Math.round(utilization),
          taskCount: totalTasks,
          activeTaskCount: workloadInfo.activeTasks || 0,
          completedTaskCount: completedTasks
        };
      })
      .filter(resource => resource.taskCount > 0);
  
    const weeklyData = this.calculateWeeklyData(data.resourceMetrics?.allocationTrends || [], resources);
  
    return {
      totalResources: resources.length,
      averageUtilization: this.calculateAverageUtilization(resources),
      resources,
      weeklyData
    };
  }

  private transformSprintMetrics(data: any) {
    const sprintMetrics = data.sprintMetrics || {};
    const statusDist = sprintMetrics.statusDistribution || {};
    
    const completedTasks = data.taskMetrics?.completed || 0;
    const totalTasks = data.taskMetrics?.total || 0;
    const currentVelocity = completedTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    return {
      activeSprint: this.transformActiveSprint(sprintMetrics.activeSprint),
      velocityTrend: sprintMetrics.velocityTrend || [],
      completionRate: currentVelocity,
      performance: {
        velocity: {
          current: Math.round(currentVelocity),
          average: Math.round(currentVelocity),
          trend: 0
        },
        completion: {
          rate: Math.round(currentVelocity),
          trend: 0
        }
      },
      statusDistribution: statusDist
    };
  }


  
  getAvailableProjects(): Observable<Project[]> {
    return this.http.get<ApiResponse<any>>(`${this.apiUrl}/projects`, {
      headers: this.getAuthHeaders()
    }).pipe(
      map(response => {
        if (!response.success) {
          throw new Error(response.message || 'Failed to fetch projects');
        }
        // Transform the response data to match the Project interface
        return response.data.map((p: any) => ({
          code: p.code || '',
          name: p.name || p.title || 'Untitled Project', // Handle both name and title
          title: p.title || p.name || 'Untitled Project', // Back compatibility
          status: p.status || 'active',
          metrics: {
            total: p.metrics?.total || 0,
            completed: p.metrics?.completed || 0,
            inProgress: p.metrics?.inProgress || 0
          }
        }));
      }),
      catchError(this.handleError)
    );
  }

  private calculateWeeklyData(trends: any[], resources: ResourceData[]): WeeklyUtilization[] {
    if (!trends.length) {
      const weeks = 12;
      const defaultData: WeeklyUtilization[] = [];
      const now = new Date();
      
      for (let i = 0; i < weeks; i++) {
        const date = new Date(now);
        date.setDate(date.getDate() - (i * 7));
        defaultData.push({
          week: date.toISOString().split('T')[0],
          utilization: 0
        });
      }
      
      return defaultData.reverse();
    }
  
    return trends.map(trend => ({
      week: trend.weekStart,
      utilization: this.calculateWeeklyUtilization(trend.allocation, resources)
    }));
  }

  private calculateWeeklyUtilization(
    allocation: Record<string, number>,
    resources: ResourceData[]
  ): number {
    if (!allocation || Object.keys(allocation).length === 0) return 0;
    
    const values = Object.values(allocation).map(Number);
    if (!values.length) return 0;
    
    const total = values.reduce((sum, val) => sum + val, 0);
    return Math.round(total / values.length);
  }


  private calculateAverageUtilization(resources: ResourceData[]): number {
  if (!resources.length) return 0;
  const total = resources.reduce((sum, resource) => sum + resource.utilization, 0);
  return Math.round(total / resources.length);
}
  

  private transformActiveSprint(sprint: any): any {
    if (!sprint) return null;
    
    return {
      name: sprint.name || '',
      startDate: sprint.startDate || '',
      endDate: sprint.endDate || '',
      completion: sprint.completion || 0,
      burndown: {
        ideal: (sprint.burndownData?.ideal || []).map((point: any) => ({
          date: point.date,
          remaining: Number(point.remaining)
        })),
        actual: (sprint.burndownData?.actual || []).map((point: any) => ({
          date: point.date,
          remaining: Number(point.remaining)
        }))
      }
    };
  }

  private normalizeStatus(status: string): 'active' | 'paused' | 'completed' {
    if (!status) return 'active';
    const normalizedStatus = status.toLowerCase();
    switch (normalizedStatus) {
      case 'active':
      case 'in_progress':
        return 'active';
      case 'paused':
      case 'on_hold':
        return 'paused';
      case 'completed':
      case 'done':
        return 'completed';
      default:
        return 'active';
    }
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('API Error:', error);
    const errorMessage = error.error?.message || error.message || 'An unexpected error occurred';
    return throwError(() => ({
      success: false,
      message: errorMessage,
      error: error.message,
      timestamp: new Date().toISOString()
    }));
  }
}