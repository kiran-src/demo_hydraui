import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TestManagementService {
  private apiUrl = `${environment.apiUrl}/api/test-management`;

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    if (token) {
      return new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      });
    } else {
      throw new Error('No token found');
    }
  }

  getAuthorizationUrl(toolName: string): Observable<string> {
    return this.http.get(`${this.apiUrl}/auth-url`, {
      params: { toolName },
      headers: this.getAuthHeaders(),
      responseType: 'text'
    }).pipe(
      catchError(this.handleError)
    );
  }

  handleCallback(code: string, state: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/callback`, { 
      params: { code, state }, 
      headers: this.getAuthHeaders(), 
      responseType: 'text' 
    }).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  checkAuthStatus(): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/auth-status`, { 
      headers: this.getAuthHeaders() 
    }).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  syncTestData(): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/sync`, {}, { 
      headers: this.getAuthHeaders() 
    }).pipe(
      catchError(this.handleError)
    );
  }

  createProject(projectData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/project`, projectData, { headers: this.getAuthHeaders() })
      .pipe(
        catchError(this.handleError)
      );
  }

  getTestCases(projectId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/test-cases`, { params: { projectId }, headers: this.getAuthHeaders() })
      .pipe(
        catchError(this.handleError)
      );
  }

  createTestCase(testCaseData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/test-cases`, testCaseData, { 
      headers: this.getAuthHeaders() 
    }).pipe(
      catchError(this.handleError)
    );
  }

  updateTestCase(testCaseId: string, testCaseData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/test-cases/${testCaseId}`, testCaseData, { headers: this.getAuthHeaders() })
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteTestCase(testCaseId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/test-cases/${testCaseId}`, { headers: this.getAuthHeaders() })
      .pipe(
        catchError(this.handleError)
      );
  }

  getTestExecutions(projectId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/test-executions`, { params: { projectId }, headers: this.getAuthHeaders() })
      .pipe(
        catchError(this.handleError)
      );
  }

  createTestExecution(testExecutionData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/test-executions`, testExecutionData, { headers: this.getAuthHeaders() })
      .pipe(
        catchError(this.handleError)
      );
  }
  searchTestCases(criteria: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/test-cases`, {
      params: criteria,
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  


  updateTestExecution(testExecutionId: string, testExecutionData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/test-executions/${testExecutionId}`, testExecutionData, { headers: this.getAuthHeaders() })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      errorMessage = `Server-side error: ${error.status} ${error.message}`;
      if (error.error && typeof error.error === 'object') {
        errorMessage += ` Details: ${JSON.stringify(error.error)}`;
      }
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}