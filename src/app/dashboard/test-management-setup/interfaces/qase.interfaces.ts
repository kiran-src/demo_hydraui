export interface QaseRunCounts {
    total: number;
    active: number;
  }
  
  export interface QaseDefectCounts {
    total: number;
    open: number;
  }
  
  export interface QaseProjectCounts {
    cases: number;
    suites: number;
    milestones: number;
    runs: QaseRunCounts;
    defects: QaseDefectCounts;
  }
  
  export interface QaseProject {
    title: string;
    code: string;
    counts: QaseProjectCounts;
  }