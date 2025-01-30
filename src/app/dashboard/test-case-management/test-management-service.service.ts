import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface TestCase {
  id: number;
  externalId: string;
  description: string;
  scenario: string;
  status: string;
  priority: string;
}

export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

@Injectable({
  providedIn: 'root'
})
export class TestManagementService {
  private apiUrl = `${environment.apiUrl}/api/test-management`;

  constructor(private http: HttpClient) {}

  getTestCases(page: number = 0, size: number = 10, search: string = ''): Observable<PaginatedResponse<TestCase>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    
    if (search) {
      params = params.set('search', search);
    }

    return this.http.get<PaginatedResponse<TestCase>>(`${this.apiUrl}/test-cases`, { params });
  }

  getTestCase(id: number): Observable<TestCase> {
    return this.http.get<TestCase>(`${this.apiUrl}/test-cases/${id}`);
  }

  createTestCase(testCase: Partial<TestCase>): Observable<TestCase> {
    return this.http.post<TestCase>(`${this.apiUrl}/test-cases`, testCase);
  }

  updateTestCase(id: number, testCase: Partial<TestCase>): Observable<TestCase> {
    return this.http.put<TestCase>(`${this.apiUrl}/test-cases/${id}`, testCase);
  }

  deleteTestCase(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/test-cases/${id}`);
  }

  syncTestCases(): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/sync`, {});
  }
}