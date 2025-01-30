// components/test-results-events/test-results-events.component.ts
import { Component, Input, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { ChartService } from '../../services/chart.service';
import { DashboardService } from '../../services/dashboard.service';
import * as d3 from 'd3';
import { Subject, takeUntil } from 'rxjs';
import { RunHistory } from '../../models/dashboard.model';
import { MatMenuModule } from '@angular/material/menu';

interface TestResult {
  id: string;
  date: Date;
  testCase: string;
  result: 'passed' | 'failed' | 'skipped';
  duration: number;
  environment: string;
}

@Component({
  selector: 'app-test-results-events',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatMenuModule
  ],
  template: `
    <mat-card class="results-card">
      <mat-card-header>
        <mat-card-title>Test Results Events</mat-card-title>
        <div class="header-actions">
          <button mat-button [matMenuTriggerFor]="filterMenu">
            <mat-icon>filter_list</mat-icon>
            Filter
          </button>
          <button mat-icon-button (click)="refresh()">
            <mat-icon>refresh</mat-icon>
          </button>
        </div>
      </mat-card-header>

      <mat-card-content>
        <div class="chart-container">
          <div #trendChart class="trend-chart"></div>
          <div class="metrics-summary">
            <div class="metric-item">
              <span class="label">Pass Rate</span>
              <span class="value">{{passRate}}%</span>
              <span class="trend" [class.positive]="passRateTrend > 0" [class.negative]="passRateTrend < 0">
                {{passRateTrend > 0 ? '+' : ''}}{{passRateTrend}}%
              </span>
            </div>
            <div class="metric-item">
              <span class="label">Average Duration</span>
              <span class="value">{{avgDuration}}s</span>
            </div>
          </div>
        </div>

        <table mat-table [dataSource]="dataSource" matSort class="results-table">
          <!-- Date Column -->
          <ng-container matColumnDef="date">
            <th mat-header-cell *matHeaderCellDef mat-sort-header> Date </th>
            <td mat-cell *matCellDef="let row"> {{row.date | date:'short'}} </td>
          </ng-container>

          <!-- Test Case Column -->
          <ng-container matColumnDef="testCase">
            <th mat-header-cell *matHeaderCellDef mat-sort-header> Test Case </th>
            <td mat-cell *matCellDef="let row"> {{row.testCase}} </td>
          </ng-container>

          <!-- Result Column -->
          <ng-container matColumnDef="result">
            <th mat-header-cell *matHeaderCellDef mat-sort-header> Result </th>
            <td mat-cell *matCellDef="let row">
              <span class="status-badge" [class]="row.result">
                {{row.result}}
              </span>
            </td>
          </ng-container>

          <!-- Duration Column -->
          <ng-container matColumnDef="duration">
            <th mat-header-cell *matHeaderCellDef mat-sort-header> Duration </th>
            <td mat-cell *matCellDef="let row"> {{row.duration}}s </td>
          </ng-container>

          <!-- Environment Column -->
          <ng-container matColumnDef="environment">
            <th mat-header-cell *matHeaderCellDef mat-sort-header> Environment </th>
            <td mat-cell *matCellDef="let row"> {{row.environment}} </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"
              [class.expanded]="expandedRow === row"
              (click)="expandRow(row)">
          </tr>
        </table>

        <mat-paginator [pageSizeOptions]="[5, 10, 20]"
                      showFirstLastButtons>
        </mat-paginator>
      </mat-card-content>
    </mat-card>

    <mat-menu #filterMenu="matMenu">
      <button mat-menu-item (click)="applyFilter('all')">All Results</button>
      <button mat-menu-item (click)="applyFilter('passed')">Passed Only</button>
      <button mat-menu-item (click)="applyFilter('failed')">Failed Only</button>
      <button mat-menu-item (click)="applyFilter('skipped')">Skipped Only</button>
    </mat-menu>
  `,
  styles: [`
    .results-card {
      height: 100%;
      background: #2d2d2d;
      color: white;
    }

    .header-actions {
      display: flex;
      gap: 1rem;
    }

    .chart-container {
      display: flex;
      gap: 2rem;
      margin-bottom: 2rem;
    }

    .trend-chart {
      flex: 1;
      height: 200px;
    }

    .metrics-summary {
      width: 200px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 1rem;
    }

    .metric-item {
      text-align: center;

      .label {
        display: block;
        font-size: 0.9rem;
        color: rgba(255, 255, 255, 0.7);
      }

      .value {
        display: block;
        font-size: 1.8rem;
        font-weight: 500;
        margin: 0.5rem 0;
      }

      .trend {
        font-size: 0.9rem;

        &.positive {
          color: #4caf50;
        }

        &.negative {
          color: #f44336;
        }
      }
    }

    .results-table {
      width: 100%;
      background: transparent;

      ::ng-deep {
        th {
          background: rgba(255, 255, 255, 0.1);
          color: white;
        }

        td {
          color: rgba(255, 255, 255, 0.87);
        }
      }
    }

    .status-badge {
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 0.8rem;
      font-weight: 500;
      text-transform: uppercase;

      &.passed {
        background: rgba(76, 175, 80, 0.2);
        color: #4caf50;
      }

      &.failed {
        background: rgba(244, 67, 54, 0.2);
        color: #f44336;
      }

      &.skipped {
        background: rgba(255, 152, 0, 0.2);
        color: #ff9800;
      }
    }

    tr.expanded {
      background: rgba(255, 255, 255, 0.05);
    }

    ::ng-deep {
      .mat-paginator {
        background: transparent;
        color: white;
      }

      .mat-sort-header-arrow {
        color: white;
      }
    }
  `]
})
export class TestResultsEventsComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  displayedColumns = ['date', 'testCase', 'result', 'duration', 'environment'];
  dataSource: TestResult[] = [];
  passRate = 0;
  passRateTrend = 0;
  avgDuration = 0;
  expandedRow: TestResult | null = null;

  @ViewChild('trendChart') trendChart!: ElementRef;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dashboardService: DashboardService,
    private chartService: ChartService
  ) {}

  ngOnInit() {
    this.dashboardService.getRunHistory('30d')
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: RunHistory) => {  // Note the type here
        this.processData(response);
        this.updateChart();
      });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadData() {
    this.dashboardService.getRunHistory('30d')
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: RunHistory) => {
        this.processData(response);
        this.updateChart();
      });
  }
  private processData(history: RunHistory) {  // Updated parameter type
    this.dataSource = history.history.map(item => ({  // Note the .history access
      id: item.executionId,
      date: new Date(item.startTime),
      testCase: 'Test Case',
      result: this.mapStatus(item.status),
      duration: this.calculateDuration(item.startTime, item.endTime),
      environment: 'Production'
    }));
  
    this.passRate = this.calculatePassRate(this.dataSource);
    this.avgDuration = this.calculateAverageDuration(this.dataSource);
  }
  private mapStatus(status: string): 'passed' | 'failed' | 'skipped' {
    switch (status.toLowerCase()) {
      case 'passed': return 'passed';
      case 'failed': return 'failed';
      default: return 'skipped';
    }
  }

  private calculateDuration(start: string, end: string): number {
    return (new Date(end).getTime() - new Date(start).getTime()) / 1000;
  }

  private calculatePassRate(data: TestResult[]): number {
    const total = data.length;
    const passed = data.filter(d => d.result === 'passed').length;
    return total > 0 ? (passed / total) * 100 : 0;
  }

  private calculateAverageDuration(data: TestResult[]): number {
    return data.reduce((sum, d) => sum + d.duration, 0) / (data.length || 1);
  }

  private updateChart() {
    if (!this.trendChart) return;

    const chartData = this.prepareChartData();
    this.chartService.createLineChart(
      this.trendChart.nativeElement,
      chartData,
      {
        width: this.trendChart.nativeElement.offsetWidth,
        height: 200,
        colors: ['#4caf50', '#f44336', '#ff9800'],
        showAxis: true,
        multiLine: true
      }
    );
  }

  private prepareChartData(): { date: string; value: number; }[] {
    return Object.entries(
      this.dataSource.reduce((acc, curr) => {
        const date = curr.date.toISOString().split('T')[0];
        if (!acc[date]) {
          acc[date] = { total: 0, passed: 0, failed: 0, skipped: 0 };
        }
        acc[date].total++;
        acc[date][curr.result]++;
        return acc;
      }, {} as Record<string, { total: number; passed: number; failed: number; skipped: number }>)
    ).map(([date, counts]) => ({
      date,
      value: counts.total
    }));
  }

  expandRow(row: TestResult) {
    this.expandedRow = this.expandedRow === row ? null : row;
  }

  applyFilter(filter: string) {
    switch (filter) {
      case 'passed':
        this.dataSource = this.dataSource.filter(item => item.result === 'passed');
        break;
      case 'failed':
        this.dataSource = this.dataSource.filter(item => item.result === 'failed');
        break;
      case 'skipped':
        this.dataSource = this.dataSource.filter(item => item.result === 'skipped');
        break;
      default:
        this.loadData();
        break;
    }
    this.updateChart();
  }

  refresh() {
    this.loadData();
  }
}