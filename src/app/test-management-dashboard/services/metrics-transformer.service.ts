import { Injectable } from '@angular/core';
import { DashboardMetrics, ActiveTestRunsData, TestDistributionData, TestPriorityData } from '../models/dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class MetricsTransformerService {
  transformActiveTestRuns(metrics: DashboardMetrics): ActiveTestRunsData {
    return {
      count: metrics.activeTestRuns.count,
      trend: metrics.activeTestRuns.trend,
      timeframe: metrics.activeTestRuns.timeframe,
      projectCount: 0, // This should come from a separate API call if needed
      history: [] // This should come from getMetricTrends API call
    };
  }

  transformTestDistribution(metrics: DashboardMetrics): TestDistributionData {
    return metrics.distribution;
  }

  transformTestPriority(metrics: DashboardMetrics): TestPriorityData {
    return metrics.priority;
  }

  transformAutomationRatio(metrics: DashboardMetrics): number {
    return metrics.automationRatio;
  }

  transformTestCasesCount(metrics: DashboardMetrics): {
    count: number;
    trend: number;
    timeframe: string;
    projectCount: number;
    newCases: number;
    updatedCases: number;
    history: Array<{ date: string; value: number; }>;
  } {
    return {
      count: metrics.totalTestCases.count,
      trend: metrics.totalTestCases.trend,
      timeframe: metrics.totalTestCases.timeframe,
      projectCount: 0, // This should come from a separate API call if needed
      newCases: 0, // This should come from a separate API call if needed
      updatedCases: 0, // This should come from a separate API call if needed
      history: [] // This should come from getMetricTrends API call
    };
  }
}
