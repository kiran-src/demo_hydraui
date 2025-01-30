import { Component, OnInit, OnDestroy, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BuildDataService, BuildData } from './global-prediction/build-data.service'; // Import the correct BuildData interface
import { GlobalPredictionComponent } from './stacked-bar-chart/stacked-bar-chart.component';
import { DailyBuildTrendComponent } from './daily-build-trend/daily-build-trend.component';

@Component({
  selector: 'app-predictions-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    FormsModule,
    DailyBuildTrendComponent,
    GlobalPredictionComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div class="dashboard-container">
      <div class="dashboard-header">
        <div class="header-content">
          <h1>Pipeline Predictions Dashboard</h1>
          <div class="header-actions">
            <mat-form-field appearance="outline" class="time-range-select">
              <mat-label>Time Range</mat-label>
              <mat-select [(ngModel)]="selectedTimeRange" (selectionChange)="onTimeRangeChange()">
                <mat-option value="7days">Last 7 Days</mat-option>
                <mat-option value="30days">Last 30 Days</mat-option>
                <mat-option value="90days">Last 90 Days</mat-option>
              </mat-select>
            </mat-form-field>
            <button mat-icon-button (click)="refreshDashboard()" [disabled]="isLoading">
              <mat-icon>refresh</mat-icon>
            </button>
          </div>
        </div>
      </div>

      <div class="dashboard-content" *ngIf="!isLoading; else loading">
        <!-- Daily Build Trend -->
        <div class="dashboard-row">
          <div class="dashboard-card full-width">
            <app-daily-build-trend></app-daily-build-trend>
          </div>
        </div>

        <!-- Global Prediction and Pipeline Analytics -->
        <div class="dashboard-row">
          <div class="dashboard-card">
            <app-global-prediction></app-global-prediction>
          </div>
          <div class="dashboard-card">
            <app-pipeline-predictive-analytics></app-pipeline-predictive-analytics>
          </div>
        </div>
      </div>

      <ng-template #loading>
        <div class="loading-container">
          <mat-spinner diameter="50"></mat-spinner>
          <p>Loading prediction data...</p>
        </div>
      </ng-template>
    </div>
  `,
  styles: [
    `
      .dashboard-container {
        padding: 20px;
        height: 100%;
      }

      .dashboard-header {
        margin-bottom: 24px;
      }

      .header-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      h1 {
        font-size: 24px;
        margin: 0;
        color: #2c3e50;
      }

      .header-actions {
        display: flex;
        gap: 16px;
        align-items: center;
      }

      .time-range-select {
        width: 200px;
      }

      .dashboard-row {
        display: flex;
        gap: 24px;
        margin-bottom: 24px;
      }

      .dashboard-card {
        flex: 1;
        background: white;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        overflow: hidden;
      }

      .full-width {
        width: 100%;
      }

      .loading-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 400px;
        gap: 16px;
      }

      @media (max-width: 768px) {
        .dashboard-row {
          flex-direction: column;
        }

        .header-content {
          flex-direction: column;
          gap: 16px;
        }
      }
    `,
  ],
})
export class PredictionsDashboardComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  isLoading = false;
  hasError = false;
  selectedTimeRange = '30days';

  constructor(private buildDataService: BuildDataService) {}

  ngOnInit() {
    this.loadDashboardData();
  }

  onTimeRangeChange() {
    this.loadDashboardData();
  }

  refreshDashboard() {
    this.loadDashboardData();
  }

  private loadDashboardData() {
    if (this.isLoading) return;

    this.isLoading = true;
    this.hasError = false;

    this.buildDataService
      .getBuildData()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: BuildData[]) => {
          this.isLoading = false;
          console.log('Data received:', data);
        },
        error: (error) => {
          console.error('Error loading dashboard data:', error);
          this.isLoading = false;
          this.hasError = true;
        },
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
