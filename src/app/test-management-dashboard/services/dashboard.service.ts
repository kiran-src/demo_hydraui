// dashboard.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { 
  ActiveTestRunsData, 
  DashboardMetrics, 
  MetricTrend, 
  RunHistory,
  TestDistributionData, 
  TestPriorityData 
} from '../models/dashboard.model';
import { WebSocketService } from './websocket.service';
import { MetricsTransformerService } from './metrics-transformer.service';
import { WebSocketUpdate } from '../models/websocket.model';

export interface Project {
  id: number;
  name: string;
  selected: boolean;
}
@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = `${environment.apiUrl}/api/client/dashboard`;
  private webSocketSubject = new BehaviorSubject<WebSocketUpdate | null>(null);
  
  // Expose the WebSocket updates as an Observable
  public webSocketUpdates$ = this.webSocketSubject.asObservable();
  
  constructor(
    private http: HttpClient,
    private webSocketService: WebSocketService,
    private metricsTransformer: MetricsTransformerService
  ) {
    this.initializeWebSocketUpdates();
  }
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    if (!token) {
      console.warn('No auth token found');
      throw new Error('No authentication token found');
    }
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiUrl}/projects`, {
      headers: this.getAuthHeaders()
    }).pipe(
      map(projects => projects.map(project => ({
        ...project,
        selected: false // default selected state
      }))),
      catchError(error => {
        console.error('Error fetching projects:', error);
        return throwError(() => new Error('Failed to fetch projects'));
      })
    );
  }

  private initializeWebSocketUpdates() {
    this.webSocketService.messages$.subscribe(message => {
      if (message) {
        this.webSocketSubject.next({
          type: message.type,
          data: message.payload,
          timestamp: new Date()
        });
      }
    });
  }

  getActiveTestRuns(): Observable<ActiveTestRunsData> {
    return this.getDashboardMetrics().pipe(
      map(metrics => this.metricsTransformer.transformActiveTestRuns(metrics)),
      mergeMap(testRuns => this.getMetricTrends('runs', '30d').pipe(
        map(trends => ({
          ...testRuns,
          history: trends.data.map((d: { date: any; total: any; }) => ({
            date: d.date,
            value: d.total
          }))
        }))
      ))
    );
  }

  getDashboardMetrics(projectId?: string): Observable<DashboardMetrics> {
    console.log('Fetching dashboard metrics');
    
    const url = projectId ? 
      `${this.apiUrl}/metrics?projectId=${projectId}` : 
      `${this.apiUrl}/metrics`;

    return this.http.get<DashboardMetrics>(url, {
      headers: this.getAuthHeaders()
    }).pipe(
      tap({
        next: (response) => console.log('Received metrics:', response),
        error: (error) => console.error('Error fetching metrics:', error)
      }),
      catchError(error => {
        console.error('Dashboard metrics error:', error);
        // Check if it's an authentication error
        if (error.status === 401) {
          // Handle authentication error
          this.handleAuthError();
        }
        return throwError(() => new Error(
          `Failed to fetch dashboard metrics: ${error.message}`
        ));
      })
    );
  }

  private handleAuthError() {
    // Redirect to login or refresh token
    console.log('Authentication error, handling...');
  }
  getMetricTrends(metricType: string, timeframe: string): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/trends/${metricType}`, 
      {
        headers: this.getAuthHeaders(),
        params: { timeframe }
      }
    ).pipe(
      catchError(error => {
        console.error('Error fetching trends:', error);
        return throwError(() => new Error(
          `Failed to fetch metric trends: ${error.message}`
        ));
      })
    );
  }

  getTestDistribution(): Observable<TestDistributionData> {
    return this.getDashboardMetrics().pipe(
      map(metrics => this.metricsTransformer.transformTestDistribution(metrics))
    );
  }

  getTestPriority(): Observable<TestPriorityData> {
    return this.getDashboardMetrics().pipe(
      map(metrics => this.metricsTransformer.transformTestPriority(metrics))
    );
  }

  getAutomationRatio(): Observable<number> {
    return this.getDashboardMetrics().pipe(
      map(metrics => this.metricsTransformer.transformAutomationRatio(metrics))
    );
  }

  getRunHistory(timeframe: string): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/run-history`,
      {
        headers: this.getAuthHeaders(),
        params: { timeframe }
      }
    ).pipe(
      catchError(error => {
        console.error('Error fetching run history:', error);
        return throwError(() => new Error(
          `Failed to fetch run history: ${error.message}`
        ));
      })
    );
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    let errorMessage = 'An unknown error occurred';
    
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.error.message || error.message}`;
    }
    
    return throwError(() => new Error(errorMessage));
  }
}