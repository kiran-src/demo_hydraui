import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
 
@Injectable({
  providedIn: 'root'
})
export class PipelineService {
  private azureOrg = 'Team-Catalyst';
  private azureProject = 'Project HYDRA';
  private azurePipelineId = 3;
  private azurePat = "5myq6kp7itzone5z2uki4mulr3qdtyhgljnkgtmzubeuaj5ebw2a";
 
 
  constructor(private http: HttpClient) {}
 
  // Start the pipeline
  triggerPipeline(repositoryUrl: string): Observable<any> {
    const url = `https://dev.azure.com/${this.azureOrg}/${this.azureProject}/_apis/pipelines/${this.azurePipelineId}/runs?api-version=6.0-preview.1`;
    const headers = new HttpHeaders({
      'Authorization': `Basic ${btoa(`:${this.azurePat}`)}`,
      'Content-Type': 'application/json'
    });
    const body = { resources: { repositories: { self: { refName: 'refs/heads/main', url: repositoryUrl } } } };
 
    return this.http.post(url, body, { headers }).pipe(
      catchError((error) => {
        console.error('Error starting pipeline:', error);
        throw error;
      })
    );
  }
 
  // Get pipeline status
  getPipelineStatus(buildId: number): Observable<any> {
    const url = `https://dev.azure.com/${this.azureOrg}/${this.azureProject}/_apis/build/builds/${buildId}/timeline?api-version=6.0`;
    const headers = new HttpHeaders({
      'Authorization': `Basic ${btoa(`:${this.azurePat}`)}`,
    });
 
    return this.http.get(url, { headers }).pipe(
      map(response => response),
      catchError((error) => {
        console.error('Error fetching pipeline status:', error);
        throw error;
      })
    );
  }
}
 