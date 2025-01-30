export interface WebSocketUpdate {
    type: 'activeRuns' | 'metrics' | 'testRun' | 'alert';
    data: any;
    timestamp: Date;
  }