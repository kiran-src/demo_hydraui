// test-execution.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { 
  PipelineConfig, BuildRun, BuildStatus, 
  AzureOrganization, AzureProject, AzurePipeline 
} from './pipeline.interface';
import { WebSocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class TestExecutionService {
  private apiUrl = `${environment.apiUrl}/api/client`;
  private currentBuildSubject = new BehaviorSubject<BuildRun | null>(null);
  private currentPat = new BehaviorSubject<string | null>(null);
  
  currentBuild$ = this.currentBuildSubject.asObservable();
  currentPat$ = this.currentPat.asObservable();

  constructor(
    private http: HttpClient,
    private webSocketService: WebSocketService
  ) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  validateAndSetPAT(pat: string): Observable<{ valid: boolean; organizations?: AzureOrganization[]; message?: string }> {
    return this.http.post<{ valid: boolean; organizations?: AzureOrganization[]; message?: string }>(
      `${this.apiUrl}/azure/validate`,
      { personalAccessToken: pat },
      { headers: this.getAuthHeaders() }
    ).pipe(
      map(response => {
        if (response.valid) {
          // Store PAT if validation successful
          this.currentPat.next(pat);
          
          // Check organizations
          if (response.organizations && response.organizations.length > 0) {
            return {
              valid: true,
              organizations: response.organizations
            };
          } else {
            throw new Error('No organizations available for this token');
          }
        } else {
          throw new Error(response.message || 'Token validation failed');
        }
      }),
      catchError(error => {
        let errorMessage: string;
        if (error.error?.message) {
          errorMessage = error.error.message;
        } else if (error.message) {
          errorMessage = error.message;
        } else {
          errorMessage = 'Failed to validate PAT';
        }
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  getProjects(organization: string): Observable<AzureProject[]> {
    const pat = this.currentPat.value;
    if (!pat) return throwError(() => new Error('No PAT available'));
  
    return this.http.get<AzureProject[]>(
      `${this.apiUrl}/azure/projects`,
      {
        headers: this.getAuthHeaders(),
        params: {
          organization,
          pat
        }
      }
    ).pipe(
      catchError(error => {
        const errorMessage = error.error?.message || error.message || 'Failed to fetch projects';
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  getPipelines(organization: string, project: string): Observable<AzurePipeline[]> {
    const pat = this.currentPat.value;
    if (!pat) return throwError(() => new Error('No PAT available'));
  
    return this.http.get<AzurePipeline[]>(
      `${this.apiUrl}/azure/pipelines`,
      {
        headers: this.getAuthHeaders(),
        params: {
          organization,
          project,
          pat
        }
      }
    ).pipe(
      catchError(error => {
        const errorMessage = error.error?.message || error.message || 'Failed to fetch pipelines';
        return throwError(() => new Error(errorMessage));
      })
    );
  }
  getPipelineDetails(organization: string, project: string, pipelineId: string): Observable<AzurePipeline> {
    const pat = this.currentPat.value;
    if (!pat) return throwError(() => new Error('No PAT available'));

    return this.http.get<AzurePipeline>(
      `${this.apiUrl}/azure/pipelines/${pipelineId}`,
      {
        headers: this.getAuthHeaders(),
        params: {
          organization,
          project,
          pat
        }
      }
    );
  }

  savePipelineConfig(config: PipelineConfig): Observable<PipelineConfig> {
    return this.http.post<PipelineConfig>(
      `${this.apiUrl}/pipeline/config`,
      config,
      { headers: this.getAuthHeaders() }
    ).pipe(
      catchError(error => throwError(() => new Error(error.error?.message || 'Failed to save pipeline configuration')))
    );
  }

  executePipeline(configId: number): Observable<BuildRun> {
    return this.http.post<BuildRun>(
      `${this.apiUrl}/pipeline/execute/${configId}`,
      {},
      { headers: this.getAuthHeaders() }
    ).pipe(
      tap(buildRun => {
        this.currentBuildSubject.next(buildRun);
        if (this.currentPat.value) {
          this.webSocketService.connect({
            buildRunId: buildRun.buildRunId,
            azurePat: this.currentPat.value
          });
        }
      }),
      catchError(error => throwError(() => new Error(error.error?.message || 'Failed to execute pipeline')))
    );
  }

  cancelBuild(buildId: number): Observable<BuildRun> {
    return this.http.post<BuildRun>(
      `${this.apiUrl}/pipeline/builds/${buildId}/cancel`,
      {},
      { headers: this.getAuthHeaders() }
    ).pipe(
      catchError(error => throwError(() => new Error(error.error?.message || 'Failed to cancel build')))
    );
  }

  disconnectWebSocket(): void {
    this.webSocketService.disconnect();
    this.currentBuildSubject.next(null);
  }

  clearState(): void {
    this.currentPat.next(null);
    this.currentBuildSubject.next(null);
    this.webSocketService.disconnect();
  }
}