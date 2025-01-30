import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DashboardState, ProjectMetrics, FilterOptions, TaskStatus, TimeRangeOption } from '../models/dashboard.types';
import { TaskDashboardService } from './task-dashboard.service';
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class DashboardStateService {
  private readonly initialState: DashboardState = {
    selectedProjectId: null,
    timeRange: 'last30Days' as TimeRangeOption,
    filters: {
      status: [],
      priority: [],
      assignee: []
    },
    refreshInterval: 300000, // 5 minutes
    lastRefresh: null,
    isLoading: false,
    error: null
  };

  private state = new BehaviorSubject<DashboardState>(this.initialState);
  private autoRefreshTimer: any;
  private destroy$ = new Subject<void>();
  private cachedMetrics: Map<string, ProjectMetrics[]> = new Map();

  constructor(private dashboardService: TaskDashboardService) {
    this.startAutoRefresh();
  }

  // State Getters
  getState(): Observable<DashboardState> {
    return this.state.asObservable();
  }

  getCurrentState(): DashboardState {
    return this.state.getValue();
  }

  // State Setters
  setSelectedProject(projectId: string | null) {
    this.updateState({ selectedProjectId: projectId });
    if (projectId) {
      this.refreshDashboard();
    }
  }

  setTimeRange(timeRange: TimeRangeOption) {
    this.updateState({ timeRange });
    this.refreshDashboard();
  }

  setFilters(filters: FilterOptions) {
    this.updateState({ filters });
    this.refreshDashboard();
  }

  setRefreshInterval(interval: number) {
    this.updateState({ refreshInterval: interval });
    this.restartAutoRefresh();
  }

  setLoading(isLoading: boolean) {
    this.updateState({ isLoading });
  }

  setError(error: string | null) {
    this.updateState({ error });
  }

  // State Management
  private updateState(newState: Partial<DashboardState>) {
    this.state.next({
      ...this.getCurrentState(),
      ...newState
    });
  }

  // Auto Refresh
  private startAutoRefresh() {
    const { refreshInterval } = this.getCurrentState();
    if (refreshInterval > 0) {
      this.autoRefreshTimer = setInterval(() => {
        this.refreshDashboard();
      }, refreshInterval);
    }
  }

  private stopAutoRefresh() {
    if (this.autoRefreshTimer) {
      clearInterval(this.autoRefreshTimer);
    }
  }

  private restartAutoRefresh() {
    this.stopAutoRefresh();
    this.startAutoRefresh();
  }

  // Clean up
  destroy() {
    this.stopAutoRefresh();
    this.destroy$.next();
    this.destroy$.complete();
    this.state.complete();
  }

  // Dashboard Actions
  refreshDashboard() {
    const currentState = this.getCurrentState();
    if (!currentState.selectedProjectId) return;

    this.updateState({
      lastRefresh: new Date(),
      isLoading: true,
      error: null
    });

    this.dashboardService.getDashboardMetrics(currentState.selectedProjectId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          // Cache the metrics for trend calculations
          this.cacheMetrics(currentState.selectedProjectId!, data);
          this.updateState({
            isLoading: false,
            error: null
          });
        },
        error: (error) => {
          this.updateState({
            isLoading: false,
            error: error.message || 'Failed to refresh dashboard'
          });
        }
      });
  }

  private cacheMetrics(projectId: string, metrics: any) {
    const cached = this.cachedMetrics.get(projectId) || [];
    cached.push(metrics);
    // Keep last 12 snapshots for trend analysis
    if (cached.length > 12) {
      cached.shift();
    }
    this.cachedMetrics.set(projectId, cached);
  }

  resetFilters() {
    this.updateState({
      filters: this.initialState.filters
    });
    this.refreshDashboard();
  }

  async exportDashboard(format: 'pdf' | 'excel') {
    const currentState = this.getCurrentState();
    if (!currentState.selectedProjectId) return;

    try {
      const data = await this.dashboardService
        .getDashboardMetrics(currentState.selectedProjectId)
        .toPromise();

      if (format === 'pdf') {
        await this.exportToPdf(data);
      } else {
        await this.exportToExcel(data);
      }
    } catch (error) {
      this.setError('Failed to export dashboard');
    }
  }

  private async exportToPdf(data: any) {
    const doc = new jsPDF();
    const timestamp = new Date().toISOString().split('T')[0];
    
    // Add header
    doc.setFontSize(20);
    doc.text('Dashboard Report', 20, 20);
    doc.setFontSize(12);
    doc.text(`Generated: ${timestamp}`, 20, 30);

    // Add project overview
    doc.setFontSize(16);
    doc.text('Project Overview', 20, 50);
    doc.setFontSize(12);
    
    // Add metrics
    let yPos = 70;
    Object.entries(data.metrics).forEach(([key, value]) => {
      doc.text(`${key}: ${value}`, 20, yPos);
      yPos += 10;
    });

    // Save the PDF
    doc.save(`dashboard-report-${timestamp}.pdf`);
  }

  private async exportToExcel(data: any) {
    const worksheet = XLSX.utils.json_to_sheet(this.flattenMetrics(data));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Dashboard');
    
    const timestamp = new Date().toISOString().split('T')[0];
    XLSX.writeFile(workbook, `dashboard-report-${timestamp}.xlsx`);
  }

  private flattenMetrics(data: any, prefix = ''): any[] {
    const result: any[] = [];
    
    Object.entries(data).forEach(([key, value]) => {
      if (typeof value === 'object' && value !== null) {
        result.push(...this.flattenMetrics(value, `${prefix}${key}_`));
      } else {
        result.push({ [`${prefix}${key}`]: value });
      }
    });

    return result;
  }

  saveCustomLayout(layout: any) {
    localStorage.setItem('dashboardLayout', JSON.stringify(layout));
  }

  getCustomLayout(): any {
    const saved = localStorage.getItem('dashboardLayout');
    return saved ? JSON.parse(saved) : null;
  }

  // Utility Methods
  calculateTrends(metrics: ProjectMetrics[]): any {
    const currentState = this.getCurrentState();
    if (!currentState.selectedProjectId) return null;

    const cachedMetrics = this.cachedMetrics.get(currentState.selectedProjectId) || [];
    
    return {
      velocity: this.calculateVelocityTrend(cachedMetrics),
      completion: this.calculateCompletionTrend(cachedMetrics),
      quality: this.calculateQualityTrend(cachedMetrics)
    };
  }

  private calculateVelocityTrend(metrics: ProjectMetrics[]): number {
    if (metrics.length < 2) return 0;

    // Calculate the linear regression slope of velocity over time
    const velocities = metrics.map(m => m.metrics.velocity);
    const timePoints = Array.from({ length: velocities.length }, (_, i) => i);
    
    return this.calculateLinearRegressionSlope(timePoints, velocities);
  }

  private calculateCompletionTrend(metrics: ProjectMetrics[]): number {
    if (metrics.length < 2) return 0;

    // Calculate trend in completion rates
    const completionRates = metrics.map(m => m.metrics.completionRate);
    const timePoints = Array.from({ length: completionRates.length }, (_, i) => i);
    
    return this.calculateLinearRegressionSlope(timePoints, completionRates);
  }

  private calculateQualityTrend(metrics: ProjectMetrics[]): number {
    if (metrics.length < 2) return 0;

    // Calculate trend in quality scores
    const qualityScores = metrics.map(m => m.metrics.qualityScore);
    const timePoints = Array.from({ length: qualityScores.length }, (_, i) => i);
    
    return this.calculateLinearRegressionSlope(timePoints, qualityScores);
  }

  private calculateLinearRegressionSlope(x: number[], y: number[]): number {
    const n = x.length;
    if (n === 0) return 0;

    const sumX = x.reduce((a, b) => a + b, 0);
    const sumY = y.reduce((a, b) => a + b, 0);
    const sumXY = x.reduce((sum, xi, i) => sum + xi * y[i], 0);
    const sumXX = x.reduce((sum, xi) => sum + xi * xi, 0);

    // Calculate slope (m) in y = mx + b
    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    
    return Number.isFinite(slope) ? slope : 0;
  }
}