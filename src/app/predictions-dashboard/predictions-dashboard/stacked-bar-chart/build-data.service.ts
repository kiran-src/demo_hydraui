import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as Papa from 'papaparse';

export interface BuildData {
  duration: number;
  commitMessage: string;
  triggeredBy: string;
  buildId: number;
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
  requestedBy: string;
  lastChangedDate: string;
  lastChangedBy: string;
  repository: string;
  retainedByRelease: boolean;
  appendCommitMessageToRunName: boolean;
  url: string;
}

@Injectable({
  providedIn: 'root',
})
export class BuildDataService {
  getBuildData: any;
  constructor() {}

  parseCSV(file: File): Observable<BuildData[]> {
    return new Observable<BuildData[]>((observer) => {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (result: { data: any[]; }) => {
          const builds = result.data.map((row: any) => ({
            ...row,
            duration: parseFloat(row.duration),
            buildId: parseInt(row.buildId, 10),
            id: parseInt(row.id, 10),
            buildNumberRevision: parseInt(row.buildNumberRevision, 10),
            retainedByRelease: row.retainedByRelease === 'true',
            appendCommitMessageToRunName: row.appendCommitMessageToRunName === 'true',
          }));
          observer.next(builds);
          observer.complete();
        },
        error: (error: any) => observer.error(error),
      });
    });
  }

  getPredictionInsights(builds: BuildData[]): any {
    if (!builds.length) {
      return {
        averageDuration: 'N/A',
        successProbability: 'N/A',
        nextBuildTime: 'N/A',
      };
    }

    const buildDurations = builds.map((build) => build.duration);
    const successBuilds = builds.filter((build) => build.result === 'succeeded');

    const averageDuration = this.calculateMean(buildDurations).toFixed(2);
    const successProbability = ((successBuilds.length / builds.length) * 100).toFixed(2);
    const nextBuildTime = this.predictNextBuildTime(builds);

    return {
      averageDuration: `${averageDuration} minutes`,
      successProbability: `${successProbability}%`,
      nextBuildTime,
    };
  }

  private calculateMean(arr: number[]): number {
    return arr.reduce((a, b) => a + b, 0) / arr.length;
  }

  private predictNextBuildTime(builds: BuildData[]): string {
    const buildTimes = builds.map((build) => new Date(build.startTime).getTime());
    const sortedTimes = buildTimes.sort((a, b) => a - b);
    const timeDiffs = sortedTimes.slice(1).map((time, i) => time - sortedTimes[i]);
    const avgTimeBetweenBuilds = this.calculateMean(timeDiffs);

    const lastBuildTime = new Date(builds[builds.length - 1].startTime);
    const predictedNextBuild = new Date(lastBuildTime.getTime() + avgTimeBetweenBuilds);

    return predictedNextBuild.toLocaleString();
  }
}
