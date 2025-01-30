import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AuthType, ToolConfig, TOOL_CONFIGS } from './interfaces/auth-types';
import { QaseProject, QaseProjectCounts } from './interfaces/qase.interfaces';


export interface SyncResponse {
  success: boolean;
  message: string;
  timestamp?: string;
  error?: string;
}


@Injectable({
  providedIn: 'root'
})
export class TestManagementService {
  private apiUrl = `${environment.apiUrl}/api/test-management`;
  private currentTool: string | null = null;

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
  }

  getAuthorizationUrl(toolName: string): Observable<string> {
    const toolConfig = TOOL_CONFIGS[toolName];
    if (!toolConfig) {
      return throwError(() => new Error('Unsupported tool'));
    }

    if (toolConfig.authType !== AuthType.OAUTH) {
      return throwError(() => 
        new Error(`${toolConfig.displayName} uses ${toolConfig.authType} authentication`)
      );
    }

    return this.http.get<{url: string}>(`${this.apiUrl}/auth-url`, {
      params: { toolName },
      headers: this.getAuthHeaders()
    }).pipe(
      map(response => response.url),
      catchError(this.handleError)
    );
  }

  configureAuth(toolName: string, credentials: any): Observable<any> {
    if (!toolName || !TOOL_CONFIGS[toolName]) {
      return throwError(() => new Error('Unsupported tool'));
    }

    let requestBody: any = {
      toolName: toolName
    };

    switch (toolName) {
      case 'xray':
        requestBody = {
          ...requestBody,
          domain: credentials.domain,
          email: credentials.email,  // Added email field
          apiKey: credentials.apiKey,
          toolName: 'xray'
        };
        break;
      
      case 'qase':
        requestBody = {
          ...requestBody,
          apiKey: credentials.apiKey
        };
        break;
      
      case 'testrail':
        requestBody = {
          ...requestBody,
          username: credentials.username,
          password: credentials.password
        };
        break;
    }

    // Log the request (safely redacting sensitive info)
    console.log('Sending auth request:', {
      url: `${this.apiUrl}/configure`,
      body: {
        ...requestBody,
        apiKey: '[REDACTED]',
        password: requestBody.password ? '[REDACTED]' : undefined
      }
    });

    return this.http.post<any>(`${this.apiUrl}/configure`, requestBody, {
      headers: this.getAuthHeaders()
    }).pipe(
      map(response => {
        console.log('Auth response:', response);
        if (!response.success && response.message) {
          throw new Error(response.message);
        }
        return response;
      }),
      catchError(error => {
        console.error('Auth error:', error);
        let errorMessage = 'Authentication failed';
        
        if (error.error?.message) {
          errorMessage = error.error.message;
        } else if (error.message) {
          errorMessage = error.message;
        }
        
        return throwError(() => ({
          success: false,
          message: errorMessage,
          error: error.message || 'Unknown error',
          timestamp: new Date().toISOString()
        }));
      })
    );
  }

  getSavedProject(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/selected-project`, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(error => {
        console.error('Error getting saved project:', error);
        return of(null);
      })
    );
  }
  
  checkAuthStatus(): Observable<boolean> {
    return this.http.get<{authenticated: boolean}>(`${this.apiUrl}/auth-status`, {
      headers: this.getAuthHeaders()
    }).pipe(
      map(response => response.authenticated),
      retry(3),
      catchError(this.handleError)
    );
  }

  setProjectConfig(toolName: string, config: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/project-config`, {
      toolName,
      ...config
    }, {
      headers: this.getAuthHeaders()
    });
  }


  syncTestData(): Observable<SyncResponse> {
    return this.http.post<SyncResponse>(`${this.apiUrl}/sync`, {}, {
      headers: this.getAuthHeaders(),
    }).pipe(
      map(response => {
        if (!response) {
          throw new Error('Empty response received from server');
        }
        // Ensure the response matches our expected format
        return {
          success: response.success ?? false,
          message: response.message ?? 'No message provided',
          timestamp: response.timestamp,
          error: response.error
        };
      }),
      catchError(error => {
        // Handle the case where the response is valid but indicates failure
        if (error instanceof HttpErrorResponse) {
          if (error.error && typeof error.error === 'object') {
            return throwError(() => ({
              success: false,
              message: error.error.message || 'Sync failed',
              error: error.error.error || error.message,
              timestamp: new Date().toISOString()
            }));
          }
        }
        return throwError(() => ({
          success: false,
          message: 'Sync failed',
          error: error.message,
          timestamp: new Date().toISOString()
        }));
      })
    );
  }

  authenticateWithApiKey(toolName: string, apiKey: string): Observable<boolean> {
    return this.configureAuth(toolName, { apiKey });
  }

  authenticateWithBasic(toolName: string, username: string, password: string): Observable<boolean> {
    return this.configureAuth(toolName, { 
      apiKey: `${username}:${password}` // Format for TestRail
    });
  }

  handleOAuthCallback(code: string, state: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/callback`, {
      params: { code, state },
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred';
    let errorResponse: SyncResponse = {
      success: false,
      message: errorMessage
    };

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorResponse = {
        success: false,
        message: `Client error: ${error.error.message}`,
        error: error.error.message,
        timestamp: new Date().toISOString()
      };
    } else {
      // Server-side error
      errorResponse = {
        success: false,
        message: `Server error: ${error.status} ${error.message}`,
        error: error.error?.message || error.message,
        timestamp: new Date().toISOString()
      };

      if (error.error && typeof error.error === 'object') {
        errorResponse.error = JSON.stringify(error.error);
      }
    }

    console.error('API Error:', errorResponse);
    return throwError(() => errorResponse);
  }

  getToolConfig(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/tool-config`, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(error => {
        console.error('Error getting tool config:', error);
        return of(null);
      })
    );
  }
  // test-management.service.ts

getProjects(): Observable<any[]> {
  return this.http.get<any>(`${this.apiUrl}/projects`, {
    headers: this.getAuthHeaders()
  }).pipe(
    map(response => {
      if (response?.result?.entities) {
        return response.result.entities.map((project: any) => ({
          title: project.name || project.title,
          code: project.key || project.code,
          counts: {
            cases: project.counts?.cases || 0,
            suites: project.counts?.suites || 0,
            milestones: project.counts?.milestones || 0,
            runs: {
              total: project.counts?.runs?.total || 0,
              active: project.counts?.runs?.active || 0
            },
            defects: {
              total: project.counts?.defects?.total || 0,
              open: project.counts?.defects?.open || 0
            }
          }
        }));
      }
      return [];
    }),
    catchError(error => {
      console.error('Error fetching projects:', error);
      let errorMessage = 'Failed to load projects';
      
      if (error.error?.message) {
        errorMessage = error.error.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      return throwError(() => new Error(errorMessage));
    })
  );
}

getProjectDetails(projectCode: string): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/projects/${projectCode}`, {
    headers: this.getAuthHeaders()
  }).pipe(
    map(response => {
      if (response?.result) {
        const project = response.result;
        return {
          title: project.name || project.title,
          code: project.key || project.code,
          counts: {
            cases: project.counts?.cases || 0,
            suites: project.counts?.suites || 0,
            milestones: project.counts?.milestones || 0,
            runs: {
              total: project.counts?.runs?.total || 0,
              active: project.counts?.runs?.active || 0
            },
            defects: {
              total: project.counts?.defects?.total || 0,
              open: project.counts?.defects?.open || 0
            }
          }
        };
      }
      throw new Error('Invalid project data received');
    }),
    catchError(error => {
      console.error('Error fetching project details:', error);
      return throwError(() => error);
    })
  );
}
  setupWebhook(projectCode: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/webhook/setup/${projectCode}`, {}, {
      headers: this.getAuthHeaders()
    });
  }

  
}