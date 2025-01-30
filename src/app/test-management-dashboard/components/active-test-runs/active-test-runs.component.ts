import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Subject, takeUntil } from 'rxjs';
import { DashboardService } from '../../services/dashboard.service';
import { ChartService } from '../../services/chart.service';
import { ActiveTestRunsData } from '../../models/dashboard.model';
import { WebSocketUpdate } from '../../models/websocket.model';

@Component({
  selector: 'app-active-test-runs',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  template: `
    <mat-card class="metric-card">
      <mat-card-header>
        <mat-card-title>Active Test Runs</mat-card-title>
        <div class="project-selector">
          <span>{{data?.projectCount || 0}} Projects</span>
          <mat-icon>expand_more</mat-icon>
        </div>
      </mat-card-header>
      <mat-card-content>
        <div class="metric-content">
          <div class="metric-value">
            {{data?.count || 0}}
            <span class="trend" [class.positive]="data?.trend! > 0" [class.negative]="data?.trend! < 0">
              {{data?.trend}}% vs last {{data?.timeframe}}
            </span>
          </div>
          <div #chartContainer class="chart-container"></div>
        </div>
      </mat-card-content>
    </mat-card>
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

    .project-selector {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;

      span {
        font-size: 0.9rem;
        color: rgba(255, 255, 255, 0.7);
      }
    }

    .metric-content {
      padding: 1rem;
    }

    .metric-value {
      font-size: 2.5rem;
      font-weight: 500;
      margin-bottom: 1rem;

      .trend {
        font-size: 0.9rem;
        margin-left: 1rem;
        
        &.positive {
          color: #4caf50;
        }
        
        &.negative {
          color: #f44336;
        }
      }
    }

    .chart-container {
      height: 100px;
      margin-top: 1rem;
    }
  `]
})
export class ActiveTestRunsComponent implements OnInit, OnDestroy {
  @Input() data?: ActiveTestRunsData; // Add this line for the input property

  private destroy$ = new Subject<void>();
  // data: ActiveTestRunsData | null = null;

  @ViewChild('chartContainer', { static: true }) chartContainer!: ElementRef;

  constructor(
    private dashboardService: DashboardService,
    private chartService: ChartService
  ) {}

  ngOnInit() {
    // Subscribe to WebSocket updates
    this.dashboardService.webSocketUpdates$
      .pipe(takeUntil(this.destroy$))
      .subscribe((update) => {
        if (update?.type === 'activeRuns') {
          this.data = update.data as ActiveTestRunsData;
          this.updateChart();
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadData() {
    this.dashboardService.getActiveTestRuns()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.data = data;
        this.updateChart();
      });
  }

  private subscribeToUpdates() {
    this.dashboardService.webSocketUpdates$
      .pipe(takeUntil(this.destroy$))
      .subscribe((update: WebSocketUpdate | null) => {
        if (update?.type === 'activeRuns') {
          this.data = update.data as ActiveTestRunsData;
          this.updateChart();
        }
      });
  }
  
  private updateChart() {
    if (!this.data?.history) return;
  
    this.chartService.createLineChart(
      this.chartContainer.nativeElement,
      this.data.history,
      {
        width: this.chartContainer.nativeElement.offsetWidth,
        height: 100,
        color: '#4caf50',
        area: true
      }
    );
  }
}