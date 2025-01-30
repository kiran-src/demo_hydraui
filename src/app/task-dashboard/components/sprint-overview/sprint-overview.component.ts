import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sprint-overview',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  template: `
    <div class="sprint-overview-container">
      <div class="header">
        <h2>Sprint Overview</h2>
        <!-- Sprint Statistics -->
        <div class="sprint-stats">
          <div class="stat-item">
            <span class="label">Total Sprints</span>
            <span class="value">{{ data?.sprintStats?.total || 0 }}</span>
          </div>
          <div class="stat-item">
            <span class="label">Active</span>
            <span class="value">{{ data?.sprintStats?.active || 0 }}</span>
          </div>
          <div class="stat-item">
            <span class="label">Completed</span>
            <span class="value">{{ data?.sprintStats?.completed || 0 }}</span>
          </div>
        </div>
      </div>

      <div class="content">
        <!-- Active Sprint Section -->
        <div class="active-sprint" *ngIf="data?.activeSprint">
          <h3>Active Sprint: {{ data.activeSprint.name }}</h3>
          <div class="sprint-dates">
            <span>{{ formatDate(data.activeSprint.startDate) }} → {{ formatDate(data.activeSprint.endDate) }}</span>
            <span class="days-left">{{ calculateDaysLeft(data.activeSprint.endDate) }} days left</span>
          </div>
          
          <div class="sprint-metrics">
            <div class="metric-item">
              <span class="label">Tasks</span>
              <span class="value">{{ data.activeSprint.tasks?.total || 0 }}</span>
            </div>
            <div class="metric-item">
              <span class="label">Completed</span>
              <span class="value">{{ data.activeSprint.tasks?.completed || 0 }}</span>
            </div>
            <div class="metric-item">
              <span class="label">Story Points</span>
              <span class="value">{{ data.activeSprint.tasks?.storyPoints || 0 }}</span>
            </div>
          </div>

          <div class="progress-section">
            <div class="progress-label">
              <span>Sprint Progress</span>
              <span>{{ calculateProgress(data.activeSprint.tasks?.completed, data.activeSprint.tasks?.total) }}%</span>
            </div>
            <div class="progress-bar">
              <div class="progress" 
                   [style.width.%]="calculateProgress(data.activeSprint.tasks?.completed, data.activeSprint.tasks?.total)"
                   [style.background-color]="getProgressColor(calculateProgress(data.activeSprint.tasks?.completed, data.activeSprint.tasks?.total))">
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Sprints -->
        <div class="recent-sprints">
          <h3>Recent Sprints</h3>
          <div class="sprint-list">
            <div class="sprint-item" *ngFor="let sprint of data?.recentSprints">
              <div class="sprint-header">
                <span class="sprint-name">{{ sprint.name }}</span>
                <span class="sprint-status" [class]="sprint.status.toLowerCase()">
                  {{ sprint.status }}
                </span>
              </div>
              <div class="sprint-info">
                <span class="dates">{{ formatDate(sprint.startDate) }} → {{ formatDate(sprint.endDate) }}</span>
                <span class="completion">
                  {{ calculateProgress(sprint.tasksCompleted, sprint.tasksTotal) }}% Complete
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .sprint-overview-container {
      height: 100%;
      padding: 16px;
      background: #ffffff;
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      color: #333333;

      .header {
        margin-bottom: 24px;

        h2 {
          margin: 0 0 16px;
          font-size: 20px;
          font-weight: 500;
        }

        .sprint-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;

          .stat-item {
            background: #f8f9fa;
            padding: 12px;
            border-radius: 8px;
            text-align: center;

            .label {
              display: block;
              font-size: 12px;
              color: #666666;
              margin-bottom: 4px;
            }

            .value {
              font-size: 24px;
              font-weight: 500;
            }
          }
        }
      }

      .content {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 24px;

        .active-sprint {
          background: #f8f9fa;
          border-radius: 8px;
          padding: 16px;

          h3 {
            margin: 0 0 12px;
            font-size: 16px;
            font-weight: 500;
          }

          .sprint-dates {
            display: flex;
            justify-content: space-between;
            color: #666666;
            margin-bottom: 16px;

            .days-left {
              font-weight: 500;
              color: #2196F3;
            }
          }

          .sprint-metrics {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 16px;
            margin-bottom: 16px;

            .metric-item {
              text-align: center;

              .label {
                display: block;
                font-size: 12px;
                color: #666666;
                margin-bottom: 4px;
              }

              .value {
                font-size: 20px;
                font-weight: 500;
              }
            }
          }

          .progress-section {
            .progress-label {
              display: flex;
              justify-content: space-between;
              margin-bottom: 8px;
              font-size: 14px;
            }

            .progress-bar {
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
        }

        .recent-sprints {
          h3 {
            margin: 0 0 16px;
            font-size: 16px;
            font-weight: 500;
          }

          .sprint-list {
            display: flex;
            flex-direction: column;
            gap: 8px;

            .sprint-item {
              background: #f8f9fa;
              border-radius: 8px;
              padding: 12px;

              .sprint-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 8px;

                .sprint-name {
                  font-weight: 500;
                }

                .sprint-status {
                  padding: 4px 8px;
                  border-radius: 4px;
                  font-size: 12px;

                  &.completed { 
                    background: rgba(76, 175, 80, 0.1); 
                    color: #2e7d32; 
                  }
                  &.active { 
                    background: rgba(33, 150, 243, 0.1); 
                    color: #1976d2; 
                  }
                  &.planned { 
                    background: rgba(158, 158, 158, 0.1); 
                    color: #616161; 
                  }
                }
              }

              .sprint-info {
                display: flex;
                justify-content: space-between;
                font-size: 12px;
                color: #666666;

                .dates {
                  flex: 1;
                }

                .completion {
                  font-weight: 500;
                }
              }
            }
          }
        }
      }
    }
  `],
})
export class SprintOverviewComponent {
  @Input() data: any;

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  }

  calculateDaysLeft(endDate: string): number {
    const end = new Date(endDate);
    const now = new Date();
    return Math.max(0, Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
  }

  calculateProgress(completed: number, total: number): number {
    if (!total) return 0;
    return Math.round((completed / total) * 100);
  }

  getProgressColor(progress: number): string {
    if (progress >= 75) return '#4CAF50';
    if (progress >= 50) return '#FFC107';
    return '#F44336';
  }
}