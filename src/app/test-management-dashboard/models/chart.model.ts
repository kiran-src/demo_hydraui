// models/chart.model.ts
export interface TimelineData {
  date: string | Date;
  value: number;
}

export interface ChartOptions {
  width?: number;
  height?: number;
  color?: string;
  colors?: string[];
  area?: boolean;
  multiLine?: boolean;
  showLabels?: boolean;
  showAxis?: boolean;
  smoothing?: number;
  margin?: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
}

export interface PieChartData {
  label: string;
  value: number;
}

export interface ChartDimensions {
  width: number;
  height: number;
  margin: Required<ChartOptions['margin']>;
}

export interface ChartColors {
  primary: string;
  secondary: string[];
  background: string;
  text: string;
}

export interface ChartInteractionConfig {
  enableHover?: boolean;
  enableClick?: boolean;
  enableTooltip?: boolean;
  tooltipFormat?: (d: any) => string;
}

export type ChartType = 'line' | 'pie' | 'bar' | 'area';