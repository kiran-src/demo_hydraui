import { Component, OnInit, OnDestroy } from '@angular/core';
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

import { TestDashboardService } from './services/test-dashboard.service';
import { TestCaseOverviewComponent } from './components/test-case-overview/test-case-overview.component';
import { TestExecutionComponent } from './components/test-execution/test-execution.component';
import { DefectAnalyticsComponent } from './components/defect-analytics/defect-analytics.component';
import { QualityMetricsComponent } from './components/quality-metrics/quality-metrics.component';

interface Project {
  code: string;
  name: string;
  title?: string;
  status: string;
  metrics?: {
    total: number;
    completed: number;
    inProgress: number;
  };
}

@Component({
  selector: 'app-test-dashboard',
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
    TestCaseOverviewComponent,
    TestExecutionComponent,
    DefectAnalyticsComponent,
    QualityMetricsComponent
  ],
  template: `

  <!-- Tabs -->
<div class="tabs">
  <a href="/test-dashboard" class="tab active">Test Management</a>
  <a href="/task-dashboard" class="tab">Task Management</a>
  
</div>

    <div class="dashboard-container">
      <div class="dashboard-header">
        <div class="header-content">
          <h1>Test Management Dashboard</h1>
          <div class="header-actions">
            <mat-form-field appearance="outline" class="project-select">
              <mat-label>Select Project</mat-label>
              <mat-select [(ngModel)]="selectedProject" (selectionChange)="onProjectChange($event)">
                <mat-option [value]="null">Overall Dashboard</mat-option>
                <mat-option [value]="project.code" *ngFor="let project of availableProjects">
                  {{ project.name || project.title }}
                </mat-option>
              </mat-select>
            </mat-form-field>
            <button mat-icon-button (click)="refreshDashboard()" [disabled]="isLoading">
              <mat-icon>refresh</mat-icon>
            </button>
          </div>
        </div>
      </div>

      <div class="dashboard-content" *ngIf="!isLoading && dashboardData; else loading">
        <!-- Test Case Overview -->
        <div class="dashboard-row">
          <div class="dashboard-card full-width">
            <app-test-case-overview [data]="dashboardData.testCasesOverview"></app-test-case-overview>
          </div>
        </div>

        <!-- Test Execution and Defect Analytics -->
        <div class="dashboard-row">
          <div class="dashboard-card">
            <app-test-execution [data]="dashboardData.executionMetrics"></app-test-execution>
          </div>
          <div class="dashboard-card">
            <app-defect-analytics [data]="dashboardData.defectAnalytics"></app-defect-analytics>
          </div>
        </div>

        <!-- Quality Metrics -->
        <div class="dashboard-row">
          <div class="dashboard-card full-width">
            <app-quality-metrics [data]="dashboardData.qualityMetrics"></app-quality-metrics>
          </div>
        </div>
      </div>

      <ng-template #loading>
        <div class="loading-container">
          <mat-spinner diameter="50"></mat-spinner>
          <p>Loading dashboard data...</p>
        </div>
      </ng-template>
    </div>
  `,
  styleUrls: ['./test-dashboard.component.scss']
})
export class TestDashboardComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  isLoading = false;
  selectedProject: string | null = null;
  dashboardData?: any;
  availableProjects: Project[] = [];

  constructor(private dashboardService: TestDashboardService) {}

  ngOnInit() {
    this.loadAvailableProjects();
  }

  errorMessage: string | null = null;

private handleError(error: any) {
  this.isLoading = false;
  if (error?.message) {
    this.errorMessage = error.message;
  } else {
    this.errorMessage = 'An unexpected error occurred. Please try again later.';
  }
  
  // Auto-hide error after 5 seconds
  setTimeout(() => {
    this.errorMessage = null;
  }, 5000);
}

  loadAvailableProjects() {
    this.isLoading = true;
    console.log('Loading dashboard data for project:', this.selectedProject);

    this.dashboardService.getAvailableProjects()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (projects: Project[]) => {
          this.availableProjects = projects;
          this.loadDashboardData();
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading projects:', error);
          this.isLoading = false;
        }
      });
  }

  onProjectChange(event: { value: string }) {
    this.selectedProject = event.value;
    this.loadDashboardData();
  }

  private loadDashboardData() {
    this.isLoading = true;
    this.errorMessage = null;
    
    this.dashboardService.getDashboardMetrics(this.selectedProject)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          console.log('Dashboard data received:', data);
          this.dashboardData = data;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading dashboard:', error);
          this.handleError(error);
        }
      });
  }

  refreshDashboard() {
    this.loadDashboardData();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}