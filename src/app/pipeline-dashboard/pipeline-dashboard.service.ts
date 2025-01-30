import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { WebSocketService, PipelineWebSocketConfig } from './websocket.service';
import { WebSocketPipelineMessage } from './pipeline.types';

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: string;
}

export interface AzurePipelineResponse {
  count: number;
  value: Array<{
    id: number;
    name: string;
    url: string;
    _links: {
      web: { href: string };
    };
  }>;
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
 
 export interface PipelineLog {
  timestamp: Date;
  level: string; 
  message: string;
 }

export interface PipelineConfig {
  id?: number;
  versionManager: 'azure' | 'gitlab';
  organization?: string;
  project: string;
  pipelineId: string;
  pipelineName?: string;
  repositoryName?: string;
  branch?: string;
  personalAccessToken: string;
  status?: string;
  active?: boolean;
}

export interface PipelineStatus {
  pipelineId: string;
  buildRunId?: number;
  status: string;
  isRunning: boolean;
  lastRun?: Date;
  logs: PipelineLog[];
}

export interface PipelineMetrics {
  statusDistribution: Array<{ status: string; count: number }>;
  activeRuns: number;
  trends: Array<{
    date: string;
    total: number;
    passed: number;
    failed: number;
    skipped: number;
  }>;
  resourceMetrics: {
    agentName: string;
    agentPool: string;
    cpuUsage: number;
    memoryUsage: number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class PipelineDashboardService {
  private readonly apiUrl = `${environment.apiUrl}/api/pipelines`;
  private pipelineUpdatesSubject = new Subject<PipelineUpdate>();
  pipelineUpdates$ = this.pipelineUpdatesSubject.asObservable();
   
  constructor(
    private http: HttpClient,
    private webSocketService: WebSocketService
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

  getPipelineConfigs(): Observable<PipelineConfig[]> {
    return this.http.get<ApiResponse<PipelineConfig[]>>(`${this.apiUrl}/configs`, {
      headers: this.getAuthHeaders()
    }).pipe(
      map(response => {
        if (!response.success) {
          throw new Error(response.message || 'Failed to fetch pipeline configurations');
        }
        return response.data;
      }),
      catchError(this.handleError)
    );
  }

  createPipelineConfig(config: PipelineConfig): Observable<PipelineConfig> {
    return this.http.post<ApiResponse<PipelineConfig>>(`${this.apiUrl}/configs`, config, {
      headers: this.getAuthHeaders()
    }).pipe(
      map(response => response.data)
    );
  }
  
  getPipelineMetrics(pipelineId: number): Observable<PipelineMetrics> {
    return this.http.get<ApiResponse<PipelineMetrics>>(
      `${this.apiUrl}/configs/${pipelineId}/metrics`, 
      { headers: this.getAuthHeaders() }
    ).pipe(
      map(response => {
        if (!response.success) {
          throw new Error(response.message || 'Failed to fetch pipeline metrics');
        }
        return this.transformPipelineData(response.data);
      }),
      catchError(this.handleError)
    );
  }

  triggerPipeline(pipelineId: string): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/configs/${pipelineId}/trigger`,
      {},
      { headers: this.getAuthHeaders() }
    ).pipe(
      tap(response => {
        console.log('Pipeline trigger response:', response);
      }),
      catchError(error => {
        console.error('Pipeline trigger error:', error);
        return throwError(() => error);
      })
    );
  }

  initializeWebSocket(buildRunId: number, pipelineId: string): void {
    console.log('Initializing WebSocket:', { buildRunId, pipelineId });

    this.webSocketService
      .connect({ buildRunId })
      .subscribe({
        next: (message) => {
          console.log('PipelineService received message:', message);
          const buildUpdate = message.data as any;

          const pipelineUpdate: PipelineUpdate = {
            buildRunId: buildUpdate.buildRunId,
            pipelineId: pipelineId,
            status: buildUpdate.status,
            isRunning: buildUpdate.status === 'RUNNING',
            logs: buildUpdate.logs,
            runTime: buildUpdate.runTime,
            endTime: buildUpdate.endTime
          };

          console.log('Emitting pipeline update:', pipelineUpdate);
          this.pipelineUpdatesSubject.next(pipelineUpdate);
        },
        error: (error) => {
          console.error('WebSocket error:', error);
          // Try to reconnect on error
          setTimeout(() => {
            console.log('Attempting to reconnect...');
            this.initializeWebSocket(buildRunId, pipelineId);
          }, 5000);
        },
        complete: () => {
          console.log('WebSocket connection completed');
        }
      });
  }
  
  private transformPipelineData(data: PipelineMetrics): PipelineMetrics {
    return {
      statusDistribution: data.statusDistribution || [],
      activeRuns: data.activeRuns || 0,
      trends: data.trends || [],
      resourceMetrics: {
        agentName: data.resourceMetrics?.agentName || '',
        agentPool: data.resourceMetrics?.agentPool || '',
        cpuUsage: data.resourceMetrics?.cpuUsage || 0,
        memoryUsage: data.resourceMetrics?.memoryUsage || 0
      }
    };
  }

  fetchProjects(config: Partial<PipelineConfig>): Observable<any[]> {
    return this.http.post<ApiResponse<any>>(`${this.apiUrl}/configs/fetch-projects`, config, {
      headers: this.getAuthHeaders()
    }).pipe(
      map(response => {
        if (!response.success) {
          throw new Error(response.message || 'Failed to fetch projects');
        }
        return response.data.value || [];
      }),
      catchError(this.handleError)
    );
  }

  getPipelineRuns(pipelineId: number): Observable<any[]> {
    return this.http.get<ApiResponse<any[]>>(`${this.apiUrl}/configs/${pipelineId}/runs`, {
      headers: this.getAuthHeaders()
    }).pipe(
      map(response => {
        if (!response.success) {
          throw new Error(response.message || 'Failed to fetch pipeline runs');
        }
        return response.data;
      }),
      catchError(this.handleError)
    );
  }

  fetchPipelines(config: Partial<PipelineConfig>): Observable<any[]> {
    return this.http.post<ApiResponse<any>>(`${this.apiUrl}/configs/fetch-pipelines`, config, {
      headers: this.getAuthHeaders()
    }).pipe(
      map(response => {
        console.log('Raw backend response:', response);
        // Return data array directly since backend already transformed it
        return response.data || [];
      }),
      catchError(error => {
        console.error('Pipeline fetch error:', error);
        return throwError(() => new Error(error.message || 'Failed to fetch pipelines'));
      })
    );
  }  
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('API Error:', error);
    let errorMessage = 'An unexpected error occurred';

    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = error.error?.message || 
        (error.status === 401 ? 'Authentication failed' : `Error Code: ${error.status}`);
    }

    return throwError(() => new Error(errorMessage));
  }
}