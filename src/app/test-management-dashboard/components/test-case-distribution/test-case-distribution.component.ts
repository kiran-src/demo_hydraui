// components/test-case-distribution/test-case-distribution.component.ts
import { Component, Input, OnChanges, ElementRef, ViewChild, SimpleChanges, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ChartService } from '../../services/chart.service';
import { Subject, takeUntil } from 'rxjs';
import { TestDistributionData } from '../../models/dashboard.model';
import { DashboardService } from '../../services/dashboard.service';

interface Distribution {
  regression: number;
  smoke: number;
  other: number;
}

@Component({
  selector: 'app-test-case-distribution',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule,MatMenuModule],
  template: `
    <mat-card class="metric-card">
      <mat-card-header>
        <mat-card-title>Test Case Type Distribution</mat-card-title>
        <button mat-icon-button [matMenuTriggerFor]="menu">
          <mat-icon>more_vert</mat-icon>
        </button>
      </mat-card-header>
      <mat-card-content>
        <div class="metric-content">
          <div #chartContainer class="chart-container"></div>
          <div class="legend">
            <div class="legend-item">
              <div class="color-box regression"></div>
              <span class="label">Regression ({{data?.regression || 0}})</span>
            </div>
            <div class="legend-item">
              <div class="color-box smoke"></div>
              <span class="label">Smoke ({{data?.smoke || 0}})</span>
            </div>
            <div class="legend-item">
              <div class="color-box other"></div>
              <span class="label">Other ({{data?.other || 0}})</span>
            </div>
          </div>
        </div>
      </mat-card-content>
    </mat-card>

      <mat-menu #menu="matMenu">
    <button mat-menu-item (click)="exportData('pdf')">
      <mat-icon>picture_as_pdf</mat-icon>
      Export as PDF
    </button>
    <button mat-menu-item (click)="exportData('csv')">
      <mat-icon>table_chart</mat-icon>
      Export as CSV
    </button>
  </mat-menu>
  
    
  `,
  styles: [`
    .metric-card {
      height: 100%;
      background: #2d2d2d;
      color: white;
    }

    mat-card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }

    .metric-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 1rem;
    }

    .chart-container {
      width: 200px;
      height: 200px;
      margin-bottom: 1rem;
    }

    .legend {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      width: 100%;

      .legend-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;

        .color-box {
          width: 12px;
          height: 12px;
          border-radius: 2px;

          &.regression {
            background-color: #ff4081;
          }

          &.smoke {
            background-color: #7c4dff;
          }

          &.other {
            background-color: #00bcd4;
          }
        }

        .label {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.87);
        }
      }
    }
  `]
})
export class TestCaseDistributionComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  data: TestDistributionData | null = null;

  @ViewChild('chartContainer', { static: true }) chartContainer!: ElementRef;

  constructor(
    private dashboardService: DashboardService,
    private chartService: ChartService
  ) {}

  ngOnInit() {
    this.dashboardService.getTestDistribution()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.data = data;
        this.updateChart();
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  exportData(format: 'pdf' | 'csv'): void {
    // Implementation
  }

  private updateChart() {
    if (!this.data) return;

    const chartData = [
      { label: 'Regression', value: this.data.regression },
      { label: 'Smoke', value: this.data.smoke },
      { label: 'Other', value: this.data.other }
    ];

    this.chartService.createPieChart(
      this.chartContainer.nativeElement,
      chartData,
      {
        width: 200,
        height: 200,
        colors: ['#ff4081', '#7c4dff', '#00bcd4'],
        showLabels: false
      }
    );
  }
}