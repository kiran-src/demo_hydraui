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
// import { animations } from './task-dashboard.animations';
import { animations } from './task-dashboard.animations';

import { TaskDashboardService } from './services/task-dashboard.service';
import { EpicProgressComponent } from './components/epic-progress/epic-progress.component';
import { SprintBurndownComponent } from './components/sprint-burndown/sprint-burndown.component';
import { TaskDistributionComponent } from './components/task-distribution/task-distribution.component';
import { ResourceWorkloadComponent } from './components/resource-workload/resource-workload.component';
import { TeamVelocityComponent } from './components/team-velocity/team-velocity.component';
import { ProjectOverviewComponent } from './components/project-overview/project-overview.component';
import { DashboardData, Project } from './models/dashboard-data.types';
import { OverlayContainer } from '@angular/cdk/overlay';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-task-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    // BrowserAnimationsModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    FormsModule,
    EpicProgressComponent,
    SprintBurndownComponent,
    TaskDistributionComponent,
    ResourceWorkloadComponent,
    TeamVelocityComponent,
    ProjectOverviewComponent
  ],
  animations: animations,

  templateUrl: './task-dashboard.component.html',
  styleUrls: ['./task-dashboard.component.scss']
})
export class TaskDashboardComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  isLoading = false;
  selectedProject: string | null = null;
  dashboardData?: DashboardData;
  availableProjects: Project[] = [];

  constructor(private dashboardService: TaskDashboardService,    private overlayContainer: OverlayContainer
  ) {    overlayContainer.getContainerElement().classList.add('light-theme');
  }

  ngOnInit() {
    this.loadAvailableProjects();
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
        error: (error: Error) => {
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
    this.dashboardService.getDashboardMetrics(this.selectedProject)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: DashboardData) => {
          console.log('Dashboard data received:', data);
          console.log('Task status data:', data.taskStatus);
          this.dashboardData = data;
          this.isLoading = false;
        },
        error: (error: Error) => {
          console.error('Error loading dashboard:', error);
          this.isLoading = false;
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