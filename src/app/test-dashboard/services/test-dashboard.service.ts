import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: string;
}

@Injectable({
  providedIn: 'root'
})
export class TestDashboardService {
  private readonly apiUrl = `${environment.apiUrl}/api/test-management/dashboard`;

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

  getAvailableProjects(): Observable<any[]> {
    return this.http.get<ApiResponse<any>>(`${this.apiUrl}/projects`, {
      headers: this.getAuthHeaders()
    }).pipe(
      map(response => {
        if (!response.success) {
          throw new Error(response.message || 'Failed to fetch projects');
        }
        return response.data;
      }),
      catchError(this.handleError)
    );
  }

  getDashboardMetrics(selectedProjectId?: string | null): Observable<any> {
    let url = this.apiUrl;
    if (selectedProjectId) {
      url += `?projectCode=${selectedProjectId}`;
    }
  
    return this.http.get<ApiResponse<any>>(url, {
      headers: this.getAuthHeaders()
    }).pipe(
      map(response => {
        if (!response.success) {
          throw new Error(response.message || 'Failed to fetch dashboard metrics');
        }
        return this.transformDashboardData(response.data);
      }),
      catchError(this.handleError)
    );
  }

  private transformDashboardData(data: any): any {
    return {
      testCasesOverview: {
        statusDistribution: data.testCasesOverview?.statusDistribution || [],
        priorityDistribution: data.testCasesOverview?.priorityDistribution || [],
        automationStats: data.testCasesOverview?.automationStats || {
          total: 0,
          automated: 0,
          automationRate: 0
        }
      },
      executionMetrics: {
        statusDistribution: data.executionMetrics?.statusDistribution || [],
        activeRuns: data.executionMetrics?.activeRuns || 0,
        trends: data.executionMetrics?.trends || []
      },
      defectAnalytics: {
        severityDistribution: data.defectAnalytics?.severityDistribution || [],
        priorityDistribution: data.defectAnalytics?.priorityDistribution || [],
        statusDistribution: data.defectAnalytics?.statusDistribution || [],
        trends: data.defectAnalytics?.trends || []
      },
      qualityMetrics: {
        executionSuccessRate: data.qualityMetrics?.executionSuccessRate || 0,
        defectDensity: data.qualityMetrics?.defectDensity || 0,
        criticalDefects: data.qualityMetrics?.criticalDefects || 0
      }
    };
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('API Error:', error);
    let errorMessage = 'An unexpected error occurred';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else {
      // Server-side error
      errorMessage = error.error?.message || `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    return throwError(() => ({
      success: false,
      message: errorMessage,
      error: error.message,
      timestamp: new Date().toISOString()
    }));
  }
}