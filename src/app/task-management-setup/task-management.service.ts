import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { 
  TaskProject, 
  AuthCredentials, 
  AuthResponse, 
  ProjectStats,
  TASK_TOOL_CONFIGS, 
  JiraAuthCredentials,
  AzureAuthCredentials,
  AuthRequest
} from './task-management.types';
import { ErrorService } from '../common/error.service';

@Injectable({
  providedIn: 'root'
})
export class TaskManagementService {
  private readonly apiUrl = `${environment.apiUrl}/api/task-management`;

  private currentTool = new BehaviorSubject<string | null>(null);
  private projectsCache = new Map<string, any[]>();

  constructor(
    private http: HttpClient,
    private errorService: ErrorService
  ) {}
  
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

  private clearCache(): void {
    this.projectsCache.clear();
  }

  // Reset service state
  private resetState(): void {
    this.currentTool.next(null);
    this.clearCache();
  }

  // task-management.service.ts

configureAuth(toolName: string, credentials: JiraAuthCredentials | AzureAuthCredentials): Observable<AuthResponse> {
  if (!toolName || !TASK_TOOL_CONFIGS[toolName]) {
    return throwError(() => new Error('Unsupported tool'));
  }

  // Clear cache when switching tools
  if (this.currentTool.value !== toolName) {
    this.projectsCache.clear();
    this.currentTool.next(toolName);
  }

  const requestBody: AuthRequest = {
    toolName
  };

  // Your existing Jira/Azure credential logic...
  if (toolName === 'jira') {
    const jiraCredentials = credentials as JiraAuthCredentials;
    Object.assign(requestBody, {
      domain: jiraCredentials.domain?.trim().endsWith('.atlassian.net') ? 
              jiraCredentials.domain?.trim() : 
              `${jiraCredentials.domain?.trim()}.atlassian.net`,
      email: jiraCredentials.email?.trim(),
      apiKey: jiraCredentials.apiKey?.trim()
    });
  } else if (toolName === 'azure') {
    const azureCredentials = credentials as AzureAuthCredentials;
    Object.assign(requestBody, {
      apiKey: azureCredentials.apiKey?.trim(),
      organization: azureCredentials.organization?.trim()
    });
  }

  return this.http.post<AuthResponse>(
    `${this.apiUrl}/configure`,
    requestBody,
    { headers: this.getAuthHeaders() }
  ).pipe(
    tap(response => {
      if (!response.success) {
        // Clear tool and cache on auth failure
        this.currentTool.next(null);
        this.projectsCache.clear();
        throw new Error(response.message);
      }
    }),
    catchError(error => {
      console.error('Auth error:', error);
      // Clear tool and cache on error
      this.currentTool.next(null);
      this.projectsCache.clear();
      const errorMessage = error.error?.message || error.message || 'Authentication failed';
      return throwError(() => ({
        success: false,
        message: errorMessage,
        timestamp: new Date().toISOString()
      }));
    })
  );
}

// Modify your getProjects method to use tool-specific caching
getProjects(): Observable<any> {
  const currentTool = this.currentTool.value;
  if (!currentTool) {
    return throwError(() => new Error('No tool selected'));
  }

  return this.http.get<any>(
    `${this.apiUrl}/projects`,
    { 
      headers: this.getAuthHeaders(),
      params: { tool: currentTool }
    }
  ).pipe(
    tap(response => {
      console.log('Projects response:', response);
      if (!response.success) {
        throw new Error(response.message || 'Failed to load projects');
      }
    }),
    map(response => {
      // Cache just the entities array
      const entities = response.result?.entities || [];
      this.projectsCache.set(currentTool, entities);
      
      // Return the full response structure
      return {
        success: true,
        result: {
          entities: entities
        }
      };
    }),
    catchError(error => {
      console.error('Error loading projects:', error);
      this.projectsCache.delete(currentTool);
      return throwError(() => ({
        success: false,
        message: error.error?.message || error.message || 'Failed to load projects',
        timestamp: new Date().toISOString()
      }));
    })
  );
}

  getProjectDetails(projectCode: string): Observable<any> {
    if (!projectCode) {
      return throwError(() => new Error('Project code is required'));
    }

    return this.http.get<any>(
      `${this.apiUrl}/projects/${projectCode}`,
      { headers: this.getAuthHeaders() }
    ).pipe(
      tap(response => {
        console.log('Project details response:', response);
      }),
      catchError(this.handleError)
    );
  }

  syncData(projectCode: string): Observable<AuthResponse> {
    if (!projectCode) {
      return throwError(() => new Error('Project code is required'));
    }

    return this.http.post<AuthResponse>(
      `${this.apiUrl}/sync`,
      { projectCode },
      { headers: this.getAuthHeaders() }
    ).pipe(
      catchError(this.handleError)
    );
  }

  private mapProjects(response: any): TaskProject[] {
    if (!response?.result?.entities) {
      return [];
    }

    return response.result.entities
      .filter((project: any) => project != null)
      .map((project: any) => this.mapProject(project));
  }

  private mapProject(project: any): TaskProject {
    if (!project) {
      throw new Error('Invalid project data');
    }

    const defaultCounts: ProjectStats = {
      epics: 0,
      sprints: 0,
      releases: 0,
      resources: 0,
      tasks: {
        total: 0,
        active: 0
      }
    };

    const counts = project.counts || defaultCounts;

    return {
      title: project.name || project.title || 'Untitled Project',
      code: project.key || project.code || '',
      counts: {
        epics: this.safeNumber(counts.epics),
        sprints: this.safeNumber(counts.sprints),
        releases: this.safeNumber(counts.releases),
        resources: this.safeNumber(counts.resources),
        tasks: {
          total: this.safeNumber(counts.tasks?.total),
          active: this.safeNumber(counts.tasks?.active)
        }
      }
    };
  }

  private safeNumber(value: any): number {
    return typeof value === 'number' && !isNaN(value) ? value : 0;
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('API Error:', error);

    let errorMessage = 'An unexpected error occurred';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else {
      // Server-side error
      errorMessage = error.error?.message || error.message || errorMessage;
    }
    
    return throwError(() => ({
      success: false,
      message: errorMessage,
      error: error.message,
      timestamp: new Date().toISOString()
    }));
  }

  private logResponse(action: string, data: any): void {
    if (environment.production) return;
    
    console.group(`TaskManagementService: ${action}`);
    console.log('Response:', data);
    console.log('Timestamp:', new Date().toISOString());
    console.groupEnd();
  }
}