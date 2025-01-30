export interface MetricUpdate {
    type: 'METRICS_UPDATE' | 'TEST_RUN_UPDATE' | 'TEST_RESULT_UPDATE';
    data: any;
  }