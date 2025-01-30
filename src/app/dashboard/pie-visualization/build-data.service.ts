import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

export interface BuildData {
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
      'Authorization': `Basic ${btoa(`:${this.pat}`)}`
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

  getPipelineDurations(): Observable<{ date: string; duration: number }[]> {
    return this.getBuildData().pipe(
      map(builds => builds.map(build => ({
        date: build.startTime, // Or build.queueTime, depending on your requirement
        duration: this.calculateDuration(build.startTime, build.finishTime)
      })))
    );
  }

  private calculateDuration(startTime: string, finishTime: string): number {
    const start = new Date(startTime);
    const finish = new Date(finishTime);
    return Math.floor((finish.getTime() - start.getTime()) / 1000); // Duration in seconds
  }
}
