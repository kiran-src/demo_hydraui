// models/dashboard.model.ts
// models/dashboard.model.ts
export interface DashboardMetrics {
  activeTestRuns: {
    projectCount: number;
    count: number;
    trend: number;
    timeframe: string;
    history: Array<{
      date: string;
      value: number;
    }>;
  };
  totalTestCases: {
    projectCount: number;
    count: number;
    trend: number;
    timeframe: string;
  };
  distribution: {
    regression: number;
    smoke: number;
    other: number;
  };
  priority: {
    neutral: number;
    mustTest: number;
    high: number;
    medium: number;
  };
  automationRatio: number;
}

export interface MetricTrend {
  type: string;
  timeframe: string;
  data: Array<{
    date: string;
    total: number;
    passed: number;
    failed: number;
    skipped: number;
  }>;
}

export interface RunHistory {
  timeframe: string;
  history: Array<{
    executionId: string;
    startTime: string;
    endTime: string;
    status: string;
    result: number;
    totalSteps: number;
  }>;
}

export interface ActiveTestRunsData {
  count: number;
  trend: number;
  timeframe: string;
  projectCount: number;
  history: Array<{
    date: string;
    value: number;
  }>;
}

export interface TestDistributionData {
  regression: number;
  smoke: number;
  other: number;
}

export interface TestPriorityData {
  neutral: number;
  mustTest: number;
  high: number;
  medium: number;
}

export interface ChartOptions {
  width: number;
  height: number;
  color?: string;
  colors?: string[];
  area?: boolean;
  multiLine?: boolean;
  additionalOptions?: {
    showAxis?: boolean;
  };
}

export interface TestCasesData {
  count: number;
  trend: number;
  timeframe: string;
  projectCount: number;
}
