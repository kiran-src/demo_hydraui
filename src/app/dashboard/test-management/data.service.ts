import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root',
})
export class DataService {
  private jsonUrl = 'assets/updated_project_data.json'; // URL to JSON file or API endpoint
 
  constructor(private http: HttpClient) {}
 
  getProjectSuccessData(): Observable<any[]> {
    // Fetch the JSON data directly as an observable array
    return this.http.get<any[]>(this.jsonUrl);
  }
}