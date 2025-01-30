// dashboard.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { Subscription, combineLatest } from 'rxjs';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { DashboardService, Project } from './services/dashboard.service';
import { LayoutService } from './services/layout.service';
import { ErrorService } from './services/error.service';
import { WebSocketService } from './services/websocket.service';

import { DashboardGridComponent } from './components/dashboard-grid/dashboard-grid.component';
import { DashboardWidgetComponent } from './components/dashboard-widget/dashboard-widget.component';
// import { ErrorDisplayComponent } from '../shared/components/error-display/error-display.component';
import { ErrorDisplayComponent } from './components/error-display/error-display.component';
import { ActiveTestRunsComponent } from './components/active-test-runs/active-test-runs.component';
import { TestCasesCountComponent } from './components/test-cases-count/test-cases-count.component';
import { TestCaseDistributionComponent } from './components/test-case-distribution/test-case-distribution.component';
import { TestCaseAutomationComponent } from './components/test-case-automation/test-case-automation.component';
import { TestRunsTimelineComponent } from './components/test-runs-timeline/test-runs-timeline.component';
import { TestResultsEventsComponent } from './components/test-results-events/test-results-events.component';
import { TestCasePriorityComponent } from './components/test-case-priority/test-case-priority.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


// import { routeAnimation, fadeInOut } from '../shared/animations/dashboard.animations';
import { routeAnimation, fadeInOut } from './shared/animations/dashboard.animations';
import { DashboardMetrics } from './models/dashboard.model';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    RouterModule,
    ReactiveFormsModule,
    DashboardGridComponent,
    DashboardWidgetComponent,
    ErrorDisplayComponent,
    ActiveTestRunsComponent,
    TestCasesCountComponent,
    TestCaseDistributionComponent,
    TestCaseAutomationComponent,
    TestRunsTimelineComponent,
    TestResultsEventsComponent,
    TestCasePriorityComponent,
    CommonModule,
    MatCardModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  animations: [routeAnimation, fadeInOut],
  template: `
    <div class="dashboard-container" [@routeAnimation]>
      <!-- Header -->
      <div class="dashboard-header" [class.mobile]="layout.isMobile">
        <div class="title-section">
          <h1>Test Management Dashboard</h1>
          <div class="timeframe-selector">
            <mat-form-field>
              <mat-select [formControl]="timeframeControl">
                <mat-option *ngFor="let tf of timeframes" [value]="tf.value">
                  {{tf.label}}
                </mat-option>
              </mat-select>
            </mat-form-field>
          </div>
        </div>
        
        <div class="action-buttons">
          <button mat-button [matMenuTriggerFor]="exportMenu">
            <mat-icon>download</mat-icon>
            Export
          </button>
          <button mat-button [matMenuTriggerFor]="filterMenu">
            <mat-icon>filter_list</mat-icon>
            Filter
          </button>
          <button mat-icon-button (click)="refresh()" [disabled]="loading">
            <mat-icon>refresh</mat-icon>
          </button>
        </div>
      </div>

      <!-- Loading Overlay -->
      <div class="loading-overlay" *ngIf="loading" [@fadeInOut]>
        <mat-spinner diameter="48"></mat-spinner>
        <p>Loading dashboard data...</p>
      </div>

      <!-- Dashboard Grid -->
      <app-dashboard-grid *ngIf="!loading && metrics">
        <app-dashboard-widget class="widget span-1" title="Active Test Runs">
          <app-active-test-runs [data]="metrics.activeTestRuns"></app-active-test-runs>
        </app-dashboard-widget>

        <app-dashboard-widget class="widget span-1" title="Test Cases">
          <app-test-cases-count [data]="metrics.totalTestCases"></app-test-cases-count>
        </app-dashboard-widget>

        <app-dashboard-widget class="widget span-1" title="Test Distribution">
          <app-test-case-distribution [data]="metrics.distribution"></app-test-case-distribution>
        </app-dashboard-widget>

        <app-dashboard-widget class="widget span-1" title="Automation Ratio">
          <app-test-case-automation [ratio]="metrics.automationRatio"></app-test-case-automation>
        </app-dashboard-widget>

        <app-dashboard-widget class="widget span-full" title="Test Runs Timeline">
          <app-test-runs-timeline></app-test-runs-timeline>
        </app-dashboard-widget>

        <app-dashboard-widget class="widget span-2" title="Test Results">
          <app-test-results-events></app-test-results-events>
        </app-dashboard-widget>

        <app-dashboard-widget class="widget span-2" title="Priority Distribution">
          <app-test-case-priority [data]="metrics.priority"></app-test-case-priority>
        </app-dashboard-widget>
      </app-dashboard-grid>

      <!-- Error Display -->
      <app-error-display></app-error-display>
    </div>

    <!-- Export Menu -->
    <mat-menu #exportMenu="matMenu">
      <button mat-menu-item (click)="exportData('pdf')">
        <mat-icon>picture_as_pdf</mat-icon>
        Export as PDF
      </button>
      <button mat-menu-item (click)="exportData('excel')">
        <mat-icon>table_chart</mat-icon>
        Export as Excel
      </button>
    </mat-menu>

    <!-- Filter Menu -->
    <mat-menu #filterMenu="matMenu">
      <button mat-menu-item [matMenuTriggerFor]="projectMenu">
        <mat-icon>folder</mat-icon>
        Filter by Project
      </button>
      <button mat-menu-item [matMenuTriggerFor]="statusMenu">
        <mat-icon>rule</mat-icon>
        Filter by Status
      </button>
      <button mat-menu-item [matMenuTriggerFor]="dateMenu">
        <mat-icon>date_range</mat-icon>
        Filter by Date
      </button>
    </mat-menu>

    <mat-menu #projectMenu="matMenu" [overlapTrigger]="false">
      <div class="project-menu-content" (click)="$event.stopPropagation()">
        <mat-selection-list #projectList>
          <mat-list-option *ngFor="let project of projects"
                          [selected]="project.selected"
                          (selectionChange)="onProjectSelectionChange(project)"
                          [value]="project.id">
            {{project.name}}
          </mat-list-option>
        </mat-selection-list>
      </div>
    </mat-menu>
   
    <mat-menu #statusMenu="matMenu">
      <mat-selection-list>
        <mat-list-option *ngFor="let status of statuses" [selected]="status.selected">
          {{status.name}}
        </mat-list-option>
      </mat-selection-list>
    </mat-menu>

    <mat-menu #dateMenu="matMenu">
      <mat-form-field>
        <mat-label>Date Range</mat-label>
        <mat-date-range-input [formGroup]="dateRange">
          <input matStartDate formControlName="start" placeholder="Start date">
          <input matEndDate formControlName="end" placeholder="End date">
        </mat-date-range-input>
      </mat-form-field>
    </mat-menu>
  `,
  styles: [`
    .dashboard-container {
      min-height: 100vh;
      background: #1e1e1e;
      color: white;
      padding: 24px;
      box-sizing: border-box;
    }

    .dashboard-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;

      &.mobile {
        flex-direction: column;
        align-items: flex-start;
        gap: 16px;

        .action-buttons {
          width: 100%;
          justify-content: space-between;
        }
      }
    }

    .title-section {
      display: flex;
      align-items: center;
      gap: 24px;

      h1 {
        margin: 0;
        font-size: 24px;
        font-weight: 500;
      }
    }

    .action-buttons {
      display: flex;
      gap: 8px;
    }

    .loading-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.7);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 16px;
      z-index: 1000;

      p {
        color: white;
        margin: 0;
      }
    }

    .widget {
      &.span-1 {
        grid-column: span 1;
      }

      &.span-2 {
        grid-column: span 2;
      }

      &.span-full {
        grid-column: 1 / -1;
      }
    }

    @media (max-width: 767px) {
      .dashboard-container {
        padding: 16px;
      }

      .widget {
        &.span-2,
        &.span-full {
          grid-column: span 1;
        }
      }
    }

    ::ng-deep {
      .mat-form-field {
        .mat-form-field-wrapper {
          background: #2d2d2d;
        }

        .mat-form-field-label {
          color: rgba(255, 255, 255, 0.7);
        }

        .mat-select-value {
          color: white;
        }
      }
    }
  `]
})
export class DashboardComponent implements OnInit, OnDestroy {
  metrics: DashboardMetrics | null = null;
  loading = true;
  layout = this.layoutService.currentLayout;
  private subscriptions: Subscription[] = [];

  timeframeControl = new FormControl('30d');
  dateRange = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null)
  });

  timeframes = [
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 90 days' },
    { value: 'custom', label: 'Custom Range' }
  ];

  // projects = [
  //   { id: 1, name: 'Project A', selected: true },
  //   { id: 2, name: 'Project B', selected: true },
  //   { id: 3, name: 'Project C', selected: false }
  // ];

  statuses = [
    { name: 'Passed', selected: true },
    { name: 'Failed', selected: true },
    { name: 'Skipped', selected: true }
  ];

  projects: Project[] = [];
  selectedProjects: number[] = [];

  constructor(
    private dashboardService: DashboardService,
    private layoutService: LayoutService,
    private errorService: ErrorService,
    private webSocketService: WebSocketService
  ) {}

  ngOnInit() {
    console.log('Initializing dashboard component');
    this.loadProjects();
    this.initializeSubscriptions();
    this.loadDashboardData(); 
  }
  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private loadProjects() {
    this.dashboardService.getProjects()
      .subscribe({
        next: (projects) => {
          this.projects = projects.map(project => ({
            ...project,
            selected: false  // default state
          }));
          console.log('Loaded projects:', this.projects);
        },
        error: (error) => {
          this.errorService.handleError(error);
          console.error('Error loading projects:', error);
        }
      });
  }

  onProjectSelectionChange(project: Project) {
    project.selected = !project.selected;
    this.selectedProjects = this.projects
      .filter(p => p.selected)
      .map(p => p.id);
    
    // Reload dashboard data with selected projects
    this.loadDashboardData();
  }

  private initializeSubscriptions() {
    // Layout changes
    this.subscriptions.push(
      this.layoutService.layout$.subscribe(layout => {
        this.layout = layout;
      })
    );

    // Timeframe changes
    this.subscriptions.push(
      this.timeframeControl.valueChanges.subscribe(() => {
        this.loadDashboardData();
      })
    );

    // Real-time updates - fixed subscription
    this.subscriptions.push(
      this.webSocketService.messages$.subscribe(message => {
        if (message?.type === 'metrics' && message.payload) {
          this.metrics = message.payload as DashboardMetrics;
        }
      })
    );
  }

  refresh() {
    console.log('Refreshing dashboard data');
    this.loadDashboardData();
  }
  private loadDashboardData() {
    this.loading = true;
    
    const sub = this.dashboardService.getDashboardMetrics(
      this.selectedProjects.length > 0 ? this.selectedProjects.join(',') : undefined
    ).subscribe({
      next: (data) => {
        this.metrics = {
          ...data,
          activeTestRuns: {
            ...data.activeTestRuns,
            projectCount: data.activeTestRuns.projectCount || 0
          },
          totalTestCases: {
            ...data.totalTestCases,
            projectCount: data.totalTestCases.projectCount || 0
          }
        };
        this.loading = false;
      },
      error: (error) => {
        this.errorService.handleError(error);
        this.loading = false;
      }
    });

    this.subscriptions.push(sub);
  }


  exportData(format: 'pdf' | 'excel') {
    // Implementation for exporting data
  }
}