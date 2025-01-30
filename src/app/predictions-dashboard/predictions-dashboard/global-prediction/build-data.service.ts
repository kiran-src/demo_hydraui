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

  // New method to calculate prediction insights based on the build data
  getPredictionInsights(builds: BuildData[]): any {
    if (!builds.length) {
      return {
        averageDuration: 'N/A',
        successProbability: 'N/A',
        nextBuildTime: 'N/A'
      };
    }

    const buildDurations = builds.map(build => {
      const start = new Date(build.startTime).getTime();
      const finish = new Date(build.finishTime).getTime();
      return (finish - start) / 1000 / 60; // Convert to minutes
    });

    const successBuilds = builds.filter(build => build.result === 'succeeded');
    
    // Calculate prediction insights
    const averageDuration = this.calculateMean(buildDurations).toFixed(2);
    const successProbability = builds.length > 0 
      ? ((successBuilds.length / builds.length) * 100).toFixed(2) 
      : '0';

    const nextBuildTime = this.predictNextBuildTime(builds);

    return {
      averageDuration: `${averageDuration} minutes`,
      successProbability: `${successProbability}%`,
      nextBuildTime
    };
  }

  private calculateMean(arr: number[]): number {
    return arr.reduce((a, b) => a + b, 0) / arr.length;
  }

  private predictNextBuildTime(builds: BuildData[]): string {
    const buildTimes = builds.map(build => new Date(build.startTime).getTime());
    const sortedTimes = buildTimes.sort((a, b) => a - b);
    const timeDiffs = sortedTimes.slice(1).map((time, i) => time - sortedTimes[i]);
    const avgTimeBetweenBuilds = this.calculateMean(timeDiffs);

    const lastBuildTime = new Date(builds[builds.length - 1].startTime);
    const predictedNextBuild = new Date(lastBuildTime.getTime() + avgTimeBetweenBuilds);

    return predictedNextBuild.toLocaleTimeString(); // Returning only time for simplicity
  }
}
