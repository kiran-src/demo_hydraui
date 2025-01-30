import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TestDataService {
  private dataUrl = 'assets/data/dashboard-data.json';
  private pipelineData = 'assets/data/pipe-data';
  
  constructor(private http: HttpClient) { }

  getDashboardStats(): Observable<any> {
    // return this.http.get(`${environment.apiUrl}/api/client/stats`)
    return this.http.get(this.dataUrl);
  }

  getPipelineStats(): Observable<any> {
    // return this.http.get(`${environment.apiUrl}/api/client/stats`)
    return this.http.get(this.pipelineData);
  }
}
