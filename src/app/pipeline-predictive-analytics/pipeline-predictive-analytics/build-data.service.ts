import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

export interface BuildData {
  commitMessage: string;
  triggeredBy: string;
  buildId: any;
  id: number;
  buildNumber: string;
  status: string;
  result: string;
  queueTime: string;
  startTime: string;
  finishTime: string;
  buildNumberRevision: number;
  priority: string;
  reason: string;
  requestedBy: {
    displayName: string;
    url: string;
    imageUrl: string;
    id: string;
  };
  lastChangedDate: string;
  lastChangedBy: {
    displayName: string;
    url: string;
    imageUrl: string;
    id: string;
  };
  repository: {
    id: string;
    type: string;
    clean: boolean | null;
    checkoutSubmodules: boolean;
  };
  retainedByRelease: boolean;
  appendCommitMessageToRunName: boolean;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class BuildDataService {
  private apiUrl = 'https://dev.azure.com/Team-Catalyst/Project%20HYDRA/_apis/build/builds/?api-version=7.1';
  private pat = 'clsssm43mnx6muok2rfmiidc4ldlbvg6hdmnr57it332dgemxuza'; // Replace with your PAT

  constructor(private http: HttpClient) {}

  getBuildData(): Observable<BuildData[]> {
    const headers = new HttpHeaders({
      'Authorization': `Basic ${btoa(`:${this.pat}`)}` // Basic auth with PAT
    });

    return this.http.get<{ value: BuildData[] }>(this.apiUrl, { headers }).pipe(
      map(response => response.value.map(build => ({
        ...build,
        url: `https://dev.azure.com/Team-Catalyst/bb93b9c5-c08a-4aa1-aa38-00b94ad0a045/_build/results?buildId=${build.id}`
      }))),
      catchError(error => {
        console.error('Error fetching build data', error);
        return of([]); // Return an empty array on error
      })
    );
  }
}
