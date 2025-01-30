import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
// import { ProjectSummaryData, ProjectStatus } from '../models/dashboard-data.types';
import { ProjectStatus, ProjectSummaryData } from '../../models/dashboard-data.types';

@Component({
  selector: 'app-project-overview',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatTooltipModule],
  template: `
    <div class="project-summary-container">
      <div class="header">
        <div class="title-section">
          <h2>Project Summary</h2>
          <div class="project-stats">
            <div class="stat">
              <span class="label">Project</span>
              <span class="value">{{ data?.title || 'N/A' }}</span>
            </div>
            <div class="stat">
              <span class="label">Status</span>
              <span class="value status" [class]="data?.status?.toLowerCase()">
                <mat-icon>{{ getStatusIcon(data?.status) }}</mat-icon>
                {{ formatStatus(data?.status) }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="content">
        <!-- Task Summary -->
        <div class="summary-section">
          <h3>Tasks</h3>
          <div class="metrics-grid">
            <div class="metric-item">
              <span class="label">Total Tasks</span>
              <span class="value">{{ data?.metrics?.taskMetrics?.total || 0 }}</span>
            </div>
            <div class="metric-item">
              <span class="label">In Progress</span>
              <span class="value">{{ data?.metrics?.taskMetrics?.inProgress || 0 }}</span>
            </div>
            <div class="metric-item">
              <span class="label">Completed</span>
              <span class="value">{{ data?.metrics?.taskMetrics?.completed || 0 }}</span>
            </div>
            <div class="metric-item">
              <span class="label">Blocked</span>
              <span class="value">{{ data?.metrics?.taskMetrics?.blocked || 0 }}</span>
            </div>
          </div>
          <div class="progress-section">
            <div class="progress-label">
              <span>Completion</span>
              <span>{{ data?.metrics?.taskMetrics?.completion || 0 }}%</span>
            </div>
            <div class="progress-bar">
              <div class="progress" 
                   [style.width.%]="data?.metrics?.taskMetrics?.completion || 0"
                   [style.background-color]="getProgressColor(data?.metrics?.taskMetrics?.completion || 0)">
              </div>
            </div>
          </div>
        </div>

        <!-- Sprint Summary -->
        <div class="summary-section">
          <h3>Sprints</h3>
          <div class="metrics-grid">
            <div class="metric-item">
              <span class="label">Active</span>
              <span class="value">{{ data?.metrics?.sprintMetrics?.active || 0 }}</span>
            </div>
            <div class="metric-item">
              <span class="label">Planned</span>
              <span class="value">{{ data?.metrics?.sprintMetrics?.planned || 0 }}</span>
            </div>
            <div class="metric-item">
              <span class="label">Completed</span>
              <span class="value">{{ data?.metrics?.sprintMetrics?.completed || 0 }}</span>
            </div>
          </div>
        </div>

        <!-- Epic & Resource Summary -->
        <div class="summary-section">
          <div class="subsection-grid">
            <div class="subsection">
              <h3>Epics</h3>
              <div class="metrics-grid">
                <div class="metric-item">
                  <span class="label">Total</span>
                  <span class="value">{{ data?.metrics?.epicMetrics?.total || 0 }}</span>
                </div>
                <div class="metric-item">
                  <span class="label">In Progress</span>
                  <span class="value">{{ data?.metrics?.epicMetrics?.inProgress || 0 }}</span>
                </div>
                <div class="metric-item">
                  <span class="label">Completed</span>
                  <span class="value">{{ data?.metrics?.epicMetrics?.completed || 0 }}</span>
                </div>
              </div>
            </div>

            <div class="subsection">
              <h3>Resources</h3>
              <div class="metrics-grid">
                <div class="metric-item">
                  <span class="label">Total Resources</span>
                  <span class="value">{{ data?.metrics?.resourceMetrics?.totalResources || 0 }}</span>
                </div>
                <div class="metric-item">
                  <span class="label">Avg. Utilization</span>
                  <span class="value">{{ data?.metrics?.resourceMetrics?.averageUtilization || 0 }}%</span>
                </div>
                <div class="metric-item warning" 
                     *ngIf="data?.metrics?.resourceMetrics?.overallocatedResources">
                  <span class="label">Overallocated</span>
                  <span class="value">{{ data?.metrics?.resourceMetrics?.overallocatedResources }}</span>
                  <mat-icon matTooltip="Resources exceeding capacity" class="warning-icon">warning</mat-icon>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }

    .project-summary-container {
  height: 100%;
  padding: 16px;
  background: #ffffff;
  border-radius: 8px;
  color: #333333;

  .header {
    margin-bottom: 24px;

    .title-section {
      h2 {
        margin: 0 0 8px;
        font-size: 20px;
        font-weight: 500;
        color: #333333;
      }

      .project-stats {
        display: flex;
        gap: 24px;

        .stat {
          .label {
            display: block;
            font-size: 12px;
            color: #666666;
            margin-bottom: 4px;
          }

          .value {
            font-size: 16px;
            font-weight: 500;
            color: #333333;

            &.status {
              display: flex;
              align-items: center;
              gap: 4px;

              &.active { color: #2e7d32; }
              &.paused { color: #ed6c02; }
              &.completed { color: #1976d2; }

              mat-icon {
                font-size: 18px;
                width: 18px;
                height: 18px;
              }
            }
          }
        }
      }
    }
  }

  .content {
    display: grid;
    gap: 24px;

    .summary-section {
      background: #f8f9fa;
      border-radius: 8px;
      padding: 16px;

      h3 {
        margin: 0 0 16px;
        font-size: 16px;
        font-weight: 500;
        color: #333333;
      }

      .metrics-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
        gap: 16px;

        .metric-item {
          .label {
            display: block;
            font-size: 12px;
            color: #666666;
            margin-bottom: 4px;
          }

          .value {
            font-size: 24px;
            font-weight: 500;
            color: #333333;
          }

          &.warning {
            .value {
              color: #ed6c02;
            }
            .warning-icon {
              color: #ed6c02;
              font-size: 16px;
              margin-left: 4px;
            }
          }
        }
      }

      .progress-section {
        margin-top: 16px;

        .progress-label {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
          font-size: 14px;
          color: #333333;
        }

        .progress-bar {
          width: 100%;
          height: 8px;
          background: rgba(0, 0, 0, 0.1);
          border-radius: 4px;
          overflow: hidden;

          .progress {
            height: 100%;
            transition: width 0.3s ease;
          }
        }
      }

      .subsection-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 24px;

        .subsection {
          h3 {
            margin-bottom: 12px;
          }
        }
      }
    }
  }
}
  `]
})
export class ProjectOverviewComponent implements OnChanges {
  @Input() data?: ProjectSummaryData;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      console.log('Project Summary Data:', this.data);
    }
  }

  getStatusIcon(status: ProjectStatus | undefined): string {
    if (!status) return 'help_outline';
    
    switch (status.toLowerCase()) {
      case 'active':
        return 'play_circle';
      case 'paused':
        return 'pause_circle';
      case 'completed':
        return 'check_circle';
      default:
        return 'help_outline';
    }
  }

  formatStatus(status: ProjectStatus | undefined): string {
    if (!status) return 'Unknown';
    return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
  }

  getProgressColor(completion: number): string {
    if (completion >= 75) return '#4caf50';
    if (completion >= 50) return '#ff9800';
    return '#f44336';
  }
}